"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import CardTrackingPanel from "@/components/admin/card-tracking-panel"
import { Package, CreditCard, Truck, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function CardTrackingPage() {
  const [cardOrders, setCardOrders] = useState([])

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCardOrders = localStorage.getItem("physicalCardOrders")
      if (storedCardOrders) {
        try {
          const parsedOrders = JSON.parse(storedCardOrders)
          setCardOrders(parsedOrders)
        } catch (error) {
          console.error("Error parsing card orders:", error)
        }
      }
    }
  }, [])

  const getStatusCounts = () => {
    return {
      total: cardOrders.length,
      processing: cardOrders.filter((order) => order.status === "processing").length,
      shipped: cardOrders.filter((order) => order.status === "shipped").length,
      delivered: cardOrders.filter((order) => order.status === "delivered").length,
    }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <SidebarInset className="content-area">
          {/* Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Card Tracking</h1>
                  <p className="text-sm text-gray-500">Monitor physical UCFSIN card orders and delivery status</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Total Orders: {statusCounts.total}
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    Processing: {statusCounts.processing}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-3xl font-bold text-gray-900">{statusCounts.total}</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Processing</p>
                      <p className="text-3xl font-bold text-gray-900">{statusCounts.processing}</p>
                    </div>
                    <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Shipped</p>
                      <p className="text-3xl font-bold text-gray-900">{statusCounts.shipped}</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Delivered</p>
                      <p className="text-3xl font-bold text-gray-900">{statusCounts.delivered}</p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Card Tracking Panel */}
            <CardTrackingPanel />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
