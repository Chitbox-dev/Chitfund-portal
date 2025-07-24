"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, User, Eye, EyeOff, CheckCircle, Building, Users, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loginType, setLoginType] = useState("user")
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const defaultCredentials = {
    admin: {
      email: "admin@chitfundportal.com",
      password: "Admin@123",
    },
    foreman: [
      { email: "rajesh.kumar@email.com", password: "rajesh123", name: "Rajesh Kumar" },
      { email: "priya.sharma@email.com", password: "priya123", name: "Priya Sharma" },
      { email: "amit.patel@email.com", password: "amit123", name: "Amit Patel" },
    ],
    user: {
      ucfin: "CF-XX-25-000008",
      password: "user123",
    },
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
          router.push("/admin/dashboard")
        } else {
          alert("Invalid admin credentials")
        }
      } else if (loginType === "foreman") {
        const foremanMatch = defaultCredentials.foreman.find(
          (f) => f.email === credentials.email && f.password === credentials.password,
        )
        if (foremanMatch) {
          router.push("/foreman/dashboard")
        } else {
          alert("Invalid foreman credentials")
        }
      } else {
        // User login logic
        if (
          credentials.email === defaultCredentials.user.ucfin &&
          credentials.password === defaultCredentials.user.password
        ) {
          router.push("/dashboard")
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
        email: defaultCredentials.foreman[index].email,
        password: defaultCredentials.foreman[index].password,
      })
    } else {
      setCredentials({
        email: defaultCredentials.user.ucfin,
        password: defaultCredentials.user.password,
      })
    }
  }

  useEffect(() => {
    // Redirect to the new auth login page
    router.push("/auth/login")
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">Chit Fund Portal</CardTitle>
                <p className="text-xs text-gray-600">Government of India | Secure Login</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <Tabs value={loginType} onValueChange={setLoginType} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="user" className="gap-2 text-xs">
                  <User className="h-3 w-3" />
                  User Login
                </TabsTrigger>
                <TabsTrigger value="foreman" className="gap-2 text-xs">
                  <Users className="h-3 w-3" />
                  Foreman Login
                </TabsTrigger>
                <TabsTrigger value="admin" className="gap-2 text-xs">
                  <Shield className="h-3 w-3" />
                  Admin Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="user-ucfin" className="text-sm font-medium">
                      UCFIN / Mobile Number
                    </Label>
                    <Input
                      id="user-ucfin"
                      placeholder="CF-XX-25-000008"
                      value={credentials.email}
                      onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="user-password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="user-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        className="pr-10"
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

                  <Button
                    onClick={handleLogin}
                    disabled={isLoading || !credentials.email || !credentials.password}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing In...
                      </div>
                    ) : (
                      "Login as User"
                    )}
                  </Button>

                  <div className="bg-blue-50 p-3 rounded-lg text-sm border border-blue-200">
                    <div className="font-medium text-blue-900 mb-1">Demo User Credentials:</div>
                    <div className="text-blue-700 space-y-1">
                      <div>UCFIN: CF-XX-25-000008</div>
                      <div>Password: user123</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fillDefaultCredentials("user")}
                      className="mt-2 w-full text-xs"
                    >
                      Fill Demo Credentials
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="foreman" className="space-y-4 mt-6">
                <Alert className="border-green-200 bg-green-50">
                  <Users className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Demo Foreman Access</strong>
                    <br />
                    Choose from available demo foreman accounts
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
                    <Label className="text-sm font-medium">Quick Access - Demo Accounts:</Label>
                    {defaultCredentials.foreman.map((foreman, index) => (
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
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4 mt-6">
                <Alert className="border-red-200 bg-red-50">
                  <Shield className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Admin Access</strong>
                    <br />
                    Restricted access for system administrators only
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="admin-email">Admin Email</Label>
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
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter admin password"
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

                  <div className="bg-red-50 p-3 rounded-lg text-sm border border-red-200">
                    <div className="font-medium text-red-900 mb-1">Demo Admin Credentials:</div>
                    <div className="text-red-700 space-y-1">
                      <div>Email: admin@chitfundportal.com</div>
                      <div>Password: Admin@123</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={handleLogin}
              disabled={isLoading || !credentials.email || !credentials.password}
              className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {loginType === "admin" ? (
                    <Shield className="h-4 w-4" />
                  ) : loginType === "foreman" ? (
                    <Users className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
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
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Card className="bg-blue-50/80 border-blue-200 hover:bg-blue-100/80 transition-colors cursor-pointer backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <User className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-xs font-medium text-blue-900">User Portal</div>
              <div className="text-xs text-blue-700">Member Access</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50/80 border-green-200 hover:bg-green-100/80 transition-colors cursor-pointer backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <Users className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-xs font-medium text-green-900">Foreman Portal</div>
              <div className="text-xs text-green-700">Scheme Management</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50/80 border-red-200 hover:bg-red-100/80 transition-colors cursor-pointer backdrop-blur-sm">
            <CardContent className="p-3 text-center">
              <Shield className="h-6 w-6 text-red-600 mx-auto mb-1" />
              <div className="text-xs font-medium text-red-900">Admin Portal</div>
              <div className="text-xs text-red-700">System Control</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
