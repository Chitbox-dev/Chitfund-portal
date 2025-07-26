"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ZoomIn, ZoomOut, RotateCw, Download, Maximize2, ChevronLeft, ChevronRight, FileText, X } from "lucide-react"

interface DocumentPreviewProps {
  document: any
  isOpen: boolean
  onClose: () => void
}

export function DocumentPreview({ document, isOpen, onClose }: DocumentPreviewProps) {
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!document) return null

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 300))
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 25))
  const handleRotate = () => setRotation((rotation + 90) % 360)
  const handleFullscreen = () => setIsFullscreen(!isFullscreen)

  const getDocumentContent = () => {
    const baseStyle = {
      transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
      transformOrigin: "center",
      transition: "transform 0.3s ease",
    }

    switch (document.type) {
      case "commissionStructure":
        return (
          <div style={baseStyle} className="bg-white p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">COMMISSION STRUCTURE DOCUMENT</h1>
              <p className="text-gray-600">Chit Fund Scheme: {document.schemeId || "SCH-001"}</p>
              <p className="text-sm text-gray-500">Document ID: CS-{Date.now()}</p>
            </div>

            <div className="space-y-6">
              <section className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">1. FOREMAN COMMISSION STRUCTURE</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Commission Rate:</p>
                    <p>5% of Chit Value</p>
                  </div>
                  <div>
                    <p className="font-medium">Payment Schedule:</p>
                    <p>Monthly after auction</p>
                  </div>
                  <div>
                    <p className="font-medium">Minimum Commission:</p>
                    <p>₹1,000 per month</p>
                  </div>
                  <div>
                    <p className="font-medium">Maximum Commission:</p>
                    <p>₹50,000 per month</p>
                  </div>
                </div>
              </section>

              <section className="bg-green-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-green-900 mb-3">2. ADMINISTRATIVE CHARGES</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Processing Fee: ₹500 per subscriber</li>
                  <li>• Documentation Charges: ₹200 per subscriber</li>
                  <li>• Auction Conducting Fee: ₹100 per auction</li>
                  <li>• Certificate Issuance: ₹50 per certificate</li>
                </ul>
              </section>

              <section className="bg-yellow-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-yellow-900 mb-3">3. PENALTY STRUCTURE</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Late Payment Penalty: 2% per month</li>
                  <li>• Default Penalty: 5% of outstanding amount</li>
                  <li>• Auction Absence: ₹500 per absence</li>
                  <li>• Document Delay: ₹100 per day</li>
                </ul>
              </section>

              <section className="bg-purple-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-purple-900 mb-3">4. PAYMENT TERMS</h2>
                <div className="text-sm space-y-2">
                  <p>• Commission payment within 7 days of auction completion</p>
                  <p>• Administrative charges collected upfront</p>
                  <p>• Penalty amounts deducted from next commission payment</p>
                  <p>• All payments subject to applicable taxes</p>
                </div>
              </section>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
              <p>This document is confidential and proprietary. Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        )

      case "termsOfWithdrawal":
        return (
          <div style={baseStyle} className="bg-white p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">TERMS OF WITHDRAWAL</h1>
              <p className="text-gray-600">Chit Fund Scheme: {document.schemeId || "SCH-001"}</p>
              <p className="text-sm text-gray-500">Document ID: TW-{Date.now()}</p>
            </div>

            <div className="space-y-6">
              <section className="bg-red-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-red-900 mb-3">1. WITHDRAWAL CONDITIONS</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Minimum 6 months participation required before withdrawal</li>
                  <li>• 30 days written notice required</li>
                  <li>• All outstanding dues must be cleared</li>
                  <li>• Foreman approval mandatory</li>
                  <li>• Replacement subscriber must be arranged</li>
                </ul>
              </section>

              <section className="bg-orange-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-orange-900 mb-3">2. EMERGENCY WITHDRAWAL</h2>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Allowed in cases of:</strong>
                  </p>
                  <ul className="ml-4 space-y-1">
                    <li>• Medical emergency with hospital bills</li>
                    <li>• Job loss with employment termination letter</li>
                    <li>• Family emergency with supporting documents</li>
                    <li>• Natural calamity affecting subscriber</li>
                  </ul>
                  <p className="mt-3">
                    <strong>Emergency withdrawal penalty:</strong> 10% of paid amount
                  </p>
                </div>
              </section>

              <section className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">3. REFUND CALCULATION</h2>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Formula:</strong>
                  </p>
                  <p>Refund = (Total Paid - Administrative Charges - Penalty) × 0.9</p>
                  <p>
                    <strong>Deductions:</strong>
                  </p>
                  <ul className="ml-4 space-y-1">
                    <li>• Processing charges: ₹1,000</li>
                    <li>• Withdrawal penalty: 5% of total paid</li>
                    <li>• Outstanding dues if any</li>
                    <li>• Proportionate share of group expenses</li>
                  </ul>
                </div>
              </section>

              <section className="bg-green-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-green-900 mb-3">4. REFUND TIMELINE</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Normal withdrawal: 45 days from approval</li>
                  <li>• Emergency withdrawal: 15 days from approval</li>
                  <li>• Refund via NEFT/RTGS to registered bank account</li>
                  <li>• Refund confirmation via SMS and email</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
              <p>This document is legally binding. Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        )

      case "liabilitiesDocument":
        return (
          <div style={baseStyle} className="bg-white p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">LIABILITIES DOCUMENT</h1>
              <p className="text-gray-600">Chit Fund Scheme: {document.schemeId || "SCH-001"}</p>
              <p className="text-sm text-gray-500">Document ID: LD-{Date.now()}</p>
            </div>

            <div className="space-y-6">
              <section className="bg-red-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-red-900 mb-3">1. FOREMAN LIABILITIES</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Ensure timely conduct of auctions as per schedule</li>
                  <li>• Maintain accurate records of all transactions</li>
                  <li>• Provide monthly statements to all subscribers</li>
                  <li>• Ensure compliance with Chit Funds Act 1982</li>
                  <li>• Maintain FDR of 10% of chit value throughout scheme duration</li>
                  <li>• Liable for any misappropriation of funds</li>
                  <li>• Responsible for subscriber verification and KYC compliance</li>
                </ul>
              </section>

              <section className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">2. SUBSCRIBER LIABILITIES</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Pay monthly installments on or before due date</li>
                  <li>• Attend auctions or authorize representative</li>
                  <li>• Provide accurate personal and financial information</li>
                  <li>• Notify changes in contact details within 7 days</li>
                  <li>• Comply with scheme rules and regulations</li>
                  <li>• Pay penalty for late payments or defaults</li>
                  <li>• Liable for any fraudulent information provided</li>
                </ul>
              </section>

              <section className="bg-yellow-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-yellow-900 mb-3">3. DEFAULT CONSEQUENCES</h2>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>For Subscribers:</strong>
                  </p>
                  <ul className="ml-4 space-y-1">
                    <li>• First default: Warning notice + 2% penalty</li>
                    <li>• Second default: 5% penalty + final notice</li>
                    <li>• Third default: Termination from scheme</li>
                    <li>• Legal action for recovery of dues</li>
                  </ul>
                  <p className="mt-3">
                    <strong>For Foreman:</strong>
                  </p>
                  <ul className="ml-4 space-y-1">
                    <li>• Regulatory action by Registrar</li>
                    <li>• Cancellation of registration</li>
                    <li>• Criminal liability under Chit Funds Act</li>
                    <li>• Forfeiture of FDR amount</li>
                  </ul>
                </div>
              </section>

              <section className="bg-green-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-green-900 mb-3">4. INSURANCE COVERAGE</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Professional indemnity insurance: ₹10 lakhs</li>
                  <li>• Fidelity insurance for foreman: ₹5 lakhs</li>
                  <li>• Coverage for fraud and misappropriation</li>
                  <li>• Insurance premium paid by foreman</li>
                  <li>• Claims process through insurance company</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
              <p>This document outlines legal liabilities. Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        )

      case "subscriberRights":
        return (
          <div style={baseStyle} className="bg-white p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">SUBSCRIBER RIGHTS DOCUMENT</h1>
              <p className="text-gray-600">Chit Fund Scheme: {document.schemeId || "SCH-001"}</p>
              <p className="text-sm text-gray-500">Document ID: SR-{Date.now()}</p>
            </div>

            <div className="space-y-6">
              <section className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">1. FUNDAMENTAL RIGHTS</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Right to participate in all auctions</li>
                  <li>• Right to receive monthly statements</li>
                  <li>• Right to inspect scheme records during business hours</li>
                  <li>• Right to receive timely payments after winning auction</li>
                  <li>• Right to nominate beneficiary</li>
                  <li>• Right to transfer subscription with foreman approval</li>
                  <li>• Right to withdraw under specified conditions</li>
                </ul>
              </section>

              <section className="bg-green-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-green-900 mb-3">2. AUCTION RIGHTS</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Right to bid in all auctions until winning</li>
                  <li>• Right to authorize representative for bidding</li>
                  <li>• Right to receive auction schedule in advance</li>
                  <li>• Right to challenge auction results within 24 hours</li>
                  <li>• Right to receive dividend after each auction</li>
                  <li>• Right to know highest and lowest bids</li>
                  <li>• Right to receive auction minutes</li>
                </ul>
              </section>

              <section className="bg-yellow-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-yellow-900 mb-3">3. INFORMATION RIGHTS</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Right to receive copy of chit agreement</li>
                  <li>• Right to know foreman's credentials and registration</li>
                  <li>• Right to receive list of all subscribers</li>
                  <li>• Right to know FDR details and bank information</li>
                  <li>• Right to receive annual financial statements</li>
                  <li>• Right to know commission structure</li>
                  <li>• Right to receive regulatory compliance certificates</li>
                </ul>
              </section>

              <section className="bg-purple-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-purple-900 mb-3">4. GRIEVANCE RIGHTS</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Right to file complaints with foreman</li>
                  <li>• Right to approach Registrar of Chit Funds</li>
                  <li>• Right to legal remedy through courts</li>
                  <li>• Right to form subscriber committee</li>
                  <li>• Right to demand special audit</li>
                  <li>• Right to compensation for delays/defaults</li>
                  <li>• Right to consumer forum protection</li>
                </ul>
              </section>

              <section className="bg-red-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-red-900 mb-3">5. PROTECTION RIGHTS</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Right to FDR protection (10% of chit value)</li>
                  <li>• Right to insurance coverage benefits</li>
                  <li>• Right to priority in case of foreman default</li>
                  <li>• Right to proportionate refund on scheme termination</li>
                  <li>• Right to confidentiality of personal information</li>
                  <li>• Right to fair treatment without discrimination</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
              <p>
                These rights are protected under Chit Funds Act 1982. Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        )

      case "fdrDocument":
        return (
          <div style={baseStyle} className="bg-white p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">FIXED DEPOSIT RECEIPT (FDR)</h1>
              <p className="text-gray-600">Chit Fund Security Deposit</p>
              <p className="text-sm text-gray-500">FDR No: FDR-{Date.now()}</p>
            </div>

            <div className="space-y-6">
              <section className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">DEPOSIT DETAILS</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Depositor Name:</p>
                    <p>Foreman Name (From Registration)</p>
                  </div>
                  <div>
                    <p className="font-medium">Bank Name:</p>
                    <p>State Bank of India</p>
                  </div>
                  <div>
                    <p className="font-medium">Branch:</p>
                    <p>Bangalore Main Branch</p>
                  </div>
                  <div>
                    <p className="font-medium">Account Number:</p>
                    <p>1234567890123456</p>
                  </div>
                  <div>
                    <p className="font-medium">Deposit Amount:</p>
                    <p>₹1,00,000 (10% of Chit Value)</p>
                  </div>
                  <div>
                    <p className="font-medium">Deposit Date:</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-medium">Maturity Date:</p>
                    <p>{new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 2).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-medium">Interest Rate:</p>
                    <p>6.5% per annum</p>
                  </div>
                </div>
              </section>

              <section className="bg-green-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-green-900 mb-3">TERMS & CONDITIONS</h2>
                <ul className="space-y-2 text-sm">
                  <li>• This FDR is pledged as security for Chit Fund Scheme</li>
                  <li>• Cannot be withdrawn during scheme duration</li>
                  <li>• Interest will be credited quarterly</li>
                  <li>• Premature withdrawal not allowed</li>
                  <li>• FDR will be released only after scheme completion</li>
                  <li>• In case of default, amount will be forfeited</li>
                  <li>• Renewal required if scheme extends beyond maturity</li>
                </ul>
              </section>

              <section className="bg-yellow-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-yellow-900 mb-3">MATURITY CALCULATION</h2>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Principal Amount:</strong> ₹1,00,000
                  </p>
                  <p>
                    <strong>Interest Rate:</strong> 6.5% per annum
                  </p>
                  <p>
                    <strong>Tenure:</strong> 2 years
                  </p>
                  <p>
                    <strong>Interest Amount:</strong> ₹13,000
                  </p>
                  <p>
                    <strong>Maturity Amount:</strong> ₹1,13,000
                  </p>
                  <p className="text-xs text-gray-600 mt-2">*Interest calculated on compound basis</p>
                </div>
              </section>

              <section className="bg-red-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-red-900 mb-3">REGULATORY COMPLIANCE</h2>
                <ul className="space-y-2 text-sm">
                  <li>• As per Chit Funds Act 1982, Section 11</li>
                  <li>• Minimum 10% of chit value as security</li>
                  <li>• Deposited in scheduled commercial bank</li>
                  <li>• Pledged in favor of Registrar of Chit Funds</li>
                  <li>• Cannot be withdrawn without Registrar approval</li>
                  <li>• Subject to periodic verification by authorities</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-xs text-gray-500">
                <p>Bank Seal & Signature</p>
                <p>Authorized Signatory</p>
              </div>
              <div className="text-center mt-4 text-xs text-gray-500">
                <p>This is a computer generated receipt. Generated on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )

      case "draftAgreement":
        return (
          <div style={baseStyle} className="bg-white p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">CHIT FUND AGREEMENT (DRAFT)</h1>
              <p className="text-gray-600">Scheme: {document.schemeId || "SCH-001"}</p>
              <p className="text-sm text-gray-500">Agreement No: CFA-{Date.now()}</p>
            </div>

            <div className="space-y-6">
              <section className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-900 mb-3">PARTIES TO THE AGREEMENT</h2>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>FOREMAN:</strong>
                  </p>
                  <p>Name: [Foreman Name]</p>
                  <p>Address: [Foreman Address]</p>
                  <p>Registration No: [Registration Number]</p>
                  <p>Contact: [Phone & Email]</p>

                  <p className="mt-4">
                    <strong>SUBSCRIBERS:</strong>
                  </p>
                  <p>As per attached subscriber list (Schedule A)</p>
                  <p>Total Subscribers: [Number]</p>
                </div>
              </section>

              <section className="bg-green-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-green-900 mb-3">SCHEME DETAILS</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Chit Value:</p>
                    <p>₹[Amount]</p>
                  </div>
                  <div>
                    <p className="font-medium">Duration:</p>
                    <p>[X] Months</p>
                  </div>
                  <div>
                    <p className="font-medium">Monthly Installment:</p>
                    <p>₹[Amount]</p>
                  </div>
                  <div>
                    <p className="font-medium">Commission:</p>
                    <p>5% of Chit Value</p>
                  </div>
                  <div>
                    <p className="font-medium">Auction Frequency:</p>
                    <p>[Frequency]</p>
                  </div>
                  <div>
                    <p className="font-medium">Start Date:</p>
                    <p>[Date]</p>
                  </div>
                </div>
              </section>

              <section className="bg-yellow-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-yellow-900 mb-3">TERMS & CONDITIONS</h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>1. Payment Terms:</strong> Monthly installments due on [Date] of each month
                  </li>
                  <li>
                    <strong>2. Auction Rules:</strong> Conducted as per Chit Funds Act 1982
                  </li>
                  <li>
                    <strong>3. Default:</strong> 2% penalty per month on delayed payments
                  </li>
                  <li>
                    <strong>4. Withdrawal:</strong> Subject to terms in withdrawal document
                  </li>
                  <li>
                    <strong>5. Disputes:</strong> Subject to [City] jurisdiction
                  </li>
                  <li>
                    <strong>6. Force Majeure:</strong> Natural calamities, govt. orders exempt
                  </li>
                  <li>
                    <strong>7. Amendment:</strong> Requires consent of 75% subscribers
                  </li>
                </ul>
              </section>

              <section className="bg-purple-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-purple-900 mb-3">AUCTION PROCEDURE</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Auctions conducted on [Day] of each month</li>
                  <li>• Minimum bid: 5% of chit value</li>
                  <li>• Maximum bid: 30% of chit value</li>
                  <li>• Highest bidder wins the auction</li>
                  <li>• Winner receives: Chit Value - Bid Amount - Commission</li>
                  <li>• Dividend distributed among non-winners</li>
                  <li>• Auction minutes maintained and shared</li>
                </ul>
              </section>

              <section className="bg-red-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-red-900 mb-3">LEGAL PROVISIONS</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Governed by Chit Funds Act 1982</li>
                  <li>• Registered with Registrar of Chit Funds</li>
                  <li>• FDR of 10% maintained as security</li>
                  <li>• Subject to periodic inspections</li>
                  <li>• Compliance with RBI guidelines</li>
                  <li>• Consumer protection laws applicable</li>
                  <li>• Arbitration clause for dispute resolution</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <p className="font-medium">FOREMAN SIGNATURE</p>
                  <div className="h-16 border-b border-gray-300 mt-2"></div>
                  <p className="text-xs text-gray-500 mt-1">Date: ___________</p>
                </div>
                <div>
                  <p className="font-medium">WITNESS SIGNATURE</p>
                  <div className="h-16 border-b border-gray-300 mt-2"></div>
                  <p className="text-xs text-gray-500 mt-1">Date: ___________</p>
                </div>
              </div>
              <div className="text-center mt-6 text-xs text-gray-500">
                <p>SUBSCRIBER SIGNATURES ON SEPARATE PAGES</p>
                <p>This is a draft agreement. Generated on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div style={baseStyle} className="bg-white p-8 max-w-4xl mx-auto text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Document Preview</h2>
            <p className="text-gray-500">Document content will be displayed here</p>
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">File: {document.name}</p>
              <p className="text-sm text-gray-600">Size: {document.size} bytes</p>
              <p className="text-sm text-gray-600">Type: {document.type}</p>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isFullscreen ? "max-w-[95vw] h-[95vh]" : "max-w-4xl h-[80vh]"} p-0`}>
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {document.name}
              </DialogTitle>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline">{document.type}</Badge>
                <span className="text-sm text-gray-500">{Math.round(document.size / 1024)} KB</span>
                <span className="text-sm text-gray-500">Page {currentPage} of 1</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 25}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 300}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoom(100)}>
              Fit
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleFullscreen}>
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={document.url} download={document.name}>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div className="flex justify-center">{getDocumentContent()}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
