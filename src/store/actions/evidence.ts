import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ErrorResponse } from '@/types/responses'
import type { EvidenceResponse, EvidenceListResponse, EvidenceUpdate } from "@/types/evidence"

const getAuthHeaders = (state: any) => ({
  Authorization: `Bearer ${state?.auth?.access_token}`,
  "Content-Type": "application/json",
})

const getAuthHeadersForUpload = (state: any) => ({
  Authorization: `Bearer ${state?.auth?.access_token}`,
  // Don't set Content-Type for FormData - let browser set it with boundary
})

/* ------------------ EVIDENCE ACTIONS ------------------ */

export const reduxUploadEvidence = createAsyncThunk<
  EvidenceResponse,
  { reportId: string; file: File },
  { rejectValue: ErrorResponse }
>("evidence/upload", async ({ reportId, file }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/evidence/upload/${reportId}`, {
      method: "POST",
      headers: getAuthHeadersForUpload(state),
      body: formData,
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to upload evidence." })
  }
})

export const reduxFetchReportEvidence = createAsyncThunk<
  EvidenceListResponse[],
  string,
  { rejectValue: ErrorResponse }
>("evidence/fetchReportEvidence", async (reportId, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/evidence/report/${reportId}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch report evidence." })
  }
})

export const reduxFetchEvidenceById = createAsyncThunk<EvidenceResponse, string, { rejectValue: ErrorResponse }>(
  "evidence/fetchById",
  async (evidenceId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/evidence/${evidenceId}`, {
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to fetch evidence by ID." })
    }
  },
)

export const reduxUpdateEvidence = createAsyncThunk<
  EvidenceResponse,
  { id: string; data: EvidenceUpdate },
  { rejectValue: ErrorResponse }
>("evidence/update", async ({ id, data }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/evidence/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(state),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to update evidence." })
  }
})

export const reduxDeleteEvidence = createAsyncThunk<{ id: string }, string, { rejectValue: ErrorResponse }>(
  "evidence/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/evidence/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return { id }
    } catch {
      return rejectWithValue({ message: "Failed to delete evidence." })
    }
  },
)

export const reduxFetchChainOfCustody = createAsyncThunk<any, string, { rejectValue: ErrorResponse }>(
  "evidence/fetchChainOfCustody",
  async (evidenceId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/evidence/${evidenceId}/chain-of-custody`,
        {
          headers: getAuthHeaders(state),
        },
      )

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to fetch chain of custody." })
    }
  },
)
