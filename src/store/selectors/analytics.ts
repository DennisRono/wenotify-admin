import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

const selectAnalyticsState = (state: RootState) => state.analytics

export const selectAnalytics = createSelector(
  [selectAnalyticsState],
  (analyticsState) => ({
    crimeStats: analyticsState?.crimeStats,
    crimeStatsLoading: analyticsState?.crimeStatsLoading,
    crimeStatsError: analyticsState?.crimeStatsError,
    trendAnalysis: analyticsState?.trendAnalysis,
    trendAnalysisLoading: analyticsState?.trendAnalysisLoading,
    trendAnalysisError: analyticsState?.trendAnalysisError,
    hotspotAnalysis: analyticsState?.hotspotAnalysis,
    hotspotAnalysisLoading: analyticsState?.hotspotAnalysisLoading,
    hotspotAnalysisError: analyticsState?.hotspotAnalysisError,
    predictiveAnalysis: analyticsState?.predictiveAnalysis,
    predictiveAnalysisLoading: analyticsState?.predictiveAnalysisLoading,
    predictiveAnalysisError: analyticsState?.predictiveAnalysisError,
    dashboardSummary: analyticsState?.dashboardSummary,
    dashboardSummaryLoading: analyticsState?.dashboardSummaryLoading,
    dashboardSummaryError: analyticsState?.dashboardSummaryError,
    performanceAnalytics: analyticsState?.performanceAnalytics,
    performanceAnalyticsLoading: analyticsState?.performanceAnalyticsLoading,
    performanceAnalyticsError: analyticsState?.performanceAnalyticsError,
    geographicAnalytics: analyticsState?.geographicAnalytics,
    geographicAnalyticsLoading: analyticsState?.geographicAnalyticsLoading,
    geographicAnalyticsError: analyticsState?.geographicAnalyticsError,
    timeBasedAnalytics: analyticsState?.timeBasedAnalytics,
    timeBasedAnalyticsLoading: analyticsState?.timeBasedAnalyticsLoading,
    timeBasedAnalyticsError: analyticsState?.timeBasedAnalyticsError,
    comparativeAnalytics: analyticsState?.comparativeAnalytics,
    comparativeAnalyticsLoading: analyticsState?.comparativeAnalyticsLoading,
    comparativeAnalyticsError: analyticsState?.comparativeAnalyticsError,
    caseAnalytics: analyticsState?.caseAnalytics,
    caseAnalyticsLoading: analyticsState?.caseAnalyticsLoading,
    caseAnalyticsError: analyticsState?.caseAnalyticsError,
    userEngagementAnalytics: analyticsState?.userEngagementAnalytics,
    userEngagementAnalyticsLoading: analyticsState?.userEngagementAnalyticsLoading,
    userEngagementAnalyticsError: analyticsState?.userEngagementAnalyticsError,
    realTimeAnalytics: analyticsState?.realTimeAnalytics,
    realTimeAnalyticsLoading: analyticsState?.realTimeAnalyticsLoading,
    realTimeAnalyticsError: analyticsState?.realTimeAnalyticsError,
    exportLoading: analyticsState?.exportLoading,
    exportError: analyticsState?.exportError,
  })
)