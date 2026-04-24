from flask import Blueprint, request, jsonify
from routes.auth import users
from services.risk_scorer import score_risk_profile
from core.orchestrator import AgenticOrchestrator

recommendation = Blueprint('recommendation', __name__)

@recommendation.route('/profile', methods=['POST'])
def save_profile():
    data = request.json
    email = request.headers.get('Authorization', '').replace('Bearer ', '')
    
    for user in users:
        if user.get('token') == email or user['email'] == email:
            user['age'] = data.get('age')
            user['salary'] = data.get('salary')
            user['riskTolerance'] = data.get('riskTolerance')
            user['investmentGoal'] = data.get('investmentGoal')
            return jsonify({"msg": "Profile updated"})
    
    return jsonify({"msg": "User not found"}), 404

@recommendation.route('/recommendations', methods=['GET'])
def get_recommendations():
    auth_header = request.headers.get('Authorization', '')
    email = auth_header.replace('Bearer ', '')
    
    user = None
    for u in users:
        if u['email'] == email or u.get('token') == email:
            user = u
            break
    
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    age = int(user.get('age', 30))
    salary = int(user.get('salary', 50000))
    risk = user.get('riskTolerance', 'moderate')
    risk_score = score_risk_profile(age, salary, risk)
    
    # AI logic for personalized recommendations
    recommendations = generate_ai_recommendations(age, salary, risk)
    
    return jsonify({
        "profile": {
            "age": age,
            "salary": salary,
            "riskTolerance": risk,
            "riskScore": risk_score["risk_score"],
            "riskBand": risk_score["risk_band"],
            "investmentGoal": user.get('investmentGoal', '')
        },
        "recommendations": recommendations
    })

@recommendation.route('/recommend', methods=['POST'])
def get_recommendation():
    """Get agentic investment recommendations"""
    data = request.json
    age = data.get('age', 30)
    salary = data.get('salary', 50000)
    risk_tolerance = data.get('riskTolerance', 'moderate')
    investment_goal = data.get('investmentGoal', 'growth')
    
    # Initialize agentic orchestrator
    orchestrator = AgenticOrchestrator()
    
    # Process through 4-stage agentic pipeline
    try:
        results = orchestrator.process_investment_request(
            age=age,
            salary=salary,
            risk_tolerance=risk_tolerance,
            investment_goal=investment_goal
        )
        
        return jsonify({
            "success": True,
            "data": results
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "fallback": generate_ai_recommendations(age, salary, risk_tolerance)
        }), 500

def generate_ai_recommendations(age, salary, risk_tolerance):
    """AI logic to generate personalized investment recommendations"""
    risk_profile = score_risk_profile(age, salary, risk_tolerance)
    
    # Base allocation adjustments based on age
    if age < 30:
        stock_weight = 70
        bond_weight = 20
        cash_weight = 10
    elif age < 45:
        stock_weight = 60
        bond_weight = 30
        cash_weight = 10
    elif age < 60:
        stock_weight = 50
        bond_weight = 40
        cash_weight = 10
    else:
        stock_weight = 40
        bond_weight = 50
        cash_weight = 10
    
    # Adjust based on risk tolerance
    risk_multiplier = {
        'conservative': 0.7,
        'moderate': 1.0,
        'aggressive': 1.3,
        'speculative': 1.5
    }
    
    # Blend explicit user risk preference with the derived profile score.
    multiplier = risk_multiplier.get(risk_tolerance, 1.0) + risk_profile["multiplier_bias"]
    stock_weight = min(90, int(stock_weight * multiplier))
    bond_weight = max(5, int(bond_weight * (2 - multiplier) * 0.5))
    
    # Generate recommendations
    recommendations = []
    
    # Stocks allocation breakdown
    if stock_weight > 0:
        recommendations.append({
            "category": "US Stocks",
            "name": "S&P 500 Index Fund",
            "allocation": int(stock_weight * 0.5),
            "risk": "medium" if risk_tolerance in ['moderate', 'conservative'] else "high",
            "expectedReturn": "8-12",
            "confidence": 92,
            "description": "Diversified exposure to 500 largest US companies. Low fees with historical 10% annual returns.",
            "icon": "📈"
        })
        
        if risk_tolerance in ['aggressive', 'speculative']:
            recommendations.append({
                "category": "Tech Growth",
                "name": "Nasdaq 100 ETF",
                "allocation": int(stock_weight * 0.3),
                "risk": "high",
                "expectedReturn": "12-18",
                "confidence": 78,
                "description": "High-growth technology stocks with higher volatility but strong growth potential.",
                "icon": "💻"
            })
        
        if salary > 80000 and age < 50:
            recommendations.append({
                "category": "International",
                "name": "Emerging Markets Fund",
                "allocation": int(stock_weight * 0.2),
                "risk": "high" if risk_tolerance == 'speculative' else "medium",
                "expectedReturn": "10-15",
                "confidence": 72,
                "description": "Exposure to growing economies like India, China, and Brazil for diversification.",
                "icon": "🌍"
            })
    
    # Bonds
    if bond_weight > 0:
        recommendations.append({
            "category": "Bonds",
            "name": "Total Bond Market",
            "allocation": bond_weight,
            "risk": "low",
            "expectedReturn": "3-5",
            "confidence": 88,
            "description": "Stable income through diversified government and corporate bonds.",
            "icon": "📋"
        })
    
    # Alternative investments based on income
    if salary > 100000 and risk_tolerance in ['aggressive', 'speculative']:
        recommendations.append({
            "category": "Real Estate",
            "name": "REIT Index Fund",
            "allocation": 10,
            "risk": "medium",
            "expectedReturn": "7-10",
            "confidence": 80,
            "description": "Real estate exposure without buying property. Good dividend income potential.",
            "icon": "🏢"
        })
    
    if risk_tolerance == 'speculative' and age < 40:
        recommendations.append({
            "category": "Crypto",
            "name": "Bitcoin & Ethereum ETF",
            "allocation": 5,
            "risk": "very-high",
            "expectedReturn": "-30 to +100",
            "confidence": 45,
            "description": "High-risk digital assets. Only invest what you can afford to lose completely.",
            "icon": "₿"
        })
    
    # Cash/Emergency Fund for everyone
    recommendations.append({
        "category": "Cash",
        "name": "High-Yield Savings",
        "allocation": max(5, cash_weight),
        "risk": "low",
        "expectedReturn": "4-5",
        "confidence": 98,
        "description": "Emergency fund and short-term savings. Keep 3-6 months of expenses here.",
        "icon": "💵"
    })
    
    return recommendations