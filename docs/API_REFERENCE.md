# WealthFlow AI API Reference

## Overview
WealthFlow AI exposes a RESTful API that powers our 4-stage agentic investment pipeline. The API provides endpoints for user authentication, profile management, and AI-driven investment recommendations.

## Base URL
```
http://localhost:5000/api
```

## Authentication
The API uses Bearer token authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### Authentication Endpoints

#### POST /api/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "age": 30,
  "salary": 75000,
  "investmentType": "growth"
}
```

**Response:**
```json
{
  "msg": "User registered"
}
```

#### POST /api/login
Authenticate user and return token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "msg": "Login success",
  "token": "john@example.com"
}
```

### Profile Management

#### POST /api/profile
Save or update user investment profile.

**Headers:**
```
Authorization: Bearer john@example.com
```

**Request Body:**
```json
{
  "age": 30,
  "salary": 75000,
  "riskTolerance": "moderate",
  "investmentGoal": "wealth"
}
```

**Response:**
```json
{
  "msg": "Profile updated"
}
```

### Investment Recommendations

#### GET /api/recommendations
Get personalized recommendations for logged-in user.

**Headers:**
```
Authorization: Bearer john@example.com
```

**Response:**
```json
{
  "profile": {
    "age": 30,
    "salary": 75000,
    "riskTolerance": "moderate",
    "riskScore": 5,
    "riskBand": "moderate",
    "investmentGoal": "wealth"
  },
  "recommendations": [...]
}
```

#### POST /api/recommend
Get agentic investment recommendations (no auth required).

**Request Body:**
```json
{
  "age": 30,
  "salary": 75000,
  "riskTolerance": "moderate",
  "investmentGoal": "growth"
}
```

**Response (Agentic Pipeline):**
```json
{
  "success": true,
  "data": {
    "request_metadata": {
      "age": 30,
      "salary": 75000,
      "risk_tolerance": "moderate",
      "investment_goal": "growth",
      "processing_timestamp": "2024-01-15T10:30:00"
    },
    "agent_pipeline": {
      "profiler_results": {
        "risk_score": 5,
        "risk_band": "moderate",
        "safe_aggressive_ratio": {"safe": 0.5, "aggressive": 0.5},
        "investment_horizon": "medium-term (15-25 years)",
        "strategy_bias": "balanced_growth"
      },
      "researcher_results": {
        "recommended_categories": ["etfs", "stocks", "bonds"],
        "specific_assets": [...],
        "market_overview": {...}
      },
      "critic_results": {
        "asset_risks": [...],
        "portfolio_risks": {...},
        "mitigation_strategies": [...],
        "stress_test_scenarios": {...}
      },
      "director_results": {
        "executive_summary": "...",
        "final_allocation": [...],
        "execution_roadmap": {...},
        "performance_projections": {...},
        "comparative_matrix": [...]
      }
    },
    "final_recommendation": {...},
    "pipeline_summary": {
      "risk_profile": "moderate",
      "strategy_type": "balanced",
      "expected_return": "6-8%",
      "confidence_score": 85,
      "total_assets_recommended": 6
    }
  }
}
```

## Agentic Pipeline Details

### Stage 1: Profiler Agent
Analyzes user profile to determine:
- Risk score (1-10)
- Risk band (low, moderate, high, very-high)
- Safe vs aggressive allocation ratio
- Investment horizon
- Strategy bias

### Stage 2: Researcher Agent
Discovers investment opportunities:
- Asset category selection
- Specific ticker recommendations
- Real-time market data enrichment
- Market overview

### Stage 3: Critic Agent
Assesses risks and vulnerabilities:
- Individual asset risk analysis
- Portfolio-level risk assessment
- Mitigation strategies
- Stress test scenarios

### Stage 4: Director Agent
Synthesizes final strategy:
- Executive summary
- Final asset allocation
- Execution roadmap
- Performance projections
- Comparative matrix

## Error Responses

### 401 Unauthorized
```json
{
  "msg": "Invalid credentials"
}
```

### 404 Not Found
```json
{
  "msg": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Detailed error message",
  "fallback": [...]
}
```

## Rate Limiting
- General API: 60 requests per minute
- Login endpoint: 5 requests per minute

## Data Models

### User Profile
```json
{
  "age": "integer (18-100)",
  "salary": "integer (0-1000000+)",
  "riskTolerance": "string (conservative|moderate|aggressive|speculative)",
  "investmentGoal": "string (growth|income|preservation|wealth)"
}
```

### Asset Allocation
```json
{
  "ticker": "string",
  "category": "string",
  "allocation_percentage": "number",
  "expected_return": "string",
  "risk_level": "string",
  "execution_platforms": [...],
  "confidence_level": "number"
}
```

## SDK Examples

### Python
```python
import requests

# Get recommendations
response = requests.post(
    'http://localhost:5000/api/recommend',
    json={
        'age': 30,
        'salary': 75000,
        'riskTolerance': 'moderate',
        'investmentGoal': 'growth'
    }
)

if response.status_code == 200:
    data = response.json()
    recommendations = data['data']['final_recommendation']
```

### JavaScript
```javascript
// Get recommendations
const response = await fetch('http://localhost:5000/api/recommend', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    age: 30,
    salary: 75000,
    riskTolerance: 'moderate',
    investmentGoal: 'growth'
  })
});

const data = await response.json();
const recommendations = data.data.final_recommendation;
```

## Testing

### cURL Examples
```bash
# Register user
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Get recommendations
curl -X POST http://localhost:5000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"age":30,"salary":75000,"riskTolerance":"moderate","investmentGoal":"growth"}'
```

## WebSocket Support (Future)
Real-time updates for:
- Market data changes
- Portfolio rebalancing alerts
- Agent processing status

## Versioning
Current version: v1
API versioning follows semantic versioning (semver).

## Support
For API support and questions:
- GitHub Issues: [repository/issues]
- Documentation: [docs link]
- Email: support@wealthflow.ai
