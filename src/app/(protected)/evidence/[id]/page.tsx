"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { reduxFetchReportEvidence, reduxFetchChainOfCustody } from "@/store/actions/evidence"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChainOfCustody } from "@/components/evidence/chain-of-custody"
import { ArrowLeft, Download, ImageIcon, FileText, File, Video, Music, Calendar, User, HardDrive } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"

export default function EvidenceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentEvidence, chainOfCustody, loading } = useAppSelector((state) => state.evidence)

  const evidenceId = params.id as string

  useEffect(() => {
    if (evidenceId) {
      dispatch(reduxFetchReportEvidence(evidenceId))
      dispatch(reduxFetchChainOfCustody(evidenceId))
    }
  }, [dispatch, evidenceId])

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="h-6 w-6" />
    if (fileType === "application/pdf") return <FileText className="h-6 w-6" />
    if (fileType.startsWith("video/")) return <Video className="h-6 w-6" />
    if (fileType.startsWith("audio/")) return <Music className="h-6 w-6" />
    return <File className="h-6 w-6" />
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

  const handleDownload = () => {
    if (currentEvidence) {
      const link = document.createElement("a")
      link.href = currentEvidence.file_url
      link.download = currentEvidence.file_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading evidence...</div>
      </div>
    )
  }

  if (!currentEvidence) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Evidence not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{currentEvidence.file_name}</h1>
            <p className="text-muted-foreground">Evidence #{currentEvidence.id}</p>
          </div>
        </div>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>File Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {currentEvidence.file_type.startsWith("image/") ? (
                <img
                  src={currentEvidence.file_url || "/placeholder.svg"}
                  alt={currentEvidence.file_name}
                  className="w-full max-h-96 object-contain rounded border"
                />
              ) : (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    {getFileIcon(currentEvidence.file_type)}
                    <p className="mt-2 text-muted-foreground">Preview not available for this file type</p>
                    <Button variant="outline" onClick={handleDownload} className="mt-4 bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Download to View
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <ChainOfCustody entries={chainOfCustody[evidenceId] || []} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>File Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">File Type</label>
                <div className="mt-1">
                  <Badge className={getFileTypeColor(currentEvidence.file_type)} variant="secondary">
                    {currentEvidence.file_type}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">File Size</label>
                <div className="flex items-center gap-2 mt-1">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span>{formatFileSize(currentEvidence.file_size)}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <p className="text-muted-foreground mt-1">{currentEvidence.description || "No description provided"}</p>
              </div>

              {currentEvidence.hash && (
                <div>
                  <label className="text-sm font-medium">File Hash</label>
                  <p className="text-xs text-muted-foreground mt-1 font-mono break-all">{currentEvidence.hash}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium">Uploaded</p>
                  <p className="text-muted-foreground">{format(new Date(currentEvidence.created_at), "PPP")}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(currentEvidence.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>

              {currentEvidence.uploaded_by && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Uploaded By</p>
                    <p className="text-muted-foreground">{currentEvidence.uploaded_by}</p>
                  </div>
                </div>
              )}

              {currentEvidence.updated_at !== currentEvidence.created_at && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Last Modified</p>
                    <p className="text-muted-foreground">{format(new Date(currentEvidence.updated_at), "PPP")}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(currentEvidence.updated_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
