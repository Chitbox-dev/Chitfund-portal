"use client"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SignaturePad } from '@/components/shared/signature-pad';

interface EditableCertificateProps {
  data: any;
  onChange: (field: string, value: string) => void;
}

export function EditableCertificate({ data, onChange }: EditableCertificateProps) {
  return (
    <div className="space-y-4 p-4 border rounded-md">
      <h4 className="font-medium text-lg">Edit Certificate Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="applicantName">Name of the Applicant</Label>
          <Input
            id="applicantName"
            value={data.applicantName || ''}
            onChange={(e) => onChange('applicantName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="registrationNo">Registration No. (CIN/RCF License)</Label>
          <Input
            id="registrationNo"
            value={data.registrationNo || ''}
            onChange={(e) => onChange('registrationNo', e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="registeredAddress">Registered Address</Label>
        <Textarea
          id="registeredAddress"
          value={data.registeredAddress || ''}
          onChange={(e) => onChange('registeredAddress', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="purposeSanctioned">Purpose Sanctioned</Label>
          <Input
            id="purposeSanctioned"
            value={data.purposeSanctioned || ''}
            onChange={(e) => onChange('purposeSanctioned', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="locationOfOperation">Location of Operation</Label>
          <Input
            id="locationOfOperation"
            value={data.locationOfOperation || ''}
            onChange={(e) => onChange('locationOfOperation', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Digital Signature (draw below)</Label>
          <SignaturePad
            value={data.digitalSignature}
            onChange={(val) => onChange('digitalSignature', val || '')}
          />
        </div>
      </div>
    </div>
  );
}
