import { appEndpoints } from '@jaclight/dbsdk'
import { getAppEngineClient } from '../../framework/appengine-client'

export interface PageContent {
  sections: Array<{ title: string; content: string }>
}

export async function fetchPageContent(
  slug: string,
): Promise<PageContent | null> {
  try {
    const apiUrl = `${appEndpoints.get.path}/post/67a3ccb97fc6c02d4d903a83`

    const response = await getAppEngineClient().processRequest('get', apiUrl)
console.log('hdhdhhd',response,'skksksk')
    if (!response?.data) {
      console.warn(`No content found for ${slug}`)
      return null
    }

    console.log(
      JSON.stringify(response.data, null, 2),
      `Fetched content for slug: "${slug}" ->`,
    )

    return response.data
  } catch (error) {
    console.error(`Error fetching content for ${slug}:`, error)
    return null
  }
}
