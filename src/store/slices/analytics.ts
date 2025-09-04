import { createSlice } from "@reduxjs/toolkit"
import type {
  CrimeStatsResponse,
  TrendAnalysisResponse,
  HotspotAnalysisResponse,
  PredictiveAnalysisResponse,
  DashboardSummaryResponse,
  PerformanceAnalyticsResponse,
  GeographicAnalyticsResponse,
  TimeBasedAnalyticsResponse,
} from "@/types/analytics"
import {
  reduxFetchCrimeStats,
  reduxFetchTrendAnalysis,
  reduxFetchHotspotAnalysis,
  reduxFetchPredictiveAnalysis,
  reduxFetchDashboardSummary,
  reduxFetchPerformanceAnalytics,
  reduxFetchGeographicAnalytics,
  reduxFetchTimeBasedAnalytics,
  reduxFetchComparativeAnalytics,
  reduxFetchCaseAnalytics,
  reduxFetchUserEngagementAnalytics,
  reduxFetchRealTimeAnalytics,
  reduxExportAnalyticsData,
} from "../actions/analytics"

interface AnalyticsState {
  // Crime Statistics
  crimeStats: CrimeStatsResponse | null
  crimeStatsLoading: boolean
  crimeStatsError: string | null

  // Trend Analysis
  trendAnalysis: TrendAnalysisResponse | null
  trendAnalysisLoading: boolean
  trendAnalysisError: string | null

  // Hotspot Analysis
  hotspotAnalysis: HotspotAnalysisResponse | null
  hotspotAnalysisLoading: boolean
  hotspotAnalysisError: string | null

  // Predictive Analysis
  predictiveAnalysis: PredictiveAnalysisResponse | null
  predictiveAnalysisLoading: boolean
  predictiveAnalysisError: string | null

  // Dashboard Summary
  dashboardSummary: DashboardSummaryResponse | null
  dashboardSummaryLoading: boolean
  dashboardSummaryError: string | null

  // Performance Analytics
  performanceAnalytics: PerformanceAnalyticsResponse | null
  performanceAnalyticsLoading: boolean
  performanceAnalyticsError: string | null

  // Geographic Analytics
  geographicAnalytics: GeographicAnalyticsResponse | null
  geographicAnalyticsLoading: boolean
  geographicAnalyticsError: string | null

  // Time-based Analytics
  timeBasedAnalytics: TimeBasedAnalyticsResponse | null
  timeBasedAnalyticsLoading: boolean
  timeBasedAnalyticsError: string | null

  // Comparative Analytics
  comparativeAnalytics: any | null
  comparativeAnalyticsLoading: boolean
  comparativeAnalyticsError: string | null

  // Case Analytics
  caseAnalytics: any | null
  caseAnalyticsLoading: boolean
  caseAnalyticsError: string | null

  // User Engagement Analytics
  userEngagementAnalytics: any | null
  userEngagementAnalyticsLoading: boolean
  userEngagementAnalyticsError: string | null

  // Real-time Analytics
  realTimeAnalytics: any | null
  realTimeAnalyticsLoading: boolean
  realTimeAnalyticsError: string | null

  // Export
  exportLoading: boolean
  exportError: string | null
}

const initialState: AnalyticsState = {
  // Crime Statistics
  crimeStats: null,
  crimeStatsLoading: false,
  crimeStatsError: null,

  // Trend Analysis
  trendAnalysis: null,
  trendAnalysisLoading: false,
  trendAnalysisError: null,

  // Hotspot Analysis
  hotspotAnalysis: null,
  hotspotAnalysisLoading: false,
  hotspotAnalysisError: null,

  // Predictive Analysis
  predictiveAnalysis: null,
  predictiveAnalysisLoading: false,
  predictiveAnalysisError: null,

  // Dashboard Summary
  dashboardSummary: null,
  dashboardSummaryLoading: false,
  dashboardSummaryError: null,

  // Performance Analytics
  performanceAnalytics: null,
  performanceAnalyticsLoading: false,
  performanceAnalyticsError: null,

  // Geographic Analytics
  geographicAnalytics: null,
  geographicAnalyticsLoading: false,
  geographicAnalyticsError: null,

  // Time-based Analytics
  timeBasedAnalytics: null,
  timeBasedAnalyticsLoading: false,
  timeBasedAnalyticsError: null,

  // Comparative Analytics
  comparativeAnalytics: null,
  comparativeAnalyticsLoading: false,
  comparativeAnalyticsError: null,

  // Case Analytics
  caseAnalytics: null,
  caseAnalyticsLoading: false,
  caseAnalyticsError: null,

  // User Engagement Analytics
  userEngagementAnalytics: null,
  userEngagementAnalyticsLoading: false,
  userEngagementAnalyticsError: null,

  // Real-time Analytics
  realTimeAnalytics: null,
  realTimeAnalyticsLoading: false,
  realTimeAnalyticsError: null,

  // Export
  exportLoading: false,
  exportError: null,
}

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    clearAnalyticsErrors: (state) => {
      state.crimeStatsError = null
      state.trendAnalysisError = null
      state.hotspotAnalysisError = null
      state.predictiveAnalysisError = null
      state.dashboardSummaryError = null
      state.performanceAnalyticsError = null
      state.geographicAnalyticsError = null
      state.timeBasedAnalyticsError = null
      state.comparativeAnalyticsError = null
      state.caseAnalyticsError = null
      state.userEngagementAnalyticsError = null
      state.realTimeAnalyticsError = null
      state.exportError = null
    },
    resetAnalyticsState: () => initialState,
  },
  extraReducers: (builder) => {
    // Crime Statistics
    builder
      .addCase(reduxFetchCrimeStats.pending, (state) => {
        state.crimeStatsLoading = true
        state.crimeStatsError = null
      })
      .addCase(reduxFetchCrimeStats.fulfilled, (state, action) => {
        state.crimeStatsLoading = false
        state.crimeStats = action.payload
      })
      .addCase(reduxFetchCrimeStats.rejected, (state, action) => {
        state.crimeStatsLoading = false
        state.crimeStatsError = action.payload?.message || "Failed to fetch crime statistics"
      })

    // Trend Analysis
    builder
      .addCase(reduxFetchTrendAnalysis.pending, (state) => {
        state.trendAnalysisLoading = true
        state.trendAnalysisError = null
      })
      .addCase(reduxFetchTrendAnalysis.fulfilled, (state, action) => {
        state.trendAnalysisLoading = false
        state.trendAnalysis = action.payload
      })
      .addCase(reduxFetchTrendAnalysis.rejected, (state, action) => {
        state.trendAnalysisLoading = false
        state.trendAnalysisError = action.payload?.message || "Failed to fetch trend analysis"
      })

    // Hotspot Analysis
    builder
      .addCase(reduxFetchHotspotAnalysis.pending, (state) => {
        state.hotspotAnalysisLoading = true
        state.hotspotAnalysisError = null
      })
      .addCase(reduxFetchHotspotAnalysis.fulfilled, (state, action) => {
        state.hotspotAnalysisLoading = false
        state.hotspotAnalysis = action.payload
      })
      .addCase(reduxFetchHotspotAnalysis.rejected, (state, action) => {
        state.hotspotAnalysisLoading = false
        state.hotspotAnalysisError = action.payload?.message || "Failed to fetch hotspot analysis"
      })

    // Predictive Analysis
    builder
      .addCase(reduxFetchPredictiveAnalysis.pending, (state) => {
        state.predictiveAnalysisLoading = true
        state.predictiveAnalysisError = null
      })
      .addCase(reduxFetchPredictiveAnalysis.fulfilled, (state, action) => {
        state.predictiveAnalysisLoading = false
        state.predictiveAnalysis = action.payload
      })
      .addCase(reduxFetchPredictiveAnalysis.rejected, (state, action) => {
        state.predictiveAnalysisLoading = false
        state.predictiveAnalysisError = action.payload?.message || "Failed to fetch predictive analysis"
      })

    // Dashboard Summary
    builder
      .addCase(reduxFetchDashboardSummary.pending, (state) => {
        state.dashboardSummaryLoading = true
        state.dashboardSummaryError = null
      })
      .addCase(reduxFetchDashboardSummary.fulfilled, (state, action) => {
        state.dashboardSummaryLoading = false
        state.dashboardSummary = action.payload
      })
      .addCase(reduxFetchDashboardSummary.rejected, (state, action) => {
        state.dashboardSummaryLoading = false
        state.dashboardSummaryError = action.payload?.message || "Failed to fetch dashboard summary"
      })

    // Performance Analytics
    builder
      .addCase(reduxFetchPerformanceAnalytics.pending, (state) => {
        state.performanceAnalyticsLoading = true
        state.performanceAnalyticsError = null
      })
      .addCase(reduxFetchPerformanceAnalytics.fulfilled, (state, action) => {
        state.performanceAnalyticsLoading = false
        state.performanceAnalytics = action.payload
      })
      .addCase(reduxFetchPerformanceAnalytics.rejected, (state, action) => {
        state.performanceAnalyticsLoading = false
        state.performanceAnalyticsError = action.payload?.message || "Failed to fetch performance analytics"
      })

    // Geographic Analytics
    builder
      .addCase(reduxFetchGeographicAnalytics.pending, (state) => {
        state.geographicAnalyticsLoading = true
        state.geographicAnalyticsError = null
      })
      .addCase(reduxFetchGeographicAnalytics.fulfilled, (state, action) => {
        state.geographicAnalyticsLoading = false
        state.geographicAnalytics = action.payload
      })
      .addCase(reduxFetchGeographicAnalytics.rejected, (state, action) => {
        state.geographicAnalyticsLoading = false
        state.geographicAnalyticsError = action.payload?.message || "Failed to fetch geographic analytics"
      })

    // Time-based Analytics
    builder
      .addCase(reduxFetchTimeBasedAnalytics.pending, (state) => {
        state.timeBasedAnalyticsLoading = true
        state.timeBasedAnalyticsError = null
      })
      .addCase(reduxFetchTimeBasedAnalytics.fulfilled, (state, action) => {
        state.timeBasedAnalyticsLoading = false
        state.timeBasedAnalytics = action.payload
      })
      .addCase(reduxFetchTimeBasedAnalytics.rejected, (state, action) => {
        state.timeBasedAnalyticsLoading = false
        state.timeBasedAnalyticsError = action.payload?.message || "Failed to fetch time-based analytics"
      })

    // Comparative Analytics
    builder
      .addCase(reduxFetchComparativeAnalytics.pending, (state) => {
        state.comparativeAnalyticsLoading = true
        state.comparativeAnalyticsError = null
      })
      .addCase(reduxFetchComparativeAnalytics.fulfilled, (state, action) => {
        state.comparativeAnalyticsLoading = false
        state.comparativeAnalytics = action.payload
      })
      .addCase(reduxFetchComparativeAnalytics.rejected, (state, action) => {
        state.comparativeAnalyticsLoading = false
        state.comparativeAnalyticsError = action.payload?.message || "Failed to fetch comparative analytics"
      })

    // Case Analytics
    builder
      .addCase(reduxFetchCaseAnalytics.pending, (state) => {
        state.caseAnalyticsLoading = true
        state.caseAnalyticsError = null
      })
      .addCase(reduxFetchCaseAnalytics.fulfilled, (state, action) => {
        state.caseAnalyticsLoading = false
        state.caseAnalytics = action.payload
      })
      .addCase(reduxFetchCaseAnalytics.rejected, (state, action) => {
        state.caseAnalyticsLoading = false
        state.caseAnalyticsError = action.payload?.message || "Failed to fetch case analytics"
      })

    // User Engagement Analytics
    builder
      .addCase(reduxFetchUserEngagementAnalytics.pending, (state) => {
        state.userEngagementAnalyticsLoading = true
        state.userEngagementAnalyticsError = null
      })
      .addCase(reduxFetchUserEngagementAnalytics.fulfilled, (state, action) => {
        state.userEngagementAnalyticsLoading = false
        state.userEngagementAnalytics = action.payload
      })
      .addCase(reduxFetchUserEngagementAnalytics.rejected, (state, action) => {
        state.userEngagementAnalyticsLoading = false
        state.userEngagementAnalyticsError = action.payload?.message || "Failed to fetch user engagement analytics"
      })

    // Real-time Analytics
    builder
      .addCase(reduxFetchRealTimeAnalytics.pending, (state) => {
        state.realTimeAnalyticsLoading = true
        state.realTimeAnalyticsError = null
      })
      .addCase(reduxFetchRealTimeAnalytics.fulfilled, (state, action) => {
        state.realTimeAnalyticsLoading = false
        state.realTimeAnalytics = action.payload
      })
      .addCase(reduxFetchRealTimeAnalytics.rejected, (state, action) => {
        state.realTimeAnalyticsLoading = false
        state.realTimeAnalyticsError = action.payload?.message || "Failed to fetch real-time analytics"
      })

    // Export Analytics Data
    builder
      .addCase(reduxExportAnalyticsData.pending, (state) => {
        state.exportLoading = true
        state.exportError = null
      })
      .addCase(reduxExportAnalyticsData.fulfilled, (state) => {
        state.exportLoading = false
      })
      .addCase(reduxExportAnalyticsData.rejected, (state, action) => {
        state.exportLoading = false
        state.exportError = action.payload?.message || "Failed to export analytics data"
      })
  },
})

export const { clearAnalyticsErrors, resetAnalyticsState } = analyticsSlice.actions
export default analyticsSlice.reducer
