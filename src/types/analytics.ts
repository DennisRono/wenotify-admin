import type { CrimeCategory } from "./api"

export interface CrimeStatsResponse {
  total_crimes: number
  start_date?: string | null
  end_date?: string | null
  stats_by_type: CrimeTypeStats[]
  stats_by_location: LocationStats[]
  stats_by_severity: SeverityStats[]
  stats_by_status: StatusStats[]
  average_response_time_hours: number
}

export interface CrimeTypeStats {
  crime_type: string
  count: number
  percentage: number
}

export interface LocationStats {
  location_id: string
  location_name: string
  count: number
  percentage: number
}

export interface SeverityStats {
  severity: string
  count: number
  percentage: number
}

export interface StatusStats {
  status: string
  count: number
  percentage: number
}

export interface TrendAnalysisResponse {
  crime_type?: string | null
  location_id?: string | null
  period: string
  trends: TrendDataPoint[]
  total_change_percentage: number
  trend_direction: string
}

export interface TrendDataPoint {
  period: string
  count: number
  percentage_change?: number | null
}

export interface HotspotAnalysisResponse {
  radius_km: number
  min_incidents: number
  days_back: number
  hotspots: HotspotLocation[]
  total_hotspots: number
}

export interface HotspotLocation {
  location_id: string
  location_name: string
  latitude: number
  longitude: number
  incident_count: number
  risk_level: string
  county?: string | null
  sub_county?: string | null
}

export interface PredictiveAnalysisResponse {
  crime_type?: string | null
  location_id?: string | null
  prediction_days: number
  predictions: PredictionDataPoint[]
  overall_confidence: number
  recommendation: string
}

export interface PredictionDataPoint {
  date: string
  predicted_count: number
  confidence: number
  lower_bound: number
  upper_bound: number
}

export interface DashboardSummaryResponse {
  total_users: number
  active_users: number
  total_reports: number
  resolved_reports: number
  pending_reports: number
  high_priority_reports: number
  today_reports: number
  recent_trends: TrendDataPoint[]
  top_hotspots: HotspotLocation[]
  top_crime_types: CrimeTypeStats[]
  last_updated: string
}

export interface PerformanceAnalyticsResponse {
  response_time_metrics: ResponseTimeMetrics
  officer_performance: OfficerPerformanceStats[]
  department_efficiency_score: number
}

export interface ResponseTimeMetrics {
  average_response_time_hours: number
  median_response_time_hours: number
  fastest_response_time_hours: number
  slowest_response_time_hours: number
  total_resolved_cases: number
}

export interface OfficerPerformanceStats {
  officer_id: string
  officer_name: string
  assigned_cases: number
  resolved_cases: number
  average_resolution_time_hours: number
  success_rate: number
}

export interface GeographicAnalyticsResponse {
  geographic_breakdown: GeographicStats[]
  safest_areas: GeographicStats[]
  most_dangerous_areas: GeographicStats[]
}

export interface GeographicStats {
  county: string
  sub_county?: string | null
  total_incidents: number
  incidents_per_capita: number
  most_common_crime: string
  safety_score: number
}

export interface TimeBasedAnalyticsResponse {
  hourly_patterns: TimePatternStats[]
  daily_patterns: TimePatternStats[]
  monthly_patterns: TimePatternStats[]
  peak_crime_hours: string[]
  peak_crime_days: string[]
}

export interface TimePatternStats {
  time_period: string
  period_value: string
  incident_count: number
  percentage: number
}

// Analytics filter types
export interface CrimeStatsFilters {
  start_date?: string | null
  end_date?: string | null
  location_id?: string | null
  crime_type?: CrimeCategory | null
}

export interface TrendAnalysisFilters {
  period?: string
  crime_type?: string | null
  location_id?: string | null
}

export interface HotspotAnalysisFilters {
  radius_km?: number
  min_incidents?: number
  days_back?: number
}

export interface PredictiveAnalysisFilters {
  prediction_days?: number
  location_id?: string | null
  crime_type?: string | null
}

export interface ComparativeAnalyticsFilters {
  compare_period?: string
  crime_type?: string | null
  location_id?: string | null
}

export interface CaseAnalyticsFilters {
  start_date?: string | null
  end_date?: string | null
}

export interface UserEngagementAnalyticsFilters {
  period_days?: number
}

export interface ExportAnalyticsFilters {
  report_type?: string
  format?: string
  start_date?: string | null
  end_date?: string | null
}
