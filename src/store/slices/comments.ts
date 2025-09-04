import { createSlice } from "@reduxjs/toolkit"
import type { CommentResponse, CommentListResponse } from "@/types/comment"
import {
  reduxCreateComment,
  reduxFetchReportComments,
  reduxFetchCommentById,
  reduxUpdateComment,
  reduxDeleteComment,
} from "../actions/comments"

interface CommentsState {
  // Comments list (by report)
  reportComments: Record<string, CommentListResponse[]>
  reportCommentsLoading: Record<string, boolean>
  reportCommentsError: Record<string, string | null>

  // Single comment
  currentComment: CommentResponse | null
  currentCommentLoading: boolean
  currentCommentError: string | null

  // Create comment
  createLoading: boolean
  createError: string | null

  // Update comment
  updateLoading: boolean
  updateError: string | null

  // Delete comment
  deleteLoading: boolean
  deleteError: string | null
}

const initialState: CommentsState = {
  // Comments list (by report)
  reportComments: {},
  reportCommentsLoading: {},
  reportCommentsError: {},

  // Single comment
  currentComment: null,
  currentCommentLoading: false,
  currentCommentError: null,

  // Create comment
  createLoading: false,
  createError: null,

  // Update comment
  updateLoading: false,
  updateError: null,

  // Delete comment
  deleteLoading: false,
  deleteError: null,
}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearCommentsErrors: (state) => {
      state.currentCommentError = null
      state.createError = null
      state.updateError = null
      state.deleteError = null
      // Clear all report comments errors
      Object.keys(state.reportCommentsError).forEach((reportId) => {
        state.reportCommentsError[reportId] = null
      })
    },
    clearCurrentComment: (state) => {
      state.currentComment = null
      state.currentCommentError = null
    },
    clearReportComments: (state, action) => {
      const reportId = action.payload
      delete state.reportComments[reportId]
      delete state.reportCommentsLoading[reportId]
      delete state.reportCommentsError[reportId]
    },
    resetCommentsState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create Comment
    builder
      .addCase(reduxCreateComment.pending, (state) => {
        state.createLoading = true
        state.createError = null
      })
      .addCase(reduxCreateComment.fulfilled, (state, action) => {
        state.createLoading = false
        const comment = action.payload
        const reportId = comment.crime_report_id

        // Add the new comment to the report's comments list if it exists
        if (state.reportComments[reportId]) {
          state.reportComments[reportId].unshift({
            id: comment.id,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
            deleted_at: comment.deleted_at,
            created_by_id: comment.created_by_id,
            updated_by_id: comment.updated_by_id,
            content: comment.content,
            author_id: comment.author_id,
          })
        }
      })
      .addCase(reduxCreateComment.rejected, (state, action) => {
        state.createLoading = false
        state.createError = action.payload?.message || "Failed to create comment"
      })

    // Fetch Report Comments
    builder
      .addCase(reduxFetchReportComments.pending, (state, action) => {
        const reportId = action.meta.arg.reportId
        state.reportCommentsLoading[reportId] = true
        state.reportCommentsError[reportId] = null
      })
      .addCase(reduxFetchReportComments.fulfilled, (state, action) => {
        const reportId = action.meta.arg.reportId
        state.reportCommentsLoading[reportId] = false
        state.reportComments[reportId] = action.payload
      })
      .addCase(reduxFetchReportComments.rejected, (state, action) => {
        const reportId = action.meta.arg.reportId
        state.reportCommentsLoading[reportId] = false
        state.reportCommentsError[reportId] = action.payload?.message || "Failed to fetch report comments"
      })

    // Fetch Comment By ID
    builder
      .addCase(reduxFetchCommentById.pending, (state) => {
        state.currentCommentLoading = true
        state.currentCommentError = null
      })
      .addCase(reduxFetchCommentById.fulfilled, (state, action) => {
        state.currentCommentLoading = false
        state.currentComment = action.payload
      })
      .addCase(reduxFetchCommentById.rejected, (state, action) => {
        state.currentCommentLoading = false
        state.currentCommentError = action.payload?.message || "Failed to fetch comment"
      })

    // Update Comment
    builder
      .addCase(reduxUpdateComment.pending, (state) => {
        state.updateLoading = true
        state.updateError = null
      })
      .addCase(reduxUpdateComment.fulfilled, (state, action) => {
        state.updateLoading = false
        const updatedComment = action.payload

        // Update current comment if it matches
        if (state.currentComment && state.currentComment.id === updatedComment.id) {
          state.currentComment = updatedComment
        }

        // Update comment in report comments list if it exists
        const reportId = updatedComment.crime_report_id
        if (state.reportComments[reportId]) {
          const commentIndex = state.reportComments[reportId].findIndex((c) => c.id === updatedComment.id)
          if (commentIndex !== -1) {
            state.reportComments[reportId][commentIndex] = {
              id: updatedComment.id,
              created_at: updatedComment.created_at,
              updated_at: updatedComment.updated_at,
              deleted_at: updatedComment.deleted_at,
              created_by_id: updatedComment.created_by_id,
              updated_by_id: updatedComment.updated_by_id,
              content: updatedComment.content,
              author_id: updatedComment.author_id,
            }
          }
        }
      })
      .addCase(reduxUpdateComment.rejected, (state, action) => {
        state.updateLoading = false
        state.updateError = action.payload?.message || "Failed to update comment"
      })

    // Delete Comment
    builder
      .addCase(reduxDeleteComment.pending, (state) => {
        state.deleteLoading = true
        state.deleteError = null
      })
      .addCase(reduxDeleteComment.fulfilled, (state, action) => {
        state.deleteLoading = false
        const deletedId = action.payload.id

        // Clear current comment if it matches
        if (state.currentComment && state.currentComment.id === deletedId) {
          state.currentComment = null
        }

        // Remove comment from all report comments lists
        Object.keys(state.reportComments).forEach((reportId) => {
          state.reportComments[reportId] = state.reportComments[reportId].filter((c) => c.id !== deletedId)
        })
      })
      .addCase(reduxDeleteComment.rejected, (state, action) => {
        state.deleteLoading = false
        state.deleteError = action.payload?.message || "Failed to delete comment"
      })
  },
})

export const { clearCommentsErrors, clearCurrentComment, clearReportComments, resetCommentsState } =
  commentsSlice.actions
export default commentsSlice.reducer
