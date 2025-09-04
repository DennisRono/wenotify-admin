"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { reduxFetchUserById } from "@/store/actions/users"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Edit, Mail, Phone, Calendar, Shield, ShieldCheck } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"
import Link from "next/link"

export default function UserProfilePage() {
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

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "officer":
        return "bg-blue-100 text-blue-800"
      case "analyst":
        return "bg-green-100 text-green-800"
      case "citizen":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <ShieldCheck className="h-4 w-4" />
      case "officer":
        return <Shield className="h-4 w-4" />
      default:
        return null
    }
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading user profile...</div>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {currentUser.first_name} {currentUser.last_name}
            </h1>
            <p className="text-muted-foreground">User Profile</p>
          </div>
        </div>
        <Link href={`/users/${currentUser.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={currentUser.avatar_url || undefined}
                    alt={`${currentUser.first_name} ${currentUser.last_name}`}
                  />
                  <AvatarFallback className="text-lg">
                    {getInitials(currentUser.first_name, currentUser.last_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">
                    {currentUser.first_name} {currentUser.last_name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getRoleColor(currentUser.role)} variant="secondary">
                      <div className="flex items-center gap-1">
                        {getRoleIcon(currentUser.role)}
                        {currentUser.role}
                      </div>
                    </Badge>
                    <Badge className={getStatusColor(currentUser.is_active)} variant="secondary">
                      {currentUser.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-muted-foreground">{currentUser.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-muted-foreground">{currentUser.phone_number}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium">Member Since</p>
                  <p className="text-muted-foreground">{format(new Date(currentUser.created_at), "PPP")}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(currentUser.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>

              {currentUser.last_login && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Last Login</p>
                    <p className="text-muted-foreground">{format(new Date(currentUser.last_login), "PPP")}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(currentUser.last_login), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )}

              {currentUser.updated_at !== currentUser.created_at && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Profile Updated</p>
                    <p className="text-muted-foreground">{format(new Date(currentUser.updated_at), "PPP")}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(currentUser.updated_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
