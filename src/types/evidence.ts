import type { BaseEntity, EvidenceType } from "./api"

export interface EvidenceResponse extends BaseEntity {
  evidence_type: EvidenceType
  description?: string | null
  crime_report_id: string
  filename: string
  original_filename: string
  file_path: string
  file_size: number
  mime_type: string
  file_hash: string
  is_encrypted: boolean
  chain_of_custody?: string | null
  is_processed: boolean
  processing_notes?: string | null
}

export interface EvidenceListResponse extends BaseEntity {
  filename: string
  original_filename: string
  file_size: number
  mime_type: string
  evidence_type: EvidenceType
  is_processed: boolean
}

export interface EvidenceUpdate {
  description?: string | null
  processing_notes?: string | null
  is_processed?: boolean | null
}

export interface EvidenceUpload {
  file: File
}
