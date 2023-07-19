import '../assets/css/pages/footer.css'

export const Footer = () => {
  return (
    <div id="footer" className="ct-footer" data-id="type-1">
      <div data-row="middle" className="ct-hidden-lg">
        <div className="ct-container" data-columns-divider="md:sm">
          <div data-column="text:uD_c5a">
            <div
              className="ct-header-text "
              data-id="uD_c5a"
              data-width="stretch"
            >
              <div className="entry-content">
                <p
                  style={{
                    fontSize: '14px',
                    color: '#232323',
                    padding: '0 10px',
                  }}
                ></p>
                <p style={{ textAlign: 'center' }}>
                  <a
                    className="footer-link-m"
                    style={{ textDecoration: 'none' }}
                    href="https://www.twreporter.org/a/privacy-footer"
                    target="_blank"
                    rel="noopener"
                  >
                    <strong>隱私政策</strong>
                  </a>{' '}
                  <a
                    className="footer-link-m"
                    style={{ textDecoration: 'none' }}
                    href="https://www.twreporter.org/a/license-footer"
                    target="_blank"
                    rel="noopener"
                  >
                    <strong>許可協議</strong>
                  </a>
                </p>
                <p>&nbsp;</p>
                <p style={{ textAlign: 'center' }}>
                  公益勸募許可字號｜衛部救字第 1101363853 號
                </p>
                <p style={{ textAlign: 'center' }}>
                  Copyright © 2023 The Reporter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-row="bottom" className="ct-hidden-sm ct-hidden-md">
        <div className="ct-container">
          <div data-column="text">
            <div className="ct-header-text " data-id="text">
              <div className="entry-content">
                公益勸募許可字號｜衛部救字第 1101363853 號{' '}
                <a
                  href="https://www.twreporter.org/a/privacy-footer"
                  target="_blank"
                  className="footer-link"
                >
                  <strong>隱私政策</strong>
                </a>{' '}
                <a
                  href="https://www.twreporter.org/a/license-footer"
                  target="_blank"
                  className="footer-link"
                >
                  <strong>許可協議</strong>
                </a>{' '}
              </div>
            </div>
          </div>
          <div data-column="copyright">
            <div className="ct-footer-copyright" data-id="copyright">
              <p>Copyright © 2023 The Reporter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
