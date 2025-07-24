"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  TrendingUp,
  Users,
  Calendar,
  Bell,
  Settings,
  Eye,
  Download,
  Plus,
  ArrowUpRight,
  Shield,
  Wallet,
} from "lucide-react"

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-[#1e3a8a]" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">UCFSIN Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, John Doe</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-lg p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to UCFSIN!</h2>
              <p className="text-blue-100">
                Your account has been successfully created. Start exploring your dashboard.
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-75">Your UCFSIN</div>
              <div className="text-xl font-mono">KA-EMD62-9391</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Investment</p>
                  <p className="text-2xl font-bold text-gray-900">₹0</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <Badge variant="secondary">New Account</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Schemes</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <Button size="sm" className="bg-[#1e3a8a] hover:bg-[#3b82f6]">
                  <Plus className="h-4 w-4 mr-1" />
                  Join Scheme
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Returns</p>
                  <p className="text-2xl font-bold text-gray-900">₹0</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-500">Start investing to see returns</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">UCFSIN Score</p>
                  <p className="text-2xl font-bold text-gray-900">750</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Excellent
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* UCFSIN Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your UCFSIN Card</span>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-lg p-6 text-white">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm opacity-75">UCFSIN Card</div>
                      <div className="text-xl font-bold">John Doe</div>
                    </div>
                    <CreditCard className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-mono tracking-wider">KA-EMD62-9391</div>
                    <div className="flex justify-between text-sm">
                      <span>Valid From: 01/24</span>
                      <span>Status: Active</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Digital Card
                  </Button>
                  <Button size="sm" variant="outline">
                    Request Physical Card
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <Calendar className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Activity Yet</h3>
                  <p className="text-gray-500 mb-4">Start by joining your first chit fund scheme</p>
                  <Button className="bg-[#1e3a8a] hover:bg-[#3b82f6]">
                    <Plus className="h-4 w-4 mr-2" />
                    Browse Schemes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-[#1e3a8a] hover:bg-[#3b82f6]">
                  <Plus className="h-4 w-4 mr-2" />
                  Join New Scheme
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Invite Friends
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download Reports
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Welcome to UCFSIN!</p>
                      <p className="text-xs text-gray-500">Your account has been successfully created</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">KYC Verified</p>
                      <p className="text-xs text-gray-500">Your identity has been successfully verified</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Get started with our comprehensive guides and support.</p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      Getting Started Guide
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      Contact Support
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      FAQ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
