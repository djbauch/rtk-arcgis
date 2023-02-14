import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { ArcGisItem } from '../../services/types'
import type { ArcGisSearchResult } from '../../services/types'
interface ArcGisResultState {
  value: ArcGisSearchResult
}

const initialState: ArcGisResultState = {
  value: {
    total: 0,
    num: 0,
    start: 0,
    nextStart: 0,
    results: Array<ArcGisItem>(0),
  }
}

export const querySlice = createSlice({
  name: 'ArcGisSearchResult',
  initialState: initialState,
  reducers: {

  }
})