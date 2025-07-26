// UCFSIN Generation Utility
// Format: KA-HSD-7A2-978 (State-PAN3-Random3-Aadhaar3)

const STATES = {
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  Assam: "AS",
  Bihar: "BR",
  Chhattisgarh: "CG",
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
  Odisha: "OR",
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
}

export interface UCFSINData {
  state: string
  panNumber: string
  aadhaarNumber: string
}

export function generateUCFSIN(data: UCFSINData): string {
  // Get state code
  const stateCode = STATES[data.state] || "KA"

  // Extract first 3 characters from PAN (characters 6-8, after ABCDE)
  const panPart = data.panNumber.substring(5, 8).toUpperCase()

  // Generate 3 random alphanumeric characters
  const randomPart = generateRandomAlphaNumeric(3)

  // Extract last 3 digits from Aadhaar
  const aadhaarPart = data.aadhaarNumber.slice(-3)

  return `${stateCode}-${panPart}-${randomPart}-${aadhaarPart}`
}

function generateRandomAlphaNumeric(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function validateUCFSIN(ucfsin: string): boolean {
  // Format: XX-XXX-XXX-XXX
  const pattern = /^[A-Z]{2}-[A-Z0-9]{3}-[A-Z0-9]{3}-[0-9]{3}$/
  return pattern.test(ucfsin)
}

export function parseUCFSIN(ucfsin: string) {
  if (!validateUCFSIN(ucfsin)) {
    throw new Error("Invalid UCFSIN format")
  }

  const parts = ucfsin.split("-")
  return {
    stateCode: parts[0],
    panPart: parts[1],
    randomPart: parts[2],
    aadhaarPart: parts[3],
  }
}

// Generate random UCFSIN for testing with proper format
export function generateRandomUCFSIN(): string {
  const states = Object.keys(STATES)
  const randomState = states[Math.floor(Math.random() * states.length)]

  // Generate proper PAN format: ABCDE1234F
  const panPrefix = "ABCDE"
  const panMiddle = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  const panSuffix = "F"
  const fullPAN = `${panPrefix}${panMiddle}${panSuffix}`

  // Generate proper Aadhaar format: 12 digits
  const aadhaarNumber = Math.floor(Math.random() * 1000000000000)
    .toString()
    .padStart(12, "0")

  const mockData: UCFSINData = {
    state: randomState,
    panNumber: fullPAN,
    aadhaarNumber: aadhaarNumber,
  }

  return generateUCFSIN(mockData)
}

// Generate list of random UCFSINs
export function generateUCFSINList(count: number): string[] {
  const ucfsins = new Set<string>()

  while (ucfsins.size < count) {
    ucfsins.add(generateRandomUCFSIN())
  }

  return Array.from(ucfsins)
}

// Format UCFSIN for display with proper spacing and styling
export function formatUCFSINForDisplay(ucfsin: string): string {
  if (!validateUCFSIN(ucfsin)) {
    return ucfsin // Return as-is if invalid
  }

  const parts = ucfsin.split("-")
  return `${parts[0]}-${parts[1]}-${parts[2]}-${parts[3]}`
}

// Generate UCFSIN with specific user data
export function generateUserUCFSIN(userData: {
  state: string
  panNumber: string
  aadhaarNumber: string
}): string {
  return generateUCFSIN(userData)
}
