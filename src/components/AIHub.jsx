import { useState } from 'react';
import { Brain, Sparkles, Users, TrendingUp, Bell, Search, MessageCircle } from 'lucide-react';
import AIBloodPrediction from './AIBloodPrediction';
import AIDonorMatching from './AIDonorMatching';
import AIAnalyticsDashboard from './AIAnalyticsDashboard';
import SmartNotifications from './SmartNotifications';
import NaturalLanguageSearch from './NaturalLanguageSearch';

const AIHub = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      id: 'prediction',
      name: 'Blood Demand Prediction',
      icon: <TrendingUp />,
      description: 'AI-powered forecasting of blood demand trends',
      color: 'purple',
      component: <AIBloodPrediction />
    },
    {
      id: 'matching',
      name: 'Smart Donor Matching',
      icon: <Users />,
      description: 'Intelligent algorithm to find the best donor matches',
      color: 'blue',
      component: <AIDonorMatching />
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      icon: <Brain />,
      description: 'Real-time insights powered by machine learning',
      color: 'green',
      component: <AIAnalyticsDashboard />
    },
    {
      id: 'notifications',
      name: 'Smart Notifications',
      icon: <Bell />,
      description: 'AI-powered intelligent alerts and reminders',
      color: 'yellow',
      component: <SmartNotifications />
    },
    {
      id: 'search',
      name: 'Natural Language Search',
      icon: <Search />,
      description: 'Search using plain English queries',
      color: 'pink',
      component: <NaturalLanguageSearch />
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
      blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
      green: 'bg-green-100 text-green-600 hover:bg-green-200',
      yellow: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200',
      pink: 'bg-pink-100 text-pink-600 hover:bg-pink-200'
    };
    return colors[color] || colors.purple;
  };

  const activeFeature = features.find(f => f.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {activeTab === 'overview' ? (
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl">
                  <Brain className="text-white" size={48} />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                AI-Powered Tools Hub
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Leverage cutting-edge artificial intelligence to revolutionize blood bank management
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Sparkles size={32} />
                  <span className="text-2xl font-bold">5</span>
                </div>
                <p className="text-purple-100">AI Features</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Brain size={32} />
                  <span className="text-2xl font-bold">94.5%</span>
                </div>
                <p className="text-blue-100">AI Accuracy</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp size={32} />
                  <span className="text-2xl font-bold">+32%</span>
                </div>
                <p className="text-green-100">Efficiency Gain</p>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Users size={32} />
                  <span className="text-2xl font-bold">1.2K</span>
                </div>
                <p className="text-pink-100">Active Users</p>
              </div>
            </div>

            {/* Features Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Explore AI Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id)}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all text-left group"
                  >
                    <div className={`inline-flex p-3 rounded-lg mb-4 ${getColorClasses(feature.color)} group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium">
                      Explore
                      <span className="ml-2 group-hover:ml-4 transition-all">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Why Use AI Tools?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Predictive Accuracy
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Machine learning models predict blood demand with 94.5% accuracy, helping you plan ahead
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⚡</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Faster Matching
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      AI algorithms find the best donor matches in seconds, reducing response time by 67%
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Real-time Insights
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Get instant analytics and actionable insights to optimize blood bank operations
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🔔</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Smart Alerts
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Receive intelligent notifications prioritized by urgency and relevance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Feature Header */}
          <div className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  ← Back
                </button>
                <div className={`p-2 rounded-lg ${getColorClasses(activeFeature?.color)}`}>
                  {activeFeature?.icon}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {activeFeature?.name}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activeFeature?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Feature Component */}
          <div>
            {activeFeature?.component}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIHub;
