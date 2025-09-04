import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

const selectLocationsState = (state: RootState) => state.locations

export const selectLocations = createSelector(
  [selectLocationsState],
  (locationsState) => ({})
)
