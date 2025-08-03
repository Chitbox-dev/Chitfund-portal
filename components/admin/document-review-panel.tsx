"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, CheckCircle, XCircle, Clock, Eye, Download, AlertCircle } from "lucide-react"

interface DocumentReviewPanelProps {
  scheme: any
  onDocumentApprove: (documentIndex: number, comments: string) => void
  onDocumentReject: (documentIndex: number, reason: string) => void
}

export function DocumentReviewPanel({ scheme, onDocumentApprove, onDocumentReject }: DocumentReviewPanelProps) {
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [reviewAction, setReviewAction] = useState<"approve" | "reject">("approve")
  const [reviewComments, setReviewComments] = useState("")
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)

  const documentTypes = [
    { name: "Commission Structure", key: "commissionStructure" },
    { name: "Terms of Withdrawal", key: "termsOfWithdrawal" },
    { name: "Liabilities Document", key: "liabilitiesDocument" },
    { name: "Subscriber Rights", key: "subscriberRights" },
    { name: "FDR Document", key: "fdrDocument" },
    { name: "Draft Agreement", key: "draftAgreement" },
  ]

  const getDocumentStatus = (docKey: string) => {
    // If scheme is approved, all documents should show as approved
    if (
      scheme.schemeStatus === "steps_1_4_approved" ||
      scheme.schemeStatus === "pso_approved" ||
      scheme.schemeStatus === "live"
    ) {
      return "approved"
    }

    // If scheme is rejected, all documents should show as rejected
    if (scheme.schemeStatus === "rejected") {
      return "rejected"
    }

    // Otherwise, check individual document status
    const doc = scheme[docKey]
    return doc?.reviewStatus || "pending"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-3 w-3" />
      case "rejected":
        return <XCircle className="h-3 w-3" />
      case "pending":
        return <Clock className="h-3 w-3" />
      default:
        return <AlertCircle className="h-3 w-3" />
    }
  }

  const handleDocumentReview = (docIndex: number, docKey: string, action: "approve" | "reject") => {
    const doc = scheme[docKey] || { name: `${documentTypes[docIndex].name}.pdf` }
    setSelectedDocument({ ...doc, index: docIndex, key: docKey, type: documentTypes[docIndex].name })
    setReviewAction(action)
    setIsReviewDialogOpen(true)
  }

  const handleSubmitReview = () => {
    if (!reviewComments.trim()) {
      alert("Please provide review comments")
      return
    }

    if (reviewAction === "approve") {
      onDocumentApprove(selectedDocument.index, reviewComments)
    } else {
      onDocumentReject(selectedDocument.index, reviewComments)
    }

    setIsReviewDialogOpen(false)
    setReviewComments("")
    setSelectedDocument(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Review System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentTypes.map((docType, index) => {
              const doc = scheme[docType.key] || {
                name: `${docType.name}.pdf`,
                size: "2.5 MB",
                uploadedAt: new Date().toISOString(),
              }
              const status = getDocumentStatus(docType.key)

              return (
                <div key={docType.key} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        {doc.size} • Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                      {doc.reviewHistory && doc.reviewHistory.length > 0 && (
                        <p className="text-xs text-gray-400">
                          Last reviewed:{" "}
                          {new Date(doc.reviewHistory[doc.reviewHistory.length - 1].date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(status)}>
                      {getStatusIcon(status)}
                      <span className="ml-1">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    </Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      {status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleDocumentReview(index, docType.key, "approve")}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDocumentReview(index, docType.key, "reject")}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
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

      {/* Document Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{reviewAction === "approve" ? "Approve Document" : "Reject Document"}</DialogTitle>
            <DialogDescription>
              {selectedDocument && `${selectedDocument.type} - ${selectedDocument.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="review-comments">
                {reviewAction === "approve" ? "Approval Comments" : "Rejection Reason"}
              </Label>
              <Textarea
                id="review-comments"
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                placeholder={
                  reviewAction === "approve" ? "Enter approval comments..." : "Enter reason for rejection..."
                }
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReview}
                className={
                  reviewAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }
              >
                {reviewAction === "approve" ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Document
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Document
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
