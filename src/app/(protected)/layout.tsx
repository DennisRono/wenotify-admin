'use client'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import { useAuth } from '@/hooks/use-auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthProvider from '@/contexts/auth-provider'
import WenotiFyLoader from '@/components/shared/loader'

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.replace('/login')
    }
  }, [isLoading])

  if (isLoading) {
    return <WenotiFyLoader />
  }

  return (
    <AuthProvider>
      <SidebarProvider defaultOpen={false} className="gap-4 bg-transparent">
        <DashboardSidebar />
        <SidebarInset>
          <DashboardHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  )
}
