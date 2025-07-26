"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DocumentPreview } from "./document-preview"
import { FileText, Eye, Download, CheckCircle, XCircle, Clock, AlertCircle, MessageSquare } from "lucide-react"

interface DocumentReviewPanelProps {
  scheme: any
  onStatusUpdate: (schemeId: string, newStatus: string) => void
}

export function DocumentReviewPanel({ scheme, onStatusUpdate }: DocumentReviewPanelProps) {
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [reviewComment, setReviewComment] = useState("")
  const [documentStatuses, setDocumentStatuses] = useState({})
  const [reviewHistory, setReviewHistory] = useState({})

  // Document types with their display names
  const documentTypes = [
    { key: "commissionStructure", name: "Commission Structure", required: true },
    { key: "termsOfWithdrawal", name: "Terms of Withdrawal", required: true },
    { key: "liabilitiesDocument", name: "Liabilities Document", required: true },
    { key: "subscriberRights", name: "Subscriber Rights", required: true },
    { key: "fdrDocument", name: "FDR Document", required: true },
    { key: "draftAgreement", name: "Draft Agreement", required: true },
  ]

  // Load document statuses and review history from localStorage
  useEffect(() => {
    const savedStatuses = localStorage.getItem(`documentStatuses_${scheme.schemeId}`)
    const savedHistory = localStorage.getItem(`reviewHistory_${scheme.schemeId}`)

    if (savedStatuses) {
      setDocumentStatuses(JSON.parse(savedStatuses))
    }

    if (savedHistory) {
      setReviewHistory(JSON.parse(savedHistory))
    }
  }, [scheme.schemeId])

  // Save document statuses to localStorage
  const saveDocumentStatus = (docKey: string, status: string, comment: string) => {
    const newStatuses = {
      ...documentStatuses,
      [docKey]: status,
    }

    const newHistory = {
      ...reviewHistory,
      [docKey]: [
        ...(reviewHistory[docKey] || []),
        {
          status,
          comment,
          reviewedBy: "Admin",
          reviewedAt: new Date().toISOString(),
        },
      ],
    }

    setDocumentStatuses(newStatuses)
    setReviewHistory(newHistory)

    localStorage.setItem(`documentStatuses_${scheme.schemeId}`, JSON.stringify(newStatuses))
    localStorage.setItem(`reviewHistory_${scheme.schemeId}`, JSON.stringify(newHistory))
  }

  // Get document status
  const getDocumentStatus = (docKey: string) => {
    return documentStatuses[docKey] || "pending"
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Unknown
          </Badge>
        )
    }
  }

  // Handle document review
  const handleReviewDocument = (action: "approve" | "reject") => {
    if (!selectedDocument || !reviewComment.trim()) {
      alert("Please add a review comment")
      return
    }

    const status = action === "approve" ? "approved" : "rejected"
    saveDocumentStatus(selectedDocument.key, status, reviewComment)

    setShowReviewDialog(false)
    setReviewComment("")
    setSelectedDocument(null)

    alert(`Document ${action}d successfully!`)
  }

  // Get document statistics
  const getDocumentStats = () => {
    const total = documentTypes.length
    const approved = documentTypes.filter((doc) => getDocumentStatus(doc.key) === "approved").length
    const rejected = documentTypes.filter((doc) => getDocumentStatus(doc.key) === "rejected").length
    const pending = total - approved - rejected

    return { total, approved, rejected, pending }
  }

  const stats = getDocumentStats()

  // Create mock document objects for preview
  const createDocumentObject = (docType: any) => {
    const schemeDoc = scheme[docType.key]
    if (!schemeDoc) return null

    return {
      ...schemeDoc,
      key: docType.key,
      type: docType.key,
      displayName: docType.name,
      schemeId: scheme.schemeId,
    }
  }

  return (
    <div className="space-y-6">
      {/* Document Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Documents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-600">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Submitted Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentTypes.map((docType) => {
              const document = scheme[docType.key]
              const status = getDocumentStatus(docType.key)
              const history = reviewHistory[docType.key] || []

              return (
                <div key={docType.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">{docType.name}</h4>
                      {document ? (
                        <div className="text-sm text-gray-600">
                          <p>{document.name}</p>
                          <p>
                            {Math.round(document.size / 1024)} KB • Uploaded:{" "}
                            {new Date(document.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-red-600">Document not uploaded</p>
                      )}
                      {history.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Last reviewed: {new Date(history[history.length - 1].reviewedAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(status)}

                    {document && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDocument(createDocumentObject(docType))
                            setShowPreview(true)
                          }}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDocument({ ...createDocumentObject(docType), key: docType.key })
                            setShowReviewDialog(true)
                          }}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Review
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="text-gray-600 border-gray-200 hover:bg-gray-50 bg-transparent"
                        >
                          <a href={document.url} download={document.name}>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </a>
                        </Button>
                      </div>
                    )}

                    {!document && docType.required && <Badge variant="destructive">Missing</Badge>}
                  </div>
                </div>
              )
            })}
          </div>
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

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Review Document: {selectedDocument?.displayName}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="preview" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Document Preview</TabsTrigger>
              <TabsTrigger value="review">Review & Comments</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="flex-1 overflow-auto">
              {selectedDocument && (
                <div className="h-full overflow-auto bg-gray-100 p-4">
                  <DocumentPreview document={selectedDocument} isOpen={true} onClose={() => {}} />
                </div>
              )}
            </TabsContent>

            <TabsContent value="review" className="flex-1 space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reviewComment">Review Comments *</Label>
                  <Textarea
                    id="reviewComment"
                    placeholder="Add your detailed review comments here..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="min-h-[120px] mt-2"
                  />
                </div>

                {/* Review History */}
                {selectedDocument &&
                  reviewHistory[selectedDocument.key] &&
                  reviewHistory[selectedDocument.key].length > 0 && (
                    <div>
                      <Label>Review History</Label>
                      <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                        {reviewHistory[selectedDocument.key].map((review, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getStatusBadge(review.status)}
                                <span className="text-sm font-medium">{review.reviewedBy}</span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(review.reviewedAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleReviewDocument("reject")}
                    disabled={!reviewComment.trim()}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Document
                  </Button>
                  <Button
                    onClick={() => handleReviewDocument("approve")}
                    disabled={!reviewComment.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Document
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
