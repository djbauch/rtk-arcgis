import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { RootState } from '../app/store'
import type { ArcGisQueryArgs, ArcGisSearchResult } from './types'

export const arcGisEnterpriseApi = createApi({
  reducerPath: 'arcGISEnterpriseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://djbauch.maps.arcgis.com/sharing/rest/' }),
  endpoints: (builder) => ({
    getArcGisSearchResultByTopic: builder.query<ArcGisSearchResult, ArcGisQueryArgs>({
      query: (args) => {
        const { topic, start} = args
        return `search?q=${topic}&start=${start || 1}&f=pjson`
      }
    })
  })
})

export const { useGetArcGisSearchResultByTopicQuery } = arcGisEnterpriseApi
export const selectArcGisResults = (state: RootState) => state.arcGISEnterpriseApi