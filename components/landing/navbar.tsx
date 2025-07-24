"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield, ChevronDown, Newspaper } from "lucide-react"
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
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-[#1e3a8a]" />
              <span className="text-xl font-bold text-[#1e3a8a]">Chitfund Portal</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#1e3a8a] px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* About Us Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-[#1e3a8a] px-3 py-2 text-sm font-medium transition-colors">
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
              className="flex items-center text-gray-700 hover:text-[#1e3a8a] px-3 py-2 text-sm font-medium transition-colors"
            >
              <Newspaper className="mr-2 h-4 w-4" />
              News and Updates
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/register">
              <Button className="bg-[#1e3a8a] hover:bg-[#3b82f6] text-white">UCFSIN Registration</Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white bg-transparent"
              >
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-[#1e3a8a] px-3 py-2 text-base font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <div className="border-t pt-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">About Us</div>
                    {aboutItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-gray-700 hover:text-[#1e3a8a] px-3 py-2 text-base transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href="/news"
                    className="flex items-center text-gray-700 hover:text-[#1e3a8a] px-3 py-2 text-base font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Newspaper className="mr-2 h-4 w-4" />
                    News and Updates
                  </Link>

                  <div className="border-t pt-4 space-y-2">
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-[#1e3a8a] hover:bg-[#3b82f6] text-white">UCFSIN Registration</Button>
                    </Link>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white bg-transparent"
                      >
                        Login
                      </Button>
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
