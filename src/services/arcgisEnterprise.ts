import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../app/store'
import type { ArcGisQueryArgs, ArcGisSearchResult } from './types'

// Documentation is at https://developers.arcgis.com/rest/users-groups-and-items/search.htm
// ArcGIS Enterprise Portal queries require at least one of the parameters
// q, bbox, or categories
export const arcGisEnterpriseApi = createApi({
  reducerPath: 'arcGISEnterpriseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://djbauch.maps.arcgis.com/sharing/rest/'
  }),
  endpoints: (builder) => ({
    getArcGisSearchResultByTopic: builder.query<ArcGisSearchResult, ArcGisQueryArgs>({
      query: (args) => {
        const { topic, start, bbox, categories, sortOrder } = args
        let topicClause = ''
        if (topic) {
          topicClause = `q=${topic}`
        }
        let bboxClause = ''
        if (bbox) {
          const minX = bbox[0][0]
          const minY = bbox[0][1]
          const maxX = bbox[1][0]
          const maxY = bbox[1][1]
          bboxClause = ((topicClause === '') ? '' : '&') + `bbox=${minX},${minY},${maxX},${maxY}`
        }
        let categoriesClause = ''
        if (categories) {
          let i = 3
        }
        if (topicClause === '' && bboxClause === '' && categoriesClause === '') {
          topicClause = 'categories=/Region/US'
        }
        return `search?${topicClause}${bboxClause}${categoriesClause}&start=${start || 1}&f=pjson`
      }
    })
  })
})

export const { useGetArcGisSearchResultByTopicQuery } = arcGisEnterpriseApi
export const selectArcGisResults = (state: RootState) => state.arcGISEnterpriseApi
