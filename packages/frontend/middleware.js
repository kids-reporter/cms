import { NextResponse } from 'next/server'
import { GoogleAuth } from 'google-auth-library'

export async function middleware(request) {
  const iapToken = await generateIapToken(
    process.env.API_URL,
    process.env.AUD_CLAIM || ''
  )

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('Authorization', `Bearer ${iapToken}`)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

async function generateIapToken(url, targetAudience) {
  const auth = new GoogleAuth()
  const client = await auth.getIdTokenClient(targetAudience)
  const res = await client.request({ url })
  return res.config.headers?.Authorization
}
