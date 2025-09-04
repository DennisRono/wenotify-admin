import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ErrorResponse } from '@/types/responses'
import type { NotificationResponse, NotificationListResponse, NotificationFilters } from "@/types/notification"

const getAuthHeaders = (state: any) => ({
  Authorization: `Bearer ${state?.auth?.access_token}`,
  "Content-Type": "application/json",
})

/* ------------------ NOTIFICATIONS ACTIONS ------------------ */

export const reduxFetchUserNotifications = createAsyncThunk<
  NotificationListResponse[],
  NotificationFilters | void,
  { rejectValue: ErrorResponse }
>("notifications/fetchUserNotifications", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notifications/${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch user notifications." })
  }
})

export const reduxFetchNotificationById = createAsyncThunk<
  NotificationResponse,
  string,
  { rejectValue: ErrorResponse }
>("notifications/fetchById", async (notificationId, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notifications/${notificationId}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch notification by ID." })
  }
})

export const reduxMarkNotificationRead = createAsyncThunk<NotificationResponse, string, { rejectValue: ErrorResponse }>(
  "notifications/markRead",
  async (notificationId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notifications/${notificationId}/read`,
        {
          method: "PATCH",
          headers: getAuthHeaders(state),
        },
      )

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to mark notification as read." })
    }
  },
)

export const reduxMarkAllNotificationsRead = createAsyncThunk<any, void, { rejectValue: ErrorResponse }>(
  "notifications/markAllRead",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notifications/mark-all-read`, {
        method: "PATCH",
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to mark all notifications as read." })
    }
  },
)

export const reduxDeleteNotification = createAsyncThunk<{ id: string }, string, { rejectValue: ErrorResponse }>(
  "notifications/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notifications/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return { id }
    } catch {
      return rejectWithValue({ message: "Failed to delete notification." })
    }
  },
)
