// Base response types
export interface BaseEntity {
  id: string
  created_at: string
  updated_at: string
  deleted_at?: string | null
  created_by_id?: string | null
  updated_by_id?: string | null
}

export interface ErrorResponse {
  message: string
  detail?: Array<{
    loc: (string | number)[]
    msg: string
    type: string
  }>
}

export interface PaginationParams {
  skip?: number
  limit?: number
}

// Enums
export enum CrimeCategory {
  THEFT = "theft",
  ASSAULT = "assault",
  BURGLARY = "burglary",
  ROBBERY = "robbery",
  FRAUD = "fraud",
  CYBERCRIME = "cybercrime",
  DOMESTIC_VIOLENCE = "domestic_violence",
  DRUG_RELATED = "drug_related",
  TRAFFIC_VIOLATION = "traffic_violation",
  VANDALISM = "vandalism",
  MURDER = "murder",
  KIDNAPPING = "kidnapping",
  SEXUAL_ASSAULT = "sexual_assault",
  OTHER = "other",
}

export enum CrimeSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum ReportStatus {
  SUBMITTED = "submitted",
  UNDER_INVESTIGATION = "under_investigation",
  ASSIGNED = "assigned",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
  CLOSED = "closed",
  REJECTED = "rejected",
}

export enum UserRole {
  CITIZEN = "citizen",
  POLICE_OFFICER = "police_officer",
  ADMIN = "admin",
  ANALYST = "analyst",
  DISPATCHER = "dispatcher",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  PENDING_VERIFICATION = "pending_verification",
}

export enum LocationType {
  CRIME_SCENE = "crime_scene",
  LANDMARK = "landmark",
  POLICE_STATION = "police_station",
  HOSPITAL = "hospital",
  SCHOOL = "school",
  RESIDENTIAL = "residential",
  COMMERCIAL = "commercial",
  PUBLIC_SPACE = "public_space",
}

export enum EvidenceType {
  PHOTO = "photo",
  VIDEO = "video",
  AUDIO = "audio",
  DOCUMENT = "document",
  OTHER = "other",
}

export enum NotificationType {
  REPORT_SUBMITTED = "report_submitted",
  REPORT_UPDATED = "report_updated",
  REPORT_ASSIGNED = "report_assigned",
  REPORT_RESOLVED = "report_resolved",
  EMERGENCY_ALERT = "emergency_alert",
  SYSTEM_NOTIFICATION = "system_notification",
}

export enum NotificationStatus {
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
  FAILED = "failed",
}
