import { appEndpoints } from '@jaclight/dbsdk'
import { getAppEngineClient } from '../../framework/appengine-client'

export interface NavGroup {
  title: string
  slug: string
  url: string
  children?: NavGroup[]
}

export async function fetchNavigationData(): Promise<NavGroup[]> {
  try {
    const apiUrl = `${appEndpoints.get.path}/navigation/67a0817d7fc6c02d4d9016e4`

    const client = getAppEngineClient()

    const response = await client.processRequest('get', apiUrl)


    if (!response?.data || !response.data.children) {
      console.log('Unexpected API response format:', response)
      return []
    }
    return response.data.children
  } catch (error) {
    console.log('Failed to fetch navigation:', error)
    return []
  }
}



