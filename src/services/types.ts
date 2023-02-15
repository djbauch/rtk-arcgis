// The ArGIS REST API for search is documented at
// https://developers.arcgis.com/rest/users-groups-and-items/search.htm
export type ArcGisItem = {
  // Item ID
  id: string
  // Owner username
  owner: string
  // date created, UNIX time format
  created: number
  // date modified, UNIX time format
  modified: number
  // unique ID
  guid?: string
  // Item name
  name: string
  // Item title
  title: string
  type: string
  typeKeywords: string[]
  description: string // HTML
  tags: string[]
  snippet: string
  thumbnail: string // URL fragment
  documentation?: string
  // spatial extent [[minX, minY],[maxX, maxY]]
  extent: number[][]
  categories: string[]
  // Coordinate system
  spatialReference: string
  accessInformation: string
  licenseInfo: string
  culture: string
  url: string
  proxyFilter: Object
  access: "private" | "shared" | "org" | "public"
  size: number
  properties?: string[]
  appCategories: string[]
  industries: string[]
  languages: string[]
  largeThumbnail?: string
  banner?: string
  screenshots: string[]
  listed: boolean
  ownerFolder: string
  protected: boolean
  numComments: number
  numRatings: number
  avgRating: number
  numViews: number
  lastViewd: number
}

export type SearchResultList<T> = {
  // The total number of search results found
  total: number
  // The number of the first result in this page, one-based
  start: number
  // The number of search results in the current page
  num: number
  // Number of the next page of results
  nextStart: number
  results: T[]
}

export type ArcGisSearchResult = SearchResultList<ArcGisItem>

// For categories, the parameter can appear up to eight times.
// Within each appearance, the list of categories are ORed together
// Across appearances, the lists are ANDed together
export type ArcGisQueryArgs = {
  topic?: string
  start?: number
  num?: number
  bbox?: [number, number][]
  sortField?: 'title' | 'created' | 'type' | 'owner' | 'modified' | 'avgrating' | 'numratings' |
    'numcomments' | 'numviews' | 'scorecompleteness'
  sortOrder?: 'asc' | 'desc'
  categories?: string[]
  displaySublayers?: boolean
  format?: 'html' | 'json' | 'pjson'
}