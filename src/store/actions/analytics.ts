import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ErrorResponse } from '@/types/responses'
import type {
  CrimeStatsResponse,
  CrimeStatsFilters,
  TrendAnalysisResponse,
  TrendAnalysisFilters,
  HotspotAnalysisResponse,
  HotspotAnalysisFilters,
  PredictiveAnalysisResponse,
  PredictiveAnalysisFilters,
  DashboardSummaryResponse,
  PerformanceAnalyticsResponse,
  GeographicAnalyticsResponse,
  TimeBasedAnalyticsResponse,
  ComparativeAnalyticsFilters,
  CaseAnalyticsFilters,
  UserEngagementAnalyticsFilters,
  ExportAnalyticsFilters,
} from "@/types/analytics"

const getAuthHeaders = (state: any) => ({
  Authorization: `Bearer ${state?.auth?.access_token}`,
  "Content-Type": "application/json",
})

/* ------------------ ANALYTICS ACTIONS ------------------ */

export const reduxFetchCrimeStats = createAsyncThunk<
  CrimeStatsResponse,
  CrimeStatsFilters | void,
  { rejectValue: ErrorResponse }
>("analytics/fetchCrimeStats", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/crime-stats${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch crime statistics." })
  }
})

export const reduxFetchTrendAnalysis = createAsyncThunk<
  TrendAnalysisResponse,
  TrendAnalysisFilters | void,
  { rejectValue: ErrorResponse }
>("analytics/fetchTrendAnalysis", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/trends${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch trend analysis." })
  }
})

export const reduxFetchHotspotAnalysis = createAsyncThunk<
  HotspotAnalysisResponse,
  HotspotAnalysisFilters | void,
  { rejectValue: ErrorResponse }
>("analytics/fetchHotspotAnalysis", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/hotspots${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch hotspot analysis." })
  }
})

export const reduxFetchPredictiveAnalysis = createAsyncThunk<
  PredictiveAnalysisResponse,
  PredictiveAnalysisFilters | void,
  { rejectValue: ErrorResponse }
>("analytics/fetchPredictiveAnalysis", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/predictions${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch predictive analysis." })
  }
})

export const reduxFetchDashboardSummary = createAsyncThunk<
  DashboardSummaryResponse,
  void,
  { rejectValue: ErrorResponse }
>("analytics/fetchDashboardSummary", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/dashboard-summary`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch dashboard summary." })
  }
})

export const reduxFetchPerformanceAnalytics = createAsyncThunk<
  PerformanceAnalyticsResponse,
  void,
  { rejectValue: ErrorResponse }
>("analytics/fetchPerformanceAnalytics", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/performance`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch performance analytics." })
  }
})

export const reduxFetchGeographicAnalytics = createAsyncThunk<
  GeographicAnalyticsResponse,
  void,
  { rejectValue: ErrorResponse }
>("analytics/fetchGeographicAnalytics", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/geographic`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch geographic analytics." })
  }
})

export const reduxFetchTimeBasedAnalytics = createAsyncThunk<
  TimeBasedAnalyticsResponse,
  void,
  { rejectValue: ErrorResponse }
>("analytics/fetchTimeBasedAnalytics", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/time-patterns`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch time-based analytics." })
  }
})

export const reduxFetchComparativeAnalytics = createAsyncThunk<
  any,
  ComparativeAnalyticsFilters | void,
  { rejectValue: ErrorResponse }
>("analytics/fetchComparativeAnalytics", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/comparative${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch comparative analytics." })
  }
})

export const reduxFetchCaseAnalytics = createAsyncThunk<
  any,
  CaseAnalyticsFilters | void,
  { rejectValue: ErrorResponse }
>("analytics/fetchCaseAnalytics", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/cases${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch case analytics." })
  }
})

export const reduxFetchUserEngagementAnalytics = createAsyncThunk<
  any,
  UserEngagementAnalyticsFilters | void,
  { rejectValue: ErrorResponse }
>("analytics/fetchUserEngagementAnalytics", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/user-engagement${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch user engagement analytics." })
  }
})

export const reduxFetchRealTimeAnalytics = createAsyncThunk<any, void, { rejectValue: ErrorResponse }>(
  "analytics/fetchRealTimeAnalytics",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/real-time`, {
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to fetch real-time analytics." })
    }
  },
)

export const reduxExportAnalyticsData = createAsyncThunk<
  any,
  ExportAnalyticsFilters | void,
  { rejectValue: ErrorResponse }
>("analytics/exportAnalyticsData", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/analytics/export${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    // Handle different export formats
    const format = params?.format || "json"

    if (format === "csv" || format === "pdf") {
      const blob = await response.blob()
      const contentDisposition = response.headers.get("Content-Disposition")
      let filename = `analytics-export.${format}`

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/)
        if (match && match[1]) {
          filename = match[1]
        }
      }

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      return { exported: true, format, filename }
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to export analytics data." })
  }
})
