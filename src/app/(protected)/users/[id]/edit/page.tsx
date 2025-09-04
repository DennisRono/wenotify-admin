"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { reduxFetchUserById, reduxUpdateUserProfile } from "@/store/actions/users"
import { UserForm } from "@/components/users/user-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { UserCreate } from "@/types/user"

export default function EditUserPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentUser, loading } = useAppSelector((state) => state.users)

  const userId = params.id as string

  useEffect(() => {
    if (userId) {
      dispatch(reduxFetchUserById(userId))
    }
  }, [dispatch, userId])

  const handleSubmit = async (data: UserCreate) => {
    try {
      const result = await dispatch(reduxUpdateUserProfile(data))
      if (result.meta.requestStatus === "fulfilled") {
        router.push(`/users/${userId}`)
      }
    } catch (error) {
      console.error("Failed to update user:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading user...</div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">User not found</div>
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
          <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
          <p className="text-muted-foreground">
            Update profile information for {currentUser.first_name} {currentUser.last_name}
          </p>
        </div>
      </div>

      <UserForm initialData={currentUser} onSubmit={handleSubmit} isLoading={loading} />
    </div>
  )
}
