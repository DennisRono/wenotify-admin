import type { BaseEntity, LocationType } from "./api"

export interface LocationCreate {
  latitude: number
  longitude: number
  address?: string | null
  street?: string | null
  city?: string | null
  county?: string | null
  sub_county?: string | null
  postal_code?: string | null
  location_type?: LocationType
  landmark?: string | null
  description?: string | null
  accuracy_meters?: number | null
  source?: string | null
}

export interface LocationUpdate {
  latitude?: number | null
  longitude?: number | null
  address?: string | null
  street?: string | null
  city?: string | null
  county?: string | null
  sub_county?: string | null
  postal_code?: string | null
  location_type?: LocationType | null
  landmark?: string | null
  description?: string | null
  accuracy_meters?: number | null
  source?: string | null
}

export interface LocationResponse extends BaseEntity {
  latitude: number
  longitude: number
  address?: string | null
  street?: string | null
  city?: string | null
  county?: string | null
  sub_county?: string | null
  postal_code?: string | null
  location_type: LocationType
  landmark?: string | null
  description?: string | null
  accuracy_meters?: number | null
  source?: string | null
}

export interface LocationListResponse extends BaseEntity {
  latitude: number
  longitude: number
  city?: string | null
  county?: string | null
  sub_county?: string | null
  location_type: LocationType
}

export interface NearbyLocationResponse extends BaseEntity {
  latitude: number
  longitude: number
  city?: string | null
  county?: string | null
  sub_county?: string | null
  location_type: LocationType
  distance_km: number
}

export interface NearbyLocationParams {
  latitude: number
  longitude: number
  radius_km?: number
}

export interface LocationFilters {
  skip?: number
  limit?: number
  location_type?: string | null
}
