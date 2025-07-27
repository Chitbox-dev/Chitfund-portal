"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield, ChevronDown, Newspaper, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Acts and Rules", href: "/legal/acts-and-rules" },
  ]

  const aboutItems = [
    { name: "About UCFSIN", href: "/about-ucfsin" },
    { name: "About Chitfund", href: "/about-chitfund" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
  ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-[#1e3a8a]" />
              <span className="text-lg sm:text-xl font-bold text-[#1e3a8a] truncate">
                <span className="hidden sm:inline">Chitfund Portal</span>
                <span className="sm:hidden">UCFSIN</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#1e3a8a] px-2 xl:px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}

            {/* About Us Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-[#1e3a8a] px-2 xl:px-3 py-2 text-sm font-medium transition-colors">
                About Us
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {aboutItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* News and Updates with Icon */}
            <Link
              href="/news"
              className="flex items-center text-gray-700 hover:text-[#1e3a8a] px-2 xl:px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap"
            >
              <Newspaper className="mr-2 h-4 w-4" />
              <span className="hidden xl:inline">News and Updates</span>
              <span className="xl:hidden">News</span>
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white bg-transparent text-xs sm:text-sm px-3 lg:px-4"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-[#1e3a8a] hover:bg-[#3b82f6] text-white text-xs sm:text-sm px-3 lg:px-4">
                <span className="hidden lg:inline">UCFSIN Registration</span>
                <span className="lg:hidden">Register</span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b bg-[#1e3a8a] text-white">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-6 w-6" />
                      <span className="font-bold">UCFSIN Portal</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-1">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-gray-700 hover:text-[#1e3a8a] hover:bg-gray-50 px-3 py-3 text-base font-medium transition-colors rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}

                      <div className="border-t pt-4 mt-4">
                        <div className="text-sm font-medium text-gray-500 mb-2 px-3">About Us</div>
                        {aboutItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block text-gray-700 hover:text-[#1e3a8a] hover:bg-gray-50 px-3 py-2 text-base transition-colors rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      <Link
                        href="/news"
                        className="flex items-center text-gray-700 hover:text-[#1e3a8a] hover:bg-gray-50 px-3 py-3 text-base font-medium transition-colors rounded-md mt-4"
                        onClick={() => setIsOpen(false)}
                      >
                        <Newspaper className="mr-3 h-5 w-5" />
                        News and Updates
                      </Link>
                    </div>
                  </div>

                  {/* Mobile CTA Buttons */}
                  <div className="border-t p-4 space-y-3">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white bg-transparent"
                      >
                        Login to Account
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-[#1e3a8a] hover:bg-[#3b82f6] text-white">UCFSIN Registration</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
