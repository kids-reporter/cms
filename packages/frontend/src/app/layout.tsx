import { Metadata } from 'next'
import { StickyHeader } from '@/app/components/header'
import BackToTop from '@/app/components/back-to-top'
import Footer from '@/app/components//footer'

import './globals.css'

export const metadata: Metadata = {
  title: '少年報導者 The Reporter for Kids - 理解世界 參與未來',
  description:
    '《少年報導者》是由非營利媒體《報導者》針對兒少打造的深度新聞報導品牌，與兒童和少年一起理解世界，參與未來。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <StickyHeader />
        {children}
        <BackToTop />
        <Footer />
      </body>
    </html>
  )
}
