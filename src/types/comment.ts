import type { BaseEntity } from "./api"

export interface CommentCreate {
  content: string
  is_internal?: boolean
  is_status_update?: boolean
  crime_report_id: string
}

export interface CommentUpdate {
  content?: string | null
  is_internal?: boolean | null
  is_status_update?: boolean | null
}

export interface CommentResponse extends BaseEntity {
  content: string
  is_internal: boolean
  is_status_update: boolean
  crime_report_id: string
  author_id: string
}

export interface CommentListResponse extends BaseEntity {
  content: string
  author_id: string
}

export interface CommentFilters {
  page?: number
  skip?: number
  limit?: number
}
