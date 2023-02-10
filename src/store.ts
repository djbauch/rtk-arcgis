import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { arcGisEnterpriseApi } from './services/arcgisEnterprise'

export const store = configureStore({
  reducer: {
    [arcGisEnterpriseApi.reducerPath]: arcGisEnterpriseApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(arcGisEnterpriseApi.middleware),
})

setupListeners(store.dispatch)