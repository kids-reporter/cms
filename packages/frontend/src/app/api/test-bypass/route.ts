import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  draftMode().enable()
  console.log('Redirect to /test-bypass')
  redirect('/test-bypass')
}
