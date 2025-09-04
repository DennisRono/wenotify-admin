"use client"

import { useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { reduxExportAnalyticsData } from "@/store/actions/analytics"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, BarChart3 } from "lucide-react"

export function ExportControls() {
  const dispatch = useAppDispatch()
  const [exportType, setExportType] = useState<string>("")
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    if (!exportType) return

    setIsExporting(true)
    try {
      await dispatch(reduxExportAnalyticsData({ format: exportType as "PDF" | "CSV" | "EXCEL" }))
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select value={exportType} onValueChange={setExportType}>
            <SelectTrigger>
              <SelectValue placeholder="Select export format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PDF">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  PDF Report
                </div>
              </SelectItem>
              <SelectItem value="CSV">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  CSV Data
                </div>
              </SelectItem>
              <SelectItem value="EXCEL">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Excel Spreadsheet
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleExport} disabled={!exportType || isExporting} className="w-full">
            {isExporting ? "Exporting..." : "Export Data"}
          </Button>

          <div className="text-xs text-muted-foreground">
            <p>Export includes:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Crime statistics and trends</li>
              <li>Hotspot analysis data</li>
              <li>Performance metrics</li>
              <li>Predictive analysis results</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
