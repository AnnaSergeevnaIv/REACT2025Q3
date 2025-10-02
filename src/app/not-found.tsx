'use client';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function NotFound() {
  return (
    <html>
      <body>
        <h1>404 - Not Found (global)</h1>
      </body>
    </html>
  );
}
