"use client"

import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/hooks"
import { reduxCreateCrimeReport } from "@/store/actions/crime-reports"
import { ReportForm } from "@/components/reports/report-form"
import type { CrimeReportCreate } from "@/types/crime-report"

export default function NewReportPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data: CrimeReportCreate) => {
    try {
      const result = await dispatch(reduxCreateCrimeReport(data))
      if (result.meta.requestStatus === "fulfilled") {
        router.push("/reports")
      }
    } catch (error) {
      console.error("Failed to create report:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Report</h1>
        <p className="text-muted-foreground">Fill out the form below to create a new crime report.</p>
      </div>

      <ReportForm onSubmit={handleSubmit} />
    </div>
  )
}
