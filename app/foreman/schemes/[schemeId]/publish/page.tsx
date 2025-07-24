"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
  Globe,
  Eye,
  Upload,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  DollarSign,
  Calendar,
  FileText,
  Settings,
} from "lucide-react"

export default function PublishSchemePage() {
  const params = useParams()
  const schemeId = params?.schemeId
  const [scheme, setScheme] = useState(null)
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)
  const [publishSettings, setPublishSettings] = useState({
    title: "",
    description: "",
    publiclyVisible: true,
    allowRegistrations: true,
    showSubscriberCount: true,
    showAuctionDetails: true,
    contactEmail: "",
    contactPhone: "",
    customMessage: "",
  })

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

      if (foundScheme) {
        setScheme(foundScheme)
        setPublishSettings((prev) => ({
          ...prev,
          title: foundScheme.name || `Chit Fund Scheme ${foundScheme.schemeId}`,
          description: `Join our ${foundScheme.chitDuration}-month chit fund scheme with a total value of ₹${foundScheme.chitValue}. Monthly premium: ₹${foundScheme.monthlyPremium}`,
        }))

        // Check if already published
        const publishedSchemes = JSON.parse(localStorage.getItem("publishedSchemes") || "[]")
        const isPublished = publishedSchemes.some((s) => s.schemeId === id)
        setPublished(isPublished)
      }
    } catch (error) {
      console.error("Error loading scheme details:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async () => {
    setPublishing(true)

    try {
      // Simulate publishing process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const publishedScheme = {
        ...scheme,
        ...publishSettings,
        publishedAt: new Date().toISOString(),
        publicUrl: `https://chitfund.com/schemes/${scheme.schemeId}`,
        isPublished: true,
      }

      // Save to published schemes
      const publishedSchemes = JSON.parse(localStorage.getItem("publishedSchemes") || "[]")
      const existingIndex = publishedSchemes.findIndex((s) => s.schemeId === scheme.schemeId)

      if (existingIndex >= 0) {
        publishedSchemes[existingIndex] = publishedScheme
      } else {
        publishedSchemes.push(publishedScheme)
      }

      localStorage.setItem("publishedSchemes", JSON.stringify(publishedSchemes))
      setPublished(true)
      alert("Scheme published successfully!")
    } catch (error) {
      console.error("Error publishing scheme:", error)
      alert("Error publishing scheme. Please try again.")
    } finally {
      setPublishing(false)
    }
  }

  const handleCopyUrl = () => {
    const url = `https://chitfund.com/schemes/${scheme.schemeId}`
    navigator.clipboard.writeText(url)
    alert("URL copied to clipboard!")
  }

  const handlePreview = () => {
    window.open(`/schemes/${scheme.schemeId}/preview`, "_blank")
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

  if (!isLive) {
    return (
      <SidebarProvider>
        <ForemanSidebar />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Scheme Not Live</h3>
              <p className="text-gray-500 mb-4">Only live schemes can be published.</p>
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
                <BreadcrumbLink href={`/foreman/schemes/${scheme.schemeId}`}>Scheme Details</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Publish Scheme</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex gap-2">
            <Button onClick={() => window.history.back()} variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            {published && (
              <Button onClick={handlePreview} variant="outline" className="gap-2 bg-transparent">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            )}
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6 bg-gray-50">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Publish Scheme</h1>
              <p className="text-gray-600 mt-1">Make your scheme publicly available for registrations</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800 border-green-200 font-medium px-3 py-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                LIVE SCHEME
              </Badge>
              {published && (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-medium px-3 py-1">
                  <Globe className="h-4 w-4 mr-1" />
                  PUBLISHED
                </Badge>
              )}
            </div>
          </div>

          {published && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">Scheme Published Successfully!</h3>
                      <p className="text-green-700">Your scheme is now publicly available for registrations.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={handleCopyUrl} variant="outline" size="sm" className="gap-2 bg-white">
                      <Copy className="h-4 w-4" />
                      Copy URL
                    </Button>
                    <Button onClick={handlePreview} variant="outline" size="sm" className="gap-2 bg-white">
                      <ExternalLink className="h-4 w-4" />
                      View Public Page
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Publishing Settings */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Publishing Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Public Title</Label>
                    <Input
                      id="title"
                      value={publishSettings.title}
                      onChange={(e) => setPublishSettings((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter a catchy title for your scheme"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={publishSettings.description}
                      onChange={(e) => setPublishSettings((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your scheme to attract potential subscribers"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={publishSettings.contactEmail}
                        onChange={(e) => setPublishSettings((prev) => ({ ...prev, contactEmail: e.target.value }))}
                        placeholder="contact@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={publishSettings.contactPhone}
                        onChange={(e) => setPublishSettings((prev) => ({ ...prev, contactPhone: e.target.value }))}
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customMessage">Custom Message (Optional)</Label>
                    <Textarea
                      id="customMessage"
                      value={publishSettings.customMessage}
                      onChange={(e) => setPublishSettings((prev) => ({ ...prev, customMessage: e.target.value }))}
                      placeholder="Add any special instructions or benefits for subscribers"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Visibility Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Publicly Visible</p>
                      <p className="text-sm text-gray-600">Make scheme visible in public listings</p>
                    </div>
                    <Switch
                      checked={publishSettings.publiclyVisible}
                      onCheckedChange={(checked) =>
                        setPublishSettings((prev) => ({ ...prev, publiclyVisible: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow Registrations</p>
                      <p className="text-sm text-gray-600">Allow new subscribers to register online</p>
                    </div>
                    <Switch
                      checked={publishSettings.allowRegistrations}
                      onCheckedChange={(checked) =>
                        setPublishSettings((prev) => ({ ...prev, allowRegistrations: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Subscriber Count</p>
                      <p className="text-sm text-gray-600">Display current number of subscribers</p>
                    </div>
                    <Switch
                      checked={publishSettings.showSubscriberCount}
                      onCheckedChange={(checked) =>
                        setPublishSettings((prev) => ({ ...prev, showSubscriberCount: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show Auction Details</p>
                      <p className="text-sm text-gray-600">Display auction timing and rules</p>
                    </div>
                    <Switch
                      checked={publishSettings.showAuctionDetails}
                      onCheckedChange={(checked) =>
                        setPublishSettings((prev) => ({ ...prev, showAuctionDetails: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {!published && (
                <div className="flex justify-center">
                  <Button
                    onClick={handlePublish}
                    disabled={publishing || !publishSettings.title || !publishSettings.description}
                    className="gap-2 bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <Upload className="h-4 w-4" />
                    {publishing ? "Publishing..." : "Publish Scheme"}
                  </Button>
                </div>
              )}
            </div>

            {/* Preview */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="font-bold text-lg mb-2">{publishSettings.title || "Scheme Title"}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {publishSettings.description || "Scheme description will appear here..."}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white p-2 rounded text-center">
                        <DollarSign className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                        <p className="text-xs text-gray-600">Chit Value</p>
                        <p className="font-bold text-sm">₹{scheme.chitValue}</p>
                      </div>
                      <div className="bg-white p-2 rounded text-center">
                        <Calendar className="h-4 w-4 mx-auto mb-1 text-green-600" />
                        <p className="text-xs text-gray-600">Duration</p>
                        <p className="font-bold text-sm">{scheme.chitDuration}M</p>
                      </div>
                    </div>

                    {publishSettings.showSubscriberCount && (
                      <div className="bg-white p-2 rounded mb-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Subscribers</span>
                          <span className="font-bold text-sm">
                            {scheme.subscribers?.length || 0}/{scheme.numberOfSubscribers}
                          </span>
                        </div>
                      </div>
                    )}

                    {publishSettings.allowRegistrations && (
                      <Button className="w-full" size="sm">
                        Register Now
                      </Button>
                    )}
                  </div>

                  {published && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Public URL:</p>
                      <div className="flex items-center gap-2">
                        <Input
                          value={`https://chitfund.com/schemes/${scheme.schemeId}`}
                          readOnly
                          className="text-xs bg-gray-50"
                        />
                        <Button onClick={handleCopyUrl} variant="outline" size="sm">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Scheme Summary */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Scheme Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Scheme ID</span>
                    <span className="text-sm font-medium">{scheme.schemeId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Monthly Premium</span>
                    <span className="text-sm font-medium">₹{scheme.monthlyPremium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Start Date</span>
                    <span className="text-sm font-medium">{new Date(scheme.chitStartDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Auction Frequency</span>
                    <span className="text-sm font-medium capitalize">{scheme.auctionFrequency}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
