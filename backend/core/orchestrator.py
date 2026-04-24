"""
Agentic Pipeline Orchestrator
Coordinates the 4-stage agent workflow
"""

from .agents.profiler import ProfilerAgent
from .agents.researcher import ResearcherAgent
from .agents.critic import CriticAgent
from .agents.director import DirectorAgent

class AgenticOrchestrator:
    def __init__(self):
        self.profiler = ProfilerAgent()
        self.researcher = ResearcherAgent()
        self.critic = CriticAgent()
        self.director = DirectorAgent()
    
    def process_investment_request(self, age, salary, risk_tolerance='moderate', investment_goal='growth'):
        """
        Process investment request through 4-stage agentic pipeline
        
        Args:
            age (int): User's age
            salary (int): Annual salary
            risk_tolerance (str): Risk preference
            investment_goal (str): Investment objective
            
        Returns:
            dict: Comprehensive investment strategy
        """
        # Stage 1: Profiler Agent - Behavioral Analysis
        print("🔍 Profiler Agent: Analyzing user profile...")
        profile_analysis = self.profiler.analyze_profile(age, salary, risk_tolerance)
        
        # Stage 2: Researcher Agent - Market Discovery
        print("🔬 Researcher Agent: Discovering investment opportunities...")
        research_results = self.researcher.discover_assets(profile_analysis)
        
        # Stage 3: Critic Agent - Risk Assessment
        print("⚠️ Critic Agent: Assessing risks and vulnerabilities...")
        risk_analysis = self.critic.analyze_risks(research_results, profile_analysis)
        
        # Stage 4: Director Agent - Synthesis & Execution
        print("🎯 Director Agent: Synthesizing final strategy...")
        final_strategy = self.director.synthesize_strategy(
            profile_analysis, 
            research_results, 
            risk_analysis
        )
        
        # Combine all results
        return {
            'request_metadata': {
                'age': age,
                'salary': salary,
                'risk_tolerance': risk_tolerance,
                'investment_goal': investment_goal,
                'processing_timestamp': self._get_timestamp()
            },
            'agent_pipeline': {
                'profiler_results': profile_analysis,
                'researcher_results': research_results,
                'critic_results': risk_analysis,
                'director_results': final_strategy
            },
            'final_recommendation': final_strategy,
            'pipeline_summary': self._generate_pipeline_summary(profile_analysis, final_strategy)
        }
    
    def _get_timestamp(self):
        """Get current timestamp"""
        from datetime import datetime
        return datetime.now().isoformat()
    
    def _generate_pipeline_summary(self, profile_analysis, final_strategy):
        """Generate summary of pipeline processing"""
        return {
            'risk_profile': profile_analysis['risk_band'],
            'strategy_type': final_strategy['allocation_strategy']['name'],
            'expected_return': final_strategy['allocation_strategy']['details']['target_return'],
            'confidence_score': final_strategy['confidence_score'],
            'total_assets_recommended': len(final_strategy['final_allocation']),
            'processing_stages_completed': 4,
            'next_steps': final_strategy['next_steps']
        }
