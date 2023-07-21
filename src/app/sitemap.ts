import { type MetadataRoute } from 'next'
import { siteConfig } from '~/config/site-config'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/calls`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/calls/history`,
      lastModified: new Date(),
    },
  ]
}