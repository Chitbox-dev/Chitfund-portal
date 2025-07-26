"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Package, Search, Edit, Truck, CheckCircle, AlertCircle, FileText } from "lucide-react"

const trackingStatuses = [
  { value: "payment_confirmed", label: "Payment Confirmed", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  { value: "card_printed", label: "Card Printed", color: "bg-purple-100 text-purple-800", icon: FileText },
  { value: "dispatched", label: "Dispatched", color: "bg-orange-100 text-orange-800", icon: Package },
  { value: "in_transit", label: "In Transit", color: "bg-yellow-100 text-yellow-800", icon: Truck },
  { value: "out_for_delivery", label: "Out for Delivery", color: "bg-indigo-100 text-indigo-800", icon: Truck },
  { value: "delivered", label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
  { value: "failed_delivery", label: "Failed Delivery", color: "bg-red-100 text-red-800", icon: AlertCircle },
  { value: "returned", label: "Returned", color: "bg-gray-100 text-gray-800", icon: AlertCircle },
]

const courierServices = ["Postman India", "BlueDart", "DTDC", "Delhivery", "Ecom Express", "FedEx", "DHL", "Other"]

export default function CardTrackingPanel() {
  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [updateForm, setUpdateForm] = useState({
    status: "",
    description: "",
    location: "",
    trackingNumber: "",
    courierService: "",
  })

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem("physicalCardOrders") || "[]")
    setOrders(savedOrders)
  }

  const getStatusInfo = (status) => {
    return trackingStatuses.find((s) => s.value === status) || trackingStatuses[0]
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.ucfsinNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.currentStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleUpdateTracking = (order) => {
    setSelectedOrder(order)
    setUpdateForm({
      status: order.currentStatus,
      description: "",
      location: "",
      trackingNumber: order.trackingNumber || "",
      courierService: order.courierService || "",
    })
    setIsUpdateDialogOpen(true)
  }

  const submitTrackingUpdate = () => {
    if (!selectedOrder || !updateForm.status) return

    const updatedOrders = orders.map((order) => {
      if (order.orderId === selectedOrder.orderId) {
        const newTrackingEntry = {
          id: Date.now().toString(),
          status: updateForm.status,
          description: updateForm.description || getStatusInfo(updateForm.status).label,
          timestamp: new Date().toISOString(),
          location: updateForm.location || "Processing Center",
        }

        return {
          ...order,
          currentStatus: updateForm.status,
          lastUpdated: new Date().toISOString(),
          trackingNumber: updateForm.trackingNumber || order.trackingNumber,
          courierService: updateForm.courierService || order.courierService,
          trackingHistory: [newTrackingEntry, ...(order.trackingHistory || [])],
        }
      }
      return order
    })

    setOrders(updatedOrders)
    localStorage.setItem("physicalCardOrders", JSON.stringify(updatedOrders))
    setIsUpdateDialogOpen(false)
    setSelectedOrder(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Physical Card Tracking</h2>
          <p className="text-gray-600">Manage and track physical UCFSIN card deliveries</p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          {orders.length} Total Orders
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="search">Search Orders</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search"
              placeholder="Search by Order ID, Name, or UCFSIN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="status-filter">Filter by Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {trackingStatuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Physical Card Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Physical card orders will appear here when users request them"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Details</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Courier</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => {
                  const statusInfo = getStatusInfo(order.currentStatus)
                  const StatusIcon = statusInfo.icon
                  return (
                    <TableRow key={order.orderId}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.orderId}</p>
                          <p className="text-sm text-gray-500">{order.ucfsinNumber}</p>
                          {order.trackingNumber && (
                            <p className="text-xs text-blue-600 font-mono">{order.trackingNumber}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.holderName}</p>
                          <p className="text-sm text-gray-500">{order.email}</p>
                          <p className="text-sm text-gray-500">{order.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusInfo.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{order.courierService || "Not Assigned"}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">
                          {new Date(order.lastUpdated).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateTracking(order)}
                          className="gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Update Tracking Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Tracking Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={updateForm.status}
                onValueChange={(value) => setUpdateForm({ ...updateForm, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {trackingStatuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter status description..."
                value={updateForm.description}
                onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Current location..."
                value={updateForm.location}
                onChange={(e) => setUpdateForm({ ...updateForm, location: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="trackingNumber">Tracking Number</Label>
              <Input
                id="trackingNumber"
                placeholder="Enter tracking number..."
                value={updateForm.trackingNumber}
                onChange={(e) => setUpdateForm({ ...updateForm, trackingNumber: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="courierService">Courier Service</Label>
              <Select
                value={updateForm.courierService}
                onValueChange={(value) => setUpdateForm({ ...updateForm, courierService: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select courier service" />
                </SelectTrigger>
                <SelectContent>
                  {courierServices.map((courier) => (
                    <SelectItem key={courier} value={courier}>
                      {courier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={submitTrackingUpdate} className="flex-1">
                Update Status
              </Button>
              <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
