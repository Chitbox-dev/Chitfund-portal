"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Upload,
  Download,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react"

interface MonthlyReportCard {
  id: string
  chitId: string
  date: string
  month: string
  year: number
  progress: string
  currentMonth: number
  totalMonths: number
  status: "pending" | "current" | "completed" | "upcoming"
  reports: {
    subscriberPayment: "not_due" | "pending" | "uploaded" | "approved"
    monthlyAuction: "not_due" | "pending" | "uploaded" | "approved"
    dividendDistribution: "not_due" | "pending" | "uploaded" | "approved"
    payoutTransaction: "not_due" | "pending" | "uploaded" | "approved"
  }
  auctionDetails?: {
    date: string
    winnerName: string
    winnerTicket: string
    bidAmount: number
    commission: number
  }
  paymentDetails?: {
    totalCollected: number
    pendingAmount: number
    collectionRate: number
  }
}

interface Subscriber {
  id: string
  name: string
  ucfsin: string
  ticketNumber: number
  amount: number
  actualPaid: number
  paymentType: "cash" | "credit" | "debit" | "upi" | "cheque" | "netbanking"
  transactionId?: string
  status: "paid" | "pending" | "overdue"
  remarks?: string
}

export function MonthlyReportGenerator({
  schemeId,
  schemeName,
  totalMonths,
  currentMonth,
}: {
  schemeId: string
  schemeName: string
  totalMonths: number
  currentMonth: number
}) {
  const [reportCards, setReportCards] = useState<MonthlyReportCard[]>([])
  const [selectedReport, setSelectedReport] = useState<MonthlyReportCard | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadType, setUploadType] = useState<string>("")
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])

  useEffect(() => {
    generateMonthlyReportCards()
    generateSampleSubscribers()
  }, [schemeId, totalMonths, currentMonth])

  const generateMonthlyReportCards = () => {
    const cards: MonthlyReportCard[] = []
    const startDate = new Date("2025-01-01")

    for (let i = 1; i <= totalMonths; i++) {
      const reportDate = new Date(startDate)
      reportDate.setMonth(reportDate.getMonth() + (i - 1))

      const status = i < currentMonth ? "completed" : i === currentMonth ? "current" : "upcoming"

      cards.push({
        id: `${schemeId}-${i}`,
        chitId: schemeId,
        date: reportDate.toLocaleDateString(),
        month: reportDate.toLocaleDateString("en-US", { month: "long" }),
        year: reportDate.getFullYear(),
        progress: `${i}/${totalMonths}`,
        currentMonth: i,
        totalMonths: totalMonths,
        status: status,
        reports: {
          subscriberPayment: i < currentMonth ? "approved" : i === currentMonth ? "pending" : "not_due",
          monthlyAuction: i < currentMonth ? "approved" : i === currentMonth ? "pending" : "not_due",
          dividendDistribution: i < currentMonth ? "approved" : i === currentMonth ? "pending" : "not_due",
          payoutTransaction: i < currentMonth ? "approved" : i === currentMonth ? "pending" : "not_due",
        },
        auctionDetails:
          i <= currentMonth
            ? {
                date: new Date(reportDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                winnerName: `Winner ${i}`,
                winnerTicket: `${1100 + i}`,
                bidAmount: 85000 - i * 1000,
                commission: (85000 - i * 1000) * 0.1,
              }
            : undefined,
        paymentDetails:
          i <= currentMonth
            ? {
                totalCollected: 200000,
                pendingAmount: 15000,
                collectionRate: 92.5,
              }
            : undefined,
      })
    }

    setReportCards(cards)
  }

  const generateSampleSubscribers = () => {
    const sampleSubscribers: Subscriber[] = [
      {
        id: "1",
        name: "Anita Sharma",
        ucfsin: "KA-HSD-7A2-978",
        ticketNumber: 1113,
        amount: 10000,
        actualPaid: 10000,
        paymentType: "upi",
        transactionId: "UPI123456789",
        status: "paid",
      },
      {
        id: "2",
        name: "Ravi Kumar",
        ucfsin: "KA-ABC-1B3-456",
        ticketNumber: 1114,
        amount: 10000,
        actualPaid: 10000,
        paymentType: "netbanking",
        transactionId: "NB987654321",
        status: "paid",
      },
      {
        id: "3",
        name: "Meera Patel",
        ucfsin: "KA-DEF-2C4-789",
        ticketNumber: 1115,
        amount: 10000,
        actualPaid: 0,
        paymentType: "pending",
        status: "pending",
        remarks: "Payment due",
      },
    ]
    setSubscribers(sampleSubscribers)
  }

  const handleUploadReport = (reportId: string, reportType: string, file: File) => {
    setReportCards((prev) =>
      prev.map((card) =>
        card.id === reportId
          ? {
              ...card,
              reports: {
                ...card.reports,
                [reportType]: "uploaded",
              },
            }
          : card,
      ),
    )
    setIsUploadDialogOpen(false)
    alert(`${reportType.replace(/([A-Z])/g, " $1").toLowerCase()} report uploaded successfully!`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300"
      case "uploaded":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "not_due":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "uploaded":
        return <FileText className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "not_due":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Monthly Report Cards</h2>
          <p className="text-gray-600">
            Scheme: {schemeName} ({schemeId})
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All Reports
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscriber-payments">Subscriber Payments</TabsTrigger>
          <TabsTrigger value="auction-reports">Auction Reports</TabsTrigger>
          <TabsTrigger value="dividend-reports">Dividend Reports</TabsTrigger>
          <TabsTrigger value="payout-reports">Payout Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Months</p>
                    <p className="text-3xl font-bold text-gray-900">{totalMonths}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Month</p>
                    <p className="text-3xl font-bold text-gray-900">{currentMonth}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-3xl font-bold text-gray-900">{currentMonth - 1}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Remaining</p>
                    <p className="text-3xl font-bold text-gray-900">{totalMonths - currentMonth + 1}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Report Cards</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chit ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Month/Year</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportCards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell>
                        <div className="font-mono text-sm">{card.chitId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{card.date}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {card.month} {card.year}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{card.progress}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(card.status)}>
                          {getStatusIcon(card.status)}
                          <span className="ml-1">{card.status.toUpperCase()}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSelectedReport(card)}>
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          {card.status === "current" && (
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3 mr-1" />
                              Update
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriber-payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Subscriber Monthly Payment Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-blue-600">Total Subscribers</p>
                        <p className="text-2xl font-bold text-blue-900">20</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-green-600">Amount Collected</p>
                        <p className="text-2xl font-bold text-green-900">₹2,00,000</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-yellow-600">Pending Amount</p>
                        <p className="text-2xl font-bold text-yellow-900">₹15,000</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member Name</TableHead>
                      <TableHead>UCFSIN</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actual Paid</TableHead>
                      <TableHead>Payment Type</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell className="font-medium">{subscriber.name}</TableCell>
                        <TableCell>
                          <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{subscriber.ucfsin}</div>
                        </TableCell>
                        <TableCell>₹{subscriber.amount.toLocaleString()}</TableCell>
                        <TableCell>₹{subscriber.actualPaid.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{subscriber.paymentType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-xs">{subscriber.transactionId || "-"}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(subscriber.status)}>{subscriber.status}</Badge>
                        </TableCell>
                        <TableCell>{subscriber.remarks || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setUploadType("subscriberPayment")}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Report
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Subscriber Payment Report</DialogTitle>
                        <DialogDescription>
                          Upload the monthly subscriber payment report in PDF format
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="report-file">Select PDF File</Label>
                          <Input
                            id="report-file"
                            type="file"
                            accept=".pdf"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file && selectedReport) {
                                handleUploadReport(selectedReport.id, uploadType, file)
                              }
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="report-comments">Comments</Label>
                          <Textarea id="report-comments" placeholder="Add any comments about this report..." rows={3} />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auction-reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Monthly Auction Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-04%20at%202.47.44%E2%80%AFAM-cRhmcsIcCweqbwO9ObhUJY4uPoPaEv.png"
                    alt="Auction Report Sample"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total Subscribers</TableHead>
                      <TableHead>Chit Amount</TableHead>
                      <TableHead>Winning Ticket</TableHead>
                      <TableHead>Winner Name</TableHead>
                      <TableHead>Bid Amount</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportCards
                      .filter((card) => card.auctionDetails)
                      .map((card) => (
                        <TableRow key={card.id}>
                          <TableCell>{card.month}</TableCell>
                          <TableCell>{card.auctionDetails?.date}</TableCell>
                          <TableCell>20</TableCell>
                          <TableCell>₹3,00,000</TableCell>
                          <TableCell>
                            <div className="font-mono bg-blue-100 px-2 py-1 rounded text-center">
                              {card.auctionDetails?.winnerTicket}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{card.auctionDetails?.winnerName}</TableCell>
                          <TableCell>₹{card.auctionDetails?.bidAmount.toLocaleString()}</TableCell>
                          <TableCell>₹{card.auctionDetails?.commission.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Upload className="h-3 w-3 mr-1" />
                                Upload
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dividend-reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Dividend Distribution Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-green-600">Total Dividend</p>
                        <p className="text-2xl font-bold text-green-900">₹71,500</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-blue-600">Base Dividend</p>
                        <p className="text-2xl font-bold text-blue-900">₹60,000</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-yellow-600">Golden Trigger</p>
                        <p className="text-2xl font-bold text-yellow-900">₹11,500</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-purple-600">Final Amount</p>
                        <p className="text-2xl font-bold text-purple-900">₹71,500</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payout-reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Payout Transaction Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 mb-2">
                    Track actual disbursement of funds with transaction details and payment modes.
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Details Dialog */}
      {selectedReport && (
        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                Report Details - {selectedReport.month} {selectedReport.year}
              </DialogTitle>
              <DialogDescription>
                Chit ID: {selectedReport.chitId} | Progress: {selectedReport.progress}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Report Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subscriber Payment:</span>
                      <Badge className={getStatusColor(selectedReport.reports.subscriberPayment)}>
                        {selectedReport.reports.subscriberPayment}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Auction:</span>
                      <Badge className={getStatusColor(selectedReport.reports.monthlyAuction)}>
                        {selectedReport.reports.monthlyAuction}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Dividend Distribution:</span>
                      <Badge className={getStatusColor(selectedReport.reports.dividendDistribution)}>
                        {selectedReport.reports.dividendDistribution}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Payout Transaction:</span>
                      <Badge className={getStatusColor(selectedReport.reports.payoutTransaction)}>
                        {selectedReport.reports.payoutTransaction}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Auction Details</h4>
                  {selectedReport.auctionDetails ? (
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Date:</strong> {selectedReport.auctionDetails.date}
                      </p>
                      <p>
                        <strong>Winner:</strong> {selectedReport.auctionDetails.winnerName}
                      </p>
                      <p>
                        <strong>Ticket:</strong> {selectedReport.auctionDetails.winnerTicket}
                      </p>
                      <p>
                        <strong>Bid Amount:</strong> ₹{selectedReport.auctionDetails.bidAmount.toLocaleString()}
                      </p>
                      <p>
                        <strong>Commission:</strong> ₹{selectedReport.auctionDetails.commission.toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Auction not yet conducted</p>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
