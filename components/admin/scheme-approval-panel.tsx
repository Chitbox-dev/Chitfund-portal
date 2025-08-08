"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
import { DocumentReviewPanel } from "./document-review-panel"
import { CertificateTemplateSelector } from "@/components/shared/certificate-template-selector"
import { CertificatePreviewModal } from "@/components/shared/certificate-preview-modal"
import { EditableCertificate } from "./editable-certificate"
import { Scheme } from "@/lib/types";

interface SchemeApprovalPanelProps {
  scheme: Scheme | null;
  onApprove: (schemeId: string, comments: string, template: string, certificateData: any) => void;
  onReject: (schemeId: string, reason: string) => void;
  onApproveFinalAgreement?: (schemeId: string, comments: string, template?: string) => void;
  onDocumentApprove?: (documentIndex: number, comments: string) => Promise<void>;
  onDocumentReject?: (documentIndex: number, reason: string) => Promise<void>;
}

export function SchemeApprovalPanel({
  scheme,
  onApprove,
  onReject,
  onApproveFinalAgreement,
}: SchemeApprovalPanelProps) {
  const [comments, setComments] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [psoTemplate, setPsoTemplate] = useState("modern");
  const [commencementTemplate, setCommencementTemplate] = useState("modern");
  const [showCertificatePreview, setShowCertificatePreview] = useState(false);
  const [previewType, setPreviewType] = useState<"pso" | "commencement">("pso");
  const [certificateData, setCertificateData] = useState<any>({});

  useEffect(() => {
    if (scheme) {
      setCertificateData({
        applicantName: scheme.foreman?.companyName || scheme.companyName || "",
        registrationNo:
          scheme.foreman?.registrationNumber || scheme.registrationNumber || "",
        registeredAddress: scheme.foreman?.address || scheme.address || "",
        purposeSanctioned: `Participation in KCFSIN Framework / ${scheme.description || ""}`,
        locationOfOperation: scheme.operationLocation || "",
        psoNumber:
          scheme.psoNumber ||
          `PSO-${new Date().getFullYear()}-${Math.floor(
            100000 + Math.random() * 900000
          )}`,
        psoGeneratedDate: scheme.psoGeneratedDate ? new Date(scheme.psoGeneratedDate).toISOString() : new Date().toISOString(),
      });
    }
  }, [scheme]);

  const handleApprove = async () => {
    if (!scheme) return;
    if (!comments.trim()) {
      alert("Please provide approval comments");
      return;
    }
    setIsProcessing(true);
    try {
      await onApprove(scheme.schemeId, comments, psoTemplate, certificateData);
      // prototype local persistence
      localStorage.setItem(
        `psoCert_${scheme.schemeId}`,
        JSON.stringify(certificateData)
      );
      setComments("");
    } catch (error) {
      console.error("Error approving scheme:", error);
      alert("Error approving scheme. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApproveFinal = async () => {
    if (!scheme) return;
    if (!comments.trim()) {
      alert("Please provide final approval comments");
      return;
    }
    setIsProcessing(true);
    try {
      if (onApproveFinalAgreement) {
        await onApproveFinalAgreement(
          scheme.schemeId,
          comments,
          commencementTemplate
        );
        // prototype local persistence for commencement
        localStorage.setItem(
          `commenceCert_${scheme.schemeId}`,
          JSON.stringify(certificateData)
        );
      }
      setComments("");
    } catch (error) {
      console.error("Error approving final agreement:", error);
      alert("Error approving final agreement. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!scheme) return;
    if (!rejectionReason.trim()) {
      alert("Please provide rejection reason");
      return;
    }
    setIsProcessing(true);
    await onReject(scheme.schemeId, rejectionReason);
    setIsProcessing(false);
    setRejectionReason("");
  };

  const handlePreviewCertificate = (type: "pso" | "commencement") => {
    setPreviewType(type);
    setShowCertificatePreview(true);
  };

  const handleCertificateDataChange = (field: string, value: string) => {
    setCertificateData((prev: any) => ({ ...prev, [field]: value }));
  };

  if (!scheme) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FileText className="h-16 w-16 mx-auto text-gray-400" />
          <p className="mt-4 text-lg text-gray-600">
            Select a scheme to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {scheme.schemeName || `Scheme ${scheme.schemeId}`}
              </CardTitle>
              <p className="text-gray-600 mt-1">Scheme ID: {scheme.schemeId}</p>
            </div>
            <Badge className={`bg-yellow-100 text-yellow-800 border-yellow-300`}>
              <Clock className="h-4 w-4" />
              <span className="ml-2">Submitted</span>
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
                    ? Number.parseFloat(String(scheme.chitValue)).toLocaleString()
                    : scheme.totalValue?.toLocaleString() || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Subscribers</p>
                <p className="text-lg font-bold text-gray-900">
                  {scheme.numberOfSubscribers ||
                    scheme.totalSubscribers ||
                    "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Duration</p>
                <p className="text-lg font-bold text-gray-900">
                  {scheme.chitDuration || scheme.duration || "N/A"} months
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
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  <p className="font-semibold text-gray-900">
                    {scheme.foreman?.companyName || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Foreman Name
                  </p>
                  <p className="font-semibold text-gray-900">
                    {scheme.foreman?.name || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">
                    {scheme.foreman?.email || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">
                    {scheme.foreman?.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {scheme.documents && scheme.documents.length > 0 && (
        <DocumentReviewPanel
          scheme={scheme}
          onStatusUpdate={(schemeId, newStatus) => {
            console.log(`Scheme ${schemeId} status updated to ${newStatus}`);
          }}
        />
      )}

      {scheme.psoCertificate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Prior Sanction Order (PSO)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>PSO Number:</strong> {scheme.psoCertificate.number}
                <br />
                <strong>Issued:</strong>{" "}
                {scheme.psoCertificate.issuedDate
                  ? new Date(scheme.psoCertificate.issuedDate).toLocaleString()
                  : "N/A"}
              </AlertDescription>
            </Alert>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreviewCertificate("pso")}
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreviewCertificate("pso")}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
                <strong>Form 7 Number:</strong>{" "}
                {scheme.commencementCertificate.number}
                <br />
                <strong>Issued:</strong>{" "}
                {scheme.commencementCertificate.issuedDate
                  ? new Date(
                      scheme.commencementCertificate.issuedDate
                    ).toLocaleString()
                  : "N/A"}
                <br />
                <strong>Status:</strong> Scheme is now LIVE and operational
              </AlertDescription>
            </Alert>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreviewCertificate("commencement")}
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview Certificate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreviewCertificate("commencement")}
              >
                <Download className="h-4 w-4 mr-1" />
                Download Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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

      <Card className="border-2 border-dashed">
        <CardHeader>
          <CardTitle>Administrative Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {scheme.schemeStatus === "submitted" && (
            <Card>
              <CardHeader>
                <CardTitle>PSO Approval Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <EditableCertificate
                  data={certificateData}
                  onChange={handleCertificateDataChange}
                />
                <div>
                  <Label htmlFor="comments">Approval Comments *</Label>
                  <Textarea
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Provide detailed comments for approval..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>PSO Certificate Template</Label>
                  <CertificateTemplateSelector
                    value={psoTemplate}
                    onChange={setPsoTemplate}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handlePreviewCertificate("pso")}
                  >
                    <Eye className="mr-2 h-4 w-4" /> Preview PSO
                  </Button>
                  <Button
                    onClick={handleApprove}
                    disabled={isProcessing || !comments.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" /> Approve & Issue PSO
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {scheme.schemeStatus === "final_agreement_uploaded" && onApproveFinalAgreement && (
            <Card>
              <CardHeader>
                <CardTitle>Final Agreement Approval</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <EditableCertificate
                  data={certificateData}
                  onChange={handleCertificateDataChange}
                />
                <div>
                  <Label htmlFor="final_comments">Approval Comments</Label>
                  <Textarea
                    id="final_comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Provide comments for final agreement approval..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Commencement Certificate Template</Label>
                  <CertificateTemplateSelector
                    value={commencementTemplate}
                    onChange={setCommencementTemplate}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handlePreviewCertificate("commencement")}
                  >
                    <Eye className="mr-2 h-4 w-4" /> Preview Certificate
                  </Button>
                  <Button
                    onClick={handleApproveFinal}
                    disabled={isProcessing}
                    className="bg-sky-600 hover:bg-sky-700"
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" /> Approve Final Agreement
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {scheme.schemeStatus !== "rejected" && (
            <Card>
              <CardHeader>
                <CardTitle>Reject Scheme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="rejectionReason">Rejection Reason *</Label>
                  <Textarea
                    id="rejectionReason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Provide a clear reason for rejection..."
                  />
                </div>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={isProcessing || !rejectionReason.trim()}
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <XCircle className="mr-2 h-4 w-4" /> Reject Scheme
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {showCertificatePreview && (
        <CertificatePreviewModal
          isOpen={showCertificatePreview}
          onClose={() => setShowCertificatePreview(false)}
          type={previewType}
          template={previewType === "pso" ? psoTemplate : commencementTemplate}
          certificateData={certificateData}
          scheme={scheme}
        />
      )}
    </div>
  );
}
