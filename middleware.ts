import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = 'amati';
const ADMIN_PASSWORD = 'adelamati2505';

function unauthorizedResponse() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Area"',
    },
  });
}

const protectedPrefixes = ['/adminconstantine', '/api/admin'];
const apiKeyRoutes = ['/api/admin/prompts/import', '/api/admin/blog/import'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Check if this is an API key route (for n8n/automation)
  const isApiKeyRoute = apiKeyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isApiKeyRoute) {
    // Check for x-api-key header
    const apiKey = request.headers.get('x-api-key');
    const validApiKey = process.env.ADMIN_API_KEY;

    if (apiKey && validApiKey && apiKey === validApiKey) {
      return NextResponse.next();
    }
    // If no valid API key, fall through to Basic Auth check
  }

  // Check for Basic Auth (for admin panel)
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return unauthorizedResponse();
  }

  const token = authHeader.slice(6).trim();
  let decoded = '';

  try {
    decoded = Buffer.from(token, 'base64').toString();
  } catch (error) {
    return unauthorizedResponse();
  }

  const separatorIndex = decoded.indexOf(':');
  if (separatorIndex === -1) {
    return unauthorizedResponse();
  }

  const username = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return NextResponse.next();
  }

  return unauthorizedResponse();
}

export const config = {
  matcher: ['/adminconstantine/:path*', '/api/admin/:path*'],
};
