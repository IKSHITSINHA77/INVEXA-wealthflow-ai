"""
Critic Agent: Risk Assessment
Highlights the "bear case" and hidden risks for each investment
"""

from typing import List, Dict, Any

class CriticAgent:
    def __init__(self):
        self.risk_factors = {
            'market_risk': {
                'description': 'Systematic risk affecting entire markets',
                'severity': 'high',
                'mitigation': 'Diversification across asset classes'
            },
            'concentration_risk': {
                'description': 'Overexposure to single asset or sector',
                'severity': 'medium',
                'mitigation': 'Limit single positions to 5-10% of portfolio'
            },
            'liquidity_risk': {
                'description': 'Difficulty selling assets without price impact',
                'severity': 'medium',
                'mitigation': 'Focus on high-volume securities'
            },
            'inflation_risk': {
                'description': 'Purchasing power erosion over time',
                'severity': 'medium',
                'mitigation': 'Include inflation-protected assets'
            },
            'interest_rate_risk': {
                'description': 'Bond price sensitivity to rate changes',
                'severity': 'medium',
                'mitigation': 'Laddering bond maturities'
            },
            'currency_risk': {
                'description': 'Foreign exchange rate fluctuations',
                'severity': 'low-medium',
                'mitigation': 'Currency hedging strategies'
            }
        }
        
        self.asset_specific_risks = {
            'stocks': [
                'Company-specific operational risks',
                'Earnings volatility',
                'Management changes',
                'Competitive pressure',
                'Regulatory changes'
            ],
            'etfs': [
                'Tracking error to index',
                'Expense ratio drag',
                'Creation/redemption costs',
                'Concentration in top holdings'
            ],
            'bonds': [
                'Credit risk of issuer',
                'Interest rate sensitivity',
                'Inflation erosion',
                'Default risk'
            ],
            'reits': [
                'Real estate market cycles',
                'Interest rate sensitivity',
                'Tenant default risk',
                'Property-specific risks'
            ],
            'crypto': [
                'Extreme volatility',
                'Regulatory uncertainty',
                'Security/hacking risks',
                'Limited adoption',
                'Market manipulation'
            ],
            'commodities': [
                'Supply/demand imbalances',
                'Geopolitical factors',
                'Weather impacts',
                'Storage costs'
            ]
        }
    
    def analyze_risks(self, research_results: Dict[str, Any], profile_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze risks for recommended investments
        
        Args:
            research_results: Results from Researcher Agent
            profile_analysis: Results from Profiler Agent
            
        Returns:
            dict: Comprehensive risk analysis
        """
        risk_score = profile_analysis['risk_score']
        risk_tolerance = profile_analysis['risk_band']
        
        # Analyze each recommended asset
        asset_risk_analysis = []
        for asset in research_results['specific_assets']:
            risk_analysis = self._analyze_asset_risk(asset, risk_score)
            asset_risk_analysis.append(risk_analysis)
        
        # Portfolio-level risk assessment
        portfolio_risks = self._assess_portfolio_risks(asset_risk_analysis, research_results)
        
        # Generate risk mitigation strategies
        mitigation_strategies = self._generate_mitigation_strategies(portfolio_risks, risk_tolerance)
        
        # Create risk scoring matrix
        risk_matrix = self._create_risk_matrix(asset_risk_analysis)
        
        return {
            'asset_risks': asset_risk_analysis,
            'portfolio_risks': portfolio_risks,
            'mitigation_strategies': mitigation_strategies,
            'risk_matrix': risk_matrix,
            'overall_risk_assessment': self._generate_overall_assessment(portfolio_risks, risk_score),
            'stress_test_scenarios': self._generate_stress_tests(asset_risk_analysis)
        }
    
    def _analyze_asset_risk(self, asset: Dict[str, Any], user_risk_score: int) -> Dict[str, Any]:
        """Analyze risks for individual asset"""
        category = asset['category']
        ticker = asset['ticker']
        
        # Get category-specific risks
        category_risks = self.asset_specific_risks.get(category, [])
        
        # Calculate risk scores for different factors
        risk_scores = {
            'volatility_risk': self._calculate_volatility_risk(category, user_risk_score),
            'concentration_risk': self._calculate_concentration_risk(asset),
            'liquidity_risk': self._calculate_liquidity_risk(asset),
            'market_risk': self._calculate_market_risk(category),
            'specific_risk': self._calculate_specific_risk(category)
        }
        
        # Generate specific warnings
        warnings = self._generate_warnings(category, ticker, risk_scores)
        
        # Calculate overall asset risk score
        overall_risk = sum(risk_scores.values()) / len(risk_scores)
        
        return {
            'ticker': ticker,
            'category': category,
            'risk_scores': risk_scores,
            'overall_risk_score': overall_risk,
            'specific_risks': category_risks,
            'warnings': warnings,
            'risk_level': self._categorize_risk_level(overall_risk),
            'bear_case_scenario': self._generate_bear_case(category, ticker)
        }
    
    def _calculate_volatility_risk(self, category: str, user_risk_score: int) -> float:
        """Calculate volatility risk score"""
        volatility_benchmarks = {
            'bonds': 2.0,
            'etfs': 4.0,
            'stocks': 6.0,
            'reits': 5.0,
            'commodities': 7.0,
            'crypto': 9.0
        }
        
        asset_volatility = volatility_benchmarks.get(category, 5.0)
        
        # Adjust based on user risk tolerance
        if user_risk_score >= 7:
            return max(1.0, asset_volatility - 2)
        elif user_risk_score <= 3:
            return min(10.0, asset_volatility + 2)
        
        return asset_volatility
    
    def _calculate_concentration_risk(self, asset: Dict[str, Any]) -> float:
        """Calculate concentration risk based on allocation weight"""
        weight = asset.get('allocation_weight', 0.1)
        
        if weight > 0.3:
            return 8.0
        elif weight > 0.2:
            return 5.0
        elif weight > 0.1:
            return 3.0
        else:
            return 1.0
    
    def _calculate_liquidity_risk(self, asset: Dict[str, Any]) -> float:
        """Calculate liquidity risk based on volume data"""
        volume = asset.get('volume', 0)
        
        if volume == 'N/A' or volume == 0:
            return 7.0
        elif volume > 1000000:
            return 1.0
        elif volume > 100000:
            return 3.0
        else:
            return 5.0
    
    def _calculate_market_risk(self, category: str) -> float:
        """Calculate market risk for asset category"""
        market_risk_levels = {
            'bonds': 3.0,
            'etfs': 4.0,
            'stocks': 6.0,
            'reits': 6.0,
            'commodities': 7.0,
            'crypto': 9.0
        }
        
        return market_risk_levels.get(category, 5.0)
    
    def _calculate_specific_risk(self, category: str) -> float:
        """Calculate asset-specific risk"""
        specific_risk_levels = {
            'bonds': 4.0,  # Credit risk
            'etfs': 2.0,   # Lower due to diversification
            'stocks': 7.0,  # Company-specific risk
            'reits': 6.0,  # Property-specific risk
            'commodities': 5.0,  # Supply/demand risk
            'crypto': 8.0  # Technology/regulatory risk
        }
        
        return specific_risk_levels.get(category, 5.0)
    
    def _generate_warnings(self, category: str, ticker: str, risk_scores: Dict[str, float]) -> List[str]:
        """Generate specific warnings for asset"""
        warnings = []
        
        # High volatility warning
        if risk_scores['volatility_risk'] > 7:
            warnings.append(f'High volatility - expect large price swings')
        
        # Concentration warning
        if risk_scores['concentration_risk'] > 6:
            warnings.append('High concentration - consider position sizing')
        
        # Liquidity warning
        if risk_scores['liquidity_risk'] > 6:
            warnings.append('Low liquidity - may be difficult to sell quickly')
        
        # Category-specific warnings
        if category == 'crypto':
            warnings.append('Cryptocurrency risks: regulatory uncertainty, security concerns')
        elif category == 'reits':
            warnings.append('REIT risks: interest rate sensitivity, real estate cycles')
        elif category == 'stocks':
            warnings.append('Equity risks: company-specific factors, market volatility')
        
        return warnings
    
    def _categorize_risk_level(self, risk_score: float) -> str:
        """Categorize risk level based on score"""
        if risk_score <= 3:
            return 'low'
        elif risk_score <= 5:
            return 'moderate'
        elif risk_score <= 7:
            return 'high'
        else:
            return 'very-high'
    
    def _generate_bear_case(self, category: str, ticker: str) -> str:
        """Generate bear case scenario for asset"""
        bear_cases = {
            'stocks': f'{ticker} could decline 30-50% in recession due to earnings compression and multiple contraction',
            'etfs': f'{ticker} could fall 20-40% during market corrections, tracking broader market declines',
            'bonds': f'{ticker} may lose 10-20% if interest rates rise sharply, causing price declines',
            'reits': f'{ticker} could drop 25-40% in rising rate environment due to financing costs and valuation compression',
            'crypto': f'{ticker} could decline 60-80% in crypto winter or regulatory crackdown',
            'commodities': f'{ticker} may fall 30-50% in global recession due to demand destruction'
        }
        
        return bear_cases.get(category, f'{ticker} faces significant downside risk in adverse market conditions')
    
    def _assess_portfolio_risks(self, asset_risks: List[Dict[str, Any]], research_results: Dict[str, Any]) -> Dict[str, Any]:
        """Assess portfolio-level risks"""
        # Calculate portfolio concentration
        categories = [asset['category'] for asset in research_results['specific_assets']]
        category_diversification = len(set(categories))
        
        # Calculate average risk scores
        avg_volatility = sum(asset['risk_scores']['volatility_risk'] for asset in asset_risks) / len(asset_risks)
        avg_concentration = sum(asset['risk_scores']['concentration_risk'] for asset in asset_risks) / len(asset_risks)
        
        # Identify risk concentrations
        risk_concentrations = self._identify_risk_concentrations(asset_risks)
        
        return {
            'diversification_score': min(10, category_diversification * 2),
            'average_volatility_risk': avg_volatility,
            'average_concentration_risk': avg_concentration,
            'risk_concentrations': risk_concentrations,
            'correlation_risk': self._assess_correlation_risk(categories),
            'systemic_exposure': self._assess_systemic_exposure(asset_risks)
        }
    
    def _identify_risk_concentrations(self, asset_risks: List[Dict[str, Any]]) -> List[str]:
        """Identify areas of risk concentration"""
        concentrations = []
        
        # Check for high volatility concentration
        high_vol_assets = [asset for asset in asset_risks if asset['risk_scores']['volatility_risk'] > 7]
        if len(high_vol_assets) > 2:
            concentrations.append('High concentration in volatile assets')
        
        # Check for category concentration
        categories = [asset['category'] for asset in asset_risks]
        category_counts = {cat: categories.count(cat) for cat in set(categories)}
        for cat, count in category_counts.items():
            if count > 2:
                concentrations.append(f'High concentration in {cat} category')
        
        return concentrations
    
    def _assess_correlation_risk(self, categories: List[str]) -> float:
        """Assess correlation risk based on category diversity"""
        # Simplified correlation assessment
        if len(set(categories)) >= 4:
            return 2.0  # Low correlation risk
        elif len(set(categories)) >= 2:
            return 5.0  # Moderate correlation risk
        else:
            return 8.0  # High correlation risk
    
    def _assess_systemic_exposure(self, asset_risks: List[Dict[str, Any]]) -> float:
        """Assess exposure to systemic market risks"""
        # Calculate weighted average market risk
        total_weight = sum(asset.get('allocation_weight', 1) for asset in asset_risks)
        weighted_market_risk = sum(
            asset['risk_scores']['market_risk'] * asset.get('allocation_weight', 1) 
            for asset in asset_risks
        ) / total_weight if total_weight > 0 else 5.0
        
        return weighted_market_risk
    
    def _generate_mitigation_strategies(self, portfolio_risks: Dict[str, Any], risk_tolerance: str) -> List[str]:
        """Generate risk mitigation strategies"""
        strategies = []
        
        # Diversification strategies
        if portfolio_risks['diversification_score'] < 6:
            strategies.append('Increase diversification across asset classes')
            strategies.append('Consider adding international exposure')
        
        # Volatility mitigation
        if portfolio_risks['average_volatility_risk'] > 6:
            strategies.append('Reduce exposure to high-volatility assets')
            strategies.append('Consider adding defensive positions')
        
        # Concentration mitigation
        if portfolio_risks['average_concentration_risk'] > 5:
            strategies.append('Limit single asset positions to 5-10% of portfolio')
            strategies.append('Rebalance to maintain target allocations')
        
        # Risk tolerance specific strategies
        if risk_tolerance == 'low':
            strategies.append('Focus on capital preservation with high-quality bonds')
            strategies.append('Maintain larger cash position for flexibility')
        elif risk_tolerance == 'very-high':
            strategies.append('Consider stop-loss orders to limit downside')
            strategies.append('Maintain core stable positions to support risk assets')
        
        return strategies
    
    def _create_risk_matrix(self, asset_risks: List[Dict[str, Any]]) -> Dict[str, List[str]]:
        """Create risk matrix categorizing assets by risk level"""
        matrix = {
            'low_risk': [],
            'moderate_risk': [],
            'high_risk': [],
            'very_high_risk': []
        }
        
        for asset in asset_risks:
            risk_level = asset['risk_level']
            matrix[f'{risk_level}_risk'].append(asset['ticker'])
        
        return matrix
    
    def _generate_overall_assessment(self, portfolio_risks: Dict[str, Any], user_risk_score: int) -> str:
        """Generate overall risk assessment"""
        diversification = portfolio_risks['diversification_score']
        volatility = portfolio_risks['average_volatility_risk']
        
        if diversification >= 7 and volatility <= 5:
            return 'Well-diversified portfolio with appropriate risk levels for your profile'
        elif diversification >= 5 and volatility <= 7:
            return 'Moderately diversified portfolio with manageable risk levels'
        elif diversification < 5 or volatility > 7:
            return 'Portfolio shows concentration risks and high volatility - consider rebalancing'
        else:
            return 'Portfolio requires significant risk management improvements'
    
    def _generate_stress_tests(self, asset_risks: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate stress test scenarios"""
        scenarios = {
            'market_crash': {
                'description': '30% market decline similar to 2008',
                'estimated_portfolio_impact': '-25% to -40%',
                'most_vulnerable_assets': [asset['ticker'] for asset in asset_risks if asset['risk_scores']['volatility_risk'] > 7]
            },
            'interest_rate_shock': {
                'description': '2% rapid interest rate increase',
                'estimated_portfolio_impact': '-10% to -20%',
                'most_vulnerable_assets': [asset['ticker'] for asset in asset_risks if asset['category'] in ['bonds', 'reits']]
            },
            'inflation_spike': {
                'description': 'Inflation rises to 8%',
                'estimated_portfolio_impact': '-5% to -15%',
                'most_vulnerable_assets': [asset['ticker'] for asset in asset_risks if asset['category'] in ['bonds']]
            }
        }
        
        return scenarios
