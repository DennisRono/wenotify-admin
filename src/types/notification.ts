import type { BaseEntity, NotificationType, NotificationStatus } from "./api"

export interface NotificationResponse extends BaseEntity {
  user_id: string
  crime_report_id?: string | null
  notification_type: NotificationType
  title: string
  message: string
  status: NotificationStatus
  is_read: boolean
  sent_via_email: boolean
  sent_via_sms: boolean
  sent_via_push: boolean
  is_urgent: boolean
}

export interface NotificationListResponse extends BaseEntity {
  title: string
  message: string
  notification_type: NotificationType
  status: NotificationStatus
  is_read: boolean
  is_urgent: boolean
}

export interface NotificationFilters {
  skip?: number
  limit?: number
  unread_only?: boolean
}
