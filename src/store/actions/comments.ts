import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ErrorResponse } from '@/types/responses'
import type {
  CommentCreate,
  CommentUpdate,
  CommentResponse,
  CommentListResponse,
  CommentFilters,
} from "@/types/comment"

const getAuthHeaders = (state: any) => ({
  Authorization: `Bearer ${state?.auth?.access_token}`,
  "Content-Type": "application/json",
})

/* ------------------ COMMENTS ACTIONS ------------------ */

export const reduxCreateComment = createAsyncThunk<CommentResponse, CommentCreate, { rejectValue: ErrorResponse }>(
  "comments/create",
  async (commentData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments/`, {
        method: "POST",
        headers: getAuthHeaders(state),
        body: JSON.stringify(commentData),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to create comment." })
    }
  },
)

export const reduxFetchReportComments = createAsyncThunk<
  CommentListResponse[],
  { reportId: string; filters?: CommentFilters },
  { rejectValue: ErrorResponse }
>("comments/fetchReportComments", async ({ reportId, filters }, { getState, rejectWithValue }) => {
  try {
    const query = filters ? "?" + new URLSearchParams(filters as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments/report/${reportId}${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch report comments." })
  }
})

export const reduxFetchCommentById = createAsyncThunk<CommentResponse, string, { rejectValue: ErrorResponse }>(
  "comments/fetchById",
  async (commentId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments/${commentId}`, {
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to fetch comment by ID." })
    }
  },
)

export const reduxUpdateComment = createAsyncThunk<
  CommentResponse,
  { id: string; data: CommentUpdate },
  { rejectValue: ErrorResponse }
>("comments/update", async ({ id, data }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(state),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to update comment." })
  }
})

export const reduxDeleteComment = createAsyncThunk<{ id: string }, string, { rejectValue: ErrorResponse }>(
  "comments/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return { id }
    } catch {
      return rejectWithValue({ message: "Failed to delete comment." })
    }
  },
)
