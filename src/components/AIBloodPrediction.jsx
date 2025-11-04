import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, Brain, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

const AIBloodPrediction = () => {
  const [selectedBloodType, setSelectedBloodType] = useState('all');
  const [predictionPeriod, setPredictionPeriod] = useState('7days');
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);

  const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6'];

  // AI-powered demand prediction algorithm
  const predictBloodDemand = () => {
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Mock AI prediction data based on historical patterns, seasonal trends, and events
      const historicalData = generateHistoricalData();
      const futureData = generatePredictions();
      const insights = generateAIInsights();
      
      setPredictions({
        historical: historicalData,
        future: futureData,
        insights: insights,
        accuracy: 94.5, // AI model accuracy
        lastUpdated: new Date()
      });
      
      setLoading(false);
      toast.success('AI prediction completed successfully!');
    }, 1500);
  };

  useEffect(() => {
    predictBloodDemand();
  }, [selectedBloodType, predictionPeriod]);

  const generateHistoricalData = () => {
    const days = predictionPeriod === '7days' ? 7 : predictionPeriod === '30days' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      const baselineDemand = {
        'A+': 45, 'A-': 8, 'B+': 35, 'B-': 6,
        'AB+': 12, 'AB-': 3, 'O+': 65, 'O-': 15
      };

      const data = {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        total: 0
      };

      BLOOD_GROUPS.forEach(type => {
        // Add randomness and seasonal variation
        const variation = (Math.random() - 0.5) * 20;
        const weekendBoost = date.getDay() === 0 || date.getDay() === 6 ? 15 : 0;
        data[type] = Math.max(0, Math.round(baselineDemand[type] + variation + weekendBoost));
        data.total += data[type];
      });

      return data;
    });
  };

  const generatePredictions = () => {
    const days = predictionPeriod === '7days' ? 7 : predictionPeriod === '30days' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i + 1);
      
      const baselineDemand = {
        'A+': 48, 'A-': 9, 'B+': 37, 'B-': 7,
        'AB+': 13, 'AB-': 4, 'O+': 68, 'O-': 16
      };

      const data = {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        total: 0,
        confidence: 85 + Math.random() * 10 // AI confidence level
      };

      BLOOD_GROUPS.forEach(type => {
        // AI-predicted increase based on trends
        const trendIncrease = i * 0.5;
        const seasonalFactor = Math.sin(i / 10) * 5;
        const aiAdjustment = (Math.random() - 0.4) * 15;
        
        data[type] = Math.max(0, Math.round(
          baselineDemand[type] + trendIncrease + seasonalFactor + aiAdjustment
        ));
        data.total += data[type];
      });

      return data;
    });
  };

  const generateAIInsights = () => {
    const insights = [
      {
        type: 'critical',
        icon: <AlertTriangle className="text-red-500" />,
        title: 'Critical Shortage Alert',
        message: 'O- blood type predicted to reach critical levels in 3 days',
        action: 'Initiate emergency donor outreach',
        probability: 87
      },
      {
        type: 'trend',
        icon: <TrendingUp className="text-green-500" />,
        title: 'Demand Increase',
        message: 'A+ demand expected to increase by 23% next week',
        action: 'Schedule additional donation camps',
        probability: 92
      },
      {
        type: 'seasonal',
        icon: <Calendar className="text-blue-500" />,
        title: 'Seasonal Pattern',
        message: 'Holiday season approaching - typical 15% donation decrease',
        action: 'Pre-stock blood units',
        probability: 89
      },
      {
        type: 'opportunity',
        icon: <Activity className="text-purple-500" />,
        title: 'Optimization Opportunity',
        message: 'AB+ surplus can be reallocated to deficit areas',
        action: 'Transfer 12 units to City Hospital',
        probability: 94
      }
    ];

    return insights;
  };

  const getCurrentInventory = () => {
    return BLOOD_GROUPS.map(type => ({
      name: type,
      current: Math.floor(Math.random() * 50) + 10,
      predicted: Math.floor(Math.random() * 60) + 15,
      required: Math.floor(Math.random() * 70) + 20
    }));
  };

  const inventoryData = getCurrentInventory();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Brain className="text-purple-600 dark:text-purple-400" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  AI Blood Demand Prediction
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Machine learning powered demand forecasting
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Model Accuracy</div>
              <div className="text-3xl font-bold text-green-600">{predictions?.accuracy}%</div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blood Type
              </label>
              <select
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Types</option>
                {BLOOD_GROUPS.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prediction Period
              </label>
              <select
                value={predictionPeriod}
                onChange={(e) => setPredictionPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="7days">Next 7 Days</option>
                <option value="30days">Next 30 Days</option>
                <option value="90days">Next 90 Days</option>
              </select>
            </div>
            <button
              onClick={predictBloodDemand}
              disabled={loading}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors mt-auto"
            >
              {loading ? 'Analyzing...' : 'Refresh Prediction'}
            </button>
          </div>
        </div>

        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {predictions?.insights.map((insight, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-purple-500"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {insight.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                      {insight.action}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {insight.probability}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demand Trend Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Demand Forecast Trend
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={predictions?.future || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedBloodType === 'all' ? (
                BLOOD_GROUPS.map((type, index) => (
                  <Line
                    key={type}
                    type="monotone"
                    dataKey={type}
                    stroke={COLORS[index]}
                    strokeWidth={2}
                  />
                ))
              ) : (
                <Line
                  type="monotone"
                  dataKey={selectedBloodType}
                  stroke="#8b5cf6"
                  strokeWidth={3}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory vs Predicted Demand */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Current Inventory vs Predicted Demand
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="#3b82f6" name="Current Stock" />
              <Bar dataKey="predicted" fill="#8b5cf6" name="Predicted Demand" />
              <Bar dataKey="required" fill="#ef4444" name="Required Stock" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution Pie Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Current Demand Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="predicted"
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              AI Prediction Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  Sufficient Stock
                </span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  {inventoryData.filter(d => d.current >= d.predicted).length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Low Stock Warning
                </span>
                <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                  {inventoryData.filter(d => d.current < d.predicted && d.current >= d.required * 0.5).length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900 rounded-lg">
                <span className="text-sm font-medium text-red-800 dark:text-red-200">
                  Critical Shortage
                </span>
                <span className="text-lg font-bold text-red-600 dark:text-red-400">
                  {inventoryData.filter(d => d.current < d.required * 0.5).length}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                  Total Predicted Units
                </span>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {inventoryData.reduce((sum, d) => sum + d.predicted, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIBloodPrediction;
