import { useEffect } from 'react'

interface PageMetaOptions {
  title?: string
  description?: string
  keywords?: string
}

/**
 * Custom hook to manage document title and meta tags for SEO.
 * Updates on mount and restores defaults on unmount.
 */
export function usePageMeta({ title, description, keywords }: PageMetaOptions) {
  useEffect(() => {
    const prevTitle = document.title

    if (title) {
      document.title = title
    }

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }

    if (keywords) {
      let meta = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'keywords'
        document.head.appendChild(meta)
      }
      meta.content = keywords
    }

    return () => {
      document.title = prevTitle
    }
  }, [title, description, keywords])
}
