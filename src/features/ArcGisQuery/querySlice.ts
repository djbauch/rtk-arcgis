import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { ArcGisItem, ArcGisSearchResult } from '../../services/types'
interface ArcGisResultList {
  value: ArcGisItem[]
}

const initialState: ArcGisResultList = {
  value:  Array<ArcGisItem>(0),
}

export const querySlice = createSlice({
  name: 'ArcGisSearchResult',
  initialState: initialState,
  reducers: {
    loadResults: (state, action: PayloadAction<ArcGisResultList>) => {
      // Does the Immer library achieve this clone effect ?
      state.value = action.payload.value.slice(0)
    }
  }
})

export const { loadResults } = querySlice.actions
export const selectArcGisQueryResults = (state: RootState) => state.arcGisSearchResult.value
export default querySlice.reducer