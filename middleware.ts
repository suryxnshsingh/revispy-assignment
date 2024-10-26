import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('authToken')?.value
    const isAuthPage = request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup'

    // If user is not authenticated and is trying to access a protected page
    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    // If authenticated, prevent access to signin/signup pages
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/signin', '/signup'], // paths to apply middleware
}
