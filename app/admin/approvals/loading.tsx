import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function ApprovalsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <SidebarInset className="content-area">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-96" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>

            {/* Statistics Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-8 w-12" />
                      </div>
                      <Skeleton className="h-12 w-12 rounded-lg" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Category Breakdown Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-6 w-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs Skeleton */}
            <div className="w-full mb-6">
              <div className="grid w-full grid-cols-4 bg-white shadow-sm rounded-lg p-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 rounded-md" />
                ))}
              </div>
            </div>

            {/* Search and Filter Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Skeleton className="flex-1 h-10" />
              <Skeleton className="w-48 h-10" />
              <Skeleton className="w-48 h-10" />
            </div>

            {/* Table Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Table Header */}
                  <div className="grid grid-cols-6 gap-4 pb-2 border-b">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>

                  {/* Table Rows */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-6 gap-4 py-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-32 mb-1" />
                          <Skeleton className="h-3 w-24 mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
