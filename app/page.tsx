"use client"

import Navbar from "@/components/landing/navbar"
import HeroSection from "@/components/landing/hero-section"
import DashboardSlider from "@/components/landing/dashboard-slider"
import FeatureCard from "@/components/landing/feature-card"
import HowItWorks from "@/components/landing/how-it-works"
import StatsCounter from "@/components/landing/stats-counter"
import ClientBrandsSlider from "@/components/landing/client-brands-slider"
import TestimonialSlider from "@/components/landing/testimonial-slider"
import Footer from "@/components/landing/footer"

const newsUpdates = [
  {
    id: 1,
    title: "New UCFSIN Registration Process Launched",
    date: "Jan 15, 2025",
    category: "REGISTRATION",
    excerpt:
      "Enhanced digital registration process with improved KYC verification and faster UCFSIN generation for all users across India.",
    type: "update",
  },
  {
    id: 2,
    title: "Enhanced Security Measures Implemented",
    date: "Jan 10, 2025",
    category: "SECURITY",
    excerpt:
      "Advanced encryption and multi-factor authentication now protect all user accounts and transactions on the platform.",
    type: "security",
  },
  {
    id: 3,
    title: "Monthly Performance Report - December 2024",
    date: "Jan 5, 2025",
    category: "REPORTS",
    excerpt:
      "Comprehensive review of chit fund performance, member benefits, and platform statistics for December 2024.",
    type: "report",
  },
]

const helpTopics = [
  "How do I register for UCFSIN?",
  "What documents are required for KYC?",
  "How to track my chit fund status?",
  "Payment and transaction queries",
  "Account security and login issues",
  "Mobile app download and setup",
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DashboardSlider />
      <FeatureCard />
      <HowItWorks />
      <StatsCounter />
      <ClientBrandsSlider />
      <TestimonialSlider />
      <Footer />
    </main>
  )
}
