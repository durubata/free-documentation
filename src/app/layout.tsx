import { type Metadata } from 'next'
import glob from 'fast-glob'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { type Section } from '@/components/SectionProvider'
import { fetchNavigationData, NavGroup } from '@/lib/navigationService'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Website Builder | Appmint',
    default: 'Website Builder | Appmint',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pages = await glob('**/*.mdx', { cwd: 'src/app' })
  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>



let allSections: Record<string, Section[]> =
  Object.fromEntries(allSectionsEntries)

let navigationData: NavGroup[] = []
try {
  navigationData = await fetchNavigationData()
  // console.log('Fetched Navigation Data:', navigationData,'jdjdj') 
} catch (error) {
  console.error('Failed to fetch navigation:', error)
}
 

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <div className="w-full">
            <Layout allSections={{}} navigationData={navigationData}>
              {children}
            </Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
