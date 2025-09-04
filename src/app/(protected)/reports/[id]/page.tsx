"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { reduxFetchCrimeReportById } from "@/store/actions/crime-reports"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, ArrowLeft, MapPin, Calendar } from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import Link from "next/link"

export default function ReportDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentReport, loading } = useAppSelector((state) => state.crimeReports)

  const reportId = params.id as string

  useEffect(() => {
    if (reportId) {
      dispatch(reduxFetchCrimeReportById(reportId))
    }
  }, [dispatch, reportId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "UNDER_INVESTIGATION":
        return "bg-blue-100 text-blue-800"
      case "RESOLVED":
        return "bg-green-100 text-green-800"
      case "CLOSED":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading report...</div>
      </div>
    )
  }

  if (!currentReport) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Report not found</div>
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
            <h1 className="text-3xl font-bold tracking-tight">{currentReport.title}</h1>
            <p className="text-muted-foreground">Report #{currentReport.id}</p>
          </div>
        </div>
        <Link href={`/reports/${currentReport.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Report
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{currentReport.description}</p>
              </div>

              {currentReport.location && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </h3>
                  <p className="text-muted-foreground">{currentReport.location.address}</p>
                  {currentReport.location.latitude && currentReport.location.longitude && (
                    <p className="text-sm text-muted-foreground">
                      Coordinates: {currentReport.location.latitude}, {currentReport.location.longitude}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status & Priority</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <div className="mt-1">
                  <Badge className={getStatusColor(currentReport.status)} variant="secondary">
                    {currentReport.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Priority</label>
                <div className="mt-1">
                  <Badge className={getPriorityColor(currentReport.priority)} variant="secondary">
                    {currentReport.priority}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Crime Type</label>
                <p className="text-muted-foreground">{currentReport.crime_type}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium">Created</p>
                  <p className="text-muted-foreground">{format(new Date(currentReport.created_at), "PPP")}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(currentReport.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>

              {currentReport.updated_at !== currentReport.created_at && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Last Updated</p>
                    <p className="text-muted-foreground">{format(new Date(currentReport.updated_at), "PPP")}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(currentReport.updated_at), { addSuffix: true })}
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
