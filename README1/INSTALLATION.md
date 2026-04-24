# 🚀 WealthFlow AI Installation Guide

## Overview

This comprehensive installation guide will help you set up WealthFlow AI from scratch. The application consists of a Flask backend with AI agents and a React frontend with modern visualizations.

## 📋 Prerequisites

### System Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Python**: 3.10 or higher
- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher
- **Git**: For version control

### Optional Dependencies
- **Redis**: For caching (recommended for production)
- **Docker**: For containerized deployment
- **PostgreSQL**: For persistent storage (production)

## 🔧 Quick Installation

### 1. Clone Repository
```bash
git clone https://github.com/your-username/wealthflow-ai.git
cd wealthflow-ai
```

### 2. Backend Setup
```bash
# Create virtual environment
python -m venv backend/venv

# Activate virtual environment
# Windows:
backend/venv/Scripts/activate
# macOS/Linux:
source backend/venv/bin/activate

# Install Python dependencies
cd backend
pip install -r requirements.txt

# Create environment file
cp ../deployment/.env.example .env
```

### 3. Frontend Setup
```bash
# Install Node.js dependencies
cd frontend
npm install

# Return to root directory
cd ..
```

### 4. Environment Configuration
Edit `backend/.env` with your configuration:
```env
# AI/LLM Configuration
AI_API_KEY=your_openai_api_key_here
AI_MODEL=gpt-4

# Financial Data APIs
FINANCE_API_KEY=your_yahoo_finance_key_here

# Application Configuration
FLASK_ENV=development
DEBUG=True
SECRET_KEY=your_secret_key_here

# Database Configuration
DATABASE_URL=sqlite:///wealthflow.db
REDIS_URL=redis://localhost:6379/0
```

### 5. Run Application
```bash
# Terminal 1: Start Backend
cd backend
python app.py

# Terminal 2: Start Frontend
cd frontend
npm run dev
```

Access the application:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📦 Detailed Installation

### Backend Setup

#### Python Environment
```bash
# Verify Python version
python --version

# Create virtual environment
python -m venv backend/venv

# Activate virtual environment
# Windows:
backend/venv/Scripts/activate
# macOS/Linux:
source backend/venv/bin/activate

# Upgrade pip
pip install --upgrade pip
```

#### Install Dependencies
```bash
cd backend

# Install from requirements.txt
pip install -r requirements.txt

# Verify installation
pip list
```

#### Database Setup
```bash
# For development (SQLite)
# No additional setup required

# For production (PostgreSQL)
# Install PostgreSQL and create database:
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres createdb wealthflow

# Install PostgreSQL Python adapter
pip install psycopg2-binary
```

#### Redis Setup (Optional)
```bash
# Ubuntu/Debian
sudo apt-get install redis-server

# macOS
brew install redis

# Start Redis
redis-server

# Test Redis connection
redis-cli ping
```

### Frontend Setup

#### Node.js Environment
```bash
# Verify Node.js version
node --version
npm --version

# Install dependencies
cd frontend
npm install

# Verify installation
npm list --depth=0
```

#### Environment Configuration
```bash
# Create environment file
cp .env.example .env.local

# Edit .env.local with your configuration
```

## 🐳 Docker Installation

### Using Docker Compose (Recommended)
```bash
# Clone repository
git clone https://github.com/your-username/wealthflow-ai.git
cd wealthflow-ai

# Create environment file
cp deployment/.env.example backend/.env

# Run with Docker Compose
docker-compose up --build

# Access application
# Frontend: http://localhost:80
# Backend: http://localhost:5000
```

### Manual Docker Build
```bash
# Build backend image
cd deployment
docker build -t wealthflow-backend .

# Build frontend image
cd ../frontend
docker build -t wealthflow-frontend .

# Run containers
docker run -d -p 5000:5000 --name backend wealthflow-backend
docker run -d -p 80:80 --name frontend wealthflow-frontend
```

## 🔑 API Keys Setup

### OpenAI API (Optional)
```bash
# Get API key from https://platform.openai.com/
export OPENAI_API_KEY="your_openai_api_key"

# Add to .env file
echo "AI_API_KEY=your_openai_api_key" >> backend/.env
```

### Yahoo Finance API
```bash
# Yahoo Finance API is free for basic usage
# No API key required for basic functionality

# For premium features, get key from https://finance.yahoo.com/
echo "FINANCE_API_KEY=your_yahoo_finance_key" >> backend/.env
```

## 🧪 Verification

### Backend Verification
```bash
# Test backend health
curl http://localhost:5000/health

# Test API endpoint
curl -X POST http://localhost:5000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"age":30,"salary":75000,"riskTolerance":"moderate"}'
```

### Frontend Verification
```bash
# Check frontend is running
curl http://localhost:5173

# Open in browser
# Navigate to http://localhost:5173
```

### Full Integration Test
```bash
# Register user
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login user
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🛠️ Development Setup

### VS Code Configuration
Create `.vscode/settings.json`:
```json
{
  "python.defaultInterpreterPath": "./backend/venv/bin/python",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Pre-commit Hooks
```bash
# Install pre-commit hooks
pip install pre-commit

# Create .pre-commit-config.yaml
pre-commit install
```

### Testing Setup
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 🔧 Troubleshooting

### Common Issues

#### Backend Issues
**Issue**: ModuleNotFoundError
```bash
# Solution: Ensure virtual environment is activated
source backend/venv/bin/activate
pip install -r requirements.txt
```

**Issue**: Port already in use
```bash
# Solution: Kill process on port 5000
lsof -ti:5000 | xargs kill -9
# or use different port
python app.py --port 5001
```

#### Frontend Issues
**Issue**: npm install fails
```bash
# Solution: Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Port already in use
```bash
# Solution: Use different port
npm run dev -- --port 3000
```

#### Docker Issues
**Issue**: Permission denied
```bash
# Solution: Add user to docker group
sudo usermod -aG docker $USER
# Log out and log back in
```

**Issue**: Container fails to start
```bash
# Solution: Check logs
docker-compose logs backend
docker-compose logs frontend
```

### Performance Issues

#### Slow API Response
```bash
# Check Redis connection
redis-cli ping

# Monitor system resources
htop
```

#### Frontend Build Issues
```bash
# Clear build cache
rm -rf dist
npm run build
```

## 📚 Additional Resources

### Documentation
- [API Reference](./API_REFERENCE.md)
- [Architecture Guide](./architecture.md)
- [Development Guide](./development.md)

### Community Support
- [GitHub Issues](https://github.com/your-username/wealthflow-ai/issues)
- [Discord Community](https://discord.gg/wealthflow)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/wealthflow-ai)

### Video Tutorials
- [Installation Tutorial](https://youtube.com/watch?v=installation-video)
- [Development Setup](https://youtube.com/watch?v=dev-setup-video)
- [Docker Deployment](https://youtube.com/watch?v=docker-video)

## 🚀 Production Deployment

### Environment Preparation
```bash
# Set production environment
export FLASK_ENV=production
export DEBUG=False

# Use production database
export DATABASE_URL=postgresql://user:pass@localhost/wealthflow

# Configure SSL
export SSL_CERT_PATH=/path/to/cert.pem
export SSL_KEY_PATH=/path/to/key.pem
```

### Security Configuration
```bash
# Generate secure secret key
python -c "import secrets; print(secrets.token_hex(32))"

# Configure firewall
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### Monitoring Setup
```bash
# Install monitoring tools
pip install sentry-sdk

# Configure logging
export LOG_LEVEL=INFO
export SENTRY_DSN=your_sentry_dsn
```

---

## 📞 Installation Support

If you encounter any issues during installation:

1. **Check the troubleshooting section** above
2. **Search existing GitHub issues** for similar problems
3. **Create a new issue** with detailed error information
4. **Join our Discord community** for real-time support

### Required Information for Support
- Operating system and version
- Python and Node.js versions
- Complete error messages
- Steps to reproduce the issue
- Configuration files (without sensitive data)

---

**🌊 Happy investing with WealthFlow AI!**
