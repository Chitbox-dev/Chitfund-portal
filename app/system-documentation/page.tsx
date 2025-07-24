"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Users,
  Shield,
  FileText,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Settings,
  Database,
  Lock,
  User,
  Building,
  Eye,
} from "lucide-react"

export default function SystemDocumentation() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Chit Fund Portal System Documentation</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete guide for building and managing the chit fund system with admin and foreman workflows
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="workflows">User Workflows</TabsTrigger>
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="credentials">Access Credentials</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="ui-guide">UI/UX Guide</TabsTrigger>
          </TabsList>

          {/* System Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Building className="h-8 w-8 text-blue-600" />
                  System Architecture Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">System Purpose</h3>
                    <p className="text-gray-700 mb-4">
                      The Chit Fund Portal is a comprehensive digital platform designed to modernize and streamline chit
                      fund operations in India. The system provides separate interfaces for administrators and foremen,
                      enabling efficient management of chit fund schemes, subscriber enrollment, and auction processes.
                    </p>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Key Objectives</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Digitize traditional chit fund operations</li>
                        <li>• Ensure regulatory compliance and transparency</li>
                        <li>• Provide secure auction and payment processes</li>
                        <li>• Enable real-time tracking and reporting</li>
                        <li>• Streamline foreman and subscriber management</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">User Roles & Responsibilities</h3>

                    <div className="space-y-4">
                      <div className="border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">System Administrator</h4>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Approve/reject scheme applications</li>
                          <li>• Generate PSO numbers for approved schemes</li>
                          <li>• Manage foreman registrations</li>
                          <li>• Monitor system-wide operations</li>
                          <li>• Generate compliance reports</li>
                        </ul>
                      </div>

                      <div className="border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold text-green-900">Foreman</h4>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Create and submit scheme applications</li>
                          <li>• Manage subscriber enrollments</li>
                          <li>• Conduct monthly auctions</li>
                          <li>• Track payments and collections</li>
                          <li>• Generate completion certificates</li>
                        </ul>
                      </div>

                      <div className="border border-purple-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-5 w-5 text-purple-600" />
                          <h4 className="font-semibold text-purple-900">Subscribers</h4>
                        </div>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• View scheme details and status</li>
                          <li>• Make monthly contributions</li>
                          <li>• Participate in auctions</li>
                          <li>• Track payment history</li>
                          <li>• Access digital certificates</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Technical Stack</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Next.js 14 with App Router</li>
                        <li>• React 18 with TypeScript</li>
                        <li>• Tailwind CSS for styling</li>
                        <li>• shadcn/ui component library</li>
                        <li>• Framer Motion for animations</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Backend</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Next.js API Routes</li>
                        <li>• PostgreSQL database</li>
                        <li>• Prisma ORM</li>
                        <li>• JWT authentication</li>
                        <li>• File upload handling</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Security</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Role-based access control</li>
                        <li>• Encrypted password storage</li>
                        <li>• Session management</li>
                        <li>• API rate limiting</li>
                        <li>• Audit trail logging</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Workflows Tab */}
          <TabsContent value="workflows" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Admin Workflow */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                    Admin Workflow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">System Login</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Access admin dashboard with secure credentials (admin@chitfundportal.com)
                        </p>
                      </div>
                    </div>

                    <div className="ml-5 border-l-2 border-gray-200 pl-4 pb-4">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Review Scheme Applications</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Evaluate foreman-submitted scheme proposals with all required documents
                        </p>
                      </div>
                    </div>

                    <div className="ml-5 border-l-2 border-gray-200 pl-4 pb-4">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Approve/Reject Schemes</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Make approval decisions and automatically generate PSO numbers for approved schemes
                        </p>
                      </div>
                    </div>

                    <div className="ml-5 border-l-2 border-gray-200 pl-4 pb-4">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        4
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Monitor Operations</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Track ongoing schemes, foreman performance, and system-wide metrics
                        </p>
                      </div>
                    </div>

                    <div className="ml-5 border-l-2 border-gray-200 pl-4 pb-4">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        5
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Manage Foremen</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Add new foremen manually with auto-generated credentials and manage their access
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Foreman Workflow */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <User className="h-6 w-6 text-green-600" />
                    Foreman Workflow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-600">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">System Login</h4>
                        <p className="text-sm text-gray-600 mt-1">Access foreman dashboard with provided credentials</p>
                      </div>
                    </div>

                    <div className="ml-5 border-l-2 border-gray-200 pl-4 pb-4">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-600">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Create Scheme</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Fill scheme details: operator name, total value, subscribers, duration, commission
                        </p>
                      </div>
                    </div>

                    <div className="ml-5 border-l-2 border-gray-200 pl-4 pb-4">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-600">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Add Member Details</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Enroll subscribers with UCFIN numbers and upload required documents
                        </p>
                      </div>
                    </div>

                    <div className="ml-5 border-l-2 border-gray-200 pl-4 pb-4">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-600">
                        4
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Initial Payment</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Make initial investment based on chit fund amount to carry out operations
                        </p>
                      </div>
                    </div>

                    <div className="ml-5 border-l-2 border-gray-200 pl-4 pb-4">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-600">
                        5
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Receive PSO Number</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Get approval and PSO number from admin to officially run the chit scheme
                        </p>
                      </div>
                    </div>

                    <div className="ml-5 border-l-2 border-gray-200 pl-4 pb-4">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-600">
                        6
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Manage Operations</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Track member payments, conduct auctions, and generate completion certificates
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Connection Flow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <ArrowRight className="h-6 w-6 text-purple-600" />
                  Admin-Foreman Connection Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Scheme Approval Cycle</h4>
                    <p className="text-sm text-blue-800">
                      Foreman submits scheme → Admin reviews → Admin approves/rejects → PSO number generated
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Ongoing Monitoring</h4>
                    <p className="text-sm text-green-800">
                      Admin monitors all schemes → Foreman manages daily operations → Real-time status updates
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Completion Process</h4>
                    <p className="text-sm text-purple-800">
                      Foreman requests completion → Admin verifies → Completion certificate generated
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Key Features Tab */}
          <TabsContent value="features" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Admin Panel Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Comprehensive dashboard with real-time statistics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Scheme approval workflow with document verification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Automatic PSO number generation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Foreman registration and management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      System-wide monitoring and analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Compliance reporting and audit trails
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5 text-green-600" />
                    Foreman Panel Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Step-by-step scheme creation wizard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Subscriber enrollment and management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Payment tracking and collection monitoring
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Auction scheduling and management
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Performance metrics and analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Digital certificate generation
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Settings className="h-5 w-5 text-purple-600" />
                    System Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Secure JWT-based authentication
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Role-based access control
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Responsive design for all devices
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Real-time notifications and updates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Data encryption and security
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Comprehensive audit logging
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Access Credentials Tab */}
          <TabsContent value="credentials" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                    Admin Access Credentials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-4">Default Admin Account</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Username:</span>
                        <span className="font-mono bg-white px-2 py-1 rounded">admin@chitfundportal.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Password:</span>
                        <span className="font-mono bg-white px-2 py-1 rounded">Admin@123</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Access Level:</span>
                        <span className="text-blue-700 font-medium">Super Administrator</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Dashboard URL:</span>
                        <span className="font-mono bg-white px-2 py-1 rounded">/admin</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <strong>Security Note:</strong> Change default credentials in production environment. Enable
                        two-factor authentication for enhanced security.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <User className="h-6 w-6 text-green-600" />
                    Foreman Access Credentials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-4">Sample Foreman Accounts</h3>

                      <div className="space-y-4">
                        <div className="border-l-4 border-green-400 pl-4 bg-white p-3 rounded">
                          <div className="font-medium text-green-900">Rajesh Kumar (FM001)</div>
                          <div className="text-sm text-gray-600 mt-1">
                            <div>
                              Username: <span className="font-mono">rajesh.kumar@email.com</span>
                            </div>
                            <div>
                              Password: <span className="font-mono">rajesh123</span>
                            </div>
                            <div>Experience: 5 years</div>
                          </div>
                        </div>

                        <div className="border-l-4 border-green-400 pl-4 bg-white p-3 rounded">
                          <div className="font-medium text-green-900">Priya Sharma (FM002)</div>
                          <div className="text-sm text-gray-600 mt-1">
                            <div>
                              Username: <span className="font-mono">priya.sharma@email.com</span>
                            </div>
                            <div>
                              Password: <span className="font-mono">priya123</span>
                            </div>
                            <div>Experience: 8 years</div>
                          </div>
                        </div>

                        <div className="border-l-4 border-green-400 pl-4 bg-white p-3 rounded">
                          <div className="font-medium text-green-900">Amit Patel (FM003)</div>
                          <div className="text-sm text-gray-600 mt-1">
                            <div>
                              Username: <span className="font-mono">amit.patel@email.com</span>
                            </div>
                            <div>
                              Password: <span className="font-mono">amit123</span>
                            </div>
                            <div>Experience: 3 years</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Auto-Generated Password Pattern</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        When admin adds a new foreman, the system automatically generates credentials:
                      </p>
                      <div className="bg-white p-3 rounded border">
                        <div className="text-sm">
                          <div>
                            <strong>Username:</strong> [foreman-email]
                          </div>
                          <div>
                            <strong>Password:</strong> [firstname]123
                          </div>
                          <div className="text-gray-500 mt-1">Example: For "John Doe" → john123</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Access Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" variant="outline">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <div className="text-center">
                      <div className="font-medium">Admin Login</div>
                      <div className="text-xs text-gray-500">/auth/login</div>
                    </div>
                  </Button>
                  <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" variant="outline">
                    <User className="h-6 w-6 text-green-600" />
                    <div className="text-center">
                      <div className="font-medium">Foreman Login</div>
                      <div className="text-xs text-gray-500">/auth/login</div>
                    </div>
                  </Button>
                  <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent" variant="outline">
                    <FileText className="h-6 w-6 text-purple-600" />
                    <div className="text-center">
                      <div className="font-medium">Documentation</div>
                      <div className="text-xs text-gray-500">/system-documentation</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-blue-600" />
                  Step-by-Step Implementation Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <Database className="h-8 w-8 text-blue-600 mb-3" />
                    <h3 className="font-semibold text-blue-900 mb-3">Database Schema</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Users table (admin/foreman roles)</li>
                      <li>• Schemes table (scheme details)</li>
                      <li>• Subscribers table (member info)</li>
                      <li>• Transactions table (payments)</li>
                      <li>• Documents table (file uploads)</li>
                      <li>• Audit logs table (system tracking)</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <Lock className="h-8 w-8 text-green-600 mb-3" />
                    <h3 className="font-semibold text-green-900 mb-3">Security Implementation</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• JWT token authentication</li>
                      <li>• Role-based middleware</li>
                      <li>• Password hashing (bcrypt)</li>
                      <li>• Session management</li>
                      <li>• API rate limiting</li>
                      <li>• Input validation & sanitization</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg">
                    <FileText className="h-8 w-8 text-purple-600 mb-3" />
                    <h3 className="font-semibold text-purple-900 mb-3">API Endpoints</h3>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• POST /api/auth/login</li>
                      <li>• POST /api/schemes/create</li>
                      <li>• PUT /api/admin/approve/:id</li>
                      <li>• GET /api/foreman/dashboard</li>
                      <li>• POST /api/subscribers/add</li>
                      <li>• GET /api/reports/analytics</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-6 text-xl">Implementation Steps</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1 text-lg px-3 py-1">
                        1
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">Environment Setup</h4>
                        <p className="text-gray-600 mt-1 mb-3">
                          Set up the development environment with all necessary tools and dependencies
                        </p>
                        <div className="bg-white p-4 rounded border">
                          <code className="text-sm">
                            npx create-next-app@latest chitfund-portal --typescript --tailwind --eslint
                            <br />
                            npm install @radix-ui/react-* lucide-react framer-motion
                            <br />
                            npx shadcn@latest init
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1 text-lg px-3 py-1">
                        2
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">Database Configuration</h4>
                        <p className="text-gray-600 mt-1 mb-3">
                          Set up PostgreSQL database with Prisma ORM and create necessary tables
                        </p>
                        <div className="bg-white p-4 rounded border">
                          <code className="text-sm">
                            npm install prisma @prisma/client
                            <br />
                            npx prisma init
                            <br />
                            npx prisma migrate dev --name init
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1 text-lg px-3 py-1">
                        3
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">Authentication System</h4>
                        <p className="text-gray-600 mt-1 mb-3">
                          Implement JWT-based authentication with role-based access control
                        </p>
                        <div className="bg-white p-4 rounded border">
                          <code className="text-sm">
                            npm install jsonwebtoken bcryptjs
                            <br />
                            npm install @types/jsonwebtoken @types/bcryptjs
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1 text-lg px-3 py-1">
                        4
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">UI Components Development</h4>
                        <p className="text-gray-600 mt-1 mb-3">
                          Build reusable UI components using shadcn/ui and create responsive layouts
                        </p>
                        <div className="bg-white p-4 rounded border">
                          <code className="text-sm">
                            npx shadcn@latest add button card input table
                            <br />
                            npx shadcn@latest add tabs badge alert progress
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1 text-lg px-3 py-1">
                        5
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">Dashboard Implementation</h4>
                        <p className="text-gray-600 mt-1 mb-3">
                          Create separate dashboards for admin and foreman with real-time data
                        </p>
                        <div className="bg-white p-4 rounded border text-sm">
                          <div>• Admin dashboard with approval workflows</div>
                          <div>• Foreman dashboard with scheme management</div>
                          <div>• Real-time statistics and charts</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1 text-lg px-3 py-1">
                        6
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">Testing & Deployment</h4>
                        <p className="text-gray-600 mt-1 mb-3">Comprehensive testing and production deployment setup</p>
                        <div className="bg-white p-4 rounded border">
                          <code className="text-sm">
                            npm run build
                            <br />
                            npm run test
                            <br />
                            vercel deploy --prod
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* UI/UX Guide Tab */}
          <TabsContent value="ui-guide" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-purple-600" />
                  UI/UX Design Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Design Principles</h3>
                    <div className="space-y-4">
                      <div className="border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Clarity & Simplicity</h4>
                        <p className="text-sm text-blue-800">
                          Clean, intuitive interfaces that make complex chit fund operations easy to understand and
                          manage.
                        </p>
                      </div>
                      <div className="border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2">Consistency</h4>
                        <p className="text-sm text-green-800">
                          Uniform design patterns, color schemes, and interaction models across all user interfaces.
                        </p>
                      </div>
                      <div className="border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Accessibility</h4>
                        <p className="text-sm text-purple-800">
                          WCAG 2.1 compliant design ensuring usability for users with diverse abilities and devices.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Color Palette</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded"></div>
                        <div>
                          <div className="font-medium">Primary Blue</div>
                          <div className="text-sm text-gray-600">#2563eb - Admin actions, primary buttons</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded"></div>
                        <div>
                          <div className="font-medium">Success Green</div>
                          <div className="text-sm text-gray-600">#16a34a - Approvals, success states</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded"></div>
                        <div>
                          <div className="font-medium">Warning Yellow</div>
                          <div className="text-sm text-gray-600">#eab308 - Pending states, cautions</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600 rounded"></div>
                        <div>
                          <div className="font-medium">Error Red</div>
                          <div className="text-sm text-gray-600">#dc2626 - Rejections, errors</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Component Guidelines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Dashboard Cards</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Use consistent padding (p-6)</li>
                        <li>• Include relevant icons for visual hierarchy</li>
                        <li>• Show key metrics prominently</li>
                        <li>• Add subtle shadows for depth</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Form Elements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Clear labels and placeholders</li>
                        <li>• Proper validation feedback</li>
                        <li>• Logical grouping and spacing</li>
                        <li>• Progressive disclosure for complex forms</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Data Tables</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Sortable columns where applicable</li>
                        <li>• Status badges for quick recognition</li>
                        <li>• Action buttons grouped logically</li>
                        <li>• Responsive design for mobile</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Navigation</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Clear breadcrumbs for deep navigation</li>
                        <li>• Active state indicators</li>
                        <li>• Consistent menu structure</li>
                        <li>• Quick access to common actions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Responsive Design Strategy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold mb-2">Mobile (&lt; 768px)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Single column layouts</li>
                        <li>• Collapsible navigation</li>
                        <li>• Touch-friendly buttons</li>
                        <li>• Simplified data views</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold mb-2">Tablet (768px - 1024px)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Two-column layouts</li>
                        <li>• Sidebar navigation</li>
                        <li>• Optimized form layouts</li>
                        <li>• Balanced content density</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded">
                      <h4 className="font-semibold mb-2">Desktop (&gt; 1024px)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Multi-column layouts</li>
                        <li>• Full navigation menus</li>
                        <li>• Rich data visualizations</li>
                        <li>• Maximum information density</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
