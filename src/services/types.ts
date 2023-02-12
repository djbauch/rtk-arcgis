export type ArcGisItem = {
  id: string
  owner: string
  created: number
  modified: number
  guid?: string
  name: string
  title: string
  type: string
  typeKeywords: string[]
  description: string // HTML
  tags: string[]
  snippet: string
  thumbnail: string // URL fragment
  documentation?: string
  extent: number[][]
  categories: string[]
  spatialReference: string
}
export type ArcGisSearchResult = {
  total: number
  start: number
  num: number
  nextStart: number
  results: ArcGisItem[]
}