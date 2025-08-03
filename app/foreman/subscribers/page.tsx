"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Clock, FileText, RefreshCw } from "lucide-react"

export default function ForemanSubscribersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSubscriber, setSelectedSubscriber] = useState(null)
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showSubscriberGenerator, setShowSubscriberGenerator] = useState(false)

  const loadSubscribers = () => {
    try {
      // Load subscribers from local storage
      const storedSubscribers = JSON.parse(localStorage.getItem("subscribers") || "[]")
      setSubscribers(storedSubscribers)
    } catch (error) {
      console.error("Error loading subscribers:", error)
      setSubscribers([])
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    loadSubscribers()
    setRefreshing(false)
  }

  useEffect(() => {
    loadSubscribers()
  }, [])

  // Filter subscribers based on search and status
  const filteredSubscribers = subscribers.filter((subscriber) => {
    const matchesSearch =
      (subscriber.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (subscriber.ucfsin || "").toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || subscriber.paymentStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading subscribers...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-\
