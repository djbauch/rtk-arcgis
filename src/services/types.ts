import * as React from 'react'

export type ArcGisSearchResult = {
  total: number
  start: number
  num: number
  nextStart: number
  results: Object[]
}