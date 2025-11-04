import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Users, Droplet, MapPin, Clock, Award, Brain, Target } from 'lucide-react';

const AIAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6'];

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = () => {
    setLoading(true);
    setTimeout(() => {
      setAnalytics(generateAnalyticsData());
      setLoading(false);
    }, 1000);
  };

  const generateAnalyticsData = () => {
    return {
      kpis: [
        {
          title: 'Total Donations',
          value: '1,247',
          change: '+12.5%',
          trend: 'up',
          icon: <Droplet />,
          color: 'red'
        },
        {
          title: 'Active Donors',
          value: '3,456',
          change: '+8.3%',
          trend: 'up',
          icon: <Users />,
          color: 'blue'
        },
        {
          title: 'Response Time',
          value: '23 min',
          change: '-15.2%',
          trend: 'up',
          icon: <Clock />,
          color: 'green'
        },
        {
          title: 'Success Rate',
          value: '94.2%',
          change: '+3.1%',
          trend: 'up',
          icon: <Award />,
          color: 'purple'
        }
      ],
      donationTrends: generateDonationTrends(),
      bloodTypeDistribution: generateBloodTypeDistribution(),
      donorDemographics: generateDemographics(),
      regionalAnalytics: generateRegionalData(),
      timeAnalysis: generateTimeAnalysis(),
      predictiveInsights: generatePredictiveInsights(),
      performanceMetrics: generatePerformanceMetrics()
    };
  };

  const generateDonationTrends = () => {
    const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        donations: Math.floor(Math.random() * 50) + 30,
        requests: Math.floor(Math.random() * 60) + 40,
        fulfilled: Math.floor(Math.random() * 45) + 35
      };
    });
  };

  const generateBloodTypeDistribution = () => {
    return [
      { name: 'O+', value: 380, percentage: 37 },
      { name: 'A+', value: 320, percentage: 31 },
      { name: 'B+', value: 210, percentage: 20 },
      { name: 'AB+', value: 90, percentage: 9 },
      { name: 'O-', value: 15, percentage: 1.5 },
      { name: 'A-', value: 8, percentage: 0.8 },
      { name: 'B-', value: 5, percentage: 0.5 },
      { name: 'AB-', value: 2, percentage: 0.2 }
    ];
  };

  const generateDemographics = () => {
    return [
      { age: '18-25', male: 450, female: 380 },
      { age: '26-35', male: 650, female: 580 },
      { age: '36-45', male: 520, female: 490 },
      { age: '46-55', male: 380, female: 350 },
      { age: '56-65', male: 180, female: 160 }
    ];
  };

  const generateRegionalData = () => {
    return [
      { city: 'Delhi', donations: 450, donors: 1200, fulfillmentRate: 92 },
      { city: 'Mumbai', donations: 520, donors: 1500, fulfillmentRate: 95 },
      { city: 'Bangalore', donations: 380, donors: 980, fulfillmentRate: 88 },
      { city: 'Chennai', donations: 320, donors: 850, fulfillmentRate: 90 },
      { city: 'Kolkata', donations: 290, donors: 720, fulfillmentRate: 87 }
    ];
  };

  const generateTimeAnalysis = () => {
    return [
      { hour: '6-9 AM', donations: 45 },
      { hour: '9-12 PM', donations: 120 },
      { hour: '12-3 PM', donations: 85 },
      { hour: '3-6 PM', donations: 140 },
      { hour: '6-9 PM', donations: 95 },
      { hour: '9-12 AM', donations: 25 }
    ];
  };

  const generatePredictiveInsights = () => {
    return [
      {
        title: 'Peak Demand Forecast',
        insight: 'O+ blood type demand expected to increase by 28% in next 5 days',
        confidence: 91,
        action: 'Schedule additional donation camps',
        priority: 'high'
      },
      {
        title: 'Donor Retention Risk',
        insight: '15% of active donors haven\'t donated in 6 months',
        confidence: 87,
        action: 'Launch re-engagement campaign',
        priority: 'medium'
      },
      {
        title: 'Inventory Optimization',
        insight: 'AB- surplus detected. Consider inter-bank transfer',
        confidence: 94,
        action: 'Coordinate with partner blood banks',
        priority: 'low'
      },
      {
        title: 'Response Time Improvement',
        insight: 'AI routing can reduce average response time by 22%',
        confidence: 89,
        action: 'Implement AI-powered donor dispatch',
        priority: 'high'
      }
    ];
  };

  const generatePerformanceMetrics = () => {
    return [
      { metric: 'Donation Rate', score: 92 },
      { metric: 'Donor Satisfaction', score: 88 },
      { metric: 'Response Time', score: 85 },
      { metric: 'Inventory Management', score: 90 },
      { metric: 'System Efficiency', score: 87 },
      { metric: 'Data Accuracy', score: 95 }
    ];
  };

  const getColorByName = (name) => {
    const colorMap = {
      red: '#ef4444',
      blue: '#3b82f6',
      green: '#22c55e',
      purple: '#8b5cf6',
      yellow: '#f59e0b',
      orange: '#f97316'
    };
    return colorMap[name] || '#6b7280';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[priority];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Brain className="mx-auto text-purple-600 animate-pulse" size={64} />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading AI Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <Brain className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time insights powered by machine learning
              </p>
            </div>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analytics.kpis.map((kpi, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${kpi.color}-100 dark:bg-${kpi.color}-900 rounded-lg`}>
                  <div className={`text-${kpi.color}-600 dark:text-${kpi.color}-400`}>
                    {kpi.icon}
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {kpi.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Donation Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Donation & Request Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics.donationTrends}>
              <defs>
                <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="donations" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDonations)" />
              <Area type="monotone" dataKey="requests" stroke="#ef4444" fillOpacity={1} fill="url(#colorRequests)" />
              <Area type="monotone" dataKey="fulfilled" stroke="#22c55e" fillOpacity={0.3} fill="#22c55e" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Blood Type Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Blood Type Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.bloodTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.bloodTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Time Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Peak Donation Hours
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.timeAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="donations" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donor Demographics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Donor Demographics by Age Group
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.donorDemographics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="male" fill="#3b82f6" name="Male" />
              <Bar dataKey="female" fill="#ec4899" name="Female" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Analytics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Regional Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.regionalAnalytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
              <YAxis yAxisId="right" orientation="right" stroke="#22c55e" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="donations" fill="#3b82f6" name="Donations" />
              <Bar yAxisId="left" dataKey="donors" fill="#8b5cf6" name="Active Donors" />
              <Bar yAxisId="right" dataKey="fulfillmentRate" fill="#22c55e" name="Fulfillment %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics Radar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            System Performance Metrics
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={analytics.performanceMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Performance" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Predictive Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Target size={24} className="text-purple-600" />
            AI Predictive Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.predictiveInsights.map((insight, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-4 ${getPriorityColor(insight.priority)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{insight.title}</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                    {insight.confidence}% confidence
                  </span>
                </div>
                <p className="text-sm mb-3 opacity-90">{insight.insight}</p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Activity size={14} />
                  <span>{insight.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyticsDashboard;
