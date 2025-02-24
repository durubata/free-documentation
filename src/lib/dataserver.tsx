'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { getAppEngineClient } from '../../framework/appengine-client'
import { appEndpoints } from '@jaclight/dbsdk'
import { CodeGroup, CodePanel } from '@/components/Code'
import { processRequestAuth } from '../../framework/http'
import { h2 } from '@/components/mdx'
import { title } from 'process'

export default function DataServer({
  pageName,
  className = '',
}: {
  pageName: string
  className?: string
}) {
  const [content, setContent] = useState<string | null>(null)
  const [codeGroup, setCodeGroup] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  console.log(pageName, 'Page Name')
  const formattedPageName = pageName.replace(/^\//, '')
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      try {
        let getPage = await processRequestAuth(
          'get',
          `/api/${appEndpoints.get.path}/post/name/${formattedPageName}`,
        )
        let pageData = getPage?.data?.[0]?.data ?? {}

        // console.log(getPage, 'API Response for', pageName, pageData)

        if (!pageData.content) {
          console.log(`No content found for ${pageName}, using home content.`)
          const getHomePage = await processRequestAuth(
            'get',
            `/api/${appEndpoints.get.path}/post/name/from-assets`,
          )
          pageData = getHomePage?.data?.[0]?.data ?? {}
        }

        if (!pageData.content) {
          setError('No content available')
          setLoading(false)
          return
        }

        setContent(pageData.content)
        setCodeGroup(pageData.codegroup || null)
        // console.log(pageData.codegroup, 'CodeGroup Data')
      } catch (error) {
        console.error('Error fetching page content:', error)
        setError('Error loading content')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  if (loading) {
    return <div className="text-center text-zinc-500">Loading content...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }
  // const uniqueKeys = Object.keys(codeGroup).map((key) => {
  //   const sameKey = key.split()
  //   return {
  //     title: key,
  //     code: codeGroup[key],
  //   }
  // })
  return (
    <div
      className={clsx(
        className,
        'prose-lg prose dark:prose-invert',
        '[html_:where(&>*)]:mx-auto [html_:where(&>*)]:max-w-2xl',
        '[html_:where(&>*)]:lg:mx-[calc(50%-min(50%,theme(maxWidth.lg)))]',
        '[html_:where(&>*)]:lg:max-w-3xl',
      )}
    >
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      {codeGroup && (
        <CodeGroup title="Code Examples">
          {Object.keys(codeGroup).map((key) => {
            if (key.endsWith('code')) {
              const language = key.replace('code', '')
              const titleKey = `${language}title`
              const formattedTitle =
                codeGroup[titleKey]?.replace(/<[^>]+>/g, '') || language
              return (
                <CodePanel
                  key={key}
                  tag={language}
                  // language={language}
                  label={formattedTitle}
                  code={codeGroup[key]}
                >
                  <>{codeGroup[key]}</>
                </CodePanel>
              )
            }
            // return
            // else {
            //   const language = key.replace('title', '')
            //   const titleKey = `${language}title`
            //   const formattedTitle =
            //     codeGroup[titleKey]?.replace(/<[^>]+>/g, '') || language
            //   return (
            //     <CodePanel
            //       key={key}
            //       tag={language}
            //       label={formattedTitle}
            //       code={codeGroup[key]}
            //     >
            //       <>{codeGroup[key]}</>
            //     </CodePanel>
            //   )
            // }
          })}
        </CodeGroup>
      )}
    </div>
  )
}
