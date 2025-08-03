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
  // UCFSIN Format: KA-HSD-7A2-978
  // KA: State code
  // HSD: First three digits of PAN
  // 7A2: Three digits random
  // 978: Last three digits from Aadhar

  const stateCode = getStateCode(personalData.state || "")
  const panDigits = getPanDigits(personalData.panNumber || "")
  const randomDigits = generateRandomDigits()
  const aadharDigits = getAadharDigits(personalData.aadharNumber || "")

  return `${stateCode}-${panDigits}-${randomDigits}-${aadharDigits}`
}

function getStateCode(state: string): string {
  const stateCodes: Record<string, string> = {
    "Andhra Pradesh": "AP",
    "Arunachal Pradesh": "AR",
    Assam: "AS",
    Bihar: "BR",
    Chhattisgarh: "CT",
    Goa: "GA",
    Gujarat: "GJ",
    Haryana: "HR",
    "Himachal Pradesh": "HP",
    Jharkhand: "JH",
    Karnataka: "KA",
    Kerala: "KL",
    "Madhya Pradesh": "MP",
    Maharashtra: "MH",
    Manipur: "MN",
    Meghalaya: "ML",
    Mizoram: "MZ",
    Nagaland: "NL",
    Odisha: "OD",
    Punjab: "PB",
    Rajasthan: "RJ",
    Sikkim: "SK",
    "Tamil Nadu": "TN",
    Telangana: "TS",
    Tripura: "TR",
    "Uttar Pradesh": "UP",
    Uttarakhand: "UK",
    "West Bengal": "WB",
    Delhi: "DL",
    "Jammu and Kashmir": "JK",
    Ladakh: "LA",
    Chandigarh: "CH",
    "Dadra and Nagar Haveli and Daman and Diu": "DD",
    Lakshadweep: "LD",
    Puducherry: "PY",
    "Andaman and Nicobar Islands": "AN",
  }

  return stateCodes[state] || "XX"
}

function getPanDigits(panNumber: string): string {
  return panNumber.substring(0, 3).toUpperCase() || "XXX"
}

function generateRandomDigits(): string {
  const random = Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, "0")
  return random
}

function getAadharDigits(aadharNumber: string): string {
  return aadharNumber.slice(-3) || "000"
}

export function validateUCFSIN(ucfsin: string): boolean {
  const pattern = /^[A-Z]{2}-[A-Z0-9]{3}-\d{3}-\d{3}$/
  return pattern.test(ucfsin)
}

export function parseUCFSIN(ucfsin: string) {
  if (!validateUCFSIN(ucfsin)) {
    throw new Error("Invalid UCFSIN format")
  }

  const parts = ucfsin.split("-")
  return {
    stateCode: parts[0],
    panDigits: parts[1],
    randomDigits: parts[2],
    aadharDigits: parts[3],
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
