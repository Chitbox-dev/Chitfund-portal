"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ForemanSidebar } from "@/components/foreman/foreman-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  ArrowLeft,
  Calendar,
  Users,
  DollarSign,
  FileText,
  Download,
  Edit,
  Upload,
  Clock,
  CheckCircle,
  Gavel,
  Phone,
  CreditCard,
  Share2,
  Globe,
  Settings,
} from "lucide-react"

export default function SchemeDetailsPage() {
  const params = useParams()
  const schemeId = params?.schemeId
  const [scheme, setScheme] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (schemeId) {
      loadSchemeDetails(schemeId)
    }
  }, [schemeId])

  const loadSchemeDetails = (id) => {
    try {
      // Check all possible locations for the scheme
      const pendingSchemes = JSON.parse(localStorage.getItem("pendingSchemes") || "[]")
      const approvedSchemes = JSON.parse(localStorage.getItem("approvedSchemes") || "[]")
      const liveSchemes = JSON.parse(localStorage.getItem("liveSchemes") || "[]")

      let foundScheme = null

      // Find scheme in any of the lists
      foundScheme =
        pendingSchemes.find((s) => s.schemeId === id) ||
        approvedSchemes.find((s) => s.schemeId === id) ||
        liveSchemes.find((s) => s.schemeId === id)

      // Also check draft
      if (!foundScheme) {
        const schemeDraft = localStorage.getItem("schemeDraft")
        if (schemeDraft) {
          const draft = JSON.parse(schemeDraft)
          if (draft.schemeId === id) {
            foundScheme = draft
          }
        }
      }

      if (foundScheme) {
        setScheme(foundScheme)
      } else {
        console.error("Scheme not found")
      }
    } catch (error) {
      console.error("Error loading scheme details:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800 border-green-200"
      case "pso_approved":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "steps_1_4_approved":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "pso_requested":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "subscribers_added":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "final_agreement_uploaded":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleEdit = () => {
    window.location.href = `/foreman/create-scheme?schemeId=${scheme.schemeId}`
  }

  const handlePublish = () => {
    window.location.href = `/foreman/schemes/${scheme.schemeId}/publish`
  }

  const handleDownloadDocument = (docType) => {
    // Simulate document download
    alert(`Downloading ${docType} document...`)
  }

  if (loading) {
    return (
      <SidebarProvider>
        <ForemanSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading scheme details...</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  if (!scheme) {
    return (
      <SidebarProvider>
        <ForemanSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Scheme Not Found</h3>
              <p className="text-gray-500 mb-4">The requested scheme could not be found.</p>
              <Button onClick={() => window.history.back()} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  const isLive = scheme.schemeStatus === "live" || scheme.status === "live"

  return (
    <SidebarProvider>
      <ForemanSidebar />
      <SidebarInset>
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
                <BreadcrumbLink href="/foreman/schemes">My Schemes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Scheme Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex gap-2">
            <Button onClick={() => window.history.back()} variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            {isLive && (
              <Button onClick={handlePublish} className="gap-2 bg-green-600 hover:bg-green-700">
                <Upload className="h-4 w-4" />
                Publish Scheme
              </Button>
            )}
            <Button onClick={handleEdit} variant="outline" className="gap-2 bg-transparent">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6 bg-gray-50">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{scheme.name || `Scheme ${scheme.schemeId}`}</h1>
              <p className="text-gray-600 mt-1">Scheme ID: {scheme.schemeId}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={`${getStatusColor(scheme.schemeStatus || scheme.status)} font-medium px-3 py-1`}>
                {(scheme.schemeStatus || scheme.status).replace(/_/g, " ").toUpperCase()}
              </Badge>
              {isLive && (
                <Badge className="bg-green-100 text-green-800 border-green-200 font-medium px-3 py-1">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  LIVE SCHEME
                </Badge>
              )}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Chit Value</p>
                    <p className="text-2xl font-bold text-gray-900">₹{scheme.chitValue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Subscribers</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {scheme.subscribers?.length || 0}/{scheme.numberOfSubscribers}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Duration</p>
                    <p className="text-2xl font-bold text-gray-900">{scheme.chitDuration} months</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <CreditCard className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Premium</p>
                    <p className="text-2xl font-bold text-gray-900">₹{scheme.monthlyPremium}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Scheme Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Start Date</p>
                      <p className="text-gray-900">{new Date(scheme.chitStartDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">End Date</p>
                      <p className="text-gray-900">{new Date(scheme.chitEndDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Auction Frequency</p>
                      <p className="text-gray-900 capitalize">{scheme.auctionFrequency}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Auction Time</p>
                      <p className="text-gray-900">
                        {scheme.auctionStartTime} - {scheme.auctionEndTime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bidding Rules */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="h-5 w-5" />
                    Bidding Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Minimum Bid</p>
                      <p className="text-gray-900">₹{scheme.minimumBid}</p>
                      <p className="text-xs text-gray-500">5% of chit value</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Maximum Bid</p>
                      <p className="text-gray-900">₹{scheme.maximumBid}</p>
                      <p className="text-xs text-gray-500">30% of chit value</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Bid Increment</p>
                      <p className="text-gray-900">
                        ₹{scheme.bidIncrement === "manual" ? scheme.manualIncrement : scheme.bidIncrement}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subscribers List */}
              {scheme.subscribers && scheme.subscribers.length > 0 && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Subscribers ({scheme.subscribers.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {scheme.subscribers.map((subscriber, index) => (
                        <div
                          key={subscriber.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">#{subscriber.ticketNumber}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{subscriber.name}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {subscriber.mobile}
                                </span>
                                <span className="flex items-center gap-1">
                                  <CreditCard className="h-3 w-3" />
                                  {subscriber.ucfsin}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Documents */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {scheme.psoNumber && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-900">PSO Certificate</p>
                        <p className="text-sm text-blue-600">{scheme.psoNumber}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadDocument("PSO")}
                        className="gap-1"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  )}

                  {scheme.commencementCertificate && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-900">Form 7 Certificate</p>
                        <p className="text-sm text-green-600">{scheme.commencementCertificate.number}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadDocument("Form7")}
                        className="gap-1"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  )}

                  {scheme.finalAgreement && (
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium text-purple-900">Final Agreement</p>
                        <p className="text-sm text-purple-600">Signed by all parties</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadDocument("Agreement")}
                        className="gap-1"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Scheme Created</p>
                        <p className="text-xs text-gray-500">
                          {new Date(scheme.createdDate || scheme.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {scheme.submittedAt && (
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Submitted for Review</p>
                          <p className="text-xs text-gray-500">{new Date(scheme.submittedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}

                    {scheme.psoRequestedAt && (
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">PSO Requested</p>
                          <p className="text-xs text-gray-500">
                            {new Date(scheme.psoRequestedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {isLive && (
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Scheme Went Live</p>
                          <p className="text-xs text-gray-500">
                            {new Date(scheme.liveDate || scheme.lastUpdated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              {isLive && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button onClick={handlePublish} className="w-full gap-2 bg-green-600 hover:bg-green-700">
                      <Upload className="h-4 w-4" />
                      Publish Scheme
                    </Button>
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <Share2 className="h-4 w-4" />
                      Share Scheme
                    </Button>
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <Globe className="h-4 w-4" />
                      View Public Page
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
