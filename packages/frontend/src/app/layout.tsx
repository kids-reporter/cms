import { Metadata } from 'next'
import Script from 'next/script'
import BackToTop from '@/app/components/back-to-top'
import Footer from '@/app/components/footer'
import StyledComponentsRegistry from './registry'
import './globals.scss'

const gtmID = 'GTM-T37WZJ44'

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
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmID}');
        `}
      </Script>
      <StyledComponentsRegistry>
        <body>
          {children}
          <BackToTop />
          <Footer />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
            }}
          />
        </body>
      </StyledComponentsRegistry>
    </html>
  )
}
