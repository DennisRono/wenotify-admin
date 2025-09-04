import { createAsyncThunk } from "@reduxjs/toolkit"
import type { ErrorResponse } from '@/types/responses'
import type {
  LocationCreate,
  LocationUpdate,
  LocationResponse,
  LocationListResponse,
  NearbyLocationResponse,
  NearbyLocationParams,
  LocationFilters,
} from "@/types/location"

const getAuthHeaders = (state: any) => ({
  Authorization: `Bearer ${state?.auth?.access_token}`,
  "Content-Type": "application/json",
})

/* ------------------ LOCATIONS ACTIONS ------------------ */

export const reduxCreateLocation = createAsyncThunk<LocationResponse, LocationCreate, { rejectValue: ErrorResponse }>(
  "locations/create",
  async (locationData, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/locations/`, {
        method: "POST",
        headers: getAuthHeaders(state),
        body: JSON.stringify(locationData),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to create location." })
    }
  },
)

export const reduxFetchLocations = createAsyncThunk<
  LocationListResponse[],
  LocationFilters | void,
  { rejectValue: ErrorResponse }
>("locations/fetch", async (params, { getState, rejectWithValue }) => {
  try {
    const query = params ? "?" + new URLSearchParams(params as Record<string, string>).toString() : ""
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/locations/${query}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch locations." })
  }
})

export const reduxFetchNearbyLocations = createAsyncThunk<
  NearbyLocationResponse[],
  NearbyLocationParams,
  { rejectValue: ErrorResponse }
>("locations/fetchNearby", async (params, { getState, rejectWithValue }) => {
  try {
    const queryParams = new URLSearchParams({
      latitude: params.latitude.toString(),
      longitude: params.longitude.toString(),
    })

    if (params.radius_km) {
      queryParams.append("radius_km", params.radius_km.toString())
    }

    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/locations/nearby?${queryParams}`, {
      headers: getAuthHeaders(state),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to fetch nearby locations." })
  }
})

export const reduxFetchLocationById = createAsyncThunk<LocationResponse, string, { rejectValue: ErrorResponse }>(
  "locations/fetchById",
  async (locationId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/locations/${locationId}`, {
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return await response.json()
    } catch {
      return rejectWithValue({ message: "Failed to fetch location by ID." })
    }
  },
)

export const reduxUpdateLocation = createAsyncThunk<
  LocationResponse,
  { id: string; data: LocationUpdate },
  { rejectValue: ErrorResponse }
>("locations/update", async ({ id, data }, { getState, rejectWithValue }) => {
  try {
    const state = getState() as any
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/locations/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(state),
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      return rejectWithValue(await response.json())
    }

    return await response.json()
  } catch {
    return rejectWithValue({ message: "Failed to update location." })
  }
})

export const reduxDeleteLocation = createAsyncThunk<{ id: string }, string, { rejectValue: ErrorResponse }>(
  "locations/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState() as any
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/locations/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(state),
      })

      if (!response.ok) {
        return rejectWithValue(await response.json())
      }

      return { id }
    } catch {
      return rejectWithValue({ message: "Failed to delete location." })
    }
  },
)
