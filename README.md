# 🌊 WealthFlow AI: Agentic Investment Strategist

# INVEXA-wealthflow-AI
# 🌊 WealthFlow AI: Agentic Investment Strategist

A sophisticated, multi-stage AI orchestration system designed to manage complex investment workflows through intelligent agent coordination. It integrates state-of-the-art financial data APIs, risk analysis models, and market research coordinated by a 4-stage agentic pipeline.

## 🚀 Overview

WealthFlow AI transforms raw financial data into sophisticated, stress-tested investment roadmaps. It allows users to orchestrate, analyze, and execute investment strategies using advanced AI agents that plan and execute multi-stage financial pipelines.

## ✨ Key Features

### 🧠 4-Stage Agentic Pipeline
- **Profiler Agent**: Behavioral analysis and risk assessment
- **Researcher Agent**: Market discovery and asset research  
- **Critic Agent**: Risk assessment and vulnerability analysis
- **Director Agent**: Strategy synthesis and execution planning

### 🎯 Agentic Commands
- `/analyze`: Generate personalized investment recommendations
- `/audit`: Perform risk assessment on existing portfolios
- `/optimize`: Rebalance portfolio based on market conditions
- `/research`: Deep dive into specific asset classes

### 📊 Real-Time Market Integration
- Yahoo Finance API for live market data
- Risk scoring with stress testing scenarios
- Portfolio optimization with Monte Carlo simulations
- Execution platform recommendations with direct links

### 🎨 Premium Interface
- Modern React-based dashboard with Chart.js visualizations
- Framer Motion animations for agent processing
- Responsive design for desktop and mobile
- Professional bento-grid layout for financial insights

## 🛠️ Technology Stack

### Backend
- **Framework**: Flask (Python 3.10+)
- **AI/ML**: Custom agent orchestration system
- **Data Sources**: Yahoo Finance API, market data feeds
- **Risk Analysis**: Monte Carlo simulations, stress testing

### Frontend
- **Framework**: React 19 with modern hooks
- **Styling**: Tailwind CSS 4
- **Visualizations**: Chart.js, D3.js
- **Animations**: Framer Motion
- **Routing**: React Router DOM

### Data & APIs
- **Market Data**: Yahoo Finance API
- **Authentication**: JWT-based auth system
- **Caching**: Redis for performance optimization
- **Deployment**: Docker, Nginx reverse proxy

## 📂 Project Structure

```
WealthFlow-AI/
│
├── backend/                    # Flask Application & AI Agents
│   ├── app.py                  # Main Flask Application
│   ├── core/                   # AI Agent System
│   │   ├── agents/             # 4-Stage Agents
│   │   │   ├── profiler.py     # Behavioral Analysis
│   │   │   ├── researcher.py   # Market Discovery
│   │   │   ├── critic.py       # Risk Assessment
│   │   │   └── director.py     # Strategy Synthesis
│   │   └── orchestrator.py     # Pipeline Coordination
│   ├── routes/                 # API Endpoints
│   │   ├── auth.py            # Authentication Routes
│   │   └── recommendation.py   # Investment Routes
│   ├── services/              # Business Logic
│   │   ├── risk_scorer.py     # Risk Analysis
│   │   └── recommender.py     # Recommendation Engine
│   └── requirements.txt       # Python Dependencies
│
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/        # UI Components
│   │   │   ├── AgentTransition.jsx  # AI Agent Animations
│   │   │   ├── PortfolioChart.jsx   # Chart Components
│   │   │   └── RiskMeter.jsx        # Risk Visualization
│   │   ├── features/          # Feature Components
│   │   │   ├── Dashboard/     # Main Dashboard
│   │   │   ├── Portfolio/     # Portfolio Management
│   │   │   └── Recommendations/ # AI Recommendations
│   │   ├── hooks/             # Custom React Hooks
│   │   └── pages/             # Page Components
│   ├── public/                # Static Assets
│   └── package.json           # Node Dependencies
│
├── deployment/                # Production Configuration
│   ├── Dockerfile            # Container Configuration
│   ├── docker-compose.yml    # Multi-Container Setup
│   ├── nginx.conf            # Web Server Config
│   └── .env.example          # Environment Variables
│
├── docs/                     # Documentation
│   ├── screenshots/          # Application Screenshots
│   │   ├── login.png         # Login Interface
│   │   ├── dashboard.png     # Main Dashboard
│   │   └── recommendations.png # AI Recommendations
│   ├── architecture.md       # System Architecture
│   └── API_REFERENCE.md      # Complete API Documentation
│
└── README.md                 # Project Documentation
```

## ⚙️ Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- Redis (optional, for caching)

### Quick Setup

```bash
# Clone the repository
git clone <repository-url>
cd WealthFlow-AI

# Backend Setup
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend Setup
cd ../frontend
npm install

# Environment Configuration
cp ../deployment/.env.example ../backend/.env
# Edit .env with your API keys
```

### API Keys Required
Create a `.env` file in the backend directory:

```env
# AI/LLM Configuration
AI_API_KEY=your_openai_or_anthropic_api_key_here

# Financial Data APIs
FINANCE_API_KEY=your_yahoo_finance_api_key_here

# Application Configuration
FLASK_ENV=development
SECRET_KEY=your_secret_key_here
```

## 🏃 Running the Project

### Development Mode

```bash
# Terminal 1: Backend
cd backend
python app.py

# Terminal 2: Frontend  
cd frontend
npm run dev
```

### Production Mode

```bash
# Using Docker Compose
docker-compose up --build

# Or manual deployment
cd backend && python app.py
cd frontend && npm run build && npm start
```

Access the application at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📖 Usage Guide

### Getting Started

1. **Register Account**: Create a new user account
2. **Complete Profile**: Add age, salary, and risk tolerance
3. **Get Recommendations**: Use `/analyze` command for AI suggestions
4. **Execute Strategy**: Follow provided platform links

### Agentic Commands

#### Full Analysis
```
/analyze
```
Upload profile → Generate 4-stage investment recommendations

#### Portfolio Audit  
```
/audit
```
Analyze existing portfolio → Risk assessment and optimization suggestions

#### Market Research
```
/research tech stocks
```
Deep dive into specific sectors → Detailed analysis and recommendations

#### Portfolio Optimization
```
/optimize
```
Rebalance portfolio → AI-driven allocation adjustments

### Example Workflows

#### New Investor Setup
1. Register account with email/password
2. Complete onboarding profile (age, salary, risk tolerance)
3. Run `/analyze` for personalized recommendations
4. Review 4-stage agent pipeline results
5. Execute investments via recommended platforms

#### Portfolio Review
1. Upload current portfolio data
2. Run `/audit` for risk assessment
3. Review critic agent risk analysis
4. Apply `/optimize` suggestions
5. Monitor performance over time

## 🌐 API Endpoints

### Authentication
```http
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "securepassword123"
}
```

```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Investment Analysis
```http
POST /api/recommend
Content-Type: application/json
Authorization: Bearer <token>

{
  "age": 30,
  "salary": 75000,
  "riskTolerance": "moderate",
  "investmentGoal": "growth"
}
```

### Profile Management
```http
POST /api/profile
Content-Type: application/json
Authorization: Bearer <token>

{
  "age": 30,
  "salary": 75000,
  "riskTolerance": "moderate",
  "investmentGoal": "wealth"
}
```

## 🎯 Skills Demonstrated

### AI System Design
- **Multi-Agent Architecture**: 4-stage agentic pipeline with specialized agents
- **Workflow Orchestration**: Coordination between profiler, researcher, critic, and director
- **Deterministic Processing**: Consistent and reproducible AI recommendations

### Financial Technology
- **Risk Analysis**: Multi-factor risk scoring with stress testing
- **Portfolio Optimization**: Modern portfolio theory implementation
- **Market Data Integration**: Real-time data from Yahoo Finance API

### Full-Stack Development
- **Backend Development**: Flask REST API with comprehensive endpoints
- **Frontend Development**: React 19 with modern hooks and state management
- **Database Design**: User management and portfolio persistence
- **Authentication**: JWT-based secure authentication system

### DevOps & Deployment
- **Containerization**: Docker multi-stage builds for production
- **Web Server**: Nginx reverse proxy with SSL configuration
- **Performance**: Redis caching and rate limiting
- **Monitoring**: Health checks and logging infrastructure

### UI/UX Design
- **Data Visualization**: Chart.js for portfolio analytics
- **Animations**: Framer Motion for agent processing feedback
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **User Experience**: Intuitive workflow for complex financial concepts

## 🚀 Future Improvements

### Advanced AI Features
- **OpenAI GPT Integration**: Advanced reasoning and natural language explanations
- **Machine Learning Models**: Custom models for prediction and optimization
- **Sentiment Analysis**: Market sentiment integration for timing decisions

### Platform Enhancements
- **Mobile Application**: React Native app for on-the-go portfolio management
- **Broker Integration**: Direct API connections to major brokerages
- **Real-time Notifications**: WebSocket-based alerts and updates

### Data & Analytics
- **Alternative Data**: Integration of alternative data sources
- **Backtesting Engine**: Historical performance analysis
- **Tax Optimization**: Automated tax-loss harvesting suggestions

### Enterprise Features
- **Multi-User Support**: Family office and wealth management features
- **Compliance**: Regulatory reporting and compliance tools
- **White-label**: Custom branding for financial institutions

## 📸 Application Demo

### Login Interface
![Login](./docs/screenshots/login.png)

### Main Dashboard  
![Dashboard](./docs/screenshots/dashboard.png)

### AI Recommendations
![Recommendations](./docs/screenshots/recommendations.png)

## 🏗️ System Architecture

### 4-Stage Agentic Pipeline
1. **Profiler Agent**: Analyzes user profile, determines risk bounds
2. **Researcher Agent**: Discovers investment opportunities, fetches market data
3. **Critic Agent**: Assesses risks, performs stress testing
4. **Director Agent**: Synthesizes strategy, provides execution roadmap

### Data Flow Architecture
```
User Input → Profiler → Researcher → Critic → Director → Strategy Output
     ↓              ↓          ↓        ↓        ↓
Risk Analysis → Market Research → Risk Assessment → Strategy Synthesis
```

## 🛡️ License

Distributed under the MIT License. See LICENSE for more information.

## 📞 Support & Contact

- **Documentation**: [docs/API_REFERENCE.md](./docs/API_REFERENCE.md)
- **Issues**: [GitHub Issues](repository/issues)
- **Email**: support@wealthflow.ai
- **Website**: https://wealthflow.ai

---

**🌊 WealthFlow AI - Transforming Financial Data into Intelligent Investment Strategies**
>>>>>>> d20e0078c57e82dbede08f87747d2182652f96b3
