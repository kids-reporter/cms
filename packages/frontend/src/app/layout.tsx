import Script from 'next/script'
import BackToTop from '@/app/components/back-to-top'
import Footer from '@/app/components/footer'
import StyledComponentsRegistry from './registry'
import './globals.css'

const gtmID = 'GTM-T37WZJ44'

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
