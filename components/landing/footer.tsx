"use client"

import Link from "next/link"
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-bold">Chitfund Portal</div>
                <div className="text-xs sm:text-sm text-gray-400">Government of India</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Your trusted platform for secure and transparent chit fund operations across India.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/legal/acts-and-rules" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Legal
                </Link>
              </li>
              <li>
                <Link href="/news-updates" className="text-gray-400 hover:text-white transition-colors text-sm">
                  News & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-ucfsin" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About UCFSIN
                </Link>
              </li>
              <li>
                <Link href="/about-chitfund" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Chitfund
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">1800-103-4786</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">support@ucfsin.gov.in</span>
              </div>
              <div className="flex items-start justify-center sm:justify-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm text-center sm:text-left">
                  Ministry of Corporate Affairs
                  <br />
                  Government of India
                  <br />
                  New Delhi - 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2024 UCFSIN - Government of India. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
