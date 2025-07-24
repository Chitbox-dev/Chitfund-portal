"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, User, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function BasicInfo({ formData, updateFormData, onNext }) {
  const [name, setName] = useState(formData.name || "")
  const [dob, setDob] = useState(formData.dob || "")
  const [email, setEmail] = useState(formData.email || "")
  const [errors, setErrors] = useState({
    name: "",
    dob: "",
    email: "",
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: "",
      dob: "",
      email: "",
    }

    // Validate name
    if (!name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters"
      isValid = false
    }

    // Validate date of birth
    if (!dob) {
      newErrors.dob = "Date of birth is required"
      isValid = false
    } else {
      const dobDate = new Date(dob)
      const today = new Date()
      const minAge = new Date()
      minAge.setFullYear(today.getFullYear() - 18)

      if (dobDate > minAge) {
        newErrors.dob = "You must be at least 18 years old"
        isValid = false
      }
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData({ name, dob, email })
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Basic Information</h3>
            <p className="text-sm text-gray-500">Please provide your personal details</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700">
            Full Name (as per PAN/Aadhaar)
          </Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 text-base"
          />
          {errors.name && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 text-red-600 text-sm"
            >
              <AlertCircle className="h-4 w-4" />
              <span>{errors.name}</span>
            </motion.div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob" className="text-gray-700">
            Date of Birth
          </Label>
          <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="h-12 text-base" />
          {errors.dob && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 text-red-600 text-sm"
            >
              <AlertCircle className="h-4 w-4" />
              <span>{errors.dob}</span>
            </motion.div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base"
          />
          {errors.email && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 text-red-600 text-sm"
            >
              <AlertCircle className="h-4 w-4" />
              <span>{errors.email}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleSubmit}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          Continue <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
