export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/staff') {
      return Response.redirect(`${url.origin}/staff/`, 308);
    }

    if (!url.pathname.startsWith('/staff/')) {
      return new Response('Not Found', { status: 404 });
    }

    url.pathname = url.pathname.slice('/staff'.length) || '/';
    const response = await env.ASSETS.fetch(new Request(url, request));
    const headers = new Headers(response.headers);

    headers.set('Cache-Control', 'private, no-store');
    headers.set('Content-Security-Policy', "frame-ancestors 'none'");
    headers.set('Referrer-Policy', 'no-referrer');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Robots-Tag', 'noindex, nofollow');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
