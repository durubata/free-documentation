


'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/Button'
import { fetchNavigationData, NavGroup } from '@/lib/navigationService'

function PageLink({
  label,
  page,
  previous = false,
}: {
  label: string
  page: { url: string; title: string }
  previous?: boolean
}) {
  return (
    <>
      <Button
        href={`/${page.url}`}
        aria-label={`${label}: ${page.title}`}
        variant="secondary"
        arrow={previous ? 'left' : 'right'}
      >
        {label}
      </Button>
      <Link
        href={`/${page.url}`}
        tabIndex={-1}
        aria-hidden="true"
        className="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
      >
        {page.title}
      </Link>
    </>
  )
}

function PageNavigation() {
  const [allPages, setAllPages] = useState<NavGroup[]>([])
  let pathname = usePathname()

  useEffect(() => {
    async function loadNavigation() {
      const navigationData = await fetchNavigationData()
      // Flatten all menu items
      const pages = navigationData.flatMap((group) => group.children || [])
      setAllPages(pages)
    }
    loadNavigation()
  }, [])

  let currentPageIndex = allPages.findIndex(
    (page) => `/${page.url}` === pathname,
  )

  if (currentPageIndex === -1) {
    return null
  }

  let previousPage = allPages[currentPageIndex - 1]
  let nextPage = allPages[currentPageIndex + 1]

  if (!previousPage && !nextPage) {
    return null
  }

  return (
    <div className="flex">
      {previousPage && (
        <div className="flex flex-col items-start gap-3">
          <PageLink label="Previous" page={previousPage} previous />
        </div>
      )}
      {nextPage && (
        <div className="ml-auto flex flex-col items-end gap-3">
          <PageLink label="Next" page={nextPage} />
        </div>
      )}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
      <PageNavigation />
    </footer>
  )
}
