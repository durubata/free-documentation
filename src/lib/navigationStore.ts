import { create } from 'zustand'
import { fetchNavigationData } from './navigationService'

export interface NavGroup {
  title: string
  slug: string
  url: string
  children?: NavGroup[]
}

interface NavigationStore {
  navigation: NavGroup[]
  fetchNavigation: () => Promise<void>
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  navigation: [],
  fetchNavigation: async () => {
    const data = await fetchNavigationData()
    set({ navigation: data })
  },
}))
