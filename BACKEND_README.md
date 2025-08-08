# 🔧 Chit Fund Portal - Backend Development Guide

This guide provides detailed specifications for developing the backend system to support the existing Chitfund Portal frontend.

## 📋 System Requirements

### Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js/NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma/TypeORM
- **Authentication**: JWT + OAuth2
- **File Storage**: AWS S3/MinIO
- **Caching**: Redis
- **Queue System**: Bull/RabbitMQ
- **API Documentation**: Swagger/OpenAPI

## 🗄️ Database Schema

### Core Tables

#### 1. Users

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    ucfsin VARCHAR(20) UNIQUE,
    role ENUM('USER', 'FOREMAN', 'ADMIN'),
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(15) UNIQUE,
    password_hash VARCHAR(255),
    full_name VARCHAR(255),
    date_of_birth DATE,
    status ENUM('PENDING', 'ACTIVE', 'SUSPENDED'),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

#### 2. UserKYC

```sql
CREATE TABLE user_kyc (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    document_type ENUM('AADHAR', 'PAN', 'DRIVING_LICENSE'),
    document_number VARCHAR(50),
    document_url VARCHAR(255),
    verification_status ENUM('PENDING', 'VERIFIED', 'REJECTED'),
    verified_at TIMESTAMP,
    created_at TIMESTAMP
);
```

#### 3. Schemes

```sql
CREATE TABLE schemes (
    id UUID PRIMARY KEY,
    foreman_id UUID REFERENCES users(id),
    name VARCHAR(255),
    duration_months INTEGER,
    total_amount DECIMAL(12,2),
    monthly_installment DECIMAL(12,2),
    max_subscribers INTEGER,
    current_subscribers INTEGER,
    status ENUM('DRAFT', 'PENDING_APPROVAL', 'ACTIVE', 'COMPLETED'),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP
);
```

#### 4. Subscriptions

```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY,
    scheme_id UUID REFERENCES schemes(id),
    subscriber_id UUID REFERENCES users(id),
    status ENUM('ACTIVE', 'DEFAULTED', 'COMPLETED'),
    join_date DATE,
    created_at TIMESTAMP
);
```

#### 5. Payments

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY,
    subscription_id UUID REFERENCES subscriptions(id),
    amount DECIMAL(12,2),
    payment_type ENUM('INSTALLMENT', 'DIVIDEND'),
    status ENUM('PENDING', 'COMPLETED', 'FAILED'),
    transaction_id VARCHAR(100),
    payment_date TIMESTAMP,
    created_at TIMESTAMP
);
```

## 🔄 API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### User Management

```
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
POST   /api/users/:id/kyc
GET    /api/users/:id/chit-score
```

### Scheme Management

```
GET    /api/schemes
POST   /api/schemes
GET    /api/schemes/:id
PUT    /api/schemes/:id
DELETE /api/schemes/:id
POST   /api/schemes/:id/approve
GET    /api/schemes/:id/subscribers
```

### Subscription Management

```
GET    /api/subscriptions
POST   /api/subscriptions
GET    /api/subscriptions/:id
PUT    /api/subscriptions/:id
DELETE /api/subscriptions/:id
GET    /api/subscriptions/:id/payments
```

### Payment Management

```
GET    /api/payments
POST   /api/payments
GET    /api/payments/:id
PUT    /api/payments/:id
GET    /api/payments/user/:userId
```

## 🔐 Security Implementation

### Authentication Flow

1. **Registration**

   - Validate user input
   - Hash password (using bcrypt)
   - Generate UCFSIN
   - Create user record
   - Send verification email

2. **Login**

   - Validate credentials
   - Generate JWT token pair (access + refresh)
   - Return user data and tokens

3. **Token Management**
   ```typescript
   interface TokenPayload {
     userId: string;
     role: "USER" | "FOREMAN" | "ADMIN";
     ucfsin: string;
     exp: number;
   }
   ```

### Authorization Middleware

```typescript
const roleGuard = (allowedRoles: string[]) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
```

## 📊 Business Logic Implementation

### UCFSIN Generation

```typescript
const generateUCFSIN = (userId: string): string => {
  const year = new Date().getFullYear();
  const sequence = generateSequence(userId); // 6 digits
  return `UCFSIN-${year}-${sequence}`;
};
```

### Chit Score Calculation

```typescript
interface ChitScoreFactors {
  paymentHistory: number; // 40%
  schemeParticipation: number; // 30%
  kycCompletion: number; // 20%
  profileCompleteness: number; // 10%
}

const calculateChitScore = (factors: ChitScoreFactors): number => {
  return (
    (factors.paymentHistory * 0.4 +
      factors.schemeParticipation * 0.3 +
      factors.kycCompletion * 0.2 +
      factors.profileCompleteness * 0.1) *
    900
  ); // Max score is 900
};
```

## 🔄 Background Jobs

### Required Processes

1. **Payment Reminders**

   - Schedule: Daily
   - Check upcoming/overdue payments
   - Send notifications

2. **Chit Score Updates**

   - Schedule: Daily (midnight)
   - Recalculate scores
   - Update user records

3. **Document Verification**

   - Queue: High Priority
   - Process KYC documents
   - Update verification status

4. **Report Generation**
   - Schedule: Monthly
   - Generate performance reports
   - Store in S3/MinIO

## 📨 Notification System

### Channels

1. Email (Transactional)
2. SMS
3. In-App Notifications
4. Push Notifications (Future)

### Events to Monitor

```typescript
enum NotificationEvent {
  PAYMENT_DUE = "PAYMENT_DUE",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  KYC_VERIFIED = "KYC_VERIFIED",
  SCHEME_APPROVED = "SCHEME_APPROVED",
  AUCTION_REMINDER = "AUCTION_REMINDER",
}
```

## 🔍 Monitoring and Logging

### Metrics to Track

1. API Response Times
2. Database Query Performance
3. Authentication Success/Failure Rates
4. Payment Success Rates
5. Background Job Performance

### Logging Strategy

```typescript
interface LogEntry {
  timestamp: Date;
  level: "INFO" | "WARN" | "ERROR";
  service: string;
  action: string;
  userId?: string;
  details: object;
  traceId: string;
}
```

## 🚀 Deployment Configuration

### Environment Variables

```env
# Server
PORT=3000
NODE_ENV=production
API_VERSION=v1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/chitfund
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Storage
S3_BUCKET=chitfund-documents
S3_REGION=ap-south-1
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key

# Notifications
SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
SMS_API_KEY=your-sms-api-key
```

### Docker Configuration

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY dist/ ./dist/
COPY .env ./

EXPOSE 3000

CMD ["npm", "start"]
```

## 📝 Testing Strategy

### Unit Tests

- Controllers
- Services
- Utilities
- Models

### Integration Tests

- API Endpoints
- Database Operations
- External Services

### Load Tests

- Concurrent Users: 1000
- Response Time: < 200ms
- Error Rate: < 0.1%

## 🛠️ Development Setup

1. **Clone Repository**

```bash
git clone <backend-repo-url>
cd chitfund-backend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Database Setup**

```bash
# Create database
createdb chitfund

# Run migrations
npm run migrate
```

4. **Start Development Server**

```bash
npm run dev
```

## 📚 Documentation

### API Documentation

- Swagger UI at `/api-docs`
- Postman Collection
- API Blueprint

### Database Documentation

- Entity Relationship Diagrams
- Migration History
- Indexing Strategy

### Code Documentation

- JSDoc Comments
- TypeScript Types
- Architecture Diagrams

## 🔄 CI/CD Pipeline

### Steps

1. Code Linting
2. Unit Tests
3. Integration Tests
4. Build
5. Deploy to Staging
6. Automated Tests
7. Deploy to Production

### Quality Gates

- Test Coverage: > 80%
- Code Quality (SonarQube)
- Security Scan
- Performance Metrics

---

**Note**: This backend implementation guide is designed to support the existing frontend system. Ensure all implementations follow the security best practices and maintain proper error handling throughout the system.
