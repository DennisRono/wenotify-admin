import { createSlice } from "@reduxjs/toolkit"
import type { EvidenceResponse, EvidenceListResponse } from "@/types/evidence"
import {
  reduxUploadEvidence,
  reduxFetchReportEvidence,
  reduxFetchEvidenceById,
  reduxUpdateEvidence,
  reduxDeleteEvidence,
  reduxFetchChainOfCustody,
} from "../actions/evidence"

interface EvidenceState {
  // Evidence list (by report)
  reportEvidence: Record<string, EvidenceListResponse[]>
  reportEvidenceLoading: Record<string, boolean>
  reportEvidenceError: Record<string, string | null>

  // Single evidence
  currentEvidence: EvidenceResponse | null
  currentEvidenceLoading: boolean
  currentEvidenceError: string | null

  // Upload evidence
  uploadLoading: boolean
  uploadError: string | null
  uploadProgress: number

  // Update evidence
  updateLoading: boolean
  updateError: string | null

  // Delete evidence
  deleteLoading: boolean
  deleteError: string | null

  // Chain of custody
  chainOfCustody: Record<string, any>
  chainOfCustodyLoading: Record<string, boolean>
  chainOfCustodyError: Record<string, string | null>
}

const initialState: EvidenceState = {
  // Evidence list (by report)
  reportEvidence: {},
  reportEvidenceLoading: {},
  reportEvidenceError: {},

  // Single evidence
  currentEvidence: null,
  currentEvidenceLoading: false,
  currentEvidenceError: null,

  // Upload evidence
  uploadLoading: false,
  uploadError: null,
  uploadProgress: 0,

  // Update evidence
  updateLoading: false,
  updateError: null,

  // Delete evidence
  deleteLoading: false,
  deleteError: null,

  // Chain of custody
  chainOfCustody: {},
  chainOfCustodyLoading: {},
  chainOfCustodyError: {},
}

const evidenceSlice = createSlice({
  name: "evidence",
  initialState,
  reducers: {
    clearEvidenceErrors: (state) => {
      state.currentEvidenceError = null
      state.uploadError = null
      state.updateError = null
      state.deleteError = null
      // Clear all report evidence errors
      Object.keys(state.reportEvidenceError).forEach((reportId) => {
        state.reportEvidenceError[reportId] = null
      })
      // Clear all chain of custody errors
      Object.keys(state.chainOfCustodyError).forEach((evidenceId) => {
        state.chainOfCustodyError[evidenceId] = null
      })
    },
    clearCurrentEvidence: (state) => {
      state.currentEvidence = null
      state.currentEvidenceError = null
    },
    clearReportEvidence: (state, action) => {
      const reportId = action.payload
      delete state.reportEvidence[reportId]
      delete state.reportEvidenceLoading[reportId]
      delete state.reportEvidenceError[reportId]
    },
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload
    },
    resetUploadProgress: (state) => {
      state.uploadProgress = 0
    },
    resetEvidenceState: () => initialState,
  },
  extraReducers: (builder) => {
    // Upload Evidence
    builder
      .addCase(reduxUploadEvidence.pending, (state) => {
        state.uploadLoading = true
        state.uploadError = null
        state.uploadProgress = 0
      })
      .addCase(reduxUploadEvidence.fulfilled, (state, action) => {
        state.uploadLoading = false
        state.uploadProgress = 100
        const evidence = action.payload
        const reportId = evidence.crime_report_id

        // Add the new evidence to the report's evidence list if it exists
        if (state.reportEvidence[reportId]) {
          const listEvidence: EvidenceListResponse = {
            id: evidence.id,
            created_at: evidence.created_at,
            updated_at: evidence.updated_at,
            deleted_at: evidence.deleted_at,
            created_by_id: evidence.created_by_id,
            updated_by_id: evidence.updated_by_id,
            filename: evidence.filename,
            original_filename: evidence.original_filename,
            file_size: evidence.file_size,
            mime_type: evidence.mime_type,
            evidence_type: evidence.evidence_type,
            is_processed: evidence.is_processed,
          }
          state.reportEvidence[reportId].unshift(listEvidence)
        }
      })
      .addCase(reduxUploadEvidence.rejected, (state, action) => {
        state.uploadLoading = false
        state.uploadProgress = 0
        state.uploadError = action.payload?.message || "Failed to upload evidence"
      })

    // Fetch Report Evidence
    builder
      .addCase(reduxFetchReportEvidence.pending, (state, action) => {
        const reportId = action.meta.arg
        state.reportEvidenceLoading[reportId] = true
        state.reportEvidenceError[reportId] = null
      })
      .addCase(reduxFetchReportEvidence.fulfilled, (state, action) => {
        const reportId = action.meta.arg
        state.reportEvidenceLoading[reportId] = false
        state.reportEvidence[reportId] = action.payload
      })
      .addCase(reduxFetchReportEvidence.rejected, (state, action) => {
        const reportId = action.meta.arg
        state.reportEvidenceLoading[reportId] = false
        state.reportEvidenceError[reportId] = action.payload?.message || "Failed to fetch report evidence"
      })

    // Fetch Evidence By ID
    builder
      .addCase(reduxFetchEvidenceById.pending, (state) => {
        state.currentEvidenceLoading = true
        state.currentEvidenceError = null
      })
      .addCase(reduxFetchEvidenceById.fulfilled, (state, action) => {
        state.currentEvidenceLoading = false
        state.currentEvidence = action.payload
      })
      .addCase(reduxFetchEvidenceById.rejected, (state, action) => {
        state.currentEvidenceLoading = false
        state.currentEvidenceError = action.payload?.message || "Failed to fetch evidence"
      })

    // Update Evidence
    builder
      .addCase(reduxUpdateEvidence.pending, (state) => {
        state.updateLoading = true
        state.updateError = null
      })
      .addCase(reduxUpdateEvidence.fulfilled, (state, action) => {
        state.updateLoading = false
        const updatedEvidence = action.payload

        // Update current evidence if it matches
        if (state.currentEvidence && state.currentEvidence.id === updatedEvidence.id) {
          state.currentEvidence = updatedEvidence
        }

        // Update evidence in report evidence list if it exists
        const reportId = updatedEvidence.crime_report_id
        if (state.reportEvidence[reportId]) {
          const evidenceIndex = state.reportEvidence[reportId].findIndex((e) => e.id === updatedEvidence.id)
          if (evidenceIndex !== -1) {
            state.reportEvidence[reportId][evidenceIndex] = {
              id: updatedEvidence.id,
              created_at: updatedEvidence.created_at,
              updated_at: updatedEvidence.updated_at,
              deleted_at: updatedEvidence.deleted_at,
              created_by_id: updatedEvidence.created_by_id,
              updated_by_id: updatedEvidence.updated_by_id,
              filename: updatedEvidence.filename,
              original_filename: updatedEvidence.original_filename,
              file_size: updatedEvidence.file_size,
              mime_type: updatedEvidence.mime_type,
              evidence_type: updatedEvidence.evidence_type,
              is_processed: updatedEvidence.is_processed,
            }
          }
        }
      })
      .addCase(reduxUpdateEvidence.rejected, (state, action) => {
        state.updateLoading = false
        state.updateError = action.payload?.message || "Failed to update evidence"
      })

    // Delete Evidence
    builder
      .addCase(reduxDeleteEvidence.pending, (state) => {
        state.deleteLoading = true
        state.deleteError = null
      })
      .addCase(reduxDeleteEvidence.fulfilled, (state, action) => {
        state.deleteLoading = false
        const deletedId = action.payload.id

        // Clear current evidence if it matches
        if (state.currentEvidence && state.currentEvidence.id === deletedId) {
          state.currentEvidence = null
        }

        // Remove evidence from all report evidence lists
        Object.keys(state.reportEvidence).forEach((reportId) => {
          state.reportEvidence[reportId] = state.reportEvidence[reportId].filter((e) => e.id !== deletedId)
        })

        // Clear chain of custody for deleted evidence
        delete state.chainOfCustody[deletedId]
        delete state.chainOfCustodyLoading[deletedId]
        delete state.chainOfCustodyError[deletedId]
      })
      .addCase(reduxDeleteEvidence.rejected, (state, action) => {
        state.deleteLoading = false
        state.deleteError = action.payload?.message || "Failed to delete evidence"
      })

    // Fetch Chain of Custody
    builder
      .addCase(reduxFetchChainOfCustody.pending, (state, action) => {
        const evidenceId = action.meta.arg
        state.chainOfCustodyLoading[evidenceId] = true
        state.chainOfCustodyError[evidenceId] = null
      })
      .addCase(reduxFetchChainOfCustody.fulfilled, (state, action) => {
        const evidenceId = action.meta.arg
        state.chainOfCustodyLoading[evidenceId] = false
        state.chainOfCustody[evidenceId] = action.payload
      })
      .addCase(reduxFetchChainOfCustody.rejected, (state, action) => {
        const evidenceId = action.meta.arg
        state.chainOfCustodyLoading[evidenceId] = false
        state.chainOfCustodyError[evidenceId] = action.payload?.message || "Failed to fetch chain of custody"
      })
  },
})

export const {
  clearEvidenceErrors,
  clearCurrentEvidence,
  clearReportEvidence,
  setUploadProgress,
  resetUploadProgress,
  resetEvidenceState,
} = evidenceSlice.actions

export default evidenceSlice.reducer
