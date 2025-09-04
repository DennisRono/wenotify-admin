import { createSlice } from "@reduxjs/toolkit"
import type { LocationResponse, LocationListResponse, NearbyLocationResponse } from "@/types/location"
import {
  reduxCreateLocation,
  reduxFetchLocations,
  reduxFetchNearbyLocations,
  reduxFetchLocationById,
  reduxUpdateLocation,
  reduxDeleteLocation,
} from "../actions/locations"

interface LocationsState {
  // Locations list
  locations: LocationListResponse[]
  locationsLoading: boolean
  locationsError: string | null
  locationsFilters: Record<string, any> | null

  // Nearby locations
  nearbyLocations: NearbyLocationResponse[]
  nearbyLocationsLoading: boolean
  nearbyLocationsError: string | null
  nearbySearchParams: { latitude: number; longitude: number; radius_km?: number } | null

  // Single location
  currentLocation: LocationResponse | null
  currentLocationLoading: boolean
  currentLocationError: string | null

  // Create location
  createLoading: boolean
  createError: string | null

  // Update location
  updateLoading: boolean
  updateError: string | null

  // Delete location
  deleteLoading: boolean
  deleteError: string | null

  // Pagination
  totalLocations: number
  currentPage: number
  pageSize: number
}

const initialState: LocationsState = {
  // Locations list
  locations: [],
  locationsLoading: false,
  locationsError: null,
  locationsFilters: null,

  // Nearby locations
  nearbyLocations: [],
  nearbyLocationsLoading: false,
  nearbyLocationsError: null,
  nearbySearchParams: null,

  // Single location
  currentLocation: null,
  currentLocationLoading: false,
  currentLocationError: null,

  // Create location
  createLoading: false,
  createError: null,

  // Update location
  updateLoading: false,
  updateError: null,

  // Delete location
  deleteLoading: false,
  deleteError: null,

  // Pagination
  totalLocations: 0,
  currentPage: 1,
  pageSize: 100,
}

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    clearLocationsErrors: (state) => {
      state.locationsError = null
      state.nearbyLocationsError = null
      state.currentLocationError = null
      state.createError = null
      state.updateError = null
      state.deleteError = null
    },
    clearCurrentLocation: (state) => {
      state.currentLocation = null
      state.currentLocationError = null
    },
    clearNearbyLocations: (state) => {
      state.nearbyLocations = []
      state.nearbyLocationsError = null
      state.nearbySearchParams = null
    },
    setLocationsFilters: (state, action) => {
      state.locationsFilters = action.payload
    },
    clearLocationsFilters: (state) => {
      state.locationsFilters = null
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    resetLocationsState: () => initialState,
  },
  extraReducers: (builder) => {
    // Create Location
    builder
      .addCase(reduxCreateLocation.pending, (state) => {
        state.createLoading = true
        state.createError = null
      })
      .addCase(reduxCreateLocation.fulfilled, (state, action) => {
        state.createLoading = false
        const newLocation = action.payload

        // Add the new location to the list (convert to list format)
        const listLocation: LocationListResponse = {
          id: newLocation.id,
          created_at: newLocation.created_at,
          updated_at: newLocation.updated_at,
          deleted_at: newLocation.deleted_at,
          created_by_id: newLocation.created_by_id,
          updated_by_id: newLocation.updated_by_id,
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
          city: newLocation.city,
          county: newLocation.county,
          sub_county: newLocation.sub_county,
          location_type: newLocation.location_type,
        }

        state.locations.unshift(listLocation)
        state.totalLocations += 1
      })
      .addCase(reduxCreateLocation.rejected, (state, action) => {
        state.createLoading = false
        state.createError = action.payload?.message || "Failed to create location"
      })

    // Fetch Locations
    builder
      .addCase(reduxFetchLocations.pending, (state) => {
        state.locationsLoading = true
        state.locationsError = null
      })
      .addCase(reduxFetchLocations.fulfilled, (state, action) => {
        state.locationsLoading = false
        state.locations = action.payload
        state.totalLocations = action.payload.length
      })
      .addCase(reduxFetchLocations.rejected, (state, action) => {
        state.locationsLoading = false
        state.locationsError = action.payload?.message || "Failed to fetch locations"
      })

    // Fetch Nearby Locations
    builder
      .addCase(reduxFetchNearbyLocations.pending, (state, action) => {
        state.nearbyLocationsLoading = true
        state.nearbyLocationsError = null
        state.nearbySearchParams = action.meta.arg
      })
      .addCase(reduxFetchNearbyLocations.fulfilled, (state, action) => {
        state.nearbyLocationsLoading = false
        state.nearbyLocations = action.payload
      })
      .addCase(reduxFetchNearbyLocations.rejected, (state, action) => {
        state.nearbyLocationsLoading = false
        state.nearbyLocationsError = action.payload?.message || "Failed to fetch nearby locations"
      })

    // Fetch Location By ID
    builder
      .addCase(reduxFetchLocationById.pending, (state) => {
        state.currentLocationLoading = true
        state.currentLocationError = null
      })
      .addCase(reduxFetchLocationById.fulfilled, (state, action) => {
        state.currentLocationLoading = false
        state.currentLocation = action.payload
      })
      .addCase(reduxFetchLocationById.rejected, (state, action) => {
        state.currentLocationLoading = false
        state.currentLocationError = action.payload?.message || "Failed to fetch location"
      })

    // Update Location
    builder
      .addCase(reduxUpdateLocation.pending, (state) => {
        state.updateLoading = true
        state.updateError = null
      })
      .addCase(reduxUpdateLocation.fulfilled, (state, action) => {
        state.updateLoading = false
        const updatedLocation = action.payload

        // Update current location if it matches
        if (state.currentLocation && state.currentLocation.id === updatedLocation.id) {
          state.currentLocation = updatedLocation
        }

        // Update location in the list
        const locationIndex = state.locations.findIndex((l) => l.id === updatedLocation.id)
        if (locationIndex !== -1) {
          state.locations[locationIndex] = {
            id: updatedLocation.id,
            created_at: updatedLocation.created_at,
            updated_at: updatedLocation.updated_at,
            deleted_at: updatedLocation.deleted_at,
            created_by_id: updatedLocation.created_by_id,
            updated_by_id: updatedLocation.updated_by_id,
            latitude: updatedLocation.latitude,
            longitude: updatedLocation.longitude,
            city: updatedLocation.city,
            county: updatedLocation.county,
            sub_county: updatedLocation.sub_county,
            location_type: updatedLocation.location_type,
          }
        }

        // Update location in nearby locations if it exists
        const nearbyIndex = state.nearbyLocations.findIndex((l) => l.id === updatedLocation.id)
        if (nearbyIndex !== -1) {
          state.nearbyLocations[nearbyIndex] = {
            ...state.nearbyLocations[nearbyIndex],
            latitude: updatedLocation.latitude,
            longitude: updatedLocation.longitude,
            city: updatedLocation.city,
            county: updatedLocation.county,
            sub_county: updatedLocation.sub_county,
            location_type: updatedLocation.location_type,
          }
        }
      })
      .addCase(reduxUpdateLocation.rejected, (state, action) => {
        state.updateLoading = false
        state.updateError = action.payload?.message || "Failed to update location"
      })

    // Delete Location
    builder
      .addCase(reduxDeleteLocation.pending, (state) => {
        state.deleteLoading = true
        state.deleteError = null
      })
      .addCase(reduxDeleteLocation.fulfilled, (state, action) => {
        state.deleteLoading = false
        const deletedId = action.payload.id

        // Clear current location if it matches
        if (state.currentLocation && state.currentLocation.id === deletedId) {
          state.currentLocation = null
        }

        // Remove location from the list
        state.locations = state.locations.filter((l) => l.id !== deletedId)
        state.totalLocations = Math.max(0, state.totalLocations - 1)

        // Remove location from nearby locations
        state.nearbyLocations = state.nearbyLocations.filter((l) => l.id !== deletedId)
      })
      .addCase(reduxDeleteLocation.rejected, (state, action) => {
        state.deleteLoading = false
        state.deleteError = action.payload?.message || "Failed to delete location"
      })
  },
})

export const {
  clearLocationsErrors,
  clearCurrentLocation,
  clearNearbyLocations,
  setLocationsFilters,
  clearLocationsFilters,
  setCurrentPage,
  setPageSize,
  resetLocationsState,
} = locationsSlice.actions

export default locationsSlice.reducer
