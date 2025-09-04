import { createSlice } from "@reduxjs/toolkit"
import type { CrimeReportResponse, CrimeReportListResponse } from "@/types/crime-report"
import {
  reduxCreateCrimeReport,
  reduxFetchCrimeReports,
  reduxFetchCrimeReportById,
  reduxUpdateCrimeReport,
  reduxUpdateCrimeReportStatus,
  reduxDeleteCrimeReport,
} from "../actions/crime-reports"

interface CrimeReportsState {
  // Crime reports list
  reports: CrimeReportListResponse[]
  reportsLoading: boolean
  reportsError: string | null
  reportsFilters: Record<string, any> | null

  // Single crime report
  currentReport: CrimeReportResponse | null
  currentReportLoading: boolean
  currentReportError: string | null

  // Create crime report
  createLoading: boolean
  createError: string | null

  // Update crime report
  updateLoading: boolean
  updateError: string | null

  // Update status
  updateStatusLoading: boolean
  updateStatusError: string | null

  // Delete crime report
  deleteLoading: boolean
  deleteError: string | null

  // Pagination
  totalReports: number
  currentPage: number
  pageSize: number
}

const initialState: CrimeReportsState = {
  // Crime reports list
  reports: [],
  reportsLoading: false,
  reportsError: null,
  reportsFilters: null,

  // Single crime report
  currentReport: null,
  currentReportLoading: false,
  currentReportError: null,

  // Create crime report
  createLoading: false,
  createError: null,

  // Update crime report
  updateLoading: false,
  updateError: null,

  // Update status
  updateStatusLoading: false,
  updateStatusError: null,

  // Delete crime report
  deleteLoading: false,
  deleteError: null,

  // Pagination
  totalReports: 0,
  currentPage: 1,
  pageSize: 100,
}

const crimeReportsSlice = createSlice({
  name: "crimeReports",
  initialState,
  reducers: {
    clearCrimeReportsErrors: (state) => {
      state.reportsError = null
      state.currentReportError = null
      state.createError = null
      state.updateError = null
      state.updateStatusError = null
      state.deleteError = null
    },
    clearCurrentReport: (state) => {
      state.currentReport = null
      state.currentReportError = null
    },
    setReportsFilters: (state, action) => {
      state.reportsFilters = action.payload
    },
    clearReportsFilters: (state) => {
      state.reportsFilters = null
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    resetCrimeReportsState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create Crime Report
    builder
      .addCase(reduxCreateCrimeReport.pending, (state) => {
        state.createLoading = true
        state.createError = null
      })
      .addCase(reduxCreateCrimeReport.fulfilled, (state, action) => {
        state.createLoading = false
        const newReport = action.payload

        // Add the new report to the list (convert to list format)
        const listReport: CrimeReportListResponse = {
          id: newReport.id,
          created_at: newReport.created_at,
          updated_at: newReport.updated_at,
          deleted_at: newReport.deleted_at,
          created_by_id: newReport.created_by_id,
          updated_by_id: newReport.updated_by_id,
          report_number: newReport.report_number,
          title: newReport.title,
          category: newReport.category,
          severity: newReport.severity,
          status: newReport.status,
          is_emergency: newReport.is_emergency,
        }

        state.reports.unshift(listReport)
        state.totalReports += 1
      })
      .addCase(reduxCreateCrimeReport.rejected, (state, action) => {
        state.createLoading = false
        state.createError = action.payload?.message || "Failed to create crime report"
      })

    // Fetch Crime Reports
    builder
      .addCase(reduxFetchCrimeReports.pending, (state) => {
        state.reportsLoading = true
        state.reportsError = null
      })
      .addCase(reduxFetchCrimeReports.fulfilled, (state, action) => {
        state.reportsLoading = false
        state.reports = action.payload
        state.totalReports = action.payload.length
      })
      .addCase(reduxFetchCrimeReports.rejected, (state, action) => {
        state.reportsLoading = false
        state.reportsError = action.payload?.message || "Failed to fetch crime reports"
      })

    // Fetch Crime Report By ID
    builder
      .addCase(reduxFetchCrimeReportById.pending, (state) => {
        state.currentReportLoading = true
        state.currentReportError = null
      })
      .addCase(reduxFetchCrimeReportById.fulfilled, (state, action) => {
        state.currentReportLoading = false
        state.currentReport = action.payload
      })
      .addCase(reduxFetchCrimeReportById.rejected, (state, action) => {
        state.currentReportLoading = false
        state.currentReportError = action.payload?.message || "Failed to fetch crime report"
      })

    // Update Crime Report
    builder
      .addCase(reduxUpdateCrimeReport.pending, (state) => {
        state.updateLoading = true
        state.updateError = null
      })
      .addCase(reduxUpdateCrimeReport.fulfilled, (state, action) => {
        state.updateLoading = false
        const updatedReport = action.payload

        // Update current report if it matches
        if (state.currentReport && state.currentReport.id === updatedReport.id) {
          state.currentReport = updatedReport
        }

        // Update report in the list
        const reportIndex = state.reports.findIndex((r) => r.id === updatedReport.id)
        if (reportIndex !== -1) {
          state.reports[reportIndex] = {
            id: updatedReport.id,
            created_at: updatedReport.created_at,
            updated_at: updatedReport.updated_at,
            deleted_at: updatedReport.deleted_at,
            created_by_id: updatedReport.created_by_id,
            updated_by_id: updatedReport.updated_by_id,
            report_number: updatedReport.report_number,
            title: updatedReport.title,
            category: updatedReport.category,
            severity: updatedReport.severity,
            status: updatedReport.status,
            is_emergency: updatedReport.is_emergency,
          }
        }
      })
      .addCase(reduxUpdateCrimeReport.rejected, (state, action) => {
        state.updateLoading = false
        state.updateError = action.payload?.message || "Failed to update crime report"
      })

    // Update Crime Report Status
    builder
      .addCase(reduxUpdateCrimeReportStatus.pending, (state) => {
        state.updateStatusLoading = true
        state.updateStatusError = null
      })
      .addCase(reduxUpdateCrimeReportStatus.fulfilled, (state, action) => {
        state.updateStatusLoading = false
        const updatedReport = action.payload

        // Update current report if it matches
        if (state.currentReport && state.currentReport.id === updatedReport.id) {
          state.currentReport = updatedReport
        }

        // Update report status in the list
        const reportIndex = state.reports.findIndex((r) => r.id === updatedReport.id)
        if (reportIndex !== -1) {
          state.reports[reportIndex].status = updatedReport.status
          state.reports[reportIndex].updated_at = updatedReport.updated_at
        }
      })
      .addCase(reduxUpdateCrimeReportStatus.rejected, (state, action) => {
        state.updateStatusLoading = false
        state.updateStatusError = action.payload?.message || "Failed to update crime report status"
      })

    // Delete Crime Report
    builder
      .addCase(reduxDeleteCrimeReport.pending, (state) => {
        state.deleteLoading = true
        state.deleteError = null
      })
      .addCase(reduxDeleteCrimeReport.fulfilled, (state, action) => {
        state.deleteLoading = false
        const deletedId = action.payload.id

        // Clear current report if it matches
        if (state.currentReport && state.currentReport.id === deletedId) {
          state.currentReport = null
        }

        // Remove report from the list
        state.reports = state.reports.filter((r) => r.id !== deletedId)
        state.totalReports = Math.max(0, state.totalReports - 1)
      })
      .addCase(reduxDeleteCrimeReport.rejected, (state, action) => {
        state.deleteLoading = false
        state.deleteError = action.payload?.message || "Failed to delete crime report"
      })
  },
})

export const {
  clearCrimeReportsErrors,
  clearCurrentReport,
  setReportsFilters,
  clearReportsFilters,
  setCurrentPage,
  setPageSize,
  resetCrimeReportsState,
} = crimeReportsSlice.actions

export default crimeReportsSlice.reducer
