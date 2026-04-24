"""
Profiler Agent: Behavioral Analysis
Sets the risk/reward bounds based on user profile
"""

class ProfilerAgent:
    def __init__(self):
        self.risk_bounds = {
            'conservative': {'min_age': 45, 'max_risk': 3},
            'moderate': {'min_age': 30, 'max_risk': 6},
            'aggressive': {'min_age': 18, 'max_risk': 10}
        }
    
    def analyze_profile(self, age, salary, risk_tolerance='moderate'):
        """
        Analyzes user profile to determine risk bounds and investment strategy
        
        Args:
            age (int): User's age
            salary (int): Annual salary
            risk_tolerance (str): User's risk preference
            
        Returns:
            dict: Profile analysis with risk bounds and strategy
        """
        # Determine risk band based on age and salary
        risk_score = self._calculate_risk_score(age, salary, risk_tolerance)
        risk_band = self._get_risk_band(risk_score)
        
        # Calculate safe vs aggressive ratio
        safe_aggressive_ratio = self._calculate_allocation_ratio(age, risk_score)
        
        # Determine investment horizon
        horizon = self._determine_horizon(age)
        
        return {
            'risk_score': risk_score,
            'risk_band': risk_band,
            'safe_aggressive_ratio': safe_aggressive_ratio,
            'investment_horizon': horizon,
            'max_allocation_risk': risk_score,
            'strategy_bias': self._get_strategy_bias(risk_band),
            'age_factor': self._get_age_factor(age),
            'salary_factor': self._get_salary_factor(salary)
        }
    
    def _calculate_risk_score(self, age, salary, risk_tolerance):
        """Calculate base risk score from profile"""
        base_score = 5  # Neutral starting point
        
        # Age factor (younger = higher risk capacity)
        if age < 30:
            age_factor = 2
        elif age < 40:
            age_factor = 1
        elif age < 50:
            age_factor = 0
        else:
            age_factor = -1
        
        # Salary factor (higher income = higher risk capacity)
        if salary > 150000:
            salary_factor = 1
        elif salary > 80000:
            salary_factor = 0
        else:
            salary_factor = -1
        
        # Risk tolerance factor
        tolerance_factors = {
            'conservative': -2,
            'moderate': 0,
            'aggressive': 2
        }
        
        risk_score = base_score + age_factor + salary_factor + tolerance_factors.get(risk_tolerance, 0)
        return max(1, min(10, risk_score))  # Clamp between 1-10
    
    def _get_risk_band(self, risk_score):
        """Convert risk score to risk band"""
        if risk_score <= 3:
            return 'low'
        elif risk_score <= 6:
            return 'moderate'
        elif risk_score <= 8:
            return 'high'
        else:
            return 'very-high'
    
    def _calculate_allocation_ratio(self, age, risk_score):
        """Calculate safe vs aggressive allocation ratio"""
        if age < 30:
            return {'safe': 0.3, 'aggressive': 0.7}
        elif age < 45:
            return {'safe': 0.5, 'aggressive': 0.5}
        elif age < 60:
            return {'safe': 0.7, 'aggressive': 0.3}
        else:
            return {'safe': 0.8, 'aggressive': 0.2}
    
    def _determine_horizon(self, age):
        """Determine investment horizon based on age"""
        if age < 30:
            return 'long-term (30+ years)'
        elif age < 45:
            return 'medium-term (15-25 years)'
        elif age < 60:
            return 'short-medium term (5-15 years)'
        else:
            return 'short-term (1-5 years)'
    
    def _get_strategy_bias(self, risk_band):
        """Get investment strategy bias based on risk band"""
        biases = {
            'low': 'capital_preservation',
            'moderate': 'balanced_growth',
            'high': 'growth_oriented',
            'very-high': 'aggressive_growth'
        }
        return biases.get(risk_band, 'balanced_growth')
    
    def _get_age_factor(self, age):
        """Get age-based investment factor"""
        if age < 30:
            return 'high_compounding_potential'
        elif age < 45:
            return 'moderate_compounding_potential'
        elif age < 60:
            return 'capital_preservation_focus'
        else:
            return 'income_generation_focus'
    
    def _get_salary_factor(self, salary):
        """Get salary-based investment factor"""
        if salary > 150000:
            return 'high_disposable_income'
        elif salary > 80000:
            return 'moderate_disposable_income'
        else:
            return 'limited_disposable_income'
