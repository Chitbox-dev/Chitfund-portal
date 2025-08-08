export interface Scheme {
  schemeId: string;
  name?: string;
  schemeName?: string;
  schemeStatus?: string;
  status?: string;
  chitValue?: string | number;
  chitDuration?: string | number;
  numberOfSubscribers?: string | number;
  monthlyPremium?: string | number;
  chitStartDate?: string;
  chitEndDate?: string;
  psoNumber?: string;
  psoGeneratedDate?: string | Date;
  commencementCertificate?: {
    number: string;
    issuedDate?: string;
  };
  documents?: any[];
  foreman?: {
    companyName?: string;
    name?: string;
    email?: string;
    phone?: string;
    registrationNumber?: string;
    address?: string;
  };
  companyName?: string;
  registrationNumber?: string;
  address?: string;
  description?: string;
  operationLocation?: string;
  [key: string]: any; // Allow for other properties
}
