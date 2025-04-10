
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  try {
    const route = request.nextUrl.pathname
    const token = request.cookies.get('token')?.value

    const isPrivateRoute = route.startsWith('/user') || route.startsWith('/salon-spa-owner')

    // Check if the user is authenticated
    if (isPrivateRoute && !token) {
        // Redirect to login page if not authenticated
        return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Check if the user is authenticated and trying to access the login page
    if (!isPrivateRoute && token) {
        // Redirect to login page if not authenticated
        const role = request.cookies.get('role')?.value
        return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url))
    }
    return NextResponse.next()
    
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.error()
    
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
  