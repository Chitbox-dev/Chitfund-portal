export interface UCFSINData {
  id: string
  fullName: string
  dateOfBirth: string
  fatherName: string
  address: string
  pincode: string
  state: string
  district: string
  phoneNumber: string
  emailAddress: string
  panNumber: string
  aadharNumber: string
  bankAccountNumber: string
  ifscCode: string
  nomineeDetails: {
    name: string
    relationship: string
    dateOfBirth: string
  }
  ucfsinNumber: string
  generatedDate: string
  status: "active" | "pending" | "suspended"
}

export function generateUCFSIN(personalData: Partial<UCFSINData>): string {
  // UCFSIN Format: UC-YYYY-SSSS-DDDD-NNNN
  // UC: Prefix
  // YYYY: Year
  // SSSS: State code (4 digits)
  // DDDD: District code (4 digits)
  // NNNN: Sequential number (4 digits)

  const year = new Date().getFullYear()
  const stateCode = getStateCode(personalData.state || "")
  const districtCode = getDistrictCode(personalData.district || "")
  const sequentialNumber = generateSequentialNumber()

  return `UC-${year}-${stateCode}-${districtCode}-${sequentialNumber}`
}

function getStateCode(state: string): string {
  const stateCodes: Record<string, string> = {
    "Andhra Pradesh": "0001",
    "Arunachal Pradesh": "0002",
    Assam: "0003",
    Bihar: "0004",
    Chhattisgarh: "0005",
    Goa: "0006",
    Gujarat: "0007",
    Haryana: "0008",
    "Himachal Pradesh": "0009",
    Jharkhand: "0010",
    Karnataka: "0011",
    Kerala: "0012",
    "Madhya Pradesh": "0013",
    Maharashtra: "0014",
    Manipur: "0015",
    Meghalaya: "0016",
    Mizoram: "0017",
    Nagaland: "0018",
    Odisha: "0019",
    Punjab: "0020",
    Rajasthan: "0021",
    Sikkim: "0022",
    "Tamil Nadu": "0023",
    Telangana: "0024",
    Tripura: "0025",
    "Uttar Pradesh": "0026",
    Uttarakhand: "0027",
    "West Bengal": "0028",
    Delhi: "0029",
    "Jammu and Kashmir": "0030",
    Ladakh: "0031",
    Chandigarh: "0032",
    "Dadra and Nagar Haveli and Daman and Diu": "0033",
    Lakshadweep: "0034",
    Puducherry: "0035",
    "Andaman and Nicobar Islands": "0036",
  }

  return stateCodes[state] || "0000"
}

function getDistrictCode(district: string): string {
  // This would typically be a comprehensive mapping
  // For demo purposes, generating a hash-based code
  let hash = 0
  for (let i = 0; i < district.length; i++) {
    const char = district.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }

  const code = Math.abs(hash % 9999) + 1
  return code.toString().padStart(4, "0")
}

function generateSequentialNumber(): string {
  // In a real system, this would be from a database sequence
  // For demo, using timestamp-based generation
  const timestamp = Date.now()
  const sequential = (timestamp % 9999) + 1
  return sequential.toString().padStart(4, "0")
}

export function validateUCFSIN(ucfsin: string): boolean {
  const pattern = /^UC-\d{4}-\d{4}-\d{4}-\d{4}$/
  return pattern.test(ucfsin)
}

export function parseUCFSIN(ucfsin: string) {
  if (!validateUCFSIN(ucfsin)) {
    throw new Error("Invalid UCFSIN format")
  }

  const parts = ucfsin.split("-")
  return {
    prefix: parts[0],
    year: Number.parseInt(parts[1]),
    stateCode: parts[2],
    districtCode: parts[3],
    sequentialNumber: parts[4],
  }
}

export function generateUCFSINCard(data: UCFSINData): string {
  // Generate a card number for physical/digital card
  // Format: UCFC-XXXX-XXXX-XXXX
  const cardNumber = `UCFC-${Math.random().toString().substr(2, 4)}-${Math.random().toString().substr(2, 4)}-${Math.random().toString().substr(2, 4)}`
  return cardNumber
}

export function calculateUCFSINScore(data: UCFSINData): number {
  // Calculate a credit-like score based on various factors
  let score = 300 // Base score

  // Age factor (18-65 optimal range)
  const age = new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear()
  if (age >= 25 && age <= 55) {
    score += 100
  } else if (age >= 18 && age <= 65) {
    score += 50
  }

  // Documentation completeness
  if (data.panNumber) score += 50
  if (data.aadharNumber) score += 50
  if (data.bankAccountNumber && data.ifscCode) score += 100
  if (data.nomineeDetails.name) score += 50

  // Contact information
  if (data.phoneNumber) score += 25
  if (data.emailAddress) score += 25

  // Address completeness
  if (data.address && data.pincode && data.state && data.district) {
    score += 75
  }

  // Cap the score at 850 (similar to credit scores)
  return Math.min(score, 850)
}

export function getUCFSINScoreCategory(score: number): {
  category: string
  color: string
  description: string
} {
  if (score >= 750) {
    return {
      category: "Excellent",
      color: "green",
      description: "Eligible for all chit fund schemes with premium benefits",
    }
  } else if (score >= 650) {
    return {
      category: "Good",
      color: "blue",
      description: "Eligible for most chit fund schemes",
    }
  } else if (score >= 550) {
    return {
      category: "Fair",
      color: "yellow",
      description: "Eligible for basic chit fund schemes",
    }
  } else if (score >= 450) {
    return {
      category: "Poor",
      color: "orange",
      description: "Limited eligibility, may require guarantor",
    }
  } else {
    return {
      category: "Very Poor",
      color: "red",
      description: "Not eligible for chit fund schemes",
    }
  }
}
