'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { type Section, SectionProvider } from '@/components/SectionProvider'
import { NavGroup } from '@/lib/navigationService'
import DataServer from '@/lib/dataserver'

export function Layout({
  children,
  allSections,
  navigationData,
}: {
  children: React.ReactNode
  allSections: Record<string, Array<Section>>
  navigationData: NavGroup[]
}) {
  let pathname = usePathname()
  // console.log('Navigation Data in Layout:', navigationData)
  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div className="h-full lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 xl:w-80 lg:dark:border-white/10">
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home">
                <Logo className="h-6" />
              </Link>
            </div>
            <Header />
            <Navigation
              className="hidden lg:mt-10 lg:block"
              navigationData={navigationData}
            />
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main className="flex-auto">
            <DataServer
              pageName={pathname === '/' ? 'introduction-to-appmint' : pathname}
            >
            </DataServer>
          </main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}