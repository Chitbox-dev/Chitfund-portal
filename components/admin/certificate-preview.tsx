"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Printer, X } from "lucide-react"

interface CertificatePreviewProps {
  scheme: any
  type: "pso" | "commencement"
  template: string
  onClose: () => void
  onDownload?: () => void
}

export function CertificatePreview({
  scheme,
  type,
  template,
  onClose,
  onDownload,
}: CertificatePreviewProps) {
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
      onDownload()
    } else {
      // Fallback download implementation if onDownload is not provided
      if (certificateRef.current) {
        // In a real implementation, you would use a library like html2canvas or jsPDF
        // to convert the certificate to a PDF or image for download
        const certificateType = type === "pso" ? "PSO" : "Commencement";
        const fileName = `${certificateType}_Certificate_${scheme.schemeId || 'certificate'}.pdf`;
        
        alert(`Downloading ${fileName}\nThis is a placeholder for the actual download functionality.`);
        
        // Example implementation with html2canvas would be:
        // html2canvas(certificateRef.current).then(canvas => {
        //   const imgData = canvas.toDataURL('image/png');
        //   const pdf = new jsPDF('p', 'mm', 'a4');
        //   pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        //   pdf.save(fileName);
        // });
      }
    }
  }





  const getCertificateTitle = () => {
    if (type === "pso") {
      return "PRIOR SANCTION ORDER CERTIFICATE"
    } else {
      return "COMMENCEMENT CERTIFICATE"
    }
  }

  const getCertificateNumber = () => {
    if (type === "pso") {
      return scheme.psoNumber || "KCFSIN/PSO/Year/XXX"
    } else {
      return scheme.commencementCertificate?.number || "KCFSIN/CC/Year/XXX"
    }
  }

  const getCertificateDate = () => {
    if (type === "pso") {
      return scheme.psoGeneratedDate
        ? new Date(scheme.psoGeneratedDate).toLocaleDateString()
        : "DD/MM/YYY"
    } else {
      return scheme.commencementCertificate?.issuedDate
        ? new Date(scheme.commencementCertificate.issuedDate).toLocaleDateString()
        : "DD/MM/YYY"
    }
  }

  const renderPSOContent = () => (
    <>
      <div className="certificate-body">
        <p>
          In accordance with the provisions of a Karnatak-Karnataka Chit Funds Act [Year] and Rule [XX] of the Karnataka Chit Fund Rules, and based on the application submitted by the below-mentioned entity, the undersigned hereby accords PRIOR SANCTION for initiation of chit fund-related operations
        </p>

        <div className="certificate-section">
          <h3>Entity Details</h3>
          <ul>
            <li>
              <span>Name of the Applicant</span>
              <span>{scheme.foreman?.companyName || "[Company/Firm Name]"}</span>
            </li>
            <li>
              <span>Registration No. (CIN/RCF License)</span>
              <span>{scheme.foreman?.registrationNumber || "[XXXXXX]"}</span>
            </li>
            <li>
              <span>Registered Address</span>
              <span>{scheme.foreman?.address || "[Full address as per application]"}</span>
            </li>
            <li>
              <span>Purpose Sanctioned</span>
              <span>Participation in KCFSIN Framework / {scheme.description || "[specific project]"}</span>
            </li>
            <li>
              <span>Location of Operation</span>
              <span>{scheme.operationLocation || "[Location 1]"}</span>
            </li>
          </ul>
        </div>

        <div className="certificate-section">
          <h3>Conditions of Sanction</h3>
          <ol>
            <li>The applicant must comply with all statutory provisions under the Karnataka Chit Funds Act and related rules.</li>
            <li>No deviation from the sanctioned purpose shall be made without prior written permission.</li>
            <li>A Commencement Certificate must be obtained within 30 days of this sanction to validate operational readiness.</li>
          </ol>
        </div>

        <p className="certificate-note">
          This certificate shall remain valid for a period of 3 months from the date of issue.
        </p>
      </div>
    </>
  )

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
    <Dialog open={true} onOpenChange={onClose}>
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
              <img src="/placeholder-logo.svg" alt="Karnataka Government Logo" />
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
              <div className="signature-placeholder">Digital Signature</div>
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