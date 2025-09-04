"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { reduxFetchUserProfile } from "@/store/actions/users"
import { UsersTable } from "@/components/users/users-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, Filter, X } from "lucide-react"
import Link from "next/link"
import type { UserFilters } from "@/types/user"

export default function UsersPage() {
  const dispatch = useAppDispatch()
  const { users, loading, pagination } = useAppSelector((state) => state.users)

  const [filters, setFilters] = useState<UserFilters>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false)

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: currentPage,
        limit: 20,
        ...filters,
      }),
    )
  }, [dispatch, currentPage, filters])

  const handleFiltersChange = (key: keyof UserFilters, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleClearFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined && value !== "")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage system users, roles, and permissions.</p>
        </div>
        <Link href="/users/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New User
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Search and Filter Toggle */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={filters.search || ""}
                  onChange={(e) => handleFiltersChange("search", e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>

            {/* Expanded Filters */}
            {isFiltersExpanded && (
              <div className="grid gap-4 md:grid-cols-3">
                <Select value={filters.role || ""} onValueChange={(value) => handleFiltersChange("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Administrator</SelectItem>
                    <SelectItem value="OFFICER">Officer</SelectItem>
                    <SelectItem value="ANALYST">Analyst</SelectItem>
                    <SelectItem value="CITIZEN">Citizen</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.is_active?.toString() || ""}
                  onValueChange={(value) => handleFiltersChange("is_active", value ? value === "true" : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Filter by email domain"
                  value={filters.email || ""}
                  onChange={(e) => handleFiltersChange("email", e.target.value)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading users...</div>
        </div>
      ) : (
        <>
          <UsersTable users={users} onUserDeleted={() => setCurrentPage(1)} />

          {pagination && pagination.total_pages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * 20 + 1} to {Math.min(currentPage * 20, pagination.total_items)} of{" "}
                {pagination.total_items} users
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === pagination.total_pages}
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
