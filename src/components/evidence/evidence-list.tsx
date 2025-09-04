"use client"

import { useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { deleteEvidence } from "@/store/actions/evidence"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Download, Eye, Trash2, ImageIcon, FileText, File, Video, Music } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import type { Evidence } from "@/types/evidence"

interface EvidenceListProps {
  evidence: Evidence[]
  onEvidenceDeleted?: () => void
}

export function EvidenceList({ evidence, onEvidenceDeleted }: EvidenceListProps) {
  const dispatch = useAppDispatch()
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>({})

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="h-4 w-4" />
    if (fileType === "application/pdf") return <FileText className="h-4 w-4" />
    if (fileType.startsWith("video/")) return <Video className="h-4 w-4" />
    if (fileType.startsWith("audio/")) return <Music className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const getFileTypeColor = (fileType: string) => {
    if (fileType.startsWith("image/")) return "bg-green-100 text-green-800"
    if (fileType === "application/pdf") return "bg-red-100 text-red-800"
    if (fileType.startsWith("video/")) return "bg-blue-100 text-blue-800"
    if (fileType.startsWith("audio/")) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
  }

  const handleDelete = async (evidenceId: string) => {
    if (window.confirm("Are you sure you want to delete this evidence? This action cannot be undone.")) {
      setLoadingActions((prev) => ({ ...prev, [evidenceId]: true }))
      try {
        await dispatch(deleteEvidence(evidenceId))
        onEvidenceDeleted?.()
      } finally {
        setLoadingActions((prev) => ({ ...prev, [evidenceId]: false }))
      }
    }
  }

  const handleDownload = (evidence: Evidence) => {
    // Create a temporary link to download the file
    const link = document.createElement("a")
    link.href = evidence.file_url
    link.download = evidence.file_name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (evidence.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            <File className="mx-auto h-12 w-12 mb-4" />
            <p>No evidence files found</p>
            <p className="text-sm">Upload evidence files to get started</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {evidence.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {item.file_type.startsWith("image/") && item.file_url ? (
                  <img
                    src={item.file_url || "/placeholder.svg"}
                    alt={item.file_name}
                    className="h-16 w-16 object-cover rounded"
                  />
                ) : (
                  <div className="h-16 w-16 bg-muted rounded flex items-center justify-center">
                    {getFileIcon(item.file_type)}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium truncate">{item.file_name}</h4>
                  <Badge className={getFileTypeColor(item.file_type)} variant="secondary">
                    {item.file_type.split("/")[1]?.toUpperCase() || "FILE"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatFileSize(item.file_size)}</span>
                  <span>Uploaded {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</span>
                  {item.uploaded_by && <span>by {item.uploaded_by}</span>}
                </div>
              </div>

              <div className="flex-shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={loadingActions[item.id]}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/evidence/${item.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(item)}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
