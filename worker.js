// Runs only when no static file matches the request (see wrangler.jsonc).
// Any rates variant (/Rates, /Rates.md, /rates.md) -> /rates, permanently.
// The old Markdown-rendered /Website pages -> home, permanently.
// Everything else that does not exist -> home, temporarily, so missing pages never show an error.
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.toLowerCase().replace(/\/+$/, "");
    if (/^\/rates(\.html|\.md)?$/.test(path)) {
      return Response.redirect(`${url.origin}/rates`, 301);
    }
    const status = path.startsWith("/website") ? 301 : 302;
    return Response.redirect(`${url.origin}/`, status);
  },
};
