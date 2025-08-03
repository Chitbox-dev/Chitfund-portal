"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, User, Eye, EyeOff, CheckCircle, Building, Users, Lock, Mail, UserCheck } from "lucide-react"

const defaultForemen = [
  { email: "rajesh.kumar@email.com", password: "rajesh123", name: "Rajesh Kumar" },
  { email: "priya.sharma@email.com", password: "priya123", name: "Priya Sharma" },
  { email: "amit.patel@email.com", password: "amit123", name: "Amit Patel" },
]

export default function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginType, setLoginType] = useState("admin")
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [availableForemen, setAvailableForemen] = useState(defaultForemen)

  // Load foremen from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedForemen = localStorage.getItem("foremenList")
      if (storedForemen) {
        try {
          const parsedForemen = JSON.parse(storedForemen)
          // Extract only the login credentials we need
          const foremanCredentials = parsedForemen.map((foreman) => ({
            email: foreman.email,
            password: foreman.password,
            name: foreman.name,
          }))
          setAvailableForemen(foremanCredentials)
          console.log("Loaded foremen from localStorage:", foremanCredentials)
        } catch (error) {
          console.error("Error parsing stored foremen:", error)
          setAvailableForemen(defaultForemen)
        }
      } else {
        setAvailableForemen(defaultForemen)
      }
    }
  }, [])

  const defaultCredentials = {
    admin: {
      email: "admin@chitfundportal.com",
      password: "Admin@123",
    },
    foreman: availableForemen,
    user: [
      { email: "user@chitfundportal.com", password: "User@123", name: "Demo User" },
      { email: "test@chitfundportal.com", password: "test123", name: "Test User" },
    ],
  }

  const handleLogin = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (loginType === "admin") {
        if (
          credentials.email === defaultCredentials.admin.email &&
          credentials.password === defaultCredentials.admin.password
        ) {
          // Store login state
          localStorage.setItem("adminToken", "admin-token-123")
          localStorage.setItem("userType", "admin")
          window.location.href = "/admin/dashboard"
        } else {
          alert("Invalid admin credentials")
        }
      } else if (loginType === "foreman") {
        console.log("Attempting foreman login with:", credentials)
        console.log("Available foremen:", availableForemen)

        const foremanMatch = availableForemen.find(
          (f) => f.email === credentials.email && f.password === credentials.password,
        )

        console.log("Foreman match found:", foremanMatch)

        if (foremanMatch) {
          // Store login state
          localStorage.setItem("foremanToken", "foreman-token-123")
          localStorage.setItem("userType", "foreman")
          localStorage.setItem("foremanName", foremanMatch.name)
          localStorage.setItem("foremanEmail", foremanMatch.email)
          console.log("Foreman login successful, redirecting to dashboard")
          window.location.href = "/foreman/dashboard"
        } else {
          alert("Invalid foreman credentials. Please check your email and password.")
        }
      } else {
        const userMatch = defaultCredentials.user.find(
          (u) => u.email === credentials.email && u.password === credentials.password,
        )
        if (userMatch) {
          // Store login state
          localStorage.setItem("userToken", "user-token-123")
          localStorage.setItem("userType", "user")
          localStorage.setItem("userName", userMatch.name)
          window.location.href = "/user/dashboard"
        } else {
          alert("Invalid user credentials")
        }
      }
      setIsLoading(false)
    }, 1500)
  }

  const fillDefaultCredentials = (type, index = 0) => {
    if (type === "admin") {
      setCredentials({
        email: defaultCredentials.admin.email,
        password: defaultCredentials.admin.password,
      })
    } else if (type === "foreman") {
      setCredentials({
        email: availableForemen[index].email,
        password: availableForemen[index].password,
      })
    } else {
      setCredentials({
        email: defaultCredentials.user[index].email,
        password: defaultCredentials.user[index].password,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center">
                <Building className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Chit Fund Portal</h1>
                <p className="text-gray-600">Digital Chit Fund Management System</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">System Features</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Secure Admin Management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Foreman Dashboard & Tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">User Management System</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-orange-600" />
                  </div>
                  <span className="text-gray-700">Automated Compliance</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Ready to Get Started?</h3>
              <p className="text-blue-100 text-sm">
                Use the demo credentials to explore the system or contact support for your organization setup.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
              <p className="text-gray-600">Sign in to your account</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={loginType} onValueChange={setLoginType} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="admin" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Admin
                  </TabsTrigger>
                  <TabsTrigger value="foreman" className="gap-2">
                    <UserCheck className="h-4 w-4" />
                    Foreman
                  </TabsTrigger>
                  <TabsTrigger value="user" className="gap-2">
                    <User className="h-4 w-4" />
                    User
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="admin" className="space-y-4 mt-6">
                  <Alert className="border-blue-200 bg-blue-50">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Demo Admin Access</strong>
                      <br />
                      Use the default credentials below or click "Fill Demo Credentials"
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="admin-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="Enter admin email"
                          value={credentials.email}
                          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="admin-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="admin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={credentials.password}
                          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                          className="pl-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" onClick={() => fillDefaultCredentials("admin")} className="w-full gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Fill Demo Credentials
                    </Button>

                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <div className="font-medium text-gray-700 mb-1">Default Admin Credentials:</div>
                      <div className="text-gray-600">
                        <div>Email: admin@chitfundportal.com</div>
                        <div>Password: Admin@123</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="foreman" className="space-y-4 mt-6">
                  <Alert className="border-green-200 bg-green-50">
                    <UserCheck className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Foreman Access</strong>
                      <br />
                      Choose from available foreman accounts. New foremen added through admin panel will automatically
                      appear here.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="foreman-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="foreman-email"
                          type="email"
                          placeholder="Enter foreman email"
                          value={credentials.email}
                          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="foreman-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="foreman-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={credentials.password}
                          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                          className="pl-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Available Foreman Accounts ({availableForemen.length}):
                      </Label>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {availableForemen.map((foreman, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            onClick={() => fillDefaultCredentials("foreman", index)}
                            className="w-full justify-start gap-3 h-auto p-3"
                          >
                            <div className="h-8 w-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {foreman.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div className="text-left">
                              <div className="font-medium">{foreman.name}</div>
                              <div className="text-xs text-gray-500">{foreman.email}</div>
                              <div className="text-xs text-gray-400">Password: {foreman.password}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg text-sm border border-green-200">
                      <div className="font-medium text-green-900 mb-1">Note:</div>
                      <div className="text-green-700">
                        New foremen added through the admin panel will automatically appear in this list and can login
                        immediately.
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="user" className="space-y-4 mt-6">
                  <Alert className="border-purple-200 bg-purple-50">
                    <User className="h-4 w-4 text-purple-600" />
                    <AlertDescription className="text-purple-800">
                      <strong>Demo User Access</strong>
                      <br />
                      Choose from available demo user accounts
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="user-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="Enter user email"
                          value={credentials.email}
                          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="user-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="user-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={credentials.password}
                          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                          className="pl-10 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Quick Access - Demo Accounts:</Label>
                      {defaultCredentials.user.map((user, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => fillDefaultCredentials("user", index)}
                          className="w-full justify-start gap-3 h-auto p-3"
                        >
                          <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                onClick={handleLogin}
                disabled={isLoading || !credentials.email || !credentials.password}
                className="w-full h-12 text-base font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {loginType === "admin" && <Shield className="h-4 w-4" />}
                    {loginType === "foreman" && <UserCheck className="h-4 w-4" />}
                    {loginType === "user" && <User className="h-4 w-4" />}
                    Sign In as {loginType === "admin" ? "Admin" : loginType === "foreman" ? "Foreman" : "User"}
                  </div>
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Need help? Contact{" "}
                  <a href="mailto:support@chitfundportal.com" className="text-blue-600 hover:underline">
                    support@chitfundportal.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access Cards */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-blue-900">Admin Portal</div>
                <div className="text-xs text-blue-700">System Management</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-green-900">Foreman Portal</div>
                <div className="text-xs text-green-700">Scheme Management</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer">
              <CardContent className="p-4 text-center">
                <User className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-purple-900">User Portal</div>
                <div className="text-xs text-purple-700">Account Access</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
