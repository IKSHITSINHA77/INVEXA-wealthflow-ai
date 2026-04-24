import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AgentTransition = ({ currentAgent, isProcessing, onComplete }) => {
  const [agentProgress, setAgentProgress] = useState({
    profiler: { completed: false, current: false },
    researcher: { completed: false, current: false },
    critic: { completed: false, current: false },
    director: { completed: false, current: false }
  });

  const agents = [
    { name: 'profiler', label: 'Profiler Agent', description: 'Analyzing risk profile...' },
    { name: 'researcher', label: 'Researcher Agent', description: 'Scouring market data...' },
    { name: 'critic', label: 'Critic Agent', description: 'Assessing risks...' },
    { name: 'director', label: 'Director Agent', description: 'Synthesizing strategy...' }
  ];

  useEffect(() => {
    if (isProcessing && currentAgent) {
      // Reset all agents
      setAgentProgress({
        profiler: { completed: false, current: currentAgent === 'profiler' },
        researcher: { completed: false, current: currentAgent === 'researcher' },
        critic: { completed: false, current: currentAgent === 'critic' },
        director: { completed: false, current: currentAgent === 'director' }
      });

      // Simulate agent completion after delay
      const timer = setTimeout(() => {
        setAgentProgress(prev => ({
          ...prev,
          [currentAgent]: { completed: true, current: false }
        }));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentAgent, isProcessing]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const pulseVariants = {
    current: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    completed: {
      scale: 1,
      opacity: 1
    },
    pending: {
      scale: 1,
      opacity: 0.3
    }
  };

  return (
    <AnimatePresence>
      {isProcessing && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                AI Agents at Work
              </h3>
              <p className="text-gray-600">
                Our 4-stage agentic pipeline is analyzing your profile
              </p>
            </div>

            <div className="space-y-4">
              {agents.map((agent, index) => {
                const progress = agentProgress[agent.name];
                const isCurrent = progress?.current;
                const isCompleted = progress?.completed;

                return (
                  <motion.div
                    key={agent.name}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: isCompleted ? '#10b981' : isCurrent ? '#3b82f6' : '#e5e7eb'
                      }}
                      variants={pulseVariants}
                      animate={isCurrent ? 'current' : isCompleted ? 'completed' : 'pending'}
                    >
                      {isCompleted ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : isCurrent ? (
                        <motion.div
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-400" />
                      )}
                    </motion.div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {agent.label}
                      </h4>
                      <AnimatePresence>
                        {isCurrent && (
                          <motion.p
                            className="text-sm text-blue-600"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            {agent.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="text-right">
                      {isCompleted && (
                        <motion.span
                          className="text-green-600 text-sm font-medium"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          Complete
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="mt-6 pt-6 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Processing time: ~8 seconds
                </div>
                <motion.button
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onComplete}
                >
                  Skip Animation
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgentTransition;
