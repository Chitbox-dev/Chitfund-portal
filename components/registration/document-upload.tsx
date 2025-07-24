"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, AlertCircle, X, Eye } from "lucide-react"

interface DocumentUploadProps {
  onNext: () => void
  onBack: () => void
}

interface DocumentFile {
  file: File | null
  uploaded: boolean
  verified: boolean
  error?: string
}

const requiredDocuments = [
  {
    id: "aadhaar",
    title: "Aadhaar Card",
    description: "Clear photo of both front and back side",
    required: true,
    maxSize: "5MB",
    formats: ["JPG", "PNG", "PDF"],
  },
  {
    id: "pan",
    title: "PAN Card",
    description: "Clear photo of PAN card",
    required: true,
    maxSize: "5MB",
    formats: ["JPG", "PNG", "PDF"],
  },
  {
    id: "bankStatement",
    title: "Bank Statement",
    description: "Last 3 months bank statement",
    required: true,
    maxSize: "10MB",
    formats: ["PDF"],
  },
  {
    id: "incomeProof",
    title: "Income Proof",
    description: "Salary slip, ITR, or business proof",
    required: true,
    maxSize: "10MB",
    formats: ["JPG", "PNG", "PDF"],
  },
  {
    id: "addressProof",
    title: "Address Proof",
    description: "Utility bill, rental agreement, etc.",
    required: false,
    maxSize: "5MB",
    formats: ["JPG", "PNG", "PDF"],
  },
  {
    id: "photo",
    title: "Passport Size Photo",
    description: "Recent passport size photograph",
    required: true,
    maxSize: "2MB",
    formats: ["JPG", "PNG"],
  },
]

export default function DocumentUpload({ onNext, onBack }: DocumentUploadProps) {
  const [documents, setDocuments] = useState<Record<string, DocumentFile>>(
    requiredDocuments.reduce(
      (acc, doc) => ({
        ...acc,
        [doc.id]: { file: null, uploaded: false, verified: false },
      }),
      {},
    ),
  )

  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

  const handleFileSelect = (docId: string, file: File) => {
    const document = requiredDocuments.find((doc) => doc.id === docId)
    if (!document) return

    // Validate file size
    const maxSizeBytes = Number.parseFloat(document.maxSize) * 1024 * 1024
    if (file.size > maxSizeBytes) {
      setDocuments((prev) => ({
        ...prev,
        [docId]: {
          ...prev[docId],
          error: `File size exceeds ${document.maxSize}`,
        },
      }))
      return
    }

    // Validate file format
    const fileExtension = file.name.split(".").pop()?.toUpperCase()
    if (!document.formats.includes(fileExtension || "")) {
      setDocuments((prev) => ({
        ...prev,
        [docId]: {
          ...prev[docId],
          error: `Invalid format. Allowed: ${document.formats.join(", ")}`,
        },
      }))
      return
    }

    // Simulate upload
    setDocuments((prev) => ({
      ...prev,
      [docId]: { file, uploaded: false, verified: false, error: undefined },
    }))

    // Simulate upload progress
    setUploadProgress((prev) => ({ ...prev, [docId]: 0 }))
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const currentProgress = prev[docId] || 0
        if (currentProgress >= 100) {
          clearInterval(interval)
          setDocuments((prevDocs) => ({
            ...prevDocs,
            [docId]: { ...prevDocs[docId], uploaded: true, verified: true },
          }))
          return prev
        }
        return { ...prev, [docId]: currentProgress + 10 }
      })
    }, 200)
  }

  const removeDocument = (docId: string) => {
    setDocuments((prev) => ({
      ...prev,
      [docId]: { file: null, uploaded: false, verified: false, error: undefined },
    }))
    setUploadProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[docId]
      return newProgress
    })
  }

  const requiredDocsUploaded = requiredDocuments
    .filter((doc) => doc.required)
    .every((doc) => documents[doc.id]?.uploaded)

  const totalProgress = Math.round(
    (Object.values(documents).filter((doc) => doc.uploaded).length / requiredDocuments.length) * 100,
  )

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <Card className="border-blue-200">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-[#1e3a8a]">Document Upload</CardTitle>
          <p className="text-gray-600">
            Upload required documents for KYC verification. All documents will be verified within 24-48 hours.
          </p>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Upload Progress</span>
              <span>{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Document Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requiredDocuments.map((document) => {
          const docData = documents[document.id]
          const progress = uploadProgress[document.id]

          return (
            <Card key={document.id} className="border-gray-200 hover:border-blue-300 transition-colors">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-[#1e3a8a]">{document.title}</h3>
                      {document.required && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Required</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{document.description}</p>
                    <p className="text-xs text-gray-500">
                      Max size: {document.maxSize} | Formats: {document.formats.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Upload Area */}
                {!docData.file ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id={`file-${document.id}`}
                      className="hidden"
                      accept={document.formats.map((f) => `.${f.toLowerCase()}`).join(",")}
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileSelect(document.id, file)
                      }}
                    />
                    <Label htmlFor={`file-${document.id}`} className="cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    </Label>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* File Info */}
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{docData.file.name}</p>
                        <p className="text-xs text-gray-500">{(docData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                          onClick={() => removeDocument(document.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {typeof progress === "number" && progress < 100 && (
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Uploading...</span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-1" />
                      </div>
                    )}

                    {/* Status */}
                    {docData.uploaded && (
                      <div className="flex items-center space-x-2 text-sm">
                        {docData.verified ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">Uploaded & Verified</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                            <span className="text-yellow-600">Uploaded - Pending Verification</span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Error */}
                    {docData.error && (
                      <div className="flex items-center space-x-2 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
                        <span>{docData.error}</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Important Guidelines */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4 md:p-6">
          <h4 className="font-semibold text-yellow-800 mb-3">Document Guidelines</h4>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• Ensure all documents are clear, readable, and not blurred</li>
            <li>• Documents should be recent and valid (not expired)</li>
            <li>• Name on all documents should match your registration details</li>
            <li>• Bank statement should show your name and account number clearly</li>
            <li>• Income proof should be recent (within last 3 months for salary slips)</li>
            <li>• All uploaded documents will be verified within 24-48 hours</li>
          </ul>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 bg-transparent"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!requiredDocsUploaded}
          className="flex-1 bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#1e3a8a] text-white py-3 disabled:opacity-50"
        >
          Continue to Verification
        </Button>
      </div>
    </div>
  )
}
