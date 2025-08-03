"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, CheckCircle, DollarSign, TrendingUp, Users } from "lucide-react"

export function ComprehensiveMonthlyDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-04%20at%202.48.07%E2%80%AFAM-xWOnZRjbmTBgqHdYE9UTzzDbwJRRGg.png"
            alt="Chit Fund Monthly Reports Dashboard"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Chit Fund Monthly Reports</h1>
          <p className="text-gray-600">
            Comprehensive reporting system for subscriber payments, auctions, dividends, and payouts
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="subscriber-premium" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Subscriber Premium
          </TabsTrigger>
          <TabsTrigger value="auction-reports" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Monthly Auction
          </TabsTrigger>
          <TabsTrigger value="dividend-payout" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Dividend & Payout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Subscriber Premium Reports</p>
                    <p className="text-2xl font-bold text-blue-900">24</p>
                    <p className="text-xs text-blue-500">
                      Track monthly subscriber premiums, payment status, and compliance
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Monthly Auction Reports</p>
                    <p className="text-2xl font-bold text-orange-900">18</p>
                    <p className="text-xs text-orange-500">Document auction outcomes, winners, bid amounts</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Dividend Distribution</p>
                    <p className="text-2xl font-bold text-green-900">15</p>
                    <p className="text-xs text-green-500">Show dividend breakdown, bonus eligibility</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Payout Distribution</p>
                    <p className="text-2xl font-bold text-purple-900">12</p>
                    <p className="text-xs text-purple-500">Track actual disbursement with transaction details</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Report Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Subscriber Premium Report - January 2025</p>
                      <p className="text-sm text-gray-600">Scheme SCH-001 | 20 subscribers</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Approved</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Monthly Auction Report - January 2025</p>
                      <p className="text-sm text-gray-600">Winner: JAGGU | Bid: ₹86,500</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Submitted</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Dividend Distribution Report - December 2024</p>
                      <p className="text-sm text-gray-600">Total Dividend: ₹71,500 | Base: ₹60,000</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriber-premium" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Subscriber Premium Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Track monthly subscriber premiums, payment status, and compliance across all chit groups.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-blue-600">Total Reports</p>
                        <p className="text-2xl font-bold text-blue-900">24</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-green-600">Approved</p>
                        <p className="text-2xl font-bold text-green-900">18</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-yellow-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-yellow-600">Pending</p>
                        <p className="text-2xl font-bold text-yellow-900">6</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <Button className="bg-blue-600 hover:bg-blue-700">VIEW SAMPLE</Button>
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
                <p className="text-gray-600">
                  Document auction outcomes, winners, bid amounts, and participant eligibility status.
                </p>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-04%20at%202.47.44%E2%80%AFAM-cRhmcsIcCweqbwO9ObhUJY4uPoPaEv.png"
                    alt="Monthly Auction Report Sample"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-orange-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-orange-600">Total Auctions</p>
                        <p className="text-2xl font-bold text-orange-900">18</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-green-600">Completed</p>
                        <p className="text-2xl font-bold text-green-900">15</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-blue-600">Upcoming</p>
                        <p className="text-2xl font-bold text-blue-900">3</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <Button className="bg-orange-600 hover:bg-orange-700">VIEW SAMPLE</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dividend-payout" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Dividend Distribution Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Show dividend breakdown, bonus eligibility, and golden dividend calculations.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-green-50">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-sm text-green-600">Total Reports</p>
                          <p className="text-2xl font-bold text-green-900">15</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-sm text-blue-600">Processed</p>
                          <p className="text-2xl font-bold text-blue-900">12</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-center">
                    <Button className="bg-green-600 hover:bg-green-700">VIEW SAMPLE</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Payout Distribution Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Track actual disbursement of funds with transaction details and payment modes.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-purple-50">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-sm text-purple-600">Total Reports</p>
                          <p className="text-2xl font-bold text-purple-900">12</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-orange-50">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-sm text-orange-600">Disbursed</p>
                          <p className="text-2xl font-bold text-orange-900">10</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-center">
                    <Button className="bg-purple-600 hover:bg-purple-700">VIEW SAMPLE</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
