import { createSlice } from "@reduxjs/toolkit"
import type { NotificationResponse, NotificationListResponse } from "@/types/notification"
import {
  reduxFetchUserNotifications,
  reduxFetchNotificationById,
  reduxMarkNotificationRead,
  reduxMarkAllNotificationsRead,
  reduxDeleteNotification,
} from "../actions/notifications"

interface NotificationsState {
  // Notifications list
  notifications: NotificationListResponse[]
  notificationsLoading: boolean
  notificationsError: string | null
  notificationsFilters: Record<string, any> | null

  // Single notification
  currentNotification: NotificationResponse | null
  currentNotificationLoading: boolean
  currentNotificationError: string | null

  // Mark as read
  markReadLoading: boolean
  markReadError: string | null

  // Mark all as read
  markAllReadLoading: boolean
  markAllReadError: string | null

  // Delete notification
  deleteLoading: boolean
  deleteError: string | null

  // Unread count
  unreadCount: number

  // Pagination
  totalNotifications: number
  currentPage: number
  pageSize: number
}

const initialState: NotificationsState = {
  // Notifications list
  notifications: [],
  notificationsLoading: false,
  notificationsError: null,
  notificationsFilters: null,

  // Single notification
  currentNotification: null,
  currentNotificationLoading: false,
  currentNotificationError: null,

  // Mark as read
  markReadLoading: false,
  markReadError: null,

  // Mark all as read
  markAllReadLoading: false,
  markAllReadError: null,

  // Delete notification
  deleteLoading: false,
  deleteError: null,

  // Unread count
  unreadCount: 0,

  // Pagination
  totalNotifications: 0,
  currentPage: 1,
  pageSize: 50,
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotificationsErrors: (state) => {
      state.notificationsError = null
      state.currentNotificationError = null
      state.markReadError = null
      state.markAllReadError = null
      state.deleteError = null
    },
    clearCurrentNotification: (state) => {
      state.currentNotification = null
      state.currentNotificationError = null
    },
    setNotificationsFilters: (state, action) => {
      state.notificationsFilters = action.payload
    },
    clearNotificationsFilters: (state) => {
      state.notificationsFilters = null
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    updateUnreadCount: (state) => {
      state.unreadCount = state.notifications.filter((n) => !n.is_read).length
    },
    resetNotificationsState: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch User Notifications
    builder
      .addCase(reduxFetchUserNotifications.pending, (state) => {
        state.notificationsLoading = true
        state.notificationsError = null
      })
      .addCase(reduxFetchUserNotifications.fulfilled, (state, action) => {
        state.notificationsLoading = false
        state.notifications = action.payload
        state.totalNotifications = action.payload.length
        state.unreadCount = action.payload.filter((n) => !n.is_read).length
      })
      .addCase(reduxFetchUserNotifications.rejected, (state, action) => {
        state.notificationsLoading = false
        state.notificationsError = action.payload?.message || "Failed to fetch user notifications"
      })

    // Fetch Notification By ID
    builder
      .addCase(reduxFetchNotificationById.pending, (state) => {
        state.currentNotificationLoading = true
        state.currentNotificationError = null
      })
      .addCase(reduxFetchNotificationById.fulfilled, (state, action) => {
        state.currentNotificationLoading = false
        state.currentNotification = action.payload
      })
      .addCase(reduxFetchNotificationById.rejected, (state, action) => {
        state.currentNotificationLoading = false
        state.currentNotificationError = action.payload?.message || "Failed to fetch notification"
      })

    // Mark Notification Read
    builder
      .addCase(reduxMarkNotificationRead.pending, (state) => {
        state.markReadLoading = true
        state.markReadError = null
      })
      .addCase(reduxMarkNotificationRead.fulfilled, (state, action) => {
        state.markReadLoading = false
        const updatedNotification = action.payload

        // Update current notification if it matches
        if (state.currentNotification && state.currentNotification.id === updatedNotification.id) {
          state.currentNotification = updatedNotification
        }

        // Update notification in the list
        const notificationIndex = state.notifications.findIndex((n) => n.id === updatedNotification.id)
        if (notificationIndex !== -1) {
          const wasUnread = !state.notifications[notificationIndex].is_read
          state.notifications[notificationIndex] = {
            id: updatedNotification.id,
            created_at: updatedNotification.created_at,
            updated_at: updatedNotification.updated_at,
            deleted_at: updatedNotification.deleted_at,
            created_by_id: updatedNotification.created_by_id,
            updated_by_id: updatedNotification.updated_by_id,
            title: updatedNotification.title,
            message: updatedNotification.message,
            notification_type: updatedNotification.notification_type,
            status: updatedNotification.status,
            is_read: updatedNotification.is_read,
            is_urgent: updatedNotification.is_urgent,
          }

          // Update unread count if notification was previously unread
          if (wasUnread && updatedNotification.is_read) {
            state.unreadCount = Math.max(0, state.unreadCount - 1)
          }
        }
      })
      .addCase(reduxMarkNotificationRead.rejected, (state, action) => {
        state.markReadLoading = false
        state.markReadError = action.payload?.message || "Failed to mark notification as read"
      })

    // Mark All Notifications Read
    builder
      .addCase(reduxMarkAllNotificationsRead.pending, (state) => {
        state.markAllReadLoading = true
        state.markAllReadError = null
      })
      .addCase(reduxMarkAllNotificationsRead.fulfilled, (state) => {
        state.markAllReadLoading = false

        // Mark all notifications as read
        state.notifications = state.notifications.map((notification) => ({
          ...notification,
          is_read: true,
        }))

        // Reset unread count
        state.unreadCount = 0

        // Update current notification if it exists
        if (state.currentNotification) {
          state.currentNotification.is_read = true
        }
      })
      .addCase(reduxMarkAllNotificationsRead.rejected, (state, action) => {
        state.markAllReadLoading = false
        state.markAllReadError = action.payload?.message || "Failed to mark all notifications as read"
      })

    // Delete Notification
    builder
      .addCase(reduxDeleteNotification.pending, (state) => {
        state.deleteLoading = true
        state.deleteError = null
      })
      .addCase(reduxDeleteNotification.fulfilled, (state, action) => {
        state.deleteLoading = false
        const deletedId = action.payload.id

        // Find the notification before deleting to check if it was unread
        const deletedNotification = state.notifications.find((n) => n.id === deletedId)
        const wasUnread = deletedNotification && !deletedNotification.is_read

        // Clear current notification if it matches
        if (state.currentNotification && state.currentNotification.id === deletedId) {
          state.currentNotification = null
        }

        // Remove notification from the list
        state.notifications = state.notifications.filter((n) => n.id !== deletedId)
        state.totalNotifications = Math.max(0, state.totalNotifications - 1)

        // Update unread count if deleted notification was unread
        if (wasUnread) {
          state.unreadCount = Math.max(0, state.unreadCount - 1)
        }
      })
      .addCase(reduxDeleteNotification.rejected, (state, action) => {
        state.deleteLoading = false
        state.deleteError = action.payload?.message || "Failed to delete notification"
      })
  },
})

export const {
  clearNotificationsErrors,
  clearCurrentNotification,
  setNotificationsFilters,
  clearNotificationsFilters,
  setCurrentPage,
  setPageSize,
  updateUnreadCount,
  resetNotificationsState,
} = notificationsSlice.actions

export default notificationsSlice.reducer
