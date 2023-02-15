import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { arcGisEnterpriseApi } from '../services/arcgisEnterprise'
import { querySlice } from '../features/ArcGisQuery/querySlice'
export const store = configureStore({
  reducer: {
    [arcGisEnterpriseApi.reducerPath]: arcGisEnterpriseApi.reducer,
    arcGisSearchResult: querySlice.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(arcGisEnterpriseApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;