import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ErrorResponse } from '@/types/responses'
import type {
  CrimeReportCreate,
  CrimeReportUpdate,
  CrimeReportResponse,
  CrimeReportListResponse,
  CrimeReportStatusUpdate,
  CrimeReportFilters,
} from "@/types/crime-report"
import { ReportStatus } from "@/types/api"

const getAuthHeaders = (state: any) => ({
  Authorization: `Bearer ${state?.auth?.access_token}`,
  "Content-Type": "application/json",
})

/* ------------------ CRIME REPORTS ACTIONS ------------------ */

export const reduxCreateCrimeReport = createAsyncThunk<
  CrimeReportResponse,
  CrimeReportCreate,
  { rejectValue: ErrorResponse }
>("crimeReports/create", async (reportData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/crime-reports/`, {
      method: "POST",
      headers: getAuthHeaders(state),
      body: JSON.stringify(reportData),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to create crime report." })
  }
})

export const reduxFetchCrimeReports = createAsyncThunk<
  CrimeReportListResponse[],
  CrimeReportFilters | void,
  { rejectValue: ErrorResponse }
>("crimeReports/fetch", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/crime-reports/${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch crime reports." })
  }
})

export const reduxFetchCrimeReportById = createAsyncThunk<CrimeReportResponse, string, { rejectValue: ErrorResponse }>(
  "crimeReports/fetchById",
  async (reportId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/crime-reports/${reportId}`, {
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to fetch crime report by ID." })
    }
  },
)

export const reduxUpdateCrimeReport = createAsyncThunk<
  CrimeReportResponse,
  { id: string; data: CrimeReportUpdate },
  { rejectValue: ErrorResponse }
>("crimeReports/update", async ({ id, data }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/crime-reports/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(state),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to update crime report." })
  }
})

export const reduxUpdateCrimeReportStatus = createAsyncThunk<
  CrimeReportResponse,
  { id: string; status: ReportStatus },
  { rejectValue: ErrorResponse }
>("crimeReports/updateStatus", async ({ id, status }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/crime-reports/${id}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(state),
      body: JSON.stringify(status),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to update crime report status." })
  }
})

export const reduxDeleteCrimeReport = createAsyncThunk<{ id: string }, string, { rejectValue: ErrorResponse }>(
  "crimeReports/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/crime-reports/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return { id }
    } catch {
      return rejectWithValue({ message: "Failed to delete crime report." })
    }
  },
)
