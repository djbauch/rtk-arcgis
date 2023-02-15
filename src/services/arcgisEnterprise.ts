import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import type { ArcGisQueryArgs, ArcGisSearchResult } from "./types";

export const arcGisEnterpriseApi = createApi({
  reducerPath: "arcGISEnterpriseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://djbauch.maps.arcgis.com/sharing/rest/",
  }),
  endpoints: (builder) => ({
    getArcGisSearchResultByTopic: builder.query<
      ArcGisSearchResult,
      ArcGisQueryArgs
    >({
      query: (args) => {
        const { topic, start, bbox, sortOrder } = args;
        let bboxClause = "";
        if (bbox) {
          const minX = bbox[0][0];
          const minY = bbox[0][1];
          const maxX = bbox[1][0];
          const maxY = bbox[1][1];
          bboxClause = `&bbox=${minX},${minY},${maxX},${maxY}`;
          return `search?q=${topic}${bboxClause}&start=${start || 1}&f=pjson`;
        }
          return `search?q=${topic}${bboxClause}&start=${start || 1}&f=pjson`;
      },
    }),
  }),
});

export const { useGetArcGisSearchResultByTopicQuery } = arcGisEnterpriseApi;
export const selectArcGisResults = (state: RootState) =>
  state.arcGISEnterpriseApi;
