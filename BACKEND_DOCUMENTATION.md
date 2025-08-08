# 🔧 Chit Fund Portal - FastAPI Backend Documentation

## 📋 Overview

This documentation provides comprehensive details about the FastAPI backend implementation for the Chit Fund Portal. The backend is designed to support all frontend functionalities while ensuring security, scalability, and compliance with chit fund regulations.

## 🏗️ Technology Stack

- **Framework**: FastAPI 0.100.0+
- **Database**: PostgreSQL 14+
- **ORM**: SQLAlchemy 2.0+
- **Authentication**: JWT + OAuth2
- **Cache**: Redis 7+
- **Task Queue**: Celery with RabbitMQ
- **Storage**: AWS S3/MinIO
- **Documentation**: OpenAPI/Swagger

## 📁 Project Structure

```
chitfund_backend/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── auth.py          # Authentication endpoints
│   │   │   ├── users.py         # User management
│   │   │   ├── schemes.py       # Scheme management
│   │   │   ├── foreman.py       # Foreman operations
│   │   │   ├── payments.py      # Payment handling
│   │   │   ├── documents.py     # Document management
│   │   │   └── admin.py         # Admin operations
│   ├── core/
│   │   ├── config.py            # Configuration
│   │   ├── security.py          # Security utilities
│   │   └── constants.py         # System constants
│   ├── models/                  # Database models
│   ├── schemas/                 # Pydantic schemas
│   ├── services/               # Business logic
│   └── utils/                  # Utilities
├── tests/                      # Test suite
├── alembic/                    # DB migrations
└── docker/                     # Docker configs
```

## 🗄️ Database Schema

### Core Tables and Relationships

#### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ucfsin VARCHAR(20) UNIQUE NOT NULL,
    role VARCHAR(10) CHECK (role IN ('USER', 'FOREMAN', 'ADMIN')),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_ucfsin ON users(ucfsin);
CREATE INDEX idx_users_email ON users(email);
```

#### Schemes Table
```sql
CREATE TABLE schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    foreman_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    monthly_installment DECIMAL(12,2) NOT NULL,
    duration_months INTEGER NOT NULL,
    max_subscribers INTEGER NOT NULL,
    current_subscribers INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'DRAFT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    start_date DATE,
    end_date DATE
);

CREATE INDEX idx_schemes_foreman ON schemes(foreman_id);
CREATE INDEX idx_schemes_status ON schemes(status);
```

## 🔐 Authentication Flow

### 1. Registration Process
```python
@router.post("/auth/register", response_model=UserResponse)
async def register_user(user_data: UserCreate):
    # 1. Validate input data
    # 2. Check existing user
    # 3. Hash password
    # 4. Generate UCFSIN
    # 5. Create user record
    # 6. Send verification email
    # 7. Return user data
```

### 2. Login Process
```python
@router.post("/auth/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm):
    # 1. Validate credentials
    # 2. Generate access token
    # 3. Generate refresh token
    # 4. Update last login
    # 5. Return tokens
```

## 📱 API Endpoints

### User Management
```python
# Create new user
@router.post("/users/", response_model=UserResponse)
async def create_user(user: UserCreate):
    ...

# Get user details
@router.get("/users/{user_id}", response_model=UserDetail)
async def get_user(user_id: UUID):
    ...

# Update user
@router.put("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: UUID, user_update: UserUpdate):
    ...
```

### Scheme Management
```python
# Create scheme
@router.post("/schemes/", response_model=SchemeResponse)
async def create_scheme(scheme: SchemeCreate):
    ...

# Get scheme details
@router.get("/schemes/{scheme_id}", response_model=SchemeDetail)
async def get_scheme(scheme_id: UUID):
    ...

# Approve scheme
@router.post("/schemes/{scheme_id}/approve")
async def approve_scheme(scheme_id: UUID):
    ...
```

## 🔄 Background Tasks

### Task Queue Configuration
```python
from celery import Celery

celery = Celery(
    'chitfund',
    broker='amqp://guest@localhost//',
    backend='redis://localhost'
)
```

### Scheduled Tasks
```python
@celery.task
def update_chit_scores():
    """Daily update of user chit scores"""
    ...

@celery.task
def process_pending_payments():
    """Hourly payment processing"""
    ...

@celery.task
def verify_documents():
    """Process document verification queue"""
    ...
```

## 🔒 Security Implementations

### JWT Configuration
```python
from fastapi_security import OAuth2PasswordBearer
from jose import JWTError, jwt

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
```

### Role-Based Access Control
```python
def require_roles(roles: List[str]):
    async def role_checker(
        current_user: User = Depends(get_current_user)
    ):
        if current_user.role not in roles:
            raise HTTPException(
                status_code=403,
                detail="Operation not permitted"
            )
        return current_user
    return role_checker
```

## 📊 Business Logic

### UCFSIN Generation
```python
def generate_ucfsin(user_id: str) -> str:
    year = datetime.now().year
    sequence = f"{int(user_id[:8], 16):06d}"
    return f"UCFSIN-{year}-{sequence}"
```

### Chit Score Calculation
```python
def calculate_chit_score(
    payment_history: float,
    scheme_participation: float,
    kyc_completion: float,
    profile_completeness: float
) -> int:
    weights = {
        'payment': 0.4,
        'participation': 0.3,
        'kyc': 0.2,
        'profile': 0.1
    }
    
    score = (
        payment_history * weights['payment'] +
        scheme_participation * weights['participation'] +
        kyc_completion * weights['kyc'] +
        profile_completeness * weights['profile']
    ) * 900
    
    return min(900, max(0, int(score)))
```

## 📡 WebSocket Implementation

```python
@app.websocket("/ws/notifications/{user_id}")
async def notifications_websocket(
    websocket: WebSocket,
    user_id: str,
    token: str = Query(...)
):
    await websocket.accept()
    try:
        while True:
            # Handle real-time notifications
            ...
    except WebSocketDisconnect:
        # Handle disconnect
        ...
```

## 🔍 Monitoring and Logging

### Logging Configuration
```python
import logging

logging.config.dictConfig({
    'version': 1,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
            'level': 'INFO'
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': 'app.log',
            'formatter': 'standard',
            'level': 'WARNING'
        }
    },
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(message)s'
        }
    }
})
```

## 🚀 Deployment

### Docker Configuration
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables
```env
# Server
API_VERSION=v1
DEBUG=False
PORT=8000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/chitfund

# Security
SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AWS/S3
AWS_ACCESS_KEY=your-access-key
AWS_SECRET_KEY=your-secret-key
S3_BUCKET=chitfund-documents

# Redis
REDIS_URL=redis://localhost:6379

# RabbitMQ
RABBITMQ_URL=amqp://guest@localhost//
```

## 📊 API Response Formats

### Success Response
```json
{
    "status": "success",
    "data": {
        "id": "uuid-here",
        "attribute": "value"
    },
    "message": "Operation successful"
}
```

### Error Response
```json
{
    "status": "error",
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {
        "field": ["error detail"]
    }
}
```

## 🧪 Testing Strategy

### Unit Tests
```python
def test_generate_ucfsin():
    user_id = "123e4567-e89b-12d3-a456-426614174000"
    ucfsin = generate_ucfsin(user_id)
    assert ucfsin.startswith("UCFSIN-")
    assert len(ucfsin) == 18
```

### Integration Tests
```python
async def test_create_scheme():
    response = await client.post(
        "/api/schemes/",
        json={
            "name": "Test Scheme",
            "amount": 100000,
            "duration": 12
        }
    )
    assert response.status_code == 201
```

## 📚 Additional Resources

- API Documentation: `/docs` (Swagger UI)
- OpenAPI Spec: `/openapi.json`
- Postman Collection: `/postman/chitfund-api.json`
- Database Schema: `/docs/schema.sql`

---

**Note**: This documentation is continuously updated. For the latest version, please check the repository.
