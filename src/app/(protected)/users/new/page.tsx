"use client"

import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store/hooks"
import { reduxRegisterUser } from "@/store/actions/users"
import { UserForm } from "@/components/users/user-form"
import type { UserCreate } from "@/types/user"

export default function NewUserPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data: UserCreate) => {
    try {
      const result = await dispatch(reduxRegisterUser(data))
      if (result.meta.requestStatus === "fulfilled") {
        router.push("/users")
      }
    } catch (error) {
      console.error("Failed to create user:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New User</h1>
        <p className="text-muted-foreground">Add a new user to the system with appropriate role and permissions.</p>
      </div>

      <UserForm onSubmit={handleSubmit} />
    </div>
  )
}
