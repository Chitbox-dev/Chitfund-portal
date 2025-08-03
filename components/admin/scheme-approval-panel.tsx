"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DocumentPreview } from "./document-preview"
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Building,
  Calendar,
  DollarSign,
  Users,
  Phone,
  Mail,
  AlertCircle,
  Download,
  Eye,
} from "lucide-react"

interface SchemeApprovalPanelProps {
  scheme: any
  onApprove: (schemeId: string, comments: string) => void
  onReject: (schemeId: string, reason: string) => void
  onApproveFinalAgreement?: (schemeId: string, comments: string) => void
}

export function SchemeApprovalPanel({
  scheme,
  onApprove,
  onReject,
  onApproveFinalAgreement,
}: SchemeApprovalPanelProps) {
  const [comments, setComments] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showPreview, setShowPreview] = useState(false)

  const handleApprove = async () => {
    if (!comments.trim()) {
      alert("Please provide approval comments")
      return
    }
    setIsProcessing(true)
    await onApprove(scheme.schemeId, comments)
    setIsProcessing(false)
    setComments("")
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide rejection reason")
      return
    }
    setIsProcessing(true)
    await onReject(scheme.schemeId, rejectionReason)
    setIsProcessing(false)
    setRejectionReason("")
  }

  const handleApproveFinal = async () => {
    if (!comments.trim()) {
      alert("Please provide final approval comments")
      return
    }
    setIsProcessing(true)
    if (onApproveFinalAgreement) {
      await onApproveFinalAgreement(scheme.schemeId, comments)
    }
    setIsProcessing(false)
    setComments("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "steps_1_4_approved":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "pso_approved":
        return "bg-green-100 text-green-800 border-green-300"
      case "final_agreement_uploaded":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "live":
        return "bg-emerald-100 text-emerald-800 border-emerald-300"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-4 w-4" />
      case "steps_1_4_approved":
      case "pso_approved":
        return <CheckCircle className="h-4 w-4" />
      case "final_agreement_uploaded":
        return <FileText className="h-4 w-4" />
      case "live":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  // Get document status based on scheme status
  const getDocumentStatus = (docKey: string) => {
    if (
      scheme.schemeStatus === "steps_1_4_approved" ||
      scheme.schemeStatus === "pso_approved" ||
      scheme.schemeStatus === "live"
    ) {
      return "approved"
    }
    if (scheme.schemeStatus === "rejected") {
      return "rejected"
    }
    return scheme[docKey]?.reviewStatus || "pending"
  }

  const handlePreviewDocument = (docType: string, docName: string) => {
    const mockDocument = {
      name: `${docName}.pdf`,
      type: docType,
      size: 2500000, // 2.5MB
      schemeId: scheme.schemeId,
      url: "#", // Mock URL
    }
    setSelectedDocument(mockDocument)
    setShowPreview(true)
  }

  if (!scheme) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Select a scheme to view details</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Scheme Header */}
      <Card className="border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {scheme.schemeName || `Scheme ${scheme.schemeId}`}
              </CardTitle>
              <p className="text-gray-600 mt-1">Scheme ID: {scheme.schemeId}</p>
            </div>
            <Badge className={`${getStatusColor(scheme.schemeStatus)} px-4 py-2 text-sm font-semibold`}>
              {getStatusIcon(scheme.schemeStatus)}
              <span className="ml-2">{scheme.schemeStatus?.replace(/_/g, " ").toUpperCase()}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-lg font-bold text-gray-900">
                  ₹
                  {scheme.chitValue
                    ? Number.parseFloat(scheme.chitValue).toLocaleString()
                    : scheme.totalValue?.toLocaleString() || "100,000"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Subscribers</p>
                <p className="text-lg font-bold text-gray-900">
                  {scheme.numberOfSubscribers || scheme.totalSubscribers || "30"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Duration</p>
                <p className="text-lg font-bold text-gray-900">
                  {scheme.chitDuration || scheme.duration || "30"} months
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-lg font-bold text-gray-900">
                  {scheme.submittedAt
                    ? new Date(scheme.submittedAt).toLocaleDateString()
                    : scheme.submittedDate
                      ? new Date(scheme.submittedDate).toLocaleDateString()
                      : "02/08/2025"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Foreman Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Foreman Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Company</p>
                  <p className="font-semibold text-gray-900">{scheme.foremanCompany || "Foreman Company"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Foreman Name</p>
                  <p className="font-semibold text-gray-900">{scheme.foremanName || "Gyanesh Foreman"}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{scheme.foremanEmail || "foreman@example.com"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{scheme.foremanPhone || "+91 9876543210"}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scheme Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Scheme Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Installment Amount</p>
                <p className="text-lg font-bold text-gray-900">
                  ₹{scheme.monthlyPremium?.toLocaleString() || scheme.installmentAmount?.toLocaleString() || "3,333"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Commission Rate</p>
                <p className="text-lg font-bold text-gray-900">{scheme.commissionRate || "5"}%</p>
              </div>
            </div>
            {scheme.description && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Description</p>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{scheme.description}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submitted Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Submitted Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Commission Structure", key: "commissionStructure" },
              { name: "Terms of Withdrawal", key: "termsOfWithdrawal" },
              { name: "Liabilities Document", key: "liabilitiesDocument" },
              { name: "Subscriber Rights", key: "subscriberRights" },
              { name: "FDR Document", key: "fdrDocument" },
              { name: "Draft Agreement", key: "draftAgreement" },
            ].map((doc, index) => {
              const docStatus = getDocumentStatus(doc.key)
              const docData = scheme[doc.key] || {
                name: `${doc.name}.pdf`,
                size: "2.5 MB",
                uploadedAt: new Date().toISOString(),
              }

              return (
                <div key={doc.key} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{docData.name}</p>
                      <p className="text-sm text-gray-500">
                        {docData.size} • Uploaded: {new Date(docData.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        docStatus === "approved"
                          ? "bg-green-100 text-green-800 border-green-300"
                          : docStatus === "rejected"
                            ? "bg-red-100 text-red-800 border-red-300"
                            : "bg-yellow-100 text-yellow-800 border-yellow-300"
                      }
                    >
                      {docStatus === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {docStatus === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                      {docStatus === "pending" && <Clock className="h-3 w-3 mr-1" />}
                      {docStatus.charAt(0).toUpperCase() + docStatus.slice(1)}
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handlePreviewDocument(doc.key, doc.name)}>
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* PSO Certificate (if approved) */}
      {(scheme.schemeStatus === "steps_1_4_approved" ||
        scheme.schemeStatus === "pso_approved" ||
        scheme.schemeStatus === "live") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              PSO Certificate Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>PSO Number:</strong> {scheme.psoNumber || `PSO-2025-${scheme.schemeId.slice(-4)}`}
                <br />
                <strong>Generated:</strong>{" "}
                {scheme.psoGeneratedDate ? new Date(scheme.psoGeneratedDate).toLocaleString() : "02/08/2025, 07:43"}
              </AlertDescription>
            </Alert>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Preview Certificate
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Final Agreement (if uploaded) */}
      {scheme.finalAgreement && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Final Agreement Uploaded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">{scheme.finalAgreement.name}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Agreement
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Commencement Certificate (if live) */}
      {scheme.commencementCertificate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              Form 7 - Commencement Certificate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Form 7 Number:</strong> {scheme.commencementCertificate.number}
                <br />
                <strong>Issued:</strong>{" "}
                {scheme.commencementCertificate.issuedDate
                  ? new Date(scheme.commencementCertificate.issuedDate).toLocaleString()
                  : "N/A"}
                <br />
                <strong>Status:</strong> Scheme is now LIVE and operational
              </AlertDescription>
            </Alert>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Preview Certificate
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rejection Reason (if rejected) */}
      {scheme.schemeStatus === "rejected" && scheme.rejectionReason && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <XCircle className="h-5 w-5" />
              Rejection Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Reason:</strong> {scheme.rejectionReason}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Action Panel */}
      <Card className="border-2 border-dashed">
        <CardHeader>
          <CardTitle>Administrative Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {scheme.schemeStatus === "submitted" && (
            <>
              <div className="space-y-3">
                <Label htmlFor="approval-comments">Approval Comments *</Label>
                <Textarea
                  id="approval-comments"
                  placeholder="Enter your comments for PSO approval..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleApprove}
                  disabled={isProcessing || !comments.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isProcessing ? "Processing..." : "Approve & Generate PSO"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    const reason = prompt("Please provide rejection reason:")
                    if (reason) {
                      setRejectionReason(reason)
                      handleReject()
                    }
                  }}
                  disabled={isProcessing}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Scheme
                </Button>
              </div>
            </>
          )}

          {scheme.schemeStatus === "final_agreement_uploaded" && onApproveFinalAgreement && (
            <>
              <div className="space-y-3">
                <Label htmlFor="final-approval-comments">Final Approval Comments *</Label>
                <Textarea
                  id="final-approval-comments"
                  placeholder="Enter your comments for final approval and Form 7 generation..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleApproveFinal}
                  disabled={isProcessing || !comments.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isProcessing ? "Processing..." : "Final Approval & Generate Form 7"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    const reason = prompt("Please provide rejection reason:")
                    if (reason) {
                      setRejectionReason(reason)
                      handleReject()
                    }
                  }}
                  disabled={isProcessing}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Final Agreement
                </Button>
              </div>
            </>
          )}

          {(scheme.schemeStatus === "steps_1_4_approved" ||
            scheme.schemeStatus === "pso_approved" ||
            scheme.schemeStatus === "live") && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                This scheme has been processed and no further administrative action is required.
                {scheme.schemeStatus === "live" && " The scheme is now live and operational."}
              </AlertDescription>
            </Alert>
          )}

          {scheme.schemeStatus === "rejected" && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                This scheme has been rejected. The foreman has been notified and can resubmit with corrections.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Document Preview Dialog */}
      {selectedDocument && (
        <DocumentPreview
          document={selectedDocument}
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false)
            setSelectedDocument(null)
          }}
        />
      )}
    </div>
  )
}
