"use client"

import type React from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import ProtectedRoute from "@/components/auth/protected-route"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute allowedUserTypes={["company"]} redirectTo="/access-denied">
      <div className="min-h-screen bg-gray-50">
        <SidebarProvider defaultOpen={true}>
          <AdminSidebar />
          <main className="flex-1">{children}</main>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  )
}
