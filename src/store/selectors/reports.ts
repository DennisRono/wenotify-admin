import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

const selectReportsState = (state: RootState) => state.reports

export const selectReports = createSelector(
  [selectReportsState],
  (reportsState) => ({
    reports: reportsState.reports,
    reportsLoading: reportsState.reportsLoading,
    reportsError: reportsState.reportsError,
    reportsFilters: reportsState.reportsFilters,
    currentReport: reportsState.currentReport,
    currentReportLoading: reportsState.currentReportLoading,
    currentReportError: reportsState.currentReportError,
    createLoading: reportsState.createLoading,
    createError: reportsState.createError,
    updateLoading: reportsState.updateLoading,
    updateError: reportsState.updateError,
    updateStatusLoading: reportsState.updateStatusLoading,
    updateStatusError: reportsState.updateStatusError,
    deleteLoading: reportsState.deleteLoading,
    deleteError: reportsState.deleteError,
    totalReports: reportsState.totalReports,
    currentPage: reportsState.currentPage,
    pageSize: reportsState.pageSize,
  })
)