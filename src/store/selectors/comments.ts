import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

const selectCommentsState = (state: RootState) => state.comments

export const selectComments = createSelector(
  [selectCommentsState],
  (commentsState) => ({})
)
