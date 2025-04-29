"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import Header from "@/components/layout/header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <Header />
        <main className="min-h-screen bg-background">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
