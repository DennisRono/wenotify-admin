"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"
import type { CrimeReportFilters } from "@/types/crime-report"

interface ReportFiltersProps {
  filters: CrimeReportFilters
  onFiltersChange: (filters: CrimeReportFilters) => void
  onClearFilters: () => void
}

export function ReportFilters({ filters, onFiltersChange, onClearFilters }: ReportFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (key: keyof CrimeReportFilters, value: string | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    })
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined && value !== "")

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search and Filter Toggle */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            {hasActiveFilters && (
              <Button variant="outline" onClick={onClearFilters} className="flex items-center gap-2 bg-transparent">
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>

          {/* Expanded Filters */}
          {isExpanded && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Select value={filters.status || ""} onValueChange={(value) => handleFilterChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="UNDER_INVESTIGATION">Under Investigation</SelectItem>
                  <SelectItem value="RESOLVED">Resolved</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.crime_type || ""}
                onValueChange={(value) => handleFilterChange("crime_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Crime Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="THEFT">Theft</SelectItem>
                  <SelectItem value="ASSAULT">Assault</SelectItem>
                  <SelectItem value="BURGLARY">Burglary</SelectItem>
                  <SelectItem value="VANDALISM">Vandalism</SelectItem>
                  <SelectItem value="FRAUD">Fraud</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.priority || ""} onValueChange={(value) => handleFilterChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="LOW">Low</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Location"
                value={filters.location || ""}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
