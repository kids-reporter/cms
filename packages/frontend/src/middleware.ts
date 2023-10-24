import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: '/images/:slug*',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log(`${process.env.IMAGE_ORIGIN}${pathname}`)
  return NextResponse.redirect(
    new URL(`${process.env.IMAGE_ORIGIN}${pathname}`, request.url)
  )
}
