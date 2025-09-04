'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  reduxFetchReportEvidence,
  reduxFetchEvidenceById,
} from '@/store/actions/evidence'
import { reduxFetchCrimeReports } from '@/store/actions/crime-reports'
import { EvidenceList } from '@/components/evidence/evidence-list'
import { EvidenceUpload } from '@/components/evidence/evidence-upload'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, List, Filter } from 'lucide-react'

export default function EvidencePage() {
  const dispatch = useAppDispatch()
  const { reportEvidence, loading } = useAppSelector((state) => state.evidence)
  const { reports } = useAppSelector((state) => state.crimeReports)

  const [selectedReportId, setSelectedReportId] = useState<string>('')
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    // Fetch reports for the dropdown
    dispatch(reduxFetchCrimeReports({ limit: 100 }))
  }, [dispatch])

  useEffect(() => {
    if (selectedReportId) {
      dispatch(reduxFetchEvidenceById(selectedReportId))
    }
  }, [dispatch, selectedReportId, refreshTrigger])

  const handleUploadComplete = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleEvidenceDeleted = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  const currentEvidence = selectedReportId
    ? reportEvidence[selectedReportId] || []
    : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Evidence Management
        </h1>
        <p className="text-muted-foreground">
          Upload, manage, and track evidence files for crime reports.
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <Select
                value={selectedReportId}
                onValueChange={setSelectedReportId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a crime report to view evidence" />
                </SelectTrigger>
                <SelectContent>
                  {reports.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.title} (#{report.id.slice(0, 8)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedReportId && (
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Evidence List
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Evidence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">Loading evidence...</div>
              </div>
            ) : (
              <EvidenceList
                evidence={currentEvidence}
                onEvidenceDeleted={handleEvidenceDeleted}
              />
            )}
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <EvidenceUpload
              reportId={selectedReportId}
              onUploadComplete={handleUploadComplete}
            />
          </TabsContent>
        </Tabs>
      )}

      {!selectedReportId && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <Upload className="mx-auto h-12 w-12 mb-4" />
              <p className="text-lg font-medium mb-2">Select a Crime Report</p>
              <p>
                Choose a crime report from the dropdown above to view and manage
                its evidence files.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
