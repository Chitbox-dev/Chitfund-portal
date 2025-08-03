"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Plus, Eye, Edit, Search, Download, Upload, CheckCircle, Clock, AlertTriangle } from "lucide-react"

interface Subscriber {
  id: string
  name: string
  ucfsin: string
  ticketNumber: number
  enrollmentDate: string
  status: "active" | "inactive" | "suspended"
  paymentStatus: "current" | "overdue" | "paid"
  totalPaid: number
  pendingAmount: number
  contactNumber: string
  email: string
}

export function SubscriberListManager({ schemeId }: { schemeId: string }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    generateRandomSubscribers()
  }, [schemeId])

  const generateRandomUCFSIN = () => {
    const states = ["KA", "TN", "MH", "DL", "UP"]
    const state = states[Math.floor(Math.random() * states.length)]
    const pan = Math.random().toString(36).substring(2, 5).toUpperCase()
    const random = Math.floor(Math.random() * 999)
      .toString()
      .padStart(3, "0")
    const aadhar = Math.floor(Math.random() * 999)
      .toString()
      .padStart(3, "0")
    return `${state}-${pan}-${random}-${aadhar}`
  }

  const generateRandomSubscribers = () => {
    const names = [
      "Anita Sharma",
      "Ravi Kumar",
      "Meera Patel",
      "Suresh Reddy",
      "Priya Singh",
      "Amit Gupta",
      "Kavya Nair",
      "Rajesh Verma",
      "Deepika Joshi",
      "Vikram Rao",
      "Sunita Agarwal",
      "Manoj Tiwari",
      "Rekha Iyer",
      "Ashok Pandey",
      "Geeta Saxena",
      "Ramesh Chandra",
      "Pooja Malhotra",
      "Sanjay Kapoor",
      "Neha Srivastava",
      "Kiran Jain",
    ]

    const sampleSubscribers: Subscriber[] = names.map((name, index) => ({
      id: `SUB${(index + 1).toString().padStart(3, "0")}`,
      name,
      ucfsin: generateRandomUCFSIN(),
      ticketNumber: 1100 + index + 1,
      enrollmentDate: new Date(2025, 0, Math.floor(Math.random() * 30) + 1).toLocaleDateString(),
      status: Math.random() > 0.1 ? "active" : Math.random() > 0.5 ? "inactive" : "suspended",
      paymentStatus: Math.random() > 0.2 ? "current" : Math.random() > 0.5 ? "paid" : "overdue",
      totalPaid: Math.floor(Math.random() * 50000) + 10000,
      pendingAmount: Math.random() > 0.7 ? Math.floor(Math.random() * 5000) : 0,
      contactNumber: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      email: `${name.toLowerCase().replace(" ", ".")}@email.com`,
    }))

    setSubscribers(sampleSubscribers)
  }

  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch =
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.ucfsin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.ticketNumber.toString().includes(searchTerm)

    const matchesStatus = statusFilter === "all" || subscriber.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "suspended":
        return "bg-red-100 text-red-800 border-red-300"
      case "current":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "paid":
        return "bg-green-100 text-green-800 border-green-300"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "current":
      case "paid":
        return <CheckCircle className="h-4 w-4" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const stats = {
    total: subscribers.length,
    active: subscribers.filter((s) => s.status === "active").length,
    inactive: subscribers.filter((s) => s.status === "inactive").length,
    overdue: subscribers.filter((s) => s.paymentStatus === "overdue").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Subscriber Management</h2>
          <p className="text-gray-600">Manage subscribers enrolled in your schemes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Subscribers
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Subscriber
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Subscriber</DialogTitle>
                <DialogDescription>Add a new subscriber to the scheme</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subscriber-name">Full Name</Label>
                  <Input id="subscriber-name" placeholder="Enter subscriber name" />
                </div>
                <div>
                  <Label htmlFor="subscriber-ucfsin">UCFSIN</Label>
                  <Input id="subscriber-ucfsin" placeholder="KA-ABC-123-456" />
                </div>
                <div>
                  <Label htmlFor="subscriber-contact">Contact Number</Label>
                  <Input id="subscriber-contact" placeholder="+91 9876543210" />
                </div>
                <div>
                  <Label htmlFor="subscriber-email">Email Address</Label>
                  <Input id="subscriber-email" type="email" placeholder="subscriber@email.com" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>Add Subscriber</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-3xl font-bold text-gray-900">{stats.inactive}</p>
              </div>
              <Clock className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-3xl font-bold text-gray-900">{stats.overdue}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, UCFSIN, or ticket number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Subscribers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subscriber List ({filteredSubscribers.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket #</TableHead>
                <TableHead>Subscriber Details</TableHead>
                <TableHead>UCFSIN</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Amount Details</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell>
                    <div className="font-mono bg-blue-100 px-2 py-1 rounded text-center w-16">
                      {subscriber.ticketNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{subscriber.name}</div>
                      <div className="text-sm text-gray-500">{subscriber.contactNumber}</div>
                      <div className="text-xs text-gray-400">{subscriber.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{subscriber.ucfsin}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{subscriber.enrollmentDate}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(subscriber.status)}>
                      {getStatusIcon(subscriber.status)}
                      <span className="ml-1">{subscriber.status.toUpperCase()}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(subscriber.paymentStatus)}>
                      {getStatusIcon(subscriber.paymentStatus)}
                      <span className="ml-1">{subscriber.paymentStatus.toUpperCase()}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>Paid: ₹{subscriber.totalPaid.toLocaleString()}</div>
                      {subscriber.pendingAmount > 0 && (
                        <div className="text-red-600">Pending: ₹{subscriber.pendingAmount.toLocaleString()}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedSubscriber(subscriber)}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Subscriber Details Dialog */}
      {selectedSubscriber && (
        <Dialog open={!!selectedSubscriber} onOpenChange={() => setSelectedSubscriber(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Subscriber Details - {selectedSubscriber.name}</DialogTitle>
              <DialogDescription>
                UCFSIN: {selectedSubscriber.ucfsin} | Ticket: {selectedSubscriber.ticketNumber}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Personal Information</Label>
                    <div className="mt-1 space-y-1 text-sm">
                      <p>
                        <strong>Name:</strong> {selectedSubscriber.name}
                      </p>
                      <p>
                        <strong>Contact:</strong> {selectedSubscriber.contactNumber}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedSubscriber.email}
                      </p>
                      <p>
                        <strong>UCFSIN:</strong> {selectedSubscriber.ucfsin}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Scheme Information</Label>
                    <div className="mt-1 space-y-1 text-sm">
                      <p>
                        <strong>Ticket Number:</strong> {selectedSubscriber.ticketNumber}
                      </p>
                      <p>
                        <strong>Enrollment Date:</strong> {selectedSubscriber.enrollmentDate}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <Badge className={`ml-2 ${getStatusColor(selectedSubscriber.status)}`}>
                          {selectedSubscriber.status}
                        </Badge>
                      </p>
                      <p>
                        <strong>Payment Status:</strong>
                        <Badge className={`ml-2 ${getStatusColor(selectedSubscriber.paymentStatus)}`}>
                          {selectedSubscriber.paymentStatus}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Payment Summary</Label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-green-600">Total Paid</p>
                        <p className="text-xl font-bold text-green-900">
                          ₹{selectedSubscriber.totalPaid.toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-red-600">Pending Amount</p>
                        <p className="text-xl font-bold text-red-900">
                          ₹{selectedSubscriber.pendingAmount.toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
