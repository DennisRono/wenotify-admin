import type { BaseEntity, CrimeCategory, CrimeSeverity, ReportStatus } from "./api"
import { LocationResponse } from "./location"

export interface CrimeReportCreate {
  title: string
  description: string
  category: CrimeCategory
  severity?: CrimeSeverity
  is_anonymous?: boolean
  is_emergency?: boolean
  location_id: string
}

export interface CrimeReportUpdate {
  title?: string | null
  description?: string | null
  category?: CrimeCategory | null
  severity?: CrimeSeverity | null
  is_anonymous?: boolean | null
  is_emergency?: boolean | null
  priority_score?: number | null
  suspect_description?: string | null
  witness_count?: number | null
  estimated_loss?: number | null
  is_verified?: boolean | null
  confidence_score?: number | null
  internal_notes?: string | null
  resolution_notes?: string | null
  assigned_officer_id?: string | null
}

export interface CrimeReportResponse extends BaseEntity {
  title: string
  description: string
  category: CrimeCategory
  severity: CrimeSeverity
  is_anonymous: boolean
  is_emergency: boolean
  report_number: string
  reporter_id: string
  status: ReportStatus
  assigned_officer_id?: string | null
  location_id: string
  location?: LocationResponse 
  priority_score?: number | null
  suspect_description?: string | null
  witness_count?: number | null
  estimated_loss?: number | null
  is_verified: boolean
  confidence_score?: number | null
  internal_notes?: string | null
  resolution_notes?: string | null
}

export interface CrimeReportListResponse extends BaseEntity {
  report_number: string
  title: string
  category: CrimeCategory
  severity: CrimeSeverity
  status: ReportStatus
  is_emergency: boolean
}

export interface CrimeReportStatusUpdate {
  status: ReportStatus
}

export interface CrimeReportFilters {
  page?: number
  skip?: number
  limit?: number
  status_filter?: string | null
  crime_type?: string | null
}
