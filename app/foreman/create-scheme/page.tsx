"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ForemanSidebar } from "@/components/foreman/foreman-sidebar"
import { CreateSchemeForm } from "@/components/foreman/create-scheme-form"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function CreateSchemePage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <ForemanSidebar />
        <SidebarInset className="flex-1 bg-gray-50">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/foreman">Foreman Portal</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Create Scheme</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <div className="flex-1 p-6">
            <CreateSchemeForm />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
