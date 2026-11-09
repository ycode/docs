import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/docs'
})

export default withNextra({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/docs/integrations/api-keys',
        destination: '/docs/integrations/api',
        permanent: true
      }
    ]
  }
})
