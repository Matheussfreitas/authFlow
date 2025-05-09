import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

const public_routes =  [
  { path: '/auth', authenticated: 'redirect' },
] as const

const NOT_AUTHETICATION = '/auth'

export default function Middleware(request: NextRequest) {
  console.log(`[Middleware] Requisição interceptada: ${request.nextUrl.pathname}`);

  const path = request.nextUrl.pathname
  const isPublicRoute = public_routes.find(route => route.path === path)
  const authToken = request.cookies.get('token')

  if (!authToken && isPublicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !isPublicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = NOT_AUTHETICATION
    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && isPublicRoute && isPublicRoute.authenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/tasks'
    return NextResponse.redirect(redirectUrl)
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}