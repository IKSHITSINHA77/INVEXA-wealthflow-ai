# 🌊 WealthFlow AI: Agentic Investment Strategist
### *Agentic Investment Orchestration for the Modern Portfolio*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB.svg)](https://reactjs.org/)

WealthFlow AI is not a calculator—it's a digital investment committee. By utilizing a **4-stage Agentic Pipeline**, it transforms raw financial data into a sophisticated, stress-tested investment roadmap.

## 🖼️ Screenshots
| Login Page | AI Recommendations | Risk Analysis |
| :---: | :---: | :---: |
| ![Login](./docs/screenshots/login.png) | ![Recs](./docs/screenshots/recommendations.png) | ![Risk](./docs/screenshots/onboarding.png) |

---

## 🧠 The Agentic Engine
WealthFlow uses a sequential multi-agent system to ensure objectivity:

| Agent | Responsibility | Output |
| :--- | :--- | :--- |
| **The Profiler** | Behavioral Analysis | Safe vs. Aggressive Ratio |
| **The Researcher** | Market Discovery | Tickers, REITS, & Alpha Assets |
| **The Critic** | Risk Assessment | "What could go wrong?" Analysis |
| **The Director** | Synthesis | Execution links & Final Allocation |

---

## 🛠 Tech Stack
- **Frontend:** React 19, Tailwind CSS 4, Chart.js (Data Visualization)
- **Backend:** Flask (Python), OpenAI/Anthropic (Agent Logic)
- **Data:** Yahoo Finance API (Market Real-time Data)

## 🛠 Step-by-Step Setup Guide

### Step 1: Environment Preparation

Ensure you have **Python 3.10+** installed.

```bash
# Create a virtual environment
python -m venv venv

# Activate on macOS/Linux
source venv/bin/activate

# Activate on Windows (PowerShell)
.\venv\Scripts\Activate.ps1
```

### Step 2: Install Core Dependencies

The backend requires libraries for API routes, AI orchestration, and market data integration.

```bash
pip install flask openai pandas yfinance requests python-dotenv bcrypt
```

If you also run the frontend:

```bash
cd frontend
npm install
```

### Step 3: API Configuration

Create a `.env` file in the project root:

```env
AI_API_KEY=your_llm_api_key_here
FINANCE_API_KEY=your_market_data_key_here
DEBUG=True
```

### Step 4: Launch the Application

Backend:

```bash
.\venv\Scripts\python.exe backend\APP.PY
```

Frontend (new terminal):

```bash
cd frontend
npm run dev
```

## 🎮 How the AI Processes a Request

When a user submits their profile, the AI follows this execution flow:

### 1) Profile Ingestion

- **Inputs:** Age, Annual Salary, Investment Type (for example: Growth, Dividend, Conservative).
- **AI Action:** Determines the time horizon.  
  Example: a 25-year-old usually has higher compounding potential, while a 55-year-old may prioritize capital preservation.

### 2) Multi-Option Recommendation

The AI generates 3-5 distinct paths. For each path, it provides:

- **Details:** How the investment works.
- **Advantages:** Tax benefits, high returns, or dividends.
- **Disadvantages:** High volatility, lock-in periods, or management fees.
- **Risk Factor:** A score from 1 (Low) to 10 (Aggressive).

### 3) Comparative Matrix

A structured comparison table:

| Investment    | Exp. Return | Risk Level | Liquidity | Recommended Platform      |
| ---           | ---         | ---        | ---       | ---                       |
| Index Funds   | 8-12%       | Low/Med    | High      | Vanguard / vanguard.com   |
| Emerging Tech | 20%+        | High       | Med       | Robinhood / robinhood.com |

### 4) Execution Gateway

The AI identifies reputable websites/apps where the user can execute the investment (for example: Fidelity, Coinbase, or localized banking platforms).

---

## 🔌 API Reference

The backend exposes a RESTful API for profile management and AI-driven insights.

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/register` | Register a new user |
| `POST` | `/api/login` | Returns a JWT/Bearer token |

### Investment Logic
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/profile` | Save Age, Salary, and Risk Tolerance |
| `GET` | `/api/recommendations` | Fetch personalized agent-driven analysis |
| `POST` | `/api/recommend` | Ad-hoc recommendation for guest users |

---

## 🏗️ 4-Stage Agentic Pipeline
WealthFlow does not just "calculate"; it "thinks" through four distinct lenses:
1. **Profiler Agent:** Sets the risk/reward bounds.
2. **Researcher Agent:** Scours market data for specific assets.
3. **Critic Agent:** Highlights the "bear case" and hidden risks.
4. **Director Agent:** Synthesizes data into a final execution strategy.

---

## 🚢 Deployment Guide

### Option 1: Docker (Recommended)
Deploy the entire stack (Frontend + Backend) using Docker:
```bash
docker-compose up --build
```

### Option 2: Manual Deployment
```bash
# Backend
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the backend:
```env
AI_API_KEY=your_llm_api_key_here
FINANCE_API_KEY=your_market_data_key_here
DEBUG=True
```

### Sample Request: Login

```bash
curl -X POST http://127.0.0.1:5000/api/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"you@example.com\",\"password\":\"your_password\"}"
```

### Sample Request: Save Profile

```bash
curl -X POST http://127.0.0.1:5000/api/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer you@example.com" \
  -d "{\"age\":29,\"salary\":90000,\"riskTolerance\":\"moderate\",\"investmentGoal\":\"wealth\"}"
```

## 🖼 Screenshots / Demo

Add product screenshots or a short walkthrough video here as the UI evolves.

- `docs/screenshots/login.png` - Login page
- `docs/screenshots/register.png` - Registration page
- `docs/screenshots/onboarding.png` - Investment profile setup
- `docs/screenshots/recommendations.png` - AI recommendation output
- `docs/demo/wealthflow-demo.mp4` - End-to-end demo (optional)

> Tip: Keep image width around 1400px for clean GitHub rendering.

## 🚀 Advanced Features (Agentic Roadmap)

- 📈 **Real-time Rebalancing:** An agent notifies users if allocation drifts too far (for example, crypto-to-stock ratio).
- 🔮 **Scenario Simulation:** "What happens to my portfolio if a recession hits in 2027?"
- 📑 **Tax-Loss Harvesting:** An agent suggests potential loss-harvesting opportunities to reduce taxable gains.
- 🌍 **Multi-Currency Support:** Recommendation logic adapts by country, currency, and local inflation context.

## ✨ Standout Product Features

These are implemented and visible in the current app experience:

1. **Agentic 4-Stage Recommendation Engine**
   - Profiler, Researcher, Critic, and Director style outputs.
   - Returns diversified paths instead of a single pick.

2. **Risk Scorer (Age vs Salary vs Risk Preference)**
   - Dedicated scoring module in `backend/services/risk_scorer.py`.
   - Produces `riskScore` (1-10), `riskBand`, and allocation bias.

3. **Smart Scenario Simulator (What-if Engine)**
   - In recommendations UI, users can adjust monthly contribution and years.
   - Live projection updates based on weighted expected return from AI portfolio.

4. **Risk Radar + Rebalance Nudge**
   - Visual risk meter tied to backend risk score.
   - Dynamic plain-language rebalancing suggestion based on profile.

5. **Post-Login Explore Experience**
   - Dedicated `/explore` page after sign-in for discovery-first onboarding.
   - Lets users browse categories before personal profile setup.

6. **Protected Route Flow**
   - Authentication gate for `/explore`, `/onboarding`, `/recommendations`, and `/dashboard`.
   - Seamless transition from auth to profile to AI recommendations.

7. **Comparative Portfolio Breakdown UI**
   - Allocation bars, risk badges, expected return, and AI confidence per option.
   - Helps users understand why each recommendation exists.

8. **Favorites / Watchlist for Investment Categories**
   - Users can save categories (Index Funds, REITs, Crypto, etc.) to a persistent local watchlist.
   - Makes research and revisits faster across sessions.

9. **Side-by-Side Category Comparison**
   - Select up to two categories and compare risk, liquidity, horizon, pros/cons, and context.
   - Available via dedicated comparison view in Explore.

10. **Personalized Report Export (PDF-ready)**
   - Recommendations page supports one-click export via print-to-PDF flow.
   - Includes profile snapshot, projection summary, and recommendation table.

## 🧠 Next Implementation

### Risk Scorer (Implemented)

A dedicated risk scoring module now weights age, salary, and risk tolerance to produce:

- `risk_score` from 1-10
- `risk_band` (`low`, `moderate`, `high`, `very-high`)
- `multiplier_bias` that adjusts allocation aggressiveness

Location:

- `backend/services/risk_scorer.py`

Used by:

- `backend/routes/recommendation.py` in `/api/recommend` and `/api/recommendations`

### Suggested Next Tasks

1. Persist users and profiles in a database (SQLite/PostgreSQL).
2. Add historical market data backtests for recommendation confidence.
3. Add portfolio drift detection + rebalancing notifications.
4. Add country-aware tax and currency logic.

## ⚠️ Disclaimer

WealthFlow AI is an educational tool. Investment involves risk. AI-generated outputs are probabilistic and may rely on historical patterns that can change. Always consult a certified financial planner (CFP) before committing large sums of capital.
=======
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
