"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Printer, X } from "lucide-react"
import { Scheme } from "@/lib/types";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificatePreviewModalProps {
  scheme: Scheme
  type: "pso" | "commencement"
  template: string
  onClose: () => void
  onDownload?: () => void
  isOpen: boolean
  certificateData?: any
}

export function CertificatePreviewModal({
  scheme,
  type,
  template,
  onClose,
  onDownload,
  isOpen,
  certificateData = {},
}: CertificatePreviewModalProps) {
  // Merge live (possibly edited) certificateData with whatever was saved on the scheme object
  let persisted: any = type === "pso" ? scheme.psoCertificate : scheme.commencementCertificate;
  if (!persisted && typeof window !== 'undefined') {
    // fallback to locally stored prototype data
    const key = type === 'pso' ? `psoCert_${scheme.schemeId}` : `commenceCert_${scheme.schemeId}`;
    try {
      const stored = JSON.parse(localStorage.getItem(key) || 'null');
      if (stored) persisted = stored;
    } catch (_) {}
  }
  const mergedData: any = { ...persisted, ...certificateData };
  const [view, setView] = useState<"preview" | "print">("preview")
  const certificateRef = useRef<HTMLDivElement | null>(null)

  const handlePrint = () => {
    setView("print")
    setTimeout(() => {
      window.print()
      setView("preview")
    }, 100)
  }

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else if (certificateRef.current) {
      const certificateType = type === "pso" ? "PSO" : "Commencement";
      const fileName = `${certificateType}_Certificate_${scheme.schemeId || 'certificate'}.pdf`;

      html2canvas(certificateRef.current, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth;
        const height = width / ratio;

        pdf.addImage(imgData, 'PNG', 0, 0, width, height > pdfHeight ? pdfHeight : height);
        pdf.save(fileName);
      });
    }
  };

  const getCertificateTitle = () => {
    if (type === "pso") {
      return "PRIOR SANCTION ORDER CERTIFICATE"
    } else {
      return "COMMENCEMENT CERTIFICATE"
    }
  }

  const getCertificateNumber = () => {
    if (type === "pso") {
      return mergedData.psoNumber || scheme.psoNumber || "KCFSIN/PSO/Year/XXX"
    } else {
      return scheme.commencementCertificate?.number || "KCFSIN/CC/Year/XXX"
    }
  }

  const getCertificateDate = () => {
    if (type === "pso") {
      return mergedData.psoGeneratedDate
        ? new Date(mergedData.psoGeneratedDate).toLocaleDateString()
        : scheme.psoGeneratedDate
        ? new Date(scheme.psoGeneratedDate).toLocaleDateString()
        : "DD/MM/YYY"
    } else {
      return scheme.commencementCertificate?.issuedDate
        ? new Date(scheme.commencementCertificate.issuedDate).toLocaleDateString()
        : "DD/MM/YYY"
    }
  }

  const renderPSOContent = () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center mb-2">Prior Sanction Order (PSO)</h2>
      <p className="text-center mb-6">Order under section 4(1) of the Chit Fund Act, 1982</p>

      <div className="space-y-4 text-sm">
        <p><strong>PSO Number:</strong> {mergedData.psoNumber || scheme.psoNumber || `PSO-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`}</p>
        <p><strong>Generated Date:</strong> {certificateData?.psoGeneratedDate ? new Date(certificateData.psoGeneratedDate).toLocaleDateString() : new Date().toLocaleDateString()}</p>
        <hr className="my-4" />
        <p><strong>Applicant:</strong> {certificateData?.applicantName || scheme.foreman?.companyName || scheme.companyName}</p>
        <p><strong>Registration No:</strong> {certificateData?.registrationNo || scheme.foreman?.registrationNumber || scheme.registrationNumber}</p>
        <p><strong>Registered Address:</strong> {certificateData?.registeredAddress || scheme.foreman?.address || scheme.address}</p>
        <hr className="my-4" />
        <p><strong>Purpose Sanctioned:</strong> {certificateData?.purposeSanctioned || `Participation in KCFSIN Framework / ${scheme.description}`}</p>
        <p><strong>Location of Operation:</strong> {certificateData?.locationOfOperation || scheme.operationLocation || 'N/A'}</p>
      </div>

      <div className="mt-8 text-xs text-gray-600">
        <p>This Prior Sanction Order is granted based on the information provided by the applicant and is subject to the provisions of the Chit Fund Act, 1982, and the rules made thereunder.</p>
        <p className="mt-4">Any violation of the terms and conditions will lead to the cancellation of this order.</p>
      </div>

      <div className="mt-12 flex justify-between items-end">
        <div>
          <p>Place: Thiruvananthapuram</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">Registrar of Chits</p>
          <p>(Authorized Signatory)</p>
        </div>
      </div>
      <p className="certificate-note">
        This certificate shall remain valid for a period of 3 months from the date of issue.
      </p>
    </div>
  );

  const renderCommencementContent = () => (
    <>
      <div className="certificate-body">
        <p>
          Pursuant to the Prior Sanction Order No. {scheme.psoNumber || "KCFSIN/PSO/ XXX"}, dated {scheme.psoGeneratedDate ? new Date(scheme.psoGeneratedDate).toLocaleDateString() : "SCCS"}, and upon verification of compliance with the specified conditions, this certificate hereby authorizes the commencement of approved activities under KCFSIN framework.
        </p>

        <div className="certificate-section">
          <h3>Entity Details</h3>
          <ul>
            <li>
              <span>Name of the Entity</span>
              <span>{scheme.foreman?.companyName || "[Company/Firm Name]"}</span>
            </li>
            <li>
              <span>Registration No. (CIN/RCF License)</span>
              <span>{scheme.foreman?.registrationNumber || "[XXXXXX]"}</span>
            </li>
            <li>
              <span>Registered Address</span>
              <span>{scheme.foreman?.address || "[Full address]"}</span>
            </li>
            <li>
              <span>Commencement Activity Approved</span>
              <span>E.g.,digital onboarding, branch-wise subscriber registration, KCFSIN data integration</span>
            </li>
            <li>
              <span>Approved Operation Location(s)</span>
              <span>{scheme.operationLocation || "[Location 1]"}</span>
            </li>
          </ul>
        </div>

        <div className="certificate-section">
          <h3>Certificate Notes</h3>
          <ul>
            <li>This Commencement Certificate is issued post verification of infrastructure readiness, process compliance, and technical validation as per KCFSIN protocols.</li>
            <li>The entity remains subject to regular compliance inspections and must maintain digital records in line with KCFSIN digital audit trail.</li>
          </ul>
        </div>

        <p className="certificate-note">
          This certificate serves as an official authorization for live operations under KCFSIN framework.
        </p>
      </div>
    </>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{type === "pso" ? "PSO Certificate Preview" : "Commencement Certificate Preview"}</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Download PDF
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className={`certificate certificate-${template} ${view === "print" ? "print-mode" : ""}`} ref={certificateRef}>
          <div className="certificate-header">
            <div className="certificate-logo">
              <img src="/logo-karnataka.svg" alt="Karnataka Government Logo" />
            </div>
            <div className="certificate-department">
              <p>Department of Co-operation, Government of Karnataka</p>
            </div>
          </div>

          <h1 className="certificate-title">{getCertificateTitle()}</h1>

          <div className="certificate-reference">
            <div className="certificate-number">
              <span>No: {getCertificateNumber()}</span>
            </div>
            <div className="certificate-date">
              <span>Date: {getCertificateDate()}</span>
            </div>
          </div>

          {type === "pso" ? renderPSOContent() : renderCommencementContent()}

          <div className="certificate-footer">
            <div className="certificate-signature">
              {certificateData?.digitalSignature ? (
                <img
                  src={certificateData.digitalSignature}
                  alt="Digital signature"
                  className="h-16 object-contain"
                />
              ) : (
                <div className="signature-placeholder">Digital Signature</div>
              )}
              <div className="signature-name">Registrar of Chit Funds</div>
              <div className="signature-designation">Karnataka State</div>
            </div>
            <div className="certificate-seal">
              <div className="seal-placeholder">OFFICIAL SEAL</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}