import type { MetadataRoute } from 'next'
import { getPageMap } from 'nextra/page-map'
import type { Folder, MdxFile, PageMapItem } from 'nextra'

const BASE_URL = 'https://docs.ycode.com'

function flatten(items: PageMapItem[]): MdxFile[] {
  return items.flatMap(item => {
    if ('children' in item) {
      return flatten((item as Folder).children)
    }
    if (
      'route' in item &&
      (item as MdxFile).frontMatter?.sitemap !== false
    ) {
      return [item as MdxFile]
    }
    return []
  })
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pageMap = await getPageMap('/docs')
  const pages = flatten(pageMap)
  const now = new Date()

  return pages.map(page => ({
    url: `${BASE_URL}${page.route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: page.route === '/docs' ? 1 : 0.7
  }))
}
