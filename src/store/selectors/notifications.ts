import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

const selectNotificationsState = (state: RootState) => state.notifications

export const selectNotifications = createSelector(
  [selectNotificationsState],
  (notificationsState) => ({})
)
