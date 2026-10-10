/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADS_ENABLED?: string;
  readonly VITE_ADSENSE_CLIENT?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
