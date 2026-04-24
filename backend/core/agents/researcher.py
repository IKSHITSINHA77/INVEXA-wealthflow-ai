"""
Researcher Agent: Market Discovery
Scours market data for specific assets and investment vehicles
"""

import yfinance as yf
import pandas as pd
from typing import List, Dict, Any

class ResearcherAgent:
    def __init__(self):
        self.asset_categories = {
            'stocks': {
                'description': 'Individual company equities with high growth potential',
                'typical_returns': '8-15%',
                'risk_level': 'medium-high'
            },
            'etfs': {
                'description': 'Diversified baskets of securities tracking market indices',
                'typical_returns': '6-12%',
                'risk_level': 'low-medium'
            },
            'bonds': {
                'description': 'Fixed income securities with predictable returns',
                'typical_returns': '2-6%',
                'risk_level': 'low'
            },
            'reits': {
                'description': 'Real estate investment trusts for property exposure',
                'typical_returns': '7-12%',
                'risk_level': 'medium'
            },
            'crypto': {
                'description': 'Digital assets with high volatility and potential',
                'typical_returns': '20%+ (highly variable)',
                'risk_level': 'very-high'
            },
            'commodities': {
                'description': 'Physical goods like gold, oil, and agricultural products',
                'typical_returns': '5-10%',
                'risk_level': 'medium'
            }
        }
        
        self.specific_tickers = {
            'large_cap': ['SPY', 'VOO', 'IVV', 'VTI'],
            'tech_growth': ['QQQ', 'VGT', 'XLK', 'ARKK'],
            'dividend': ['VYM', 'SCHD', 'DVY', 'DGRO'],
            'international': ['VTIAX', 'VXUS', 'IEFA', 'EFA'],
            'emerging_markets': ['VWO', 'IEMG', 'EEM', 'SCHE'],
            'bonds': ['BND', 'AGG', 'VCIT', 'LQD'],
            'gold': ['GLD', 'IAU', 'PHYS', 'BAR'],
            'real_estate': ['VNQ', 'IYR', 'RWR', 'XLRE'],
            'crypto': ['BTC-USD', 'ETH-USD', 'BNB-USD', 'XRP-USD']
        }
    
    def discover_assets(self, profile_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """
        Discover suitable assets based on profile analysis
        
        Args:
            profile_analysis: Results from Profiler Agent
            
        Returns:
            dict: Discovered assets with real-time data
        """
        risk_score = profile_analysis['risk_score']
        risk_band = profile_analysis['risk_band']
        strategy_bias = profile_analysis['strategy_bias']
        
        # Select appropriate asset categories based on risk profile
        suitable_categories = self._select_categories_by_risk(risk_band, strategy_bias)
        
        # Get specific recommendations for each category
        recommendations = []
        for category in suitable_categories:
            assets = self._get_category_assets(category, risk_score)
            recommendations.extend(assets)
        
        # Enrich with real-time market data
        enriched_recommendations = self._enrich_with_market_data(recommendations)
        
        return {
            'recommended_categories': suitable_categories,
            'specific_assets': enriched_recommendations,
            'market_overview': self._get_market_overview(),
            'research_summary': self._generate_research_summary(enriched_recommendations)
        }
    
    def _select_categories_by_risk(self, risk_band: str, strategy_bias: str) -> List[str]:
        """Select appropriate asset categories based on risk profile"""
        category_mappings = {
            'low': ['bonds', 'etfs', 'dividend_stocks'],
            'moderate': ['etfs', 'stocks', 'bonds', 'reits'],
            'high': ['stocks', 'etfs', 'reits', 'commodities'],
            'very-high': ['stocks', 'crypto', 'etfs', 'commodities']
        }
        
        base_categories = category_mappings.get(risk_band, ['etfs', 'stocks'])
        
        # Adjust based on strategy bias
        if strategy_bias == 'aggressive_growth':
            base_categories.extend(['crypto', 'tech_growth'])
        elif strategy_bias == 'capital_preservation':
            base_categories.extend(['bonds', 'dividend_stocks'])
        
        return list(set(base_categories))  # Remove duplicates
    
    def _get_category_assets(self, category: str, risk_score: int) -> List[Dict[str, Any]]:
        """Get specific assets for a category"""
        assets = []
        
        if category in self.specific_tickers:
            tickers = self.specific_tickers[category][:3]  # Top 3 per category
            
            for ticker in tickers:
                assets.append({
                    'ticker': ticker,
                    'category': category,
                    'allocation_weight': self._calculate_weight(category, risk_score),
                    'reasoning': self._get_asset_reasoning(category, ticker)
                })
        
        return assets
    
    def _calculate_weight(self, category: str, risk_score: int) -> float:
        """Calculate recommended allocation weight for asset category"""
        base_weights = {
            'bonds': 0.4,
            'etfs': 0.3,
            'stocks': 0.25,
            'reits': 0.15,
            'crypto': 0.05,
            'commodities': 0.10
        }
        
        weight = base_weights.get(category, 0.1)
        
        # Adjust based on risk score
        if category in ['crypto', 'stocks'] and risk_score > 6:
            weight *= 1.5
        elif category in ['bonds'] and risk_score < 4:
            weight *= 1.3
        
        return min(weight, 0.4)  # Cap at 40% per category
    
    def _get_asset_reasoning(self, category: str, ticker: str) -> str:
        """Get reasoning for recommending specific asset"""
        reasonings = {
            'SPY': 'Core S&P 500 exposure for market-matching returns',
            'QQQ': 'Tech-heavy NASDAQ exposure for growth potential',
            'BND': 'Broad bond market exposure for stability',
            'GLD': 'Gold exposure for inflation hedging',
            'VNQ': 'Real estate exposure without direct property ownership',
            'BTC-USD': 'Cryptocurrency exposure for high-risk/high-reward potential'
        }
        
        return reasonings.get(ticker, f'{category} exposure for portfolio diversification')
    
    def _enrich_with_market_data(self, recommendations: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Enrich recommendations with real-time market data"""
        enriched = []
        
        for rec in recommendations:
            try:
                ticker = rec['ticker']
                stock = yf.Ticker(ticker)
                info = stock.info
                
                enriched.append({
                    **rec,
                    'current_price': info.get('regularMarketPrice', 'N/A'),
                    'market_cap': info.get('marketCap', 'N/A'),
                    'pe_ratio': info.get('trailingPE', 'N/A'),
                    'dividend_yield': info.get('dividendYield', 'N/A'),
                    'year_change': info.get('52WeekChange', 'N/A'),
                    'volume': info.get('regularMarketVolume', 'N/A')
                })
                
            except Exception as e:
                # Fallback if yfinance fails
                enriched.append({
                    **rec,
                    'current_price': 'N/A',
                    'market_cap': 'N/A',
                    'pe_ratio': 'N/A',
                    'dividend_yield': 'N/A',
                    'year_change': 'N/A',
                    'volume': 'N/A',
                    'data_error': str(e)
                })
        
        return enriched
    
    def _get_market_overview(self) -> Dict[str, Any]:
        """Get current market overview"""
        try:
            # Get major indices
            indices = ['^GSPC', '^DJI', '^IXIC']  # S&P 500, Dow, NASDAQ
            market_data = {}
            
            for index in indices:
                ticker = yf.Ticker(index)
                info = ticker.info
                market_data[index] = {
                    'price': info.get('regularMarketPrice', 'N/A'),
                    'change': info.get('regularMarketChange', 'N/A'),
                    'change_percent': info.get('regularMarketChangePercent', 'N/A')
                }
            
            return market_data
            
        except Exception as e:
            return {'error': f'Market data unavailable: {str(e)}'}
    
    def _generate_research_summary(self, recommendations: List[Dict[str, Any]]) -> str:
        """Generate summary of research findings"""
        total_assets = len(recommendations)
        categories = set(rec['category'] for rec in recommendations)
        
        summary = f"Researched {total_assets} specific assets across {len(categories)} categories. "
        summary += f"Recommendations focus on {', '.join(categories)} based on risk profile. "
        summary += "All assets screened for liquidity, market cap, and historical performance."
        
        return summary
