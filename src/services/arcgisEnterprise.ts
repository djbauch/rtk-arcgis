import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type { ArcGisSearchResult } from './types'

export const arcGisEnterpriseApi = createApi({
  reducerPath: 'arcGISEnterpriseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://djbauch.maps.arcgis.com/sharing/rest/' }),
  endpoints: (builder) => ({
    getArcGisSearchResultByTopic: builder.query<ArcGisSearchResult, string>({
      query: (topic) => `search?q=${topic}&f=pjson`,
    })
  })
})

export const { useGetArcGisSearchResultByTopicQuery } = arcGisEnterpriseApi