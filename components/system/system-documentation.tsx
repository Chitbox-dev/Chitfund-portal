"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Shield, FileText, ArrowRight, CheckCircle, AlertCircle, Settings, Database, Lock } from "lucide-react"

export default function SystemDocumentation() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Chit Fund Portal System Documentation</h1>
        <p className="text-xl text-gray-600">Complete guide for building and managing the chit fund system</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workflow">User Workflows</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="credentials">Default Access</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                System Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                The Chit Fund Portal is a comprehensive digital platform designed to modernize and streamline chit fund
                operations in India. The system provides separate interfaces for administrators and foremen, enabling
                efficient management of chit fund schemes, subscriber enrollment, and auction processes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Key Objectives</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Digitize chit fund operations</li>
                    <li>• Ensure regulatory compliance</li>
                    <li>• Provide transparent auction processes</li>
                    <li>• Enable real-time tracking and reporting</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Target Users</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• System Administrators</li>
                    <li>• Chit Fund Foremen</li>
                    <li>• Registered Subscribers</li>
                    <li>• Regulatory Authorities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workflow Tab */}
        <TabsContent value="workflow" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Admin Workflow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Admin Workflow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">System Login</h4>
                      <p className="text-sm text-gray-600">Access admin dashboard with secure credentials</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-4" />

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Review Scheme Applications</h4>
                      <p className="text-sm text-gray-600">Evaluate foreman-submitted scheme proposals</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-4" />

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Approve/Reject Schemes</h4>
                      <p className="text-sm text-gray-600">Make approval decisions and generate PSO numbers</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-4" />

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Monitor Operations</h4>
                      <p className="text-sm text-gray-600">Track ongoing schemes and foreman performance</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-4" />

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium">Manage Foremen</h4>
                      <p className="text-sm text-gray-600">Add new foremen and manage their access</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Foreman Workflow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Foreman Workflow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">System Login</h4>
                      <p className="text-sm text-gray-600">Access foreman dashboard with provided credentials</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-4" />

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Create Scheme</h4>
                      <p className="text-sm text-gray-600">Fill scheme details, structure, and upload documents</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-4" />

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Add Members</h4>
                      <p className="text-sm text-gray-600">Enroll subscribers with UCFIN numbers and documents</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-4" />

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Initial Payment</h4>
                      <p className="text-sm text-gray-600">Make initial investment based on chit fund amount</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-4" />

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">
                      5
                    </div>
                    <div>
                      <h4 className="font-medium">Receive PSO Number</h4>
                      <p className="text-sm text-gray-600">Get approval and PSO number from admin to run chits</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-4" />

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">
                      6
                    </div>
                    <div>
                      <h4 className="font-medium">Manage Operations</h4>
                      <p className="text-sm text-gray-600">Track payments, conduct auctions, generate certificates</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Admin Panel Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Scheme approval workflow
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    PSO number generation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Foreman management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Real-time monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Analytics dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Document verification
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Foreman Panel Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Scheme creation wizard
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Subscriber management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Payment tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Auction management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Performance metrics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Certificate generation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Secure authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Role-based access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Responsive design
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Real-time updates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Data encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Audit trails
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Credentials Tab */}
        <TabsContent value="credentials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Admin Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">Default Admin Credentials</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Username:</strong> admin@chitfundportal.com
                    </div>
                    <div>
                      <strong>Password:</strong> Admin@123
                    </div>
                    <div>
                      <strong>Access Level:</strong> Super Administrator
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <strong>Security Note:</strong> Change default credentials in production environment
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Foreman Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-3">Sample Foreman Accounts</h3>

                    <div className="space-y-3">
                      <div className="border-l-4 border-green-400 pl-3">
                        <div className="font-medium">Rajesh Kumar (FM001)</div>
                        <div className="text-sm text-gray-600">
                          Username: rajesh.kumar@email.com
                          <br />
                          Password: rajesh123
                        </div>
                      </div>

                      <div className="border-l-4 border-green-400 pl-3">
                        <div className="font-medium">Priya Sharma (FM002)</div>
                        <div className="text-sm text-gray-600">
                          Username: priya.sharma@email.com
                          <br />
                          Password: priya123
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Password Pattern</h4>
                    <p className="text-sm text-gray-600">
                      Default pattern: [firstname]123
                      <br />
                      Example: For "John Doe" → john123
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Implementation Tab */}
        <TabsContent value="implementation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Implementation Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <Database className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-blue-900 mb-2">Database Setup</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• User management tables</li>
                    <li>• Scheme registration data</li>
                    <li>• Subscriber information</li>
                    <li>• Transaction records</li>
                    <li>• Audit logs</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <Lock className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-green-900 mb-2">Security Features</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• JWT authentication</li>
                    <li>• Role-based permissions</li>
                    <li>• Password encryption</li>
                    <li>• Session management</li>
                    <li>• API rate limiting</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <FileText className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-purple-900 mb-2">API Endpoints</h3>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• /api/auth/login</li>
                    <li>• /api/schemes/create</li>
                    <li>• /api/admin/approve</li>
                    <li>• /api/foreman/dashboard</li>
                    <li>• /api/subscribers/manage</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Step-by-Step Implementation</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      1
                    </Badge>
                    <div>
                      <h4 className="font-medium">Environment Setup</h4>
                      <p className="text-sm text-gray-600">
                        Install Next.js, set up database, configure authentication
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      2
                    </Badge>
                    <div>
                      <h4 className="font-medium">User Management</h4>
                      <p className="text-sm text-gray-600">Implement admin and foreman role systems</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      3
                    </Badge>
                    <div>
                      <h4 className="font-medium">Scheme Management</h4>
                      <p className="text-sm text-gray-600">Build scheme creation and approval workflows</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      4
                    </Badge>
                    <div>
                      <h4 className="font-medium">Dashboard Development</h4>
                      <p className="text-sm text-gray-600">Create responsive admin and foreman dashboards</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      5
                    </Badge>
                    <div>
                      <h4 className="font-medium">Testing & Deployment</h4>
                      <p className="text-sm text-gray-600">Comprehensive testing and production deployment</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
