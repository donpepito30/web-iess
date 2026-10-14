#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "  Vercel Production Bundle Standalone Smoke Test"
echo "=========================================================="

echo "1. Building production bundle (vite build + esbuild bundle)..."
npm run build

echo ""
echo "2. Temporarily isolating node_modules to test standalone bundle..."
BACKUP_DIR="/tmp/nm_smoke_backup_$$"

# Trap guarantees node_modules restoration even if any command fails
cleanup() {
  if [ -n "$SERVER_PID" ]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
  if [ -d "$BACKUP_DIR" ]; then
    echo "Restoring node_modules..."
    mv "$BACKUP_DIR" node_modules
  fi
}
trap cleanup EXIT INT TERM

mv node_modules "$BACKUP_DIR"

echo "3. Testing require('./dist/server.cjs') in isolated runtime..."
REQUIRE_OUTPUT=$(NODE_ENV=production VERCEL=1 node -e "const app=require('./dist/server.cjs'); console.log('OK', typeof (app.default||app))")
echo "$REQUIRE_OUTPUT"

if [[ "$REQUIRE_OUTPUT" != *"OK function"* ]]; then
  echo "❌ Error: Require test failed. Output was: $REQUIRE_OUTPUT"
  exit 1
fi
echo "✅ Standalone require test passed: 'OK function'"

echo ""
echo "4. Starting isolated production server on port 3388..."
PORT=3388 NODE_ENV=production node dist/server.cjs &
SERVER_PID=$!
sleep 2

test_endpoint() {
  local path="$1"
  local expected="$2"
  local code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3388${path}")
  echo "GET ${path} -> HTTP ${code}"
  if [ "$code" != "$expected" ]; then
    echo "❌ Error: Expected HTTP ${expected} for ${path}, got ${code}"
    exit 1
  fi
}

echo "Testing critical endpoints without node_modules:"
test_endpoint "/" "200"
test_endpoint "/blog" "200"
test_endpoint "/sitemap.xml" "200"
test_endpoint "/api/health" "200"

echo ""
echo "5. Stopping isolated server..."
kill "$SERVER_PID" 2>/dev/null || true
wait "$SERVER_PID" 2>/dev/null || true
unset SERVER_PID

echo "6. Restoring node_modules..."
mv "$BACKUP_DIR" node_modules
trap - EXIT INT TERM

echo ""
echo "=========================================================="
echo "✅ All smoke tests passed successfully!"
echo "=========================================================="
