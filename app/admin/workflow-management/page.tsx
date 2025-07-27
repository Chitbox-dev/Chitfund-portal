"use client"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { WorkflowManagement } from "@/components/admin/workflow-management"

export default function WorkflowManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <SidebarInset className="content-area">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <WorkflowManagement />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
