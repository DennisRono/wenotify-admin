"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { reduxFetchCrimeReports } from "@/store/actions/crime-reports"
import { ReportsTable } from "@/components/reports/reports-table"
import { ReportFilters } from "@/components/reports/report-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import type { CrimeReportFilters } from "@/types/crime-report"
import { useSelector } from "react-redux"
import { selectReports } from "@/store/selectors/reports"

export default function ReportsPage() {
  const dispatch = useAppDispatch()
  const {reports, reportsLoading: loading, totalReports, pageSize} = useSelector(selectReports)

  const [filters, setFilters] = useState<CrimeReportFilters>({})
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(
      reduxFetchCrimeReports({
        page: currentPage,
        limit: 20,
        ...filters,
      }),
    )
  }, [dispatch, currentPage, filters])

  const handleFiltersChange = (newFilters: CrimeReportFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleClearFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crime Reports</h1>
          <p className="text-muted-foreground">Manage and track all crime reports in the system.</p>
        </div>
        <Link href="/reports/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </Link>
      </div>

      <ReportFilters filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={handleClearFilters} />

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading reports...</div>
        </div>
      ) : (
        <>
          <ReportsTable reports={reports} />

          {totalReports > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * 20 + 1} to {Math.min(currentPage * 20, totalReports)} of{" "}
                {totalReports} reports
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalReports}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
