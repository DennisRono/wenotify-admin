'use client'

import { useState } from 'react'
import { useAppDispatch } from '@/store/hooks'
import {
  reduxDeleteCrimeReport,
  reduxUpdateCrimeReportStatus,
} from '@/store/actions/crime-reports'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import type {
  CrimeReportResponse,
  CrimeReportStatusUpdate,
} from '@/types/crime-report'
import { ReportStatus } from '@/types/api'

interface ReportsTableProps {
  reports: CrimeReportResponse[]
}

export function ReportsTable({ reports }: ReportsTableProps) {
  const dispatch = useAppDispatch()
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>(
    {}
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'under_investigation':
        return 'bg-blue-100 text-blue-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: number | null | undefined) => {
    if (priority === null) return 'bg-gray-100 text-gray-800'

    switch (priority) {
      case 5:
        return 'bg-red-100 text-red-800'
      case 4:
        return 'bg-orange-200 text-orange-900'
      case 3:
        return 'bg-orange-100 text-orange-800'
      case 2:
        return 'bg-yellow-100 text-yellow-800'
      case 1:
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleStatusUpdate = async (
    reportId: string,
    newStatus: ReportStatus
  ) => {
    setLoadingActions((prev) => ({ ...prev, [reportId]: true }))
    try {
      await dispatch(
        reduxUpdateCrimeReportStatus({ id: reportId, status: newStatus })
      )
    } finally {
      setLoadingActions((prev) => ({ ...prev, [reportId]: false }))
    }
  }

  const handleDelete = async (reportId: string) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setLoadingActions((prev) => ({ ...prev, [reportId]: true }))
      try {
        await dispatch(reduxDeleteCrimeReport(reportId))
      } finally {
        setLoadingActions((prev) => ({ ...prev, [reportId]: false }))
      }
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(reports) && reports.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No reports found
              </TableCell>
            </TableRow>
          ) : (
            Array.isArray(reports) &&
            reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/reports/${report.id}`}
                    className="hover:underline"
                  >
                    {report.title}
                  </Link>
                </TableCell>
                <TableCell>{report.category}</TableCell>
                <TableCell>
                  <Badge
                    className={getStatusColor(report.status)}
                    variant="secondary"
                  >
                    {report.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={getPriorityColor(report.priority_score)}
                    variant="secondary"
                  >
                    {report.priority_score}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {report.location?.address || 'N/A'}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(report.created_at), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={loadingActions[report.id]}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/reports/${report.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/reports/${report.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusUpdate(
                            report.id,
                            ReportStatus.UNDER_INVESTIGATION
                          )
                        }
                        disabled={report.status === 'under_investigation'}
                      >
                        Start Investigation
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusUpdate(report.id, ReportStatus.RESOLVED)
                        }
                        disabled={report.status === 'resolved'}
                      >
                        Mark Resolved
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(report.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
