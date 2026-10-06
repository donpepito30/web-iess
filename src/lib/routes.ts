type NavigationCallback = (url: string) => void;
let navListener: NavigationCallback | null = null;

export function registerNavigationListener(listener: NavigationCallback) {
  navListener = listener;
}

export function unregisterNavigationListener() {
  navListener = null;
}

export function urlProcedure(slug: string): string {
  return `/procedimiento/${slug.toLowerCase().replace(/\s+/g, "-")}`;
}

export function urlBlogPost(slug: string): string {
  return `/blog/${slug.toLowerCase()}`;
}

export function urlBlogPage(n: number): string {
  return n <= 1 ? "/blog" : `/blog/page/${n}`;
}

export function urlCategory(cat: string, sub?: string | null): string {
  const catLower = cat.toLowerCase();
  if (sub) {
    return `/${catLower}/${sub.toLowerCase()}`;
  }
  return `/${catLower}`;
}

export function urlCity(city: string): string {
  return `/iess/${city.toLowerCase()}`;
}

export function navigate(url: string) {
  if (navListener) {
    navListener(url);
  } else {
    window.history.pushState(null, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
}
