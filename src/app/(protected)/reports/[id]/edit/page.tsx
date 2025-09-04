"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { reduxFetchCrimeReportById, reduxUpdateCrimeReport } from "@/store/actions/crime-reports"
import { ReportForm } from "@/components/reports/report-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { CrimeReportCreate } from "@/types/crime-report"

export default function EditReportPage() {
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

  const handleSubmit = async (data: CrimeReportCreate) => {
    try {
      const result = await dispatch(reduxUpdateCrimeReport({id: reportId, data }))
      if (result.meta.requestStatus === "fulfilled") {
        router.push(`/reports/${reportId}`)
      }
    } catch (error) {
      console.error("Failed to update report:", error)
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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Report</h1>
          <p className="text-muted-foreground">Update the details for report #{currentReport.id}</p>
        </div>
      </div>

      <ReportForm initialData={currentReport} onSubmit={handleSubmit} isLoading={loading} />
    </div>
  )
}
