import { useState, useEffect } from 'react';
import { Users, MapPin, Clock, Heart, Shield, Award, Search, Filter, Zap } from 'lucide-react';
import { toast } from 'react-toastify';

const AIDonorMatching = () => {
  const [matchCriteria, setMatchCriteria] = useState({
    bloodType: 'O+',
    urgency: 'high',
    location: '',
    unitsNeeded: 2,
    radius: 10 // km
  });
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);

  const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const URGENCY_LEVELS = ['low', 'medium', 'high', 'critical'];

  // Mock donor database
  const generateMockDonors = () => {
    const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];
    const donors = [];
    
    for (let i = 0; i < 50; i++) {
      donors.push({
        id: i + 1,
        name: `Donor ${i + 1}`,
        bloodType: BLOOD_GROUPS[Math.floor(Math.random() * BLOOD_GROUPS.length)],
        location: cities[Math.floor(Math.random() * cities.length)],
        distance: Math.random() * 50,
        lastDonation: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        totalDonations: Math.floor(Math.random() * 20) + 1,
        reliability: 70 + Math.random() * 30,
        responseTime: Math.floor(Math.random() * 120) + 10, // minutes
        verified: Math.random() > 0.3,
        availableNow: Math.random() > 0.4,
        healthScore: 70 + Math.random() * 30,
        phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `donor${i + 1}@example.com`
      });
    }
    return donors;
  };

  // AI Matching Algorithm
  const calculateMatchScore = (donor, criteria) => {
    let score = 0;
    const weights = {
      bloodCompatibility: 30,
      distance: 20,
      availability: 15,
      reliability: 15,
      responseTime: 10,
      donationHistory: 10
    };

    // Blood type compatibility
    const compatible = checkBloodCompatibility(criteria.bloodType, donor.bloodType);
    score += compatible ? weights.bloodCompatibility : 0;

    // Distance score (inverse relationship)
    const distanceScore = Math.max(0, 1 - (donor.distance / criteria.radius));
    score += distanceScore * weights.distance;

    // Availability
    if (donor.availableNow) {
      score += weights.availability;
    }

    // Reliability score
    score += (donor.reliability / 100) * weights.reliability;

    // Response time (faster is better)
    const responseScore = Math.max(0, 1 - (donor.responseTime / 120));
    score += responseScore * weights.responseTime;

    // Donation history
    const historyScore = Math.min(donor.totalDonations / 20, 1);
    score += historyScore * weights.donationHistory;

    // Urgency multiplier
    if (criteria.urgency === 'critical') {
      score *= donor.availableNow ? 1.5 : 0.5;
    }

    return Math.min(Math.round(score), 100);
  };

  const checkBloodCompatibility = (recipient, donor) => {
    const compatibility = {
      'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      'O+': ['O+', 'A+', 'B+', 'AB+'],
      'A-': ['A-', 'A+', 'AB-', 'AB+'],
      'A+': ['A+', 'AB+'],
      'B-': ['B-', 'B+', 'AB-', 'AB+'],
      'B+': ['B+', 'AB+'],
      'AB-': ['AB-', 'AB+'],
      'AB+': ['AB+']
    };
    return compatibility[donor]?.includes(recipient) || false;
  };

  const findMatches = () => {
    setLoading(true);
    
    setTimeout(() => {
      const allDonors = generateMockDonors();
      
      // Filter and score donors
      const scoredMatches = allDonors
        .filter(donor => {
          const compatible = checkBloodCompatibility(matchCriteria.bloodType, donor.bloodType);
          const withinRadius = donor.distance <= matchCriteria.radius;
          const canDonate = (new Date() - donor.lastDonation) / (1000 * 60 * 60 * 24) >= 90;
          
          return compatible && withinRadius && canDonate;
        })
        .map(donor => ({
          ...donor,
          matchScore: calculateMatchScore(donor, matchCriteria),
          aiRecommendation: generateAIRecommendation(donor, matchCriteria)
        }))
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 10);

      setMatches(scoredMatches);
      setLoading(false);
      toast.success(`Found ${scoredMatches.length} compatible donors using AI matching`);
    }, 1500);
  };

  const generateAIRecommendation = (donor, criteria) => {
    if (donor.matchScore >= 90) {
      return {
        level: 'excellent',
        text: 'Highly recommended - Perfect match with high reliability',
        color: 'text-green-600'
      };
    } else if (donor.matchScore >= 75) {
      return {
        level: 'good',
        text: 'Good match - Reliable donor with quick response',
        color: 'text-blue-600'
      };
    } else if (donor.matchScore >= 60) {
      return {
        level: 'moderate',
        text: 'Moderate match - Consider as backup option',
        color: 'text-yellow-600'
      };
    } else {
      return {
        level: 'low',
        text: 'Low match - Use only if no better options',
        color: 'text-orange-600'
      };
    }
  };

  useEffect(() => {
    if (matchCriteria.bloodType && matchCriteria.location) {
      findMatches();
    }
  }, []);

  const handleContactDonor = (donor) => {
    setSelectedDonor(donor);
    toast.success(`Notification sent to ${donor.name}`);
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[urgency];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Zap className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI-Powered Donor Matching
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Smart algorithm to find the best donor matches
              </p>
            </div>
          </div>

          {/* Search Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Blood Type Needed
              </label>
              <select
                value={matchCriteria.bloodType}
                onChange={(e) => setMatchCriteria({...matchCriteria, bloodType: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {BLOOD_GROUPS.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={matchCriteria.location}
                onChange={(e) => setMatchCriteria({...matchCriteria, location: e.target.value})}
                placeholder="Enter city or area"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Radius (km)
              </label>
              <input
                type="number"
                value={matchCriteria.radius}
                onChange={(e) => setMatchCriteria({...matchCriteria, radius: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Units Needed
              </label>
              <input
                type="number"
                value={matchCriteria.unitsNeeded}
                onChange={(e) => setMatchCriteria({...matchCriteria, unitsNeeded: parseInt(e.target.value)})}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Urgency Level
              </label>
              <select
                value={matchCriteria.urgency}
                onChange={(e) => setMatchCriteria({...matchCriteria, urgency: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {URGENCY_LEVELS.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={findMatches}
                disabled={loading}
                className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
              >
                {loading ? 'Searching...' : 'Find Matches'}
              </button>
            </div>
          </div>
        </div>

        {/* Match Results */}
        {matches.length > 0 && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Top Donor Matches ({matches.length})
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {matches.map((donor) => (
                  <div
                    key={donor.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {donor.name.charAt(donor.name.length - 1)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                              {donor.name}
                              {donor.verified && (
                                <Shield className="text-blue-500" size={16} />
                              )}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <span className="font-medium text-red-600">{donor.bloodType}</span>
                              <span>•</span>
                              <MapPin size={14} />
                              <span>{donor.location} ({donor.distance.toFixed(1)} km)</span>
                            </div>
                          </div>
                        </div>

                        {/* AI Recommendation */}
                        <div className={`text-sm font-medium mb-3 ${donor.aiRecommendation.color}`}>
                          🤖 {donor.aiRecommendation.text}
                        </div>

                        {/* Donor Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <Heart className="text-red-500" size={16} />
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Donations</div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {donor.totalDonations}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="text-blue-500" size={16} />
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Response</div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {donor.responseTime} min
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="text-yellow-500" size={16} />
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Reliability</div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {donor.reliability.toFixed(0)}%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="text-green-500" size={16} />
                            <div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Health</div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {donor.healthScore.toFixed(0)}%
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status Badges */}
                        <div className="flex flex-wrap gap-2">
                          {donor.availableNow && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Available Now
                            </span>
                          )}
                          {donor.verified && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              Verified
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${getUrgencyColor(matchCriteria.urgency)}`}>
                            {matchCriteria.urgency} Priority
                          </span>
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="ml-4 text-center">
                        <div className="relative w-20 h-20">
                          <svg className="transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke={donor.matchScore >= 80 ? '#22c55e' : donor.matchScore >= 60 ? '#3b82f6' : '#f59e0b'}
                              strokeWidth="3"
                              strokeDasharray={`${donor.matchScore}, 100`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              {donor.matchScore}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Match Score</div>
                        <button
                          onClick={() => handleContactDonor(donor)}
                          className="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* No Results */}
        {!loading && matches.length === 0 && matchCriteria.location && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <Users className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Matches Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or expanding the search radius
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDonorMatching;
