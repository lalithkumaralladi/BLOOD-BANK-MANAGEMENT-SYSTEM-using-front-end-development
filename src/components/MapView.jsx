import { useEffect, useRef, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Generate random last updated time (within last 30 minutes)
const getRandomUpdateTime = () => {
  const now = new Date();
  const minutesAgo = Math.floor(Math.random() * 30);
  return new Date(now - minutesAgo * 60 * 1000);
};

// Format time since last update
const getTimeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};

// Enhanced mock data for blood banks across India
const MOCK_BLOOD_BANKS = [
  // Delhi
  { id: 1, name: 'City Blood Bank', address: 'Connaught Place, Delhi', city: 'Delhi', coordinates: { lat: 28.6139, lng: 77.2090 }, inventory: { 'A+': 15, 'A-': 3, 'B+': 20, 'B-': 5, 'AB+': 8, 'AB-': 2, 'O+': 25, 'O-': 7 }, lastUpdated: new Date(), isOnline: true },
  { id: 2, name: 'Life Care Hospital', address: 'Nehru Place, Delhi', city: 'Delhi', coordinates: { lat: 28.5494, lng: 77.2501 }, inventory: { 'A+': 8, 'A-': 1, 'B+': 12, 'B-': 4, 'AB+': 5, 'AB-': 1, 'O+': 18, 'O-': 3 } },
  { id: 3, name: 'AIIMS Blood Bank', address: 'Ansari Nagar, Delhi', city: 'Delhi', coordinates: { lat: 28.5672, lng: 77.2100 }, inventory: { 'A+': 30, 'A-': 8, 'B+': 25, 'B-': 7, 'AB+': 12, 'AB-': 4, 'O+': 35, 'O-': 10 } },
  
  // Mumbai
  { id: 4, name: 'Lilavati Hospital', address: 'Bandra West, Mumbai', city: 'Mumbai', coordinates: { lat: 19.0596, lng: 72.8295 }, inventory: { 'A+': 20, 'A-': 5, 'B+': 18, 'B-': 6, 'AB+': 10, 'AB-': 3, 'O+': 28, 'O-': 8 } },
  { id: 5, name: 'KEM Hospital', address: 'Parel, Mumbai', city: 'Mumbai', coordinates: { lat: 19.0022, lng: 72.8417 }, inventory: { 'A+': 25, 'A-': 7, 'B+': 22, 'B-': 8, 'AB+': 11, 'AB-': 4, 'O+': 32, 'O-': 9 } },
  { id: 6, name: 'Jaslok Hospital', address: 'Pedder Road, Mumbai', city: 'Mumbai', coordinates: { lat: 18.9694, lng: 72.8065 }, inventory: { 'A+': 18, 'A-': 4, 'B+': 16, 'B-': 5, 'AB+': 9, 'AB-': 2, 'O+': 24, 'O-': 7 } },
  
  // Bangalore
  { id: 7, name: 'Manipal Hospital', address: 'HAL Airport Road, Bangalore', city: 'Bangalore', coordinates: { lat: 12.9577, lng: 77.6406 }, inventory: { 'A+': 22, 'A-': 6, 'B+': 20, 'B-': 7, 'AB+': 10, 'AB-': 3, 'O+': 30, 'O-': 9 } },
  { id: 8, name: 'Apollo Hospital', address: 'Bannerghatta Road, Bangalore', city: 'Bangalore', coordinates: { lat: 12.9082, lng: 77.5865 }, inventory: { 'A+': 19, 'A-': 5, 'B+': 17, 'B-': 6, 'AB+': 8, 'AB-': 2, 'O+': 26, 'O-': 8 } },
  { id: 9, name: 'Fortis Hospital', address: 'Cunningham Road, Bangalore', city: 'Bangalore', coordinates: { lat: 12.9932, lng: 77.5946 }, inventory: { 'A+': 16, 'A-': 4, 'B+': 15, 'B-': 5, 'AB+': 7, 'AB-': 2, 'O+': 22, 'O-': 6 } },
  
  // Chennai
  { id: 10, name: 'Apollo Hospitals', address: 'Greams Road, Chennai', city: 'Chennai', coordinates: { lat: 13.0569, lng: 80.2506 }, inventory: { 'A+': 21, 'A-': 6, 'B+': 19, 'B-': 7, 'AB+': 9, 'AB-': 3, 'O+': 29, 'O-': 8 } },
  { id: 11, name: 'Fortis Malar Hospital', address: 'Adyar, Chennai', city: 'Chennai', coordinates: { lat: 13.0067, lng: 80.2583 }, inventory: { 'A+': 17, 'A-': 4, 'B+': 16, 'B-': 5, 'AB+': 8, 'AB-': 2, 'O+': 24, 'O-': 7 } },
  
  // Pune
  { id: 12, name: 'Ruby Hall Clinic', address: 'Sassoon Road, Pune', city: 'Pune', coordinates: { lat: 18.5314, lng: 73.8446 }, inventory: { 'A+': 18, 'A-': 5, 'B+': 17, 'B-': 6, 'AB+': 9, 'AB-': 3, 'O+': 25, 'O-': 7 } },
  { id: 13, name: 'Sahyadri Hospital', address: 'Deccan Gymkhana, Pune', city: 'Pune', coordinates: { lat: 18.5196, lng: 73.8553 }, inventory: { 'A+': 20, 'A-': 6, 'B+': 18, 'B-': 7, 'AB+': 10, 'AB-': 3, 'O+': 27, 'O-': 8 } },
  
  // Hyderabad
  { id: 14, name: 'Care Hospitals', address: 'Banjara Hills, Hyderabad', city: 'Hyderabad', coordinates: { lat: 17.4239, lng: 78.4738 }, inventory: { 'A+': 19, 'A-': 5, 'B+': 17, 'B-': 6, 'AB+': 9, 'AB-': 3, 'O+': 26, 'O-': 8 } },
  { id: 15, name: 'Apollo Hospitals', address: 'Jubilee Hills, Hyderabad', city: 'Hyderabad', coordinates: { lat: 17.4326, lng: 78.4071 }, inventory: { 'A+': 22, 'A-': 7, 'B+': 20, 'B-': 8, 'AB+': 11, 'AB-': 4, 'O+': 30, 'O-': 9 } },
  
  // Kolkata
  { id: 16, name: 'AMRI Hospital', address: 'Salt Lake, Kolkata', city: 'Kolkata', coordinates: { lat: 22.5726, lng: 88.3639 }, inventory: { 'A+': 17, 'A-': 4, 'B+': 16, 'B-': 5, 'AB+': 8, 'AB-': 2, 'O+': 23, 'O-': 7 } },
  { id: 17, name: 'Apollo Gleneagles', address: 'EM Bypass, Kolkata', city: 'Kolkata', coordinates: { lat: 22.5189, lng: 88.3887 }, inventory: { 'A+': 20, 'A-': 6, 'B+': 18, 'B-': 7, 'AB+': 10, 'AB-': 3, 'O+': 28, 'O-': 8 } },
  
  // Noida
  { id: 18, name: 'Red Cross Center', address: 'Sector 18, Noida', city: 'Noida', coordinates: { lat: 28.5355, lng: 77.3910 }, inventory: { 'A+': 22, 'A-': 6, 'B+': 18, 'B-': 4, 'AB+': 10, 'AB-': 3, 'O+': 30, 'O-': 9 } },
  { id: 19, name: 'Fortis Hospital', address: 'Sector 62, Noida', city: 'Noida', coordinates: { lat: 28.6098, lng: 77.3646 }, inventory: { 'A+': 19, 'A-': 5, 'B+': 17, 'B-': 6, 'AB+': 9, 'AB-': 3, 'O+': 26, 'O-': 8 } },
  
  // Gurgaon
  { id: 20, name: 'Medanta Hospital', address: 'Sector 38, Gurgaon', city: 'Gurgaon', coordinates: { lat: 28.4421, lng: 77.0414 }, inventory: { 'A+': 25, 'A-': 8, 'B+': 22, 'B-': 9, 'AB+': 12, 'AB-': 4, 'O+': 33, 'O-': 10 } },
];

// Calculate system statistics
const calculateStats = (bloodBanks) => {
  const stats = {
    totalUnits: 0,
    registeredDonors: 1250, // Mock number
    bloodGroupCounts: {},
    topShortage: { group: '', count: Infinity }
  };

  // Initialize blood group counts
  BLOOD_GROUPS.forEach(group => {
    stats.bloodGroupCounts[group] = 0;
  });

  // Calculate total units and group counts
  bloodBanks.forEach(bank => {
    BLOOD_GROUPS.forEach(group => {
      stats.bloodGroupCounts[group] += bank.inventory[group] || 0;
      stats.totalUnits += bank.inventory[group] || 0;
    });
  });

  // Find top shortage
  Object.entries(stats.bloodGroupCounts).forEach(([group, count]) => {
    if (count < stats.topShortage.count) {
      stats.topShortage = { group, count };
    }
  });

  return stats;
};

const MapView = () => {
  const mapRef = useRef(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('A+');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const stats = useMemo(() => calculateStats(bloodBanks.length > 0 ? bloodBanks : MOCK_BLOOD_BANKS), [bloodBanks]);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyDetails, setEmergencyDetails] = useState({
    patientName: '',
    contact: '',
    hospital: '',
    unitsNeeded: 1,
    message: ''
  });
  const markersRef = useRef([]);
  const mapInstanceRef = useRef(null);
  const infoWindowRef = useRef(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Initialize blood banks with timestamps
  useEffect(() => {
    const initBanks = MOCK_BLOOD_BANKS.map(bank => ({
      ...bank,
      lastUpdated: getRandomUpdateTime(),
      isOnline: Math.random() > 0.1 // 90% online
    }));
    setBloodBanks(initBanks);
  }, []);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      setBloodBanks(prevBanks => prevBanks.map(bank => {
        // Randomly update some inventories slightly
        const shouldUpdate = Math.random() > 0.7;
        if (shouldUpdate) {
          const newInventory = { ...bank.inventory };
          const randomBloodType = BLOOD_GROUPS[Math.floor(Math.random() * BLOOD_GROUPS.length)];
          const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          newInventory[randomBloodType] = Math.max(0, (newInventory[randomBloodType] || 0) + change);
          
          return {
            ...bank,
            inventory: newInventory,
            lastUpdated: new Date(),
            isOnline: Math.random() > 0.05 // 95% stay online
          };
        }
        return bank;
      }));
      setLastRefresh(new Date());
      toast.success('🔄 Blood bank data refreshed', { autoClose: 2000 });
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  useEffect(() => {
    // Initialize map when component mounts
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDstLnrDWvdGUGfDOJ5WksNERpWlc7Mkp8&libraries=places`;
      script.async = true;
      script.onload = () => {
        initializeMap();
      };
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    // Cleanup function
    return () => {
      // Clean up markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  // Display all banks when data loads
  useEffect(() => {
    if (bloodBanks.length > 0 && mapInstanceRef.current) {
      renderSearchMarkers(bloodBanks);
      setSearchResults(bloodBanks);
    }
  }, [bloodBanks]);

  const initializeMap = () => {
    if (!mapRef.current) return;
    
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 }, // Center of India
      zoom: 5,
    });
    mapInstanceRef.current = map;
    infoWindowRef.current = new window.google.maps.InfoWindow();
    
    // Add search box
    const searchBox = new window.google.maps.places.SearchBox(
      document.getElementById('search-input')
    );
    
    // Bias the SearchBox results towards current map's viewport
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });
    
    // Markers can be pushed into markersRef.current if needed
    
    // Create location button
    const locationButton = document.createElement('button');
    locationButton.textContent = 'Use My Location';
    locationButton.className = 'bg-white p-2 rounded shadow-md m-2';
    map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(locationButton);
    
    // Add click event for location button
    locationButton.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            
            // Center the map on the user's location
            map.setCenter(pos);
            map.setZoom(15);
            
            // Add a marker at the user's location
            new window.google.maps.Marker({
              position: pos,
              map: map,
              title: 'Your Location',
              icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              },
            });
          },
          () => {
            alert('Error: The Geolocation service failed.');
          }
        );
      } else {
        alert('Error: Your browser doesn\'t support geolocation.');
      }
    });
    
    // Helper to add markers could be added here when integrating real data

  };

  // Blood group change is handled inline in the select onChange
  const clearMarkers = () => {
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
  };

  const renderSearchMarkers = (banks) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    clearMarkers();
    const bounds = new window.google.maps.LatLngBounds();
    banks.forEach((bank) => {
      const units = bank.inventory[selectedBloodGroup] || 0;
      const marker = new window.google.maps.Marker({
        position: bank.coordinates,
        map,
        title: bank.name,
        icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
      });
      marker.addListener('click', () => {
        if (!infoWindowRef.current) return;
        
        // Build inventory display for all blood types
        let inventoryHTML = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:8px;">';
        BLOOD_GROUPS.forEach(group => {
          const groupUnits = bank.inventory[group] || 0;
          const isSelected = group === selectedBloodGroup;
          const bgColor = groupUnits === 0 ? '#fee2e2' : groupUnits < 10 ? '#fef3c7' : '#d1fae5';
          const textColor = groupUnits === 0 ? '#991b1b' : groupUnits < 10 ? '#92400e' : '#065f46';
          const border = isSelected ? 'border:2px solid #dc2626;' : '';
          inventoryHTML += `<div style="padding:4px;font-size:11px;background:${bgColor};color:${textColor};border-radius:4px;text-align:center;font-weight:500;${border}">
            ${group}<br>${groupUnits}
          </div>`;
        });
        inventoryHTML += '</div>';
        
        const directionsURL = `https://www.google.com/maps/dir/?api=1&destination=${bank.coordinates.lat},${bank.coordinates.lng}`;
        
        infoWindowRef.current.setContent(
          `<div style="max-width:280px;padding:8px;">
            <div style="font-weight:700;color:#dc2626;font-size:16px;margin-bottom:4px;">${bank.name}</div>
            <div style="font-size:12px;color:#6b7280;margin-bottom:8px;display:flex;align-items:center;gap:4px;">
              📍 ${bank.address}
            </div>
            <div style="font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Blood Availability:</div>
            ${inventoryHTML}
            <div style="margin-top:10px;">
              <a href="${directionsURL}" target="_blank" style="display:block;text-align:center;background:#2563eb;color:white;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;">
                🧭 Get Directions
              </a>
            </div>
          </div>`
        );
        infoWindowRef.current.open(map, marker);
      });
      markersRef.current.push(marker);
      bounds.extend(bank.coordinates);
    });
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      // Show all banks if no query
      setSearchResults(bloodBanks);
      renderSearchMarkers(bloodBanks);
      toast.info('Showing all blood banks');
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    
    // Enhanced search: Show ALL banks but sort by relevance
    const matched = [];
    const others = [];
    
    bloodBanks.forEach(bank => {
      const cityMatch = bank.city.toLowerCase().includes(query);
      const addressMatch = bank.address.toLowerCase().includes(query);
      const nameMatch = bank.name.toLowerCase().includes(query);
      
      if (cityMatch || addressMatch || nameMatch) {
        matched.push({ ...bank, isMatch: true, matchType: cityMatch ? 'city' : addressMatch ? 'address' : 'name' });
      } else {
        others.push({ ...bank, isMatch: false });
      }
    });

    // Combine: matched first, then others
    const allResults = [...matched, ...others];
    setSearchResults(allResults);
    
    // Render all markers but highlight matched ones
    renderSearchMarkers(allResults);
    
    if (matched.length > 0) {
      toast.success(`Found ${matched.length} match(es) in ${searchQuery} • Showing all ${allResults.length} banks`);
    } else {
      toast.info(`No exact matches for "${searchQuery}" • Showing all ${allResults.length} banks`);
    }
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      renderSearchMarkers(searchResults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBloodGroup]);

  const getStockStatus = (count) => {
    if (count === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (count < 5) return { text: 'Critical', color: 'bg-red-100 text-red-800' };
    if (count < 10) return { text: 'Low', color: 'bg-yellow-100 text-yellow-800' };
    if (count < 20) return { text: 'Medium', color: 'bg-blue-100 text-blue-800' };
    return { text: 'High', color: 'bg-green-100 text-green-800' };
  };

  const handleEmergencySubmit = (e) => {
    e.preventDefault();
    const message = `URGENT: Need ${selectedBloodGroup} blood for ${emergencyDetails.patientName} at ${emergencyDetails.hospital}. ${emergencyDetails.unitsNeeded} units required. Contact: ${emergencyDetails.contact}. ${emergencyDetails.message}`;
    console.log('Emergency request:', message);
    toast.success('Emergency appeal has been shared with registered donors');
    setShowEmergencyModal(false);
    setEmergencyDetails({
      patientName: '',
      contact: '',
      hospital: '',
      unitsNeeded: 1,
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Life Saver - Find Blood Banks</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Live Updates Panel */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 shadow rounded-lg p-4 border-2 border-green-200 dark:border-green-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-200">LIVE UPDATES</h3>
                </div>
                <button
                  onClick={() => {
                    setBloodBanks(prev => prev.map(bank => ({
                      ...bank,
                      lastUpdated: new Date()
                    })));
                    setLastRefresh(new Date());
                    toast.success('Data refreshed!');
                  }}
                  className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  🔄 Refresh
                </button>
              </div>
              <div className="text-xs text-green-700 dark:text-green-300 space-y-1">
                <div>✅ {bloodBanks.filter(b => b.isOnline).length}/{bloodBanks.length} banks online</div>
                <div>🕐 Last update: {getTimeSince(lastRefresh)}</div>
                <div className="flex items-center gap-2">
                  <span>Auto-refresh:</span>
                  <button
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      autoRefresh 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {autoRefresh ? 'ON (30s)' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>

            {/* Search Panel */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Search Blood Banks</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="blood-group" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Blood Group
                  </label>
                  <select
                    id="blood-group"
                    value={selectedBloodGroup}
                    onChange={(e) => setSelectedBloodGroup(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {BLOOD_GROUPS.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="search-input"
                    placeholder="Enter city (e.g., Delhi, Mumbai, Bangalore)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                    className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleSearch}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults(bloodBanks);
                      renderSearchMarkers(bloodBanks);
                      toast.success('Showing all blood banks');
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Show All
                  </button>
                </div>

                <button
                  onClick={() => navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                      };
                      
                      // Center the map on the user's location
                      const mapInstance = new window.google.maps.Map(mapRef.current, {
                        center: pos,
                        zoom: 15,
                      });
                      
                      // Add a marker at the user's location
                      const userMarker = new window.google.maps.Marker({
                        position: pos,
                        map: mapInstance,
                        title: 'Your Location',
                        icon: {
                          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        },
                      });
                      markersRef.current.push(userMarker);
                    },
                    () => {
                      alert('Error: The Geolocation service failed.');
                    }
                  )}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Use My Location
                </button>
              </div>
            </div>

            {/* Statistics Dashboard */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">System Statistics</h2>
              
              <div className="space-y-3">
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Units Available</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{stats.totalUnits}</p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">Registered Donors</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-300">{stats.registeredDonors.toLocaleString()}</p>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900 p-3 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">Top Shortage</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-300">
                    {stats.topShortage.group} ({stats.topShortage.count} units)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowEmergencyModal(true)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Send Emergency Appeal
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Map */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div ref={mapRef} className="h-96 w-full" />
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                          {searchQuery ? `Blood Banks in ${searchQuery}` : 'All Available Blood Banks'} ({searchResults.length})
                        </h3>
                        <span className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          LIVE
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Showing {selectedBloodGroup} blood availability • Updated {getTimeSince(lastRefresh)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-b-lg">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {searchResults.map((bank) => {
                      const units = bank.inventory[selectedBloodGroup] || 0;
                      const status = getStockStatus(units);
                      
                      return (
                        <li key={bank.id} className={`px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          bank.isMatch ? 'bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400' : ''
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                {bank.isMatch && (
                                  <span className="text-xs font-bold text-yellow-700 dark:text-yellow-300 bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded">
                                    ⭐ MATCH
                                  </span>
                                )}
                                <p className="text-base font-semibold text-red-600 dark:text-red-400">
                                  {bank.name}
                                </p>
                                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                  {bank.city}
                                </span>
                                <div className="flex items-center gap-1">
                                  <div className={`w-2 h-2 rounded-full ${bank.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {bank.isOnline ? 'Online' : 'Offline'}
                                  </span>
                                  {bank.lastUpdated && (
                                    <span className="text-xs text-gray-400">• {getTimeSince(bank.lastUpdated)}</span>
                                  )}
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                📍 {bank.address}
                              </p>
                              
                              {/* Show inventory for all blood types */}
                              <div className="mt-2 flex flex-wrap gap-2">
                                {BLOOD_GROUPS.map(group => {
                                  const groupUnits = bank.inventory[group] || 0;
                                  const groupStatus = getStockStatus(groupUnits);
                                  return (
                                    <div 
                                      key={group}
                                      className={`px-2 py-1 rounded text-xs font-medium ${
                                        group === selectedBloodGroup 
                                          ? 'ring-2 ring-red-500 ' + groupStatus.color
                                          : groupStatus.color
                                      }`}
                                    >
                                      {group}: {groupUnits}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 sm:ml-4 sm:flex-shrink-0">
                              <div className={`inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-semibold ${status.color}`}>
                                {selectedBloodGroup}: {units} units
                              </div>
                              <button
                                onClick={() => {
                                  const destination = `${bank.coordinates.lat},${bank.coordinates.lng}`;
                                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${bank.name}`, '_blank');
                                }}
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                              >
                                🧭 Get Directions
                              </button>
                              <button
                                onClick={() => {
                                  if (mapInstanceRef.current && infoWindowRef.current) {
                                    mapInstanceRef.current.setCenter(bank.coordinates);
                                    mapInstanceRef.current.setZoom(15);
                                    const marker = markersRef.current.find(m => 
                                      m.getPosition().lat() === bank.coordinates.lat
                                    );
                                    if (marker) {
                                      // Build inventory display for all blood types
                                      let inventoryHTML = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:8px;">';
                                      BLOOD_GROUPS.forEach(group => {
                                        const groupUnits = bank.inventory[group] || 0;
                                        const isSelected = group === selectedBloodGroup;
                                        const bgColor = groupUnits === 0 ? '#fee2e2' : groupUnits < 10 ? '#fef3c7' : '#d1fae5';
                                        const textColor = groupUnits === 0 ? '#991b1b' : groupUnits < 10 ? '#92400e' : '#065f46';
                                        const border = isSelected ? 'border:2px solid #dc2626;' : '';
                                        inventoryHTML += `<div style="padding:4px;font-size:11px;background:${bgColor};color:${textColor};border-radius:4px;text-align:center;font-weight:500;${border}">
                                          ${group}<br>${groupUnits}
                                        </div>`;
                                      });
                                      inventoryHTML += '</div>';
                                      
                                      const directionsURL = `https://www.google.com/maps/dir/?api=1&destination=${bank.coordinates.lat},${bank.coordinates.lng}`;
                                      
                                      infoWindowRef.current.setContent(
                                        `<div style="max-width:280px;padding:8px;">
                                          <div style="font-weight:700;color:#dc2626;font-size:16px;margin-bottom:4px;">${bank.name}</div>
                                          <div style="font-size:12px;color:#6b7280;margin-bottom:8px;display:flex;align-items:center;gap:4px;">
                                            📍 ${bank.address}
                                          </div>
                                          <div style="font-size:13px;font-weight:600;color:#374151;margin-bottom:6px;">Blood Availability:</div>
                                          ${inventoryHTML}
                                          <div style="margin-top:10px;">
                                            <a href="${directionsURL}" target="_blank" style="display:block;text-align:center;background:#2563eb;color:white;padding:8px 12px;border-radius:6px;text-decoration:none;font-size:13px;font-weight:600;">
                                              🧭 Get Directions
                                            </a>
                                          </div>
                                        </div>`
                                      );
                                      infoWindowRef.current.open(mapInstanceRef.current, marker);
                                    }
                                  }
                                }}
                                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                              >
                                🗺️ Show on Map
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Emergency Appeal Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                Send Emergency Blood Appeal
              </h3>
              
              <form onSubmit={handleEmergencySubmit} className="mt-2 space-y-4">
                <div>
                  <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    required
                    value={emergencyDetails.patientName}
                    onChange={(e) => setEmergencyDetails({...emergencyDetails, patientName: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      required
                      value={emergencyDetails.contact}
                      onChange={(e) => setEmergencyDetails({...emergencyDetails, contact: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="unitsNeeded" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                      Units Needed
                    </label>
                    <input
                      type="number"
                      id="unitsNeeded"
                      min="1"
                      value={emergencyDetails.unitsNeeded}
                      onChange={(e) => setEmergencyDetails({...emergencyDetails, unitsNeeded: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                    Hospital/Clinic Name
                  </label>
                  <input
                    type="text"
                    id="hospital"
                    required
                    value={emergencyDetails.hospital}
                    onChange={(e) => setEmergencyDetails({...emergencyDetails, hospital: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                    Additional Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows="3"
                    value={emergencyDetails.message}
                    onChange={(e) => setEmergencyDetails({...emergencyDetails, message: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Send Appeal
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmergencyModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
