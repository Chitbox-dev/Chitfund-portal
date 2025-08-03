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

export default function AuthLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loginType, setLoginType] = useState("user")
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [dynamicForemen, setDynamicForemen] = useState([])

  // Load dynamic foremen from localStorage on component mount
  useEffect(() => {
    const loadDynamicForemen = () => {
      try {
        const storedForemen = localStorage.getItem("foremenList")
        console.log("Raw stored foremen:", storedForemen) // Debug log
        if (storedForemen) {
          const parsedForemen = JSON.parse(storedForemen)
          console.log("Parsed dynamic foremen:", parsedForemen) // Debug log
          setDynamicForemen(parsedForemen)
        } else {
          console.log("No stored foremen found") // Debug log
          setDynamicForemen([])
        }
      } catch (error) {
        console.error("Error parsing stored foremen:", error)
        setDynamicForemen([])
      }
    }

    loadDynamicForemen()

    // Also listen for storage changes in case foremen are added in another tab
    const handleStorageChange = (e) => {
      if (e.key === "foremenList") {
        console.log("Storage changed, reloading foremen") // Debug log
        loadDynamicForemen()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

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
          localStorage.setItem("adminToken", "admin-token-123")
          localStorage.setItem("userType", "admin")
          router.push("/admin/dashboard")
        } else {
          alert("Invalid admin credentials")
        }
      } else if (loginType === "foreman") {
        console.log("=== FOREMAN LOGIN ATTEMPT ===")
        console.log("Input credentials:", credentials)

        // Get the latest data from localStorage
        const latestDynamicForemen = JSON.parse(localStorage.getItem("foremenList") || "[]")
        console.log("Latest dynamic foremen from localStorage:", latestDynamicForemen)
        console.log("Current state dynamic foremen:", dynamicForemen)

        // Check default foremen first
        const defaultForemanMatch = defaultCredentials.foreman.find((f) => {
          console.log(
            `Checking default foreman: ${f.email} === ${credentials.email} && ${f.password} === ${credentials.password}`,
          )
          return f.email === credentials.email && f.password === credentials.password
        })

        // Check dynamic foremen with detailed logging
        const dynamicForemanMatch = latestDynamicForemen.find((f) => {
          console.log(
            `Checking dynamic foreman: ${f.email} === ${credentials.email} && ${f.password} === ${credentials.password}`,
          )
          console.log("Foreman object:", f)
          return f.email === credentials.email && f.password === credentials.password
        })

        const foremanMatch = defaultForemanMatch || dynamicForemanMatch

        console.log("Default foreman match:", defaultForemanMatch)
        console.log("Dynamic foreman match:", dynamicForemanMatch)
        console.log("Final foreman match:", foremanMatch)

        if (foremanMatch) {
          console.log("Login successful for foreman:", foremanMatch)
          localStorage.setItem("foremanToken", "foreman-token-123")
          localStorage.setItem("userType", "foreman")
          localStorage.setItem("foremanName", foremanMatch.name || `${foremanMatch.firstName} ${foremanMatch.lastName}`)
          localStorage.setItem("foremanEmail", foremanMatch.email)
          localStorage.setItem("foremanId", foremanMatch.id || foremanMatch.foremanId || "FM-" + Date.now())
          router.push("/foreman/dashboard")
        } else {
          console.log("=== LOGIN FAILED ===")
          console.log("Available accounts:")
          console.log("Default foremen:", defaultCredentials.foreman)
          console.log("Dynamic foremen:", latestDynamicForemen)

          alert(
            `Invalid foreman credentials.\n\nEntered:\nEmail: ${credentials.email}\nPassword: ${credentials.password}\n\nAvailable accounts: ${latestDynamicForemen.length + defaultCredentials.foreman.length}\n\nPlease check your email and password.`,
          )
        }
      } else {
        // User login logic
        if (
          credentials.email === defaultCredentials.user.ucfin &&
          credentials.password === defaultCredentials.user.password
        ) {
          localStorage.setItem("userToken", "user-token-123")
          localStorage.setItem("userType", "user")
          router.push("/user/dashboard")
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
      if (index < defaultCredentials.foreman.length) {
        setCredentials({
          email: defaultCredentials.foreman[index].email,
          password: defaultCredentials.foreman[index].password,
        })
      } else {
        // Handle dynamic foremen
        const dynamicIndex = index - defaultCredentials.foreman.length
        if (dynamicIndex < dynamicForemen.length) {
          const foreman = dynamicForemen[dynamicIndex]
          console.log("Filling credentials for dynamic foreman:", foreman)
          setCredentials({
            email: foreman.email,
            password: foreman.password,
          })
        }
      }
    } else {
      setCredentials({
        email: defaultCredentials.user.ucfin,
        password: defaultCredentials.user.password,
      })
    }
  }

  // Quick fill for the specific foreman mentioned
  const fillSpecificForeman = () => {
    setCredentials({
      email: "chitboxdev@gmail.com",
      password: "aakash123",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - System Information */}
      <div className="hidden lg:flex lg:w-1/2 bg-white p-8 lg:p-12 flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
              <Building className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chit Fund Portal</h1>
              <p className="text-gray-600">Digital Chit Fund Management System</p>
            </div>
          </div>

          {/* System Features */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900">System Features</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">Secure Admin Management</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Foreman Dashboard & Tools</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">User Management System</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-gray-700 font-medium">Automated Compliance</span>
              </div>
            </div>
          </div>

          {/* Ready to Get Started Section */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Ready to Get Started?</h3>
            <p className="text-blue-100 text-sm">
              Use the demo credentials to explore the system or contact support for assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
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

                    {/* Quick Test Button for the specific foreman */}
                    <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                      <div className="font-medium text-orange-900 mb-2">Test Specific Foreman:</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={fillSpecificForeman}
                        className="w-full text-xs bg-orange-100 hover:bg-orange-200"
                      >
                        Fill chitboxdev@gmail.com / aakash123
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Quick Access - Available Accounts:</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const storedForemen = localStorage.getItem("foremenList")
                            console.log("Manual refresh - stored foremen:", storedForemen)
                            if (storedForemen) {
                              const parsed = JSON.parse(storedForemen)
                              console.log("Manual refresh - parsed foremen:", parsed)
                              setDynamicForemen(parsed)
                            }
                          }}
                          className="text-xs"
                        >
                          Refresh Accounts
                        </Button>
                      </div>

                      {/* Default Demo Accounts */}
                      <div className="text-xs text-gray-500 font-medium mb-1">Demo Accounts:</div>
                      {defaultCredentials.foreman.map((foreman, index) => (
                        <Button
                          key={`default-${index}`}
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

                      {/* Dynamic Foremen */}
                      {dynamicForemen.length > 0 && (
                        <>
                          <div className="text-xs text-gray-500 font-medium mb-1 mt-3">Admin Added Accounts:</div>
                          {dynamicForemen.map((foreman, index) => (
                            <Button
                              key={`dynamic-${index}`}
                              variant="outline"
                              onClick={() =>
                                fillDefaultCredentials("foreman", defaultCredentials.foreman.length + index)
                              }
                              className="w-full justify-start gap-3 h-auto p-3 border-blue-200 bg-blue-50 hover:bg-blue-100"
                            >
                              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {foreman.firstName && foreman.lastName
                                  ? `${foreman.firstName[0]}${foreman.lastName[0]}`
                                  : foreman.name
                                      ?.split(" ")
                                      .map((n) => n[0])
                                      .join("") || "FM"}
                              </div>
                              <div className="text-left">
                                <div className="font-medium">
                                  {foreman.name || `${foreman.firstName} ${foreman.lastName}`}
                                </div>
                                <div className="text-xs text-gray-500">{foreman.email}</div>
                                <div className="text-xs text-blue-600">Admin Added</div>
                              </div>
                            </Button>
                          ))}
                        </>
                      )}
                    </div>

                    {/* Enhanced Debug Information */}
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border text-xs">
                      <div className="font-medium text-gray-700 mb-2">Debug Information:</div>
                      <div className="space-y-1 text-gray-600">
                        <div>Default Foremen: {defaultCredentials.foreman.length}</div>
                        <div>Dynamic Foremen: {dynamicForemen.length}</div>
                        <div>Total Available: {defaultCredentials.foreman.length + dynamicForemen.length}</div>
                        <div>
                          Current Input: {credentials.email} / {credentials.password}
                        </div>
                        {dynamicForemen.length > 0 && (
                          <div className="mt-2">
                            <div className="font-medium">Dynamic Foremen Details:</div>
                            {dynamicForemen.map((f, i) => (
                              <div key={i} className="ml-2 bg-white p-2 rounded mt-1">
                                <div>Email: {f.email}</div>
                                <div>Password: {f.password}</div>
                                <div>Name: {f.name || `${f.firstName} ${f.lastName}`}</div>
                                <div>ID: {f.id}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
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

          {/* Mobile System Features - Only visible on mobile */}
          <div className="lg:hidden mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">System Features</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Admin Management</span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Foreman Tools</span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">User System</span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Compliance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
