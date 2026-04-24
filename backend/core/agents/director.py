"""
Director Agent: Synthesis & Execution
Synthesizes data into final execution strategy with actionable recommendations
"""

from typing import List, Dict, Any
from datetime import datetime, timedelta

class DirectorAgent:
    def __init__(self):
        self.execution_platforms = {
            'stocks': {
                'platforms': [
                    {'name': 'Fidelity', 'url': 'fidelity.com', 'fees': '$0 per trade', 'min_investment': '$1'},
                    {'name': 'Charles Schwab', 'url': 'schwab.com', 'fees': '$0 per trade', 'min_investment': '$1'},
                    {'name': 'Robinhood', 'url': 'robinhood.com', 'fees': '$0 per trade', 'min_investment': '$1'}
                ]
            },
            'etfs': {
                'platforms': [
                    {'name': 'Vanguard', 'url': 'vanguard.com', 'fees': '$0 per trade', 'min_investment': '$1'},
                    {'name': 'Fidelity', 'url': 'fidelity.com', 'fees': '$0 per trade', 'min_investment': '$1'},
                    {'name': 'Charles Schwab', 'url': 'schwab.com', 'fees': '$0 per trade', 'min_investment': '$1'}
                ]
            },
            'bonds': {
                'platforms': [
                    {'name': 'TreasuryDirect', 'url': 'treasurydirect.gov', 'fees': '$0', 'min_investment': '$100'},
                    {'name': 'Fidelity', 'url': 'fidelity.com', 'fees': '$1 per bond', 'min_investment': '$1,000'},
                    {'name': 'Vanguard', 'url': 'vanguard.com', 'fees': '$1 per bond', 'min_investment': '$1,000'}
                ]
            },
            'reits': {
                'platforms': [
                    {'name': 'Fidelity', 'url': 'fidelity.com', 'fees': '$0 per trade', 'min_investment': '$1'},
                    {'name': 'Vanguard', 'url': 'vanguard.com', 'fees': '$0 per trade', 'min_investment': '$1'},
                    {'name': 'RealtyMogul', 'url': 'realtymogul.com', 'fees': '1-2% annually', 'min_investment': '$5,000'}
                ]
            },
            'crypto': {
                'platforms': [
                    {'name': 'Coinbase', 'url': 'coinbase.com', 'fees': '0.5-1.5%', 'min_investment': '$2'},
                    {'name': 'Binance', 'url': 'binance.com', 'fees': '0.1-0.6%', 'min_investment': '$10'},
                    {'name': 'Kraken', 'url': 'kraken.com', 'fees': '0.16-0.26%', 'min_investment': '$10'}
                ]
            },
            'commodities': {
                'platforms': [
                    {'name': 'Fidelity', 'url': 'fidelity.com', 'fees': '$0 per trade', 'min_investment': '$1'},
                    {'name': 'Charles Schwab', 'url': 'schwab.com', 'fees': '$0 per trade', 'min_investment': '$1'},
                    {'name': 'Interactive Brokers', 'url': 'interactivebrokers.com', 'fees': '$0.65 per contract', 'min_investment': '$100'}
                ]
            }
        }
        
        self.allocation_strategies = {
            'conservative': {
                'description': 'Focus on capital preservation with stable income',
                'target_return': '4-6%',
                'risk_level': 'low',
                'time_horizon': '1-5 years'
            },
            'balanced': {
                'description': 'Mix of growth and income with moderate risk',
                'target_return': '6-8%',
                'risk_level': 'moderate',
                'time_horizon': '5-10 years'
            },
            'growth': {
                'description': 'Emphasis on capital appreciation with higher risk',
                'target_return': '8-12%',
                'risk_level': 'high',
                'time_horizon': '10+ years'
            },
            'aggressive': {
                'description': 'Maximum growth potential with high volatility',
                'target_return': '12%+',
                'risk_level': 'very-high',
                'time_horizon': '10+ years'
            }
        }
    
    def synthesize_strategy(self, profile_analysis: Dict[str, Any], 
                          research_results: Dict[str, Any], 
                          risk_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """
        Synthesize all agent outputs into final investment strategy
        
        Args:
            profile_analysis: Results from Profiler Agent
            research_results: Results from Researcher Agent
            risk_analysis: Results from Critic Agent
            
        Returns:
            dict: Comprehensive investment strategy with execution plan
        """
        # Determine optimal allocation strategy
        allocation_strategy = self._determine_allocation_strategy(profile_analysis)
        
        # Create final asset allocation
        final_allocation = self._create_final_allocation(research_results, risk_analysis, profile_analysis)
        
        # Generate execution roadmap
        execution_roadmap = self._generate_execution_roadmap(final_allocation)
        
        # Create monitoring and rebalancing plan
        monitoring_plan = self._create_monitoring_plan(final_allocation, profile_analysis)
        
        # Generate performance projections
        projections = self._generate_projections(final_allocation, profile_analysis)
        
        # Create comparative matrix
        comparative_matrix = self._create_comparative_matrix(final_allocation, research_results)
        
        return {
            'executive_summary': self._generate_executive_summary(profile_analysis, allocation_strategy),
            'allocation_strategy': allocation_strategy,
            'final_allocation': final_allocation,
            'execution_roadmap': execution_roadmap,
            'monitoring_plan': monitoring_plan,
            'performance_projections': projections,
            'comparative_matrix': comparative_matrix,
            'next_steps': self._generate_next_steps(final_allocation),
            'confidence_score': self._calculate_confidence_score(research_results, risk_analysis),
            'alternative_strategies': self._generate_alternatives(profile_analysis, final_allocation)
        }
    
    def _determine_allocation_strategy(self, profile_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Determine optimal allocation strategy based on profile"""
        risk_band = profile_analysis['risk_band']
        strategy_bias = profile_analysis['strategy_bias']
        age = profile_analysis.get('age_factor', '')
        
        # Map risk band to strategy
        strategy_mapping = {
            'low': 'conservative',
            'moderate': 'balanced',
            'high': 'growth',
            'very-high': 'aggressive'
        }
        
        base_strategy = strategy_mapping.get(risk_band, 'balanced')
        strategy_details = self.allocation_strategies[base_strategy]
        
        # Adjust based on age factor
        if 'high_compounding' in age:
            strategy_details['target_return'] = str(int(strategy_details['target_return'].split('-')[0]) + 2) + '%+'
        
        return {
            'name': base_strategy,
            'details': strategy_details,
            'rationale': f'Selected based on {risk_band} risk profile and {strategy_bias} bias',
            'expected_volatility': self._estimate_volatility(base_strategy)
        }
    
    def _create_final_allocation(self, research_results: Dict[str, Any], 
                               risk_analysis: Dict[str, Any], 
                               profile_analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Create final asset allocation with risk adjustments"""
        assets = research_results['specific_assets']
        asset_risks = {asset['ticker']: asset for asset in risk_analysis['asset_risks']}
        
        final_allocation = []
        total_weight = 0
        
        for asset in assets:
            ticker = asset['ticker']
            risk_info = asset_risks.get(ticker, {})
            
            # Adjust allocation based on risk analysis
            base_weight = asset.get('allocation_weight', 0.1)
            risk_adjustment = self._calculate_risk_adjustment(risk_info, profile_analysis['risk_score'])
            final_weight = base_weight * risk_adjustment
            
            # Get execution platforms
            category = asset['category']
            platforms = self.execution_platforms.get(category, {}).get('platforms', [])
            
            final_allocation.append({
                'ticker': ticker,
                'category': category,
                'allocation_percentage': round(final_weight * 100, 1),
                'current_price': asset.get('current_price', 'N/A'),
                'risk_score': risk_info.get('overall_risk_score', 5),
                'risk_level': risk_info.get('risk_level', 'moderate'),
                'execution_platforms': platforms[:2],  # Top 2 platforms
                'investment_thesis': self._generate_investment_thesis(asset, risk_info),
                'expected_return': self._estimate_expected_return(category, risk_info),
                'confidence_level': self._calculate_asset_confidence(asset, risk_info)
            })
            
            total_weight += final_weight
        
        # Normalize to 100%
        if total_weight > 0:
            for asset in final_allocation:
                asset['allocation_percentage'] = round((asset['allocation_percentage'] / total_weight) * 100, 1)
        
        # Sort by allocation percentage (descending)
        final_allocation.sort(key=lambda x: x['allocation_percentage'], reverse=True)
        
        return final_allocation
    
    def _calculate_risk_adjustment(self, risk_info: Dict[str, Any], user_risk_score: int) -> float:
        """Calculate allocation adjustment based on risk analysis"""
        if not risk_info:
            return 1.0
        
        asset_risk = risk_info.get('overall_risk_score', 5)
        
        # Reduce allocation for high-risk assets if user is conservative
        if user_risk_score <= 3 and asset_risk >= 7:
            return 0.5
        # Increase allocation for appropriate risk levels
        elif abs(user_risk_score - asset_risk) <= 2:
            return 1.2
        # Neutral adjustment
        else:
            return 1.0
    
    def _generate_execution_roadmap(self, final_allocation: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate step-by-step execution plan"""
        phases = []
        
        # Phase 1: Core positions (largest allocations)
        core_assets = [asset for asset in final_allocation if asset['allocation_percentage'] >= 15]
        if core_assets:
            phases.append({
                'phase': 1,
                'name': 'Establish Core Positions',
                'description': 'Build foundation with largest allocations',
                'assets': [asset['ticker'] for asset in core_assets],
                'timeline': 'Week 1-2',
                'priority': 'high'
            })
        
        # Phase 2: Satellite positions (medium allocations)
        satellite_assets = [asset for asset in final_allocation if 5 <= asset['allocation_percentage'] < 15]
        if satellite_assets:
            phases.append({
                'phase': 2,
                'name': 'Add Satellite Positions',
                'description': 'Diversify with medium-sized positions',
                'assets': [asset['ticker'] for asset in satellite_assets],
                'timeline': 'Week 3-4',
                'priority': 'medium'
            })
        
        # Phase 3: Tactical positions (small allocations)
        tactical_assets = [asset for asset in final_allocation if asset['allocation_percentage'] < 5]
        if tactical_assets:
            phases.append({
                'phase': 3,
                'name': 'Implement Tactical Positions',
                'description': 'Add small tactical allocations',
                'assets': [asset['ticker'] for asset in tactical_assets],
                'timeline': 'Week 5-6',
                'priority': 'low'
            })
        
        return {
            'phases': phases,
            'total_timeline': '6 weeks',
            'execution_approach': 'Gradual implementation to manage market timing risk',
            'minimum_initial_investment': self._calculate_minimum_investment(final_allocation)
        }
    
    def _create_monitoring_plan(self, final_allocation: List[Dict[str, Any]], 
                              profile_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Create ongoing monitoring and rebalancing plan"""
        return {
            'review_frequency': self._determine_review_frequency(profile_analysis['risk_band']),
            'rebalancing_threshold': '5% deviation from target allocation',
            'performance_metrics': [
                'Total portfolio return vs benchmark',
                'Risk-adjusted returns (Sharpe ratio)',
                'Allocation drift monitoring',
                'Individual asset performance'
            ],
            'alert_conditions': [
                'Any asset deviates >10% from target allocation',
                'Portfolio volatility exceeds target by 20%',
                'Single asset loses >25% of value',
                'Major market regime changes detected'
            ],
            'quarterly_reviews': [
                'Asset performance assessment',
                'Risk tolerance re-evaluation',
                'Strategic objective alignment',
                'Rebalancing recommendations'
            ]
        }
    
    def _generate_projections(self, final_allocation: List[Dict[str, Any]], 
                            profile_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Generate performance projections for different scenarios"""
        # Calculate weighted expected return
        weighted_return = sum(
            asset['allocation_percentage'] * self._parse_return(asset['expected_return']) 
            for asset in final_allocation
        ) / 100
        
        # Calculate weighted risk
        weighted_risk = sum(
            asset['allocation_percentage'] * asset['risk_score'] 
            for asset in final_allocation
        ) / 100
        
        scenarios = {
            'base_case': {
                'description': 'Normal market conditions',
                'annual_return': f"{weighted_return:.1f}%",
                '5_year_projection': f"{self._calculate_projection(weighted_return, 5):,.0f}",
                '10_year_projection': f"{self._calculate_projection(weighted_return, 10):,.0f}"
            },
            'bull_market': {
                'description': 'Favorable market conditions (+20% vs base)',
                'annual_return': f"{weighted_return * 1.2:.1f}%",
                '5_year_projection': f"{self._calculate_projection(weighted_return * 1.2, 5):,.0f}",
                '10_year_projection': f"{self._calculate_projection(weighted_return * 1.2, 10):,.0f}"
            },
            'bear_market': {
                'description': 'Adverse market conditions (-30% vs base)',
                'annual_return': f"{weighted_return * 0.7:.1f}%",
                '5_year_projection': f"{self._calculate_projection(weighted_return * 0.7, 5):,.0f}",
                '10_year_projection': f"{self._calculate_projection(weighted_return * 0.7, 10):,.0f}"
            }
        }
        
        return {
            'scenarios': scenarios,
            'assumptions': [
                'Constant annual returns (ignores volatility)',
                'No additional contributions',
                'No taxes or transaction costs',
                'Rebalancing maintains target allocation'
            ],
            'risk_metrics': {
                'expected_volatility': f"{weighted_risk:.1f}%",
                'risk_adjusted_return': f"{weighted_return / max(weighted_risk, 1):.2f}",
                'maximum_drawdown_estimate': f"{weighted_risk * 2:.1f}%"
            }
        }
    
    def _create_comparative_matrix(self, final_allocation: List[Dict[str, Any]], 
                                research_results: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Create comparative matrix of investment options"""
        matrix = []
        
        for asset in final_allocation:
            matrix.append({
                'investment': f"{asset['ticker']} ({asset['category'].upper()})",
                'allocation': f"{asset['allocation_percentage']}%",
                'expected_return': asset['expected_return'],
                'risk_level': asset['risk_level'].title(),
                'liquidity': self._assess_liquidity(asset),
                'min_investment': self._get_min_investment(asset),
                'platform': asset['execution_platforms'][0]['name'] if asset['execution_platforms'] else 'Multiple',
                'execution_link': asset['execution_platforms'][0]['url'] if asset['execution_platforms'] else '#',
                'confidence': f"{asset['confidence_level']:.0f}%"
            })
        
        return matrix
    
    def _generate_executive_summary(self, profile_analysis: Dict[str, Any], 
                                  allocation_strategy: Dict[str, Any]) -> str:
        """Generate executive summary of investment strategy"""
        age_factor = profile_analysis.get('age_factor', 'moderate profile')
        risk_band = profile_analysis['risk_band']
        strategy_name = allocation_strategy['name']
        
        summary = f"Based on your {age_factor} and {risk_band} risk profile, "
        summary += f"we recommend a {strategy_name} investment strategy. "
        summary += f"This approach targets {allocation_strategy['details']['target_return']} returns "
        summary += f"with {allocation_strategy['details']['risk_level']} risk over a "
        summary += f"{allocation_strategy['details']['time_horizon']} time horizon. "
        summary += "The portfolio is diversified across multiple asset classes to balance risk and reward."
        
        return summary
    
    def _generate_next_steps(self, final_allocation: List[Dict[str, Any]]) -> List[str]:
        """Generate actionable next steps"""
        steps = [
            "Open investment accounts with recommended platforms",
            "Complete identity verification and account funding",
            "Execute Phase 1 core positions (largest allocations)",
            "Set up automatic dividend reinvestment",
            "Schedule quarterly portfolio reviews",
            "Establish monitoring alerts for major deviations"
        ]
        
        return steps
    
    def _calculate_confidence_score(self, research_results: Dict[str, Any], 
                                  risk_analysis: Dict[str, Any]) -> float:
        """Calculate overall confidence score in recommendations"""
        # Base confidence from research quality
        research_confidence = 0.8 if research_results.get('market_overview') else 0.6
        
        # Adjust based on risk analysis completeness
        risk_confidence = 0.9 if risk_analysis.get('stress_test_scenarios') else 0.7
        
        # Combine and scale to 0-100
        confidence = (research_confidence + risk_confidence) / 2 * 100
        
        return round(confidence, 0)
    
    def _generate_alternatives(self, profile_analysis: Dict[str, Any], 
                             final_allocation: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Generate alternative strategies for consideration"""
        alternatives = []
        
        # More conservative alternative
        if profile_analysis['risk_score'] > 3:
            alternatives.append({
                'name': 'More Conservative',
                'description': 'Reduce risk by increasing bond and cash allocation',
                'adjustment': 'Reduce equity exposure by 20%, increase bonds by 15%, cash by 5%',
                'impact': 'Lower expected returns by 2-3% but reduce volatility significantly'
            })
        
        # More aggressive alternative
        if profile_analysis['risk_score'] < 7:
            alternatives.append({
                'name': 'More Aggressive',
                'description': 'Increase growth potential with higher risk allocation',
                'adjustment': 'Increase equity exposure by 20%, reduce bonds by 15%, add 5% crypto',
                'impact': 'Higher expected returns by 3-4% but increase volatility significantly'
            })
        
        return alternatives
    
    # Helper methods
    def _estimate_volatility(self, strategy: str) -> str:
        """Estimate portfolio volatility for strategy"""
        volatility_map = {
            'conservative': '5-8%',
            'balanced': '8-12%',
            'growth': '12-18%',
            'aggressive': '18-25%'
        }
        return volatility_map.get(strategy, '10-15%')
    
    def _generate_investment_thesis(self, asset: Dict[str, Any], risk_info: Dict[str, Any]) -> str:
        """Generate investment thesis for asset"""
        category = asset['category']
        ticker = asset['ticker']
        
        theses = {
            'stocks': f"Direct equity exposure to {ticker} for company-specific growth potential",
            'etfs': f"Diversified exposure to {ticker} for market-matching returns with low costs",
            'bonds': f"Stable income and capital preservation through {ticker} bond holdings",
            'reits': f"Real estate exposure and income generation through {ticker} property investments",
            'crypto': f"High-risk/high-reward exposure to {ticker} for asymmetric upside potential",
            'commodities': f"Inflation hedging and diversification through {ticker} commodity exposure"
        }
        
        return theses.get(category, f"Strategic allocation to {ticker} for portfolio diversification")
    
    def _estimate_expected_return(self, category: str, risk_info: Dict[str, Any]) -> str:
        """Estimate expected return for asset category"""
        base_returns = {
            'stocks': '8-12%',
            'etfs': '6-10%',
            'bonds': '2-5%',
            'reits': '7-10%',
            'crypto': '15-30%',
            'commodities': '5-8%'
        }
        
        return base_returns.get(category, '6-8%')
    
    def _calculate_asset_confidence(self, asset: Dict[str, Any], risk_info: Dict[str, Any]) -> float:
        """Calculate confidence level in asset recommendation"""
        base_confidence = 80.0
        
        # Reduce confidence for high-risk assets
        if risk_info.get('overall_risk_score', 5) > 7:
            base_confidence -= 20
        elif risk_info.get('overall_risk_score', 5) > 5:
            base_confidence -= 10
        
        # Increase confidence for liquid assets
        if risk_info.get('risk_scores', {}).get('liquidity_risk', 5) < 3:
            base_confidence += 10
        
        return max(50, min(95, base_confidence))
    
    def _determine_review_frequency(self, risk_band: str) -> str:
        """Determine portfolio review frequency"""
        frequency_map = {
            'low': 'Semi-annual',
            'moderate': 'Quarterly',
            'high': 'Monthly',
            'very-high': 'Monthly'
        }
        return frequency_map.get(risk_band, 'Quarterly')
    
    def _calculate_minimum_investment(self, final_allocation: List[Dict[str, Any]]) -> str:
        """Calculate minimum initial investment needed"""
        # Simplified calculation - assumes $100 minimum per asset
        min_per_asset = 100
        total_minimum = len(final_allocation) * min_per_asset
        
        if total_minimum < 1000:
            return f"${total_minimum}"
        elif total_minimum < 5000:
            return f"${total_minimum:,}"
        else:
            return f"${total_minimum:,}"
    
    def _assess_liquidity(self, asset: Dict[str, Any]) -> str:
        """Assess liquidity of asset"""
        volume = asset.get('volume', 0)
        
        if volume == 'N/A' or volume == 0:
            return 'Low'
        elif volume > 1000000:
            return 'High'
        elif volume > 100000:
            return 'Medium'
        else:
            return 'Low'
    
    def _get_min_investment(self, asset: Dict[str, Any]) -> str:
        """Get minimum investment for asset"""
        platforms = asset.get('execution_platforms', [])
        if platforms:
            return platforms[0].get('min_investment', '$1')
        return '$1'
    
    def _parse_return(self, return_str: str) -> float:
        """Parse return string to float"""
        if '-' in return_str:
            # Use average of range
            parts = return_str.replace('%', '').split('-')
            return (float(parts[0]) + float(parts[1])) / 2
        else:
            return float(return_str.replace('%', '').replace('+', ''))
    
    def _calculate_projection(self, annual_return: float, years: int) -> float:
        """Calculate projection for given years (assuming $10,000 initial)"""
        initial = 10000
        return initial * ((1 + annual_return / 100) ** years)
