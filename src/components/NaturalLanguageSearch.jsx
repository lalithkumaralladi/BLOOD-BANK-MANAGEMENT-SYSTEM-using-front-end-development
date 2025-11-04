import { useState } from 'react';
import { Search, Mic, Sparkles, MapPin, Droplet, Clock, TrendingUp, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

const NaturalLanguageSearch = ({ onResultSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Predefined search suggestions
  const exampleQueries = [
    "Find O+ blood banks near me",
    "When can I donate blood again?",
    "Show me donation camps this weekend",
    "What are the requirements for blood donation?",
    "Find emergency blood requests in Delhi",
    "Show blood demand trends for A+ type",
    "Which blood types can receive O-?",
    "List donors available right now"
  ];

  // AI-powered Natural Language Processing
  const processNaturalLanguageQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    const keywords = {
      location: ['near', 'nearby', 'in', 'at', 'around', 'closest'],
      bloodType: ['a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-'],
      urgency: ['emergency', 'urgent', 'asap', 'critical', 'immediate'],
      time: ['today', 'tomorrow', 'weekend', 'week', 'month', 'now'],
      action: ['find', 'search', 'show', 'list', 'get', 'locate'],
      entity: ['blood bank', 'donor', 'donation camp', 'hospital', 'request']
    };

    const intent = {
      type: null,
      bloodType: null,
      location: null,
      timeframe: null,
      urgency: 'normal'
    };

    // Detect blood type
    keywords.bloodType.forEach(type => {
      if (lowerQuery.includes(type)) {
        intent.bloodType = type.toUpperCase();
      }
    });

    // Detect urgency
    if (keywords.urgency.some(word => lowerQuery.includes(word))) {
      intent.urgency = 'high';
    }

    // Detect intent type
    if (lowerQuery.includes('blood bank') || lowerQuery.includes('hospital')) {
      intent.type = 'bloodBank';
    } else if (lowerQuery.includes('donor')) {
      intent.type = 'donor';
    } else if (lowerQuery.includes('donation camp') || lowerQuery.includes('camp')) {
      intent.type = 'camp';
    } else if (lowerQuery.includes('request')) {
      intent.type = 'request';
    } else if (lowerQuery.includes('trend') || lowerQuery.includes('demand') || lowerQuery.includes('statistics')) {
      intent.type = 'analytics';
    } else if (lowerQuery.includes('eligib') || lowerQuery.includes('requirement') || lowerQuery.includes('can i')) {
      intent.type = 'eligibility';
    } else if (lowerQuery.includes('compatibility') || lowerQuery.includes('can receive') || lowerQuery.includes('can give')) {
      intent.type = 'compatibility';
    }

    // Extract location
    const locationMatch = lowerQuery.match(/in ([\w\s]+)|near ([\w\s]+)|at ([\w\s]+)/);
    if (locationMatch) {
      intent.location = locationMatch[1] || locationMatch[2] || locationMatch[3];
    }

    // Extract time frame
    if (lowerQuery.includes('today')) intent.timeframe = 'today';
    if (lowerQuery.includes('tomorrow')) intent.timeframe = 'tomorrow';
    if (lowerQuery.includes('weekend')) intent.timeframe = 'weekend';
    if (lowerQuery.includes('now')) intent.timeframe = 'now';

    return intent;
  };

  const generateResults = (intent, query) => {
    const results = [];

    switch (intent.type) {
      case 'bloodBank':
        results.push(
          {
            id: 1,
            type: 'bloodBank',
            title: `Blood Banks with ${intent.bloodType || 'All Types'}`,
            description: `Found 12 blood banks ${intent.location ? `in ${intent.location}` : 'near you'} with ${intent.bloodType || 'blood'} availability`,
            icon: <Droplet className="text-red-500" />,
            data: generateMockBloodBanks(intent),
            action: 'View on Map'
          }
        );
        break;

      case 'donor':
        results.push(
          {
            id: 2,
            type: 'donor',
            title: `Available ${intent.bloodType || ''} Donors`,
            description: `Found 45 verified donors ${intent.location ? `in ${intent.location}` : 'in your area'}`,
            icon: <Search className="text-blue-500" />,
            data: generateMockDonors(intent),
            action: 'Contact Donors'
          }
        );
        break;

      case 'camp':
        results.push(
          {
            id: 3,
            type: 'camp',
            title: `Upcoming Donation Camps`,
            description: `3 donation camps scheduled ${intent.timeframe || 'this week'} ${intent.location ? `in ${intent.location}` : 'near you'}`,
            icon: <MapPin className="text-green-500" />,
            data: generateMockCamps(intent),
            action: 'Register'
          }
        );
        break;

      case 'eligibility':
        results.push(
          {
            id: 4,
            type: 'info',
            title: 'Blood Donation Eligibility',
            description: 'Complete guide to blood donation requirements and eligibility criteria',
            icon: <FileText className="text-purple-500" />,
            data: {
              requirements: [
                'Age: 18-65 years',
                'Weight: At least 50 kg',
                'Healthy with no chronic illnesses',
                'No recent tattoos (last 6 months)',
                'Not pregnant or breastfeeding',
                'No recent surgeries (last 12 months)',
                'Hemoglobin: Male ≥13g/dL, Female ≥12g/dL',
                'Can donate every 3 months'
              ]
            },
            action: 'Check Eligibility'
          }
        );
        break;

      case 'compatibility':
        results.push(
          {
            id: 5,
            type: 'info',
            title: `Blood Type Compatibility ${intent.bloodType ? `for ${intent.bloodType}` : ''}`,
            description: 'Learn about blood type compatibility and donation matching',
            icon: <Sparkles className="text-pink-500" />,
            data: generateCompatibilityInfo(intent.bloodType),
            action: 'View Details'
          }
        );
        break;

      case 'analytics':
        results.push(
          {
            id: 6,
            type: 'analytics',
            title: `Blood Demand Analytics ${intent.bloodType ? `for ${intent.bloodType}` : ''}`,
            description: 'AI-powered insights and trends in blood demand',
            icon: <TrendingUp className="text-orange-500" />,
            data: generateAnalytics(intent),
            action: 'View Dashboard'
          }
        );
        break;

      default:
        // Generic search results
        results.push(
          {
            id: 7,
            type: 'general',
            title: 'Search Results',
            description: `Showing results for "${query}"`,
            icon: <Search className="text-gray-500" />,
            data: {
              message: 'Try being more specific with your search, like "Find O+ blood banks near me" or "When can I donate blood?"'
            },
            action: 'Refine Search'
          }
        );
    }

    // Add AI suggestions
    results.push({
      id: 'suggestions',
      type: 'suggestions',
      title: '🤖 AI Suggested Queries',
      description: 'You might also be interested in:',
      icon: <Sparkles className="text-purple-500" />,
      data: generateSmartSuggestions(intent, query)
    });

    return results;
  };

  const generateMockBloodBanks = (intent) => {
    return [
      { name: 'City Blood Bank', distance: '1.2 km', available: intent.bloodType ? 15 : 120, address: '123 Main St' },
      { name: 'Life Care Hospital', distance: '2.5 km', available: intent.bloodType ? 8 : 95, address: '456 Health Ave' },
      { name: 'Red Cross Center', distance: '3.8 km', available: intent.bloodType ? 22 : 150, address: '789 Help St' }
    ];
  };

  const generateMockDonors = (intent) => {
    return [
      { name: 'Donor #1234', bloodType: intent.bloodType || 'O+', distance: '0.8 km', lastDonation: '4 months ago', verified: true },
      { name: 'Donor #5678', bloodType: intent.bloodType || 'A+', distance: '1.5 km', lastDonation: '5 months ago', verified: true },
      { name: 'Donor #9012', bloodType: intent.bloodType || 'B+', distance: '2.1 km', lastDonation: '3 months ago', verified: false }
    ];
  };

  const generateMockCamps = (intent) => {
    return [
      { name: 'Community Health Camp', date: 'Tomorrow', time: '9:00 AM - 5:00 PM', location: 'Community Center', slots: 50 },
      { name: 'Corporate Donation Drive', date: 'This Weekend', time: '10:00 AM - 4:00 PM', location: 'Tech Park', slots: 100 },
      { name: 'Monthly Blood Drive', date: 'Next Week', time: '8:00 AM - 6:00 PM', location: 'Central Hospital', slots: 200 }
    ];
  };

  const generateCompatibilityInfo = (bloodType) => {
    const compatibility = {
      'O-': { canGiveTo: 'Universal Donor - Can give to all types', canReceiveFrom: 'O- only' },
      'O+': { canGiveTo: 'O+, A+, B+, AB+', canReceiveFrom: 'O-, O+' },
      'A-': { canGiveTo: 'A-, A+, AB-, AB+', canReceiveFrom: 'O-, A-' },
      'A+': { canGiveTo: 'A+, AB+', canReceiveFrom: 'O-, O+, A-, A+' },
      'B-': { canGiveTo: 'B-, B+, AB-, AB+', canReceiveFrom: 'O-, B-' },
      'B+': { canGiveTo: 'B+, AB+', canReceiveFrom: 'O-, O+, B-, B+' },
      'AB-': { canGiveTo: 'AB-, AB+', canReceiveFrom: 'O-, A-, B-, AB-' },
      'AB+': { canGiveTo: 'AB+ only', canReceiveFrom: 'Universal Receiver - Can receive from all types' }
    };
    return bloodType ? compatibility[bloodType] || compatibility['O+'] : compatibility;
  };

  const generateAnalytics = (intent) => {
    return {
      currentDemand: 'High',
      trend: '+15% this week',
      forecast: 'Expected to increase by 20% next week',
      recommendation: 'Consider scheduling a donation soon'
    };
  };

  const generateSmartSuggestions = (intent, query) => {
    const suggestions = [];
    
    if (intent.type === 'bloodBank') {
      suggestions.push('Show donors who can donate now');
      suggestions.push('Find donation camps this week');
    } else if (intent.type === 'donor') {
      suggestions.push('Check blood bank inventory');
      suggestions.push('View donor eligibility requirements');
    } else {
      suggestions.push('Find blood banks near me');
      suggestions.push('Check when I can donate again');
    }

    return suggestions;
  };

  const handleSearch = () => {
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    setIsSearching(true);

    // Simulate AI processing
    setTimeout(() => {
      const intent = processNaturalLanguageQuery(query);
      const searchResults = generateResults(intent, query);
      setResults(searchResults);
      setIsSearching(false);
      toast.success('Search completed using AI');
    }, 1000);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error('Voice search not supported in this browser');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast.info('Listening...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      toast.success('Voice input received');
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error('Voice recognition failed');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-purple-600" size={40} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Natural Language Search
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Ask questions in plain English - AI will understand
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Try: "Find O+ blood banks near me" or "When can I donate again?"'
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white text-lg"
              />
              <button
                onClick={handleVoiceSearch}
                disabled={isListening}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                title="Voice Search"
              >
                <Mic size={20} />
              </button>
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Search size={20} />
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Example Queries */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.slice(0, 4).map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(example)}
                  className="px-3 py-1 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {result.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {result.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {result.description}
                    </p>

                    {/* Result Data */}
                    {result.type === 'bloodBank' && (
                      <div className="space-y-2">
                        {result.data.map((bank, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{bank.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{bank.address} • {bank.distance}</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                              {bank.available} units
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {result.type === 'camp' && (
                      <div className="space-y-2">
                        {result.data.map((camp, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{camp.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {camp.date} • {camp.time} • {camp.location}
                              </p>
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                              {camp.slots} slots
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {result.type === 'info' && result.data.requirements && (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {result.data.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-green-500">✓</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    )}

                    {result.type === 'suggestions' && (
                      <div className="flex flex-wrap gap-2">
                        {result.data.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}

                    {result.action && result.type !== 'suggestions' && (
                      <button
                        onClick={() => toast.success(`Action: ${result.action}`)}
                        className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                      >
                        {result.action}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NaturalLanguageSearch;
