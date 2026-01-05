# Complete Chit Fund Management System - Comprehensive Development Prompt

## System Overview
Create a comprehensive **Chit Fund Management System** that digitizes and modernizes traditional chit fund operations in India. This system implements the **UCFSIN (Unique Chit Fund Subscriber Identification Number)** framework and provides complete lifecycle management for chit fund schemes, from registration to completion.

## Core Architecture

### Technology Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Lucide React icons
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Neon (Serverless PostgreSQL) with Supabase integration
- **Authentication**: JWT-based with role-based access control
- **Deployment**: Vercel with environment variable management

### Database Schema
\`\`\`sql
-- Core Tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ucfsin VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(20) CHECK (role IN ('admin', 'foreman', 'user')) DEFAULT 'user',
  kyc_status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE card_tracking (
  ucfsin VARCHAR(50) PRIMARY KEY REFERENCES users(ucfsin),
  card_status VARCHAR(20) DEFAULT 'not_requested',
  tracking_number VARCHAR(50),
  dispatch_date DATE,
  delivery_date DATE,
  address TEXT
);

CREATE TABLE schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_id VARCHAR(50) UNIQUE NOT NULL,
  foreman_id UUID REFERENCES users(id),
  scheme_name VARCHAR(255) NOT NULL,
  chit_value DECIMAL(12,2) NOT NULL,
  duration_months INTEGER NOT NULL,
  total_subscribers INTEGER NOT NULL,
  monthly_installment DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE scheme_subscribers (
  scheme_id UUID REFERENCES schemes(id),
  user_id UUID REFERENCES users(id),
  subscription_date TIMESTAMP DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active',
  PRIMARY KEY (scheme_id, user_id)
);
\`\`\`

## User Roles & Permissions

### 1. Admin Role
**Access**: Complete system oversight and management
**Key Features**:
- **Dashboard**: System-wide analytics, user statistics, scheme performance
- **User Management**: View all users, approve KYC, manage user status
- **Foreman Management**: Approve foreman applications, manage foreman accounts
- **Scheme Oversight**: Approve new schemes, monitor scheme performance
- **Card Tracking**: Manage UCFSIN card issuance and delivery
- **Reports & Analytics**: Generate comprehensive system reports
- **System Configuration**: Manage system settings and parameters

**Pages to Implement**:
- `/admin/dashboard` - Main admin control panel
- `/admin/users` - User management interface
- `/admin/foremen` - Foreman approval and management
- `/admin/schemes` - Scheme approval and oversight
- `/admin/card-tracking` - UCFSIN card tracking system
- `/admin/reports` - Analytics and reporting dashboard

### 2. Foreman Role
**Access**: Scheme creation and management
**Key Features**:
- **Dashboard**: Personal scheme portfolio, performance metrics
- **Scheme Creation**: Multi-step scheme setup wizard
- **Subscriber Management**: Add/remove subscribers, manage participation
- **Auction Management**: Conduct monthly auctions, manage bidding
- **Payment Tracking**: Monitor installment payments, handle defaults
- **Scheme Publishing**: Publish approved schemes for public subscription

**Pages to Implement**:
- `/foreman/dashboard` - Foreman control panel
- `/foreman/create-scheme` - 6-step scheme creation wizard
- `/foreman/schemes` - Active scheme management
- `/foreman/schemes/[id]/manage` - Individual scheme management
- `/foreman/schemes/[id]/auction` - Auction management interface
- `/foreman/subscribers` - Subscriber management tools

### 3. User Role
**Access**: Personal account and scheme participation
**Key Features**:
- **Dashboard**: Personal portfolio, scheme participation status
- **Scheme Discovery**: Browse and join available schemes
- **UCFSIN Management**: View card status, request new cards
- **Payment History**: Track installment payments and auction results
- **Help & Support**: Grievance system, FAQ, support tickets

**Pages to Implement**:
- `/user/dashboard` - Personal dashboard
- `/user/schemes` - Available and enrolled schemes
- `/user/card` - UCFSIN card management
- `/user/payments` - Payment history and upcoming dues
- `/user/help` - Support and grievance system

## Registration & Onboarding System

### Multi-Step Registration Process
Implement a comprehensive 8-step registration flow:

1. **Mobile Verification**: OTP-based phone number verification
2. **Basic Information**: Name, email, date of birth, gender
3. **Address Details**: Complete address with pin code validation
4. **Occupation Information**: Employment details and income verification
5. **KYC Documents**: Aadhaar, PAN, bank details upload and verification
6. **Nominee Details**: Nominee information for security
7. **UCFSIN Generation**: Unique identifier creation and display
8. **Card Issuance**: Physical card request and payment processing

### UCFSIN Generation Algorithm
\`\`\`typescript
// Format: STATE-PAN_PART-RANDOM-AADHAAR_PART
function generateUCFSIN(panNumber: string, aadhaarNumber: string, state: string): string {
  const stateCode = getStateCode(state);
  const panPart = panNumber.substring(0, 4);
  const randomPart = generateRandomString(4);
  const aadhaarPart = aadhaarNumber.substring(8, 12);
  
  return `${stateCode}-${panPart}-${randomPart}-${aadhaarPart}`;
}
\`\`\`

## Scheme Management System

### Scheme Creation Workflow (6 Steps)
1. **Basic Details**: Scheme name, chit value, duration
2. **Terms & Conditions**: Interest rates, penalties, rules
3. **Subscriber Limits**: Maximum participants, eligibility criteria
4. **Documentation**: Required documents, verification process
5. **Review & Preview**: Complete scheme summary
6. **Subscriber Addition**: Add initial subscribers and publish

### Auction System
- **Monthly Auctions**: Automated auction scheduling
- **Bidding Interface**: Real-time bidding with anti-sniping protection
- **Winner Selection**: Lowest bid wins with tie-breaking rules
- **Payment Processing**: Automatic installment calculations

## Legal Compliance Framework

### Regulatory Adherence
- **Chit Funds Act 1982**: Complete implementation of legal requirements
- **Delhi Chit Fund Rules 2007**: Regional compliance features
- **Madras ChitFunds Act**: Historical legal framework support
- **RBI Guidelines**: Reserve Bank of India compliance measures

### Documentation System
Implement comprehensive legal documentation:
- `/legal/acts-and-rules` - Legal framework overview
- `/legal/acts/chit-funds-act-1982` - Complete act documentation
- `/legal/acts/delhi-chit-fund-rules` - Regional rules
- `/legal/compliance` - Compliance checklists and requirements

## UI/UX Design Requirements

### Design System
- **Color Palette**: Professional blue (#1e40af) primary, neutral grays, success green (#10b981)
- **Typography**: Inter for headings, Open Sans for body text
- **Layout**: Responsive design with mobile-first approach
- **Components**: Consistent shadcn/ui component usage

### Key UI Components
- **Sidebars**: Role-specific navigation with collapsible design
- **Dashboards**: Card-based layouts with statistics and quick actions
- **Forms**: Multi-step forms with validation and progress indicators
- **Tables**: Sortable, filterable data tables with pagination
- **Modals**: Confirmation dialogs and detailed views

### Landing Page Features
- **Hero Section**: Compelling value proposition with CTA
- **Feature Cards**: Key system benefits and capabilities
- **How It Works**: Step-by-step process explanation
- **Statistics**: Real-time system performance metrics
- **Testimonials**: User success stories and feedback
- **Client Brands**: Partner organizations and certifications

## API Architecture

### Authentication Endpoints
\`\`\`typescript
POST /api/auth/login - User authentication
POST /api/auth/register - New user registration
POST /api/auth/logout - Session termination
GET /api/auth/profile - User profile data
\`\`\`

### Scheme Management Endpoints
\`\`\`typescript
POST /api/schemes - Create new scheme
GET /api/schemes - List schemes with filters
PUT /api/schemes/[id] - Update scheme details
DELETE /api/schemes/[id] - Delete scheme
POST /api/schemes/[id]/subscribers - Add subscribers
GET /api/schemes/[id]/auction - Auction details
POST /api/schemes/[id]/bid - Submit auction bid
\`\`\`

### Admin Management Endpoints
\`\`\`typescript
GET /api/admin/dashboard - Admin analytics
PUT /api/admin/users/[id]/approve - Approve user KYC
GET /api/admin/foremen/pending - Pending foreman approvals
PUT /api/admin/schemes/[id]/approve - Approve scheme
GET /api/admin/reports/analytics - System reports
\`\`\`

## Security & Compliance

### Security Measures
- **Input Validation**: Zod schema validation for all inputs
- **SQL Injection Prevention**: Parameterized queries only
- **XSS Protection**: Content Security Policy implementation
- **Authentication**: JWT with secure HTTP-only cookies
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: Sensitive data encryption at rest

### Compliance Features
- **Audit Trails**: Complete action logging and tracking
- **Data Privacy**: GDPR-compliant data handling
- **Financial Regulations**: RBI compliance measures
- **Legal Documentation**: Comprehensive terms and conditions

## Development Guidelines

### Code Structure
\`\`\`
app/
├── (auth)/           # Authentication pages
├── admin/            # Admin dashboard and management
├── foreman/          # Foreman scheme management
├── user/             # User dashboard and participation
├── legal/            # Legal documentation
├── api/              # API route handlers
└── globals.css       # Global styles

components/
├── ui/               # Base shadcn/ui components
├── admin/            # Admin-specific components
├── foreman/          # Foreman-specific components
├── user/             # User-specific components
├── registration/     # Registration flow components
├── landing/          # Landing page components
└── legal/            # Legal documentation components

lib/
├── auth.ts           # Authentication utilities
├── database.ts       # Database connection and queries
├── ucfsin.ts         # UCFSIN generation logic
├── validation.ts     # Zod schemas
└── utils.ts          # General utilities
\`\`\`

### Implementation Priorities
1. **Phase 1**: Core authentication and user management
2. **Phase 2**: Registration system and UCFSIN generation
3. **Phase 3**: Scheme creation and management
4. **Phase 4**: Auction system and payment processing
5. **Phase 5**: Admin oversight and reporting
6. **Phase 6**: Legal compliance and documentation

## Testing & Quality Assurance

### Testing Strategy
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API endpoint and database testing
- **E2E Tests**: Complete user journey testing
- **Security Testing**: Vulnerability assessment and penetration testing

### Performance Requirements
- **Page Load**: < 2 seconds for all pages
- **API Response**: < 500ms for standard operations
- **Database Queries**: Optimized with proper indexing
- **Mobile Performance**: Responsive design with touch optimization

## Deployment & DevOps

### Environment Configuration
\`\`\`env
# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...

# Authentication
JWT_SECRET=...
NEXTAUTH_SECRET=...

# External Services
RAZORPAY_KEY_ID=...
TWILIO_ACCOUNT_SID=...
\`\`\`

### Deployment Pipeline
1. **Development**: Local development with hot reload
2. **Staging**: Vercel preview deployments for testing
3. **Production**: Vercel production deployment with monitoring
4. **Database**: Neon serverless PostgreSQL with automatic scaling

This comprehensive system provides a complete digital transformation of traditional chit fund operations, ensuring legal compliance, user security, and operational efficiency while maintaining the cultural and financial benefits of the traditional chit fund system.
