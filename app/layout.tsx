import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Ycode Documentation',
    template: '%s | Ycode Docs'
  },
  description:
    'Documentation for Ycode — the visual website builder. Available as open-source self-hosted or as Ycode Cloud at ycode.com. Build, manage, and deploy websites with a powerful drag-and-drop editor.',
  openGraph: {
    title: 'Ycode Documentation',
    description:
      'Documentation for Ycode — the visual website builder. Open source or Cloud.',
    siteName: 'Ycode Docs',
    type: 'website'
  }
}

const navbar = (
  <Navbar
    logo={
      <img
        src="/ycode-logo.svg"
        alt="Ycode"
        style={{ height: 24 }}
        className="dark:invert"
      />
    }
    projectLink="https://github.com/ycode/docs"
  />
)

const footer = (
  <Footer>
    <span>
      MIT {new Date().getFullYear()} © Ycode. Built with{' '}
      <a href="https://nextra.site" target="_blank" rel="noreferrer">
        Nextra
      </a>
      .
    </span>
  </Footer>
)

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          docsRepositoryBase="https://github.com/ycode/docs/tree/main"
          pageMap={await getPageMap()}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
