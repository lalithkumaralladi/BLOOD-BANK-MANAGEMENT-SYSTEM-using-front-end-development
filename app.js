// Blood Bank Management System JavaScript

// Application Data
const appData = {
  cities: [
    {
      name: "Hyderabad",
      hospitals: [
        {
          name: "Apollo Hospitals, Jubilee Hills",
          address: "Road No. 72, Jubilee Hills, Hyderabad, Telangana 500096",
          phone: "+91-40-2355-1066",
          emergency: "108",
          distance: "5.2 km from city center",
          available24x7: true,
          bloodTypes: {
            "A+": 45, "A-": 12, "B+": 38, "B-": 8, "AB+": 15, "AB-": 4, "O+": 67, "O-": 18
          },
          rating: 4.8,
          emergencyStock: true
        },
        {
          name: "Continental Hospitals",
          address: "IT Park Rd, Nanakram Guda, Gachibowli, Hyderabad 500032",
          phone: "+91-40-6770-3300",
          emergency: "102",
          distance: "8.7 km from city center",
          available24x7: true,
          bloodTypes: {
            "A+": 32, "A-": 7, "B+": 41, "B-": 11, "AB+": 9, "AB-": 2, "O+": 53, "O-": 14
          },
          rating: 4.6,
          emergencyStock: false
        },
        {
          name: "Nizam's Institute of Medical Sciences (NIMS)",
          address: "Punjagutta, Hyderabad, Telangana 500082",
          phone: "+91-40-2348-8001",
          emergency: "108",
          distance: "3.1 km from city center",
          available24x7: true,
          bloodTypes: {
            "A+": 28, "A-": 5, "B+": 34, "B-": 6, "AB+": 12, "AB-": 3, "O+": 49, "O-": 9
          },
          rating: 4.5,
          emergencyStock: true
        }
      ]
    },
    {
      name: "Delhi",
      hospitals: [
        {
          name: "All India Institute of Medical Sciences (AIIMS)",
          address: "Sri Aurobindo Marg, Ansari Nagar, New Delhi 110029",
          phone: "+91-11-2658-8500",
          emergency: "1066",
          distance: "2.5 km from city center",
          available24x7: true,
          bloodTypes: {
            "A+": 78, "A-": 23, "B+": 65, "B-": 19, "AB+": 31, "AB-": 8, "O+": 92, "O-": 27
          },
          rating: 4.9,
          emergencyStock: true
        },
        {
          name: "Fortis Hospital, Vasant Kunj",
          address: "Pocket A-1, Sector B, Vasant Kunj, New Delhi 110070",
          phone: "+91-11-4277-6222",
          emergency: "102",
          distance: "7.3 km from city center",
          available24x7: true,
          bloodTypes: {
            "A+": 44, "A-": 15, "B+": 39, "B-": 12, "AB+": 18, "AB-": 5, "O+": 61, "O-": 21
          },
          rating: 4.7,
          emergencyStock: true
        }
      ]
    },
    {
      name: "Mumbai",
      hospitals: [
        {
          name: "Tata Memorial Hospital",
          address: "Dr. E Borges Road, Parel, Mumbai, Maharashtra 400012",
          phone: "+91-22-2417-7000",
          emergency: "108",
          distance: "4.8 km from city center",
          available24x7: true,
          bloodTypes: {
            "A+": 56, "A-": 18, "B+": 47, "B-": 14, "AB+": 22, "AB-": 6, "O+": 71, "O-": 24
          },
          rating: 4.8,
          emergencyStock: true
        },
        {
          name: "Kokilaben Dhirubhai Ambani Hospital",
          address: "Rao Saheb Achutrao Patwardhan Marg, Four Bunglows, Andheri West, Mumbai 400053",
          phone: "+91-22-4269-6969",
          emergency: "1066",
          distance: "12.1 km from city center",
          available24x7: true,
          bloodTypes: {
            "A+": 41, "A-": 13, "B+": 35, "B-": 9, "AB+": 16, "AB-": 4, "O+": 58, "O-": 19
          },
          rating: 4.6,
          emergencyStock: false
        }
      ]
    },
    {
      name: "Bangalore",
      hospitals: [
        {
          name: "Manipal Hospital, Old Airport Road",
          address: "98, Rustum Bagh, Old Airport Road, Bengaluru, Karnataka 560017",
          phone: "+91-80-2502-4444",
          emergency: "108",
          distance: "6.4 km from city center",
          available24x7: true,
          bloodTypes: {
            "A+": 39, "A-": 11, "B+": 33, "B-": 8, "AB+": 14, "AB-": 3, "O+": 52, "O-": 16
          },
          rating: 4.7,
          emergencyStock: true
        }
      ]
    }
  ],
  recentDonors: [
    {
      name: "Rajesh Kumar",
      bloodType: "O+",
      city: "Hyderabad",
      donationTime: "2 minutes ago",
      hospital: "Apollo Hospitals",
      isFirstTime: false,
      totalDonations: 8
    },
    {
      name: "Priya Sharma",
      bloodType: "A-",
      city: "Delhi",
      donationTime: "5 minutes ago",
      hospital: "AIIMS",
      isFirstTime: true,
      totalDonations: 1
    },
    {
      name: "Amit Patel",
      bloodType: "B+",
      city: "Mumbai",
      donationTime: "12 minutes ago",
      hospital: "Tata Memorial",
      isFirstTime: false,
      totalDonations: 15
    },
    {
      name: "Sneha Reddy",
      bloodType: "AB+",
      city: "Hyderabad",
      donationTime: "18 minutes ago",
      hospital: "Continental Hospitals",
      isFirstTime: false,
      totalDonations: 3
    },
    {
      name: "Vikram Singh",
      bloodType: "O-",
      city: "Delhi",
      donationTime: "25 minutes ago",
      hospital: "Fortis Vasant Kunj",
      isFirstTime: false,
      totalDonations: 22
    }
  ],
  statistics: {
    totalDonors: 125437,
    bloodUnitsCollected: 89234,
    livesHelped: 267891,
    hospitalPartners: 2846,
    activeCamps: 156
  },
  urgentRequests: [
    "O- blood urgently needed at Apollo Hospitals, Hyderabad for emergency surgery",
    "AB+ platelets required at AIIMS, Delhi for cancer patient",
    "B- blood needed at Tata Memorial, Mumbai for accident victim"
  ],
  bloodDrives: [
    {
      title: "Mega Blood Donation Camp",
      date: "2024-10-15",
      location: "Hyderabad Convention Center",
      organizer: "Indian Red Cross Society",
      registrations: 450
    },
    {
      title: "Corporate Blood Drive",
      date: "2024-10-20",
      location: "Tech Mahindra Campus, Pune",
      organizer: "Tech Mahindra Foundation",
      registrations: 280
    }
  ]
};

// Global variables
let currentTheme = 'light';
let urgentRequestIndex = 0;
let donationChart = null;

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const citySearch = document.getElementById('citySearch');
const searchResults = document.getElementById('searchResults');
const donationTicker = document.getElementById('donationTicker');
const urgentText = document.getElementById('urgentText');
const emergencyRequests = document.getElementById('emergencyRequests');
const bloodDrivesContainer = document.getElementById('bloodDrives');
const donorModal = document.getElementById('donorModal');
const notification = document.getElementById('notification');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
  setupEventListeners();
  updateStatistics();
  populateRecentDonors();
  rotateUrgentRequests();
  populateEmergencyRequests();
  populateBloodDrives();
  createBloodChart();
  setupCityAutocomplete();
  
  // Ensure mobile menu is properly hidden on load
  hideMobileMenu();
  
  // Start real-time updates
  setInterval(updateStatistics, 30000); // Update stats every 30 seconds
  setInterval(rotateUrgentRequests, 5000); // Rotate urgent requests every 5 seconds
  setInterval(addNewDonation, 45000); // Add new donation every 45 seconds
});

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    currentTheme = savedTheme;
  } else {
    currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  applyTheme();
}

function applyTheme() {
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  const themeIcon = currentTheme === 'dark' ? '☀️' : '🌓';
  if (themeToggle) themeToggle.textContent = themeIcon;
  if (themeToggleMobile) themeToggleMobile.textContent = themeIcon;
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
  applyTheme();
  
  // Recreate chart with new theme
  if (donationChart) {
    donationChart.destroy();
    createBloodChart();
  }
}

// Mobile Menu Management
function showMobileMenu() {
  if (mobileMenu && mobileMenuOverlay) {
    mobileMenuOverlay.classList.remove('hidden');
    mobileMenu.classList.remove('hidden');
    // Small delay to ensure proper animation
    setTimeout(() => {
      mobileMenu.classList.add('show');
    }, 10);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
  }
}

function hideMobileMenu() {
  if (mobileMenu && mobileMenuOverlay) {
    mobileMenu.classList.remove('show');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      mobileMenuOverlay.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }
}

function toggleMobileMenu() {
  if (mobileMenu && mobileMenu.classList.contains('hidden')) {
    showMobileMenu();
  } else {
    hideMobileMenu();
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // Add click event for 'Find Blood' button
  const findBloodBtn = document.querySelector('.hero .btn--primary');
  if (findBloodBtn) {
    findBloodBtn.addEventListener('click', () => {
      document.getElementById('find-blood').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Add click event for 'Become a Donor' button
  const becomeDonorBtn = document.querySelector('.hero .btn--outline');
  if (becomeDonorBtn) {
    becomeDonorBtn.addEventListener('click', () => {
      openDonorForm();
    });
  }
  // Theme toggle handlers
  themeToggle?.addEventListener('click', toggleTheme);
  themeToggleMobile?.addEventListener('click', toggleTheme);
  
  // Mobile menu handlers
  mobileMenuBtn?.addEventListener('click', function(e) {
    e.stopPropagation();
    showMobileMenu();
  });
  
  mobileMenuClose?.addEventListener('click', function(e) {
    e.stopPropagation();
    hideMobileMenu();
  });
  
  // Close mobile menu when clicking overlay
  mobileMenuOverlay?.addEventListener('click', hideMobileMenu);
  
  // Prevent menu close when clicking inside menu
  mobileMenu?.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  // Close mobile menu when clicking outside (fallback)
  document.addEventListener('click', function(e) {
    if (mobileMenu && !mobileMenu.classList.contains('hidden') && 
        !mobileMenuBtn?.contains(e.target) && !mobileMenu.contains(e.target)) {
      hideMobileMenu();
    }
  });
  
  // Search handlers
  citySearch?.addEventListener('input', handleCitySearch);
  citySearch?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchHospitals();
    }
  });
  
  // Navigation link handlers
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
      
      // Close mobile menu if open
      hideMobileMenu();
    });
  });
  
  // Form submissions
  document.getElementById('contactForm')?.addEventListener('submit', handleContactForm);
  document.getElementById('donorForm')?.addEventListener('submit', handleDonorForm);
  
  // Handle window resize to close mobile menu on larger screens
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      hideMobileMenu();
    }
  });
  
  // Escape key handler
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        hideMobileMenu();
      }
      if (donorModal && !donorModal.classList.contains('hidden')) {
        closeDonorForm();
      }
    }
  });
}

// City Search and Hospital Display
function setupCityAutocomplete() {
  const cities = appData.cities.map(city => city.name);
  
  citySearch?.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    if (value.length > 0) {
      const suggestions = cities.filter(city => 
        city.toLowerCase().includes(value)
      );
      // Could implement dropdown suggestions here
    }
  });
}

function handleCitySearch() {
  const searchTerm = citySearch.value.trim();
  if (searchTerm.length > 2) {
    const results = searchCityHospitals(searchTerm);
    if (results.length > 0) {
      displaySearchResults(results);
    }
  } else if (searchTerm.length === 0) {
    showNoResults();
  }
}

function searchHospitals() {
  const cityName = citySearch.value.trim();
  const bloodTypeFilter = document.getElementById('bloodTypeFilter')?.value;
  const urgencyFilter = document.getElementById('urgencyFilter')?.value;
  
  if (!cityName) {
    showNotification('Please enter a city name', 'error');
    return;
  }
  
  const cityData = appData.cities.find(city => 
    city.name.toLowerCase().includes(cityName.toLowerCase())
  );
  
  if (!cityData) {
    showNoResults(`No hospitals found in "${cityName}". Try: Delhi, Mumbai, Hyderabad, or Bangalore.`);
    return;
  }
  
  let hospitals = cityData.hospitals;
  
  // Apply filters
  if (bloodTypeFilter) {
    hospitals = hospitals.filter(hospital => 
      hospital.bloodTypes[bloodTypeFilter] > 0
    );
  }
  
  if (urgencyFilter === 'emergency') {
    hospitals = hospitals.filter(hospital => hospital.emergencyStock);
  } else if (urgencyFilter === '24x7') {
    hospitals = hospitals.filter(hospital => hospital.available24x7);
  }
  
  if (hospitals.length === 0) {
    showNoResults(`No hospitals match your criteria in ${cityData.name}.`);
    return;
  }
  
  displaySearchResults(hospitals, cityData.name);
  showNotification(`Found ${hospitals.length} hospital(s) in ${cityData.name}`, 'success');
}

function searchCityHospitals(searchTerm) {
  const cityData = appData.cities.find(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return cityData ? cityData.hospitals : [];
}

function displaySearchResults(hospitals, cityName = '') {
  if (!searchResults) return;
  
  const hospitalGrid = document.createElement('div');
  hospitalGrid.className = 'hospital-grid';
  
  hospitals.forEach(hospital => {
    const hospitalCard = createHospitalCard(hospital);
    hospitalGrid.appendChild(hospitalCard);
  });
  
  searchResults.innerHTML = '';
  if (cityName) {
    const header = document.createElement('h3');
    header.textContent = `Hospitals in ${cityName}`;
    header.style.marginBottom = 'var(--space-24)';
    searchResults.appendChild(header);
  }
  searchResults.appendChild(hospitalGrid);
}

function createHospitalCard(hospital) {
  const card = document.createElement('div');
  card.className = 'hospital-card';
  
  // Generate stars for rating
  const stars = '★'.repeat(Math.floor(hospital.rating)) + 
                '☆'.repeat(5 - Math.floor(hospital.rating));
  
  card.innerHTML = `
    <div class="hospital-header">
      <div class="hospital-info">
        <h3>${hospital.name}</h3>
        <div class="hospital-address">${hospital.address}</div>
        <div class="hospital-distance">${hospital.distance}</div>
      </div>
      <div class="hospital-badges">
        <div class="hospital-rating">
          <span class="rating-stars">${stars}</span>
          <span>${hospital.rating}</span>
        </div>
        ${hospital.available24x7 ? '<div class="availability-badge">24×7 Available</div>' : ''}
        ${hospital.emergencyStock ? '<div class="availability-badge emergency-stock">Emergency Stock</div>' : ''}
      </div>
    </div>
    
    <div class="blood-availability">
      <h4>Available Blood Types</h4>
      <div class="blood-types-grid">
        ${Object.entries(hospital.bloodTypes).map(([type, quantity]) => `
          <div class="blood-type-item ${quantity < 10 ? 'low-stock' : ''}">
            <div class="blood-type">${type}</div>
            <div class="blood-quantity">${quantity} units</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="hospital-contact">
      <div class="contact-info">
        <div>📞 ${hospital.phone}</div>
        <div>🚨 Emergency: ${hospital.emergency}</div>
      </div>
      <div class="contact-actions">
        <button class="btn btn--primary btn--sm" onclick="callHospital('${hospital.phone}')">
          Call Now
        </button>
        <button class="btn btn--outline btn--sm" onclick="requestBlood('${hospital.name}')">
          Request Blood
        </button>
      </div>
    </div>
  `;
  
  return card;
}

function showNoResults(message = 'Enter a city name to find nearby hospitals and blood banks') {
  if (!searchResults) return;
  
  searchResults.innerHTML = `
    <div class="no-results">
      <div class="no-results-icon">🏥</div>
      <p>${message}</p>
    </div>
  `;
}

// Blood Compatibility Checker
function checkCompatibility() {
  const donorType = document.getElementById('donorBloodType')?.value;
  const recipientType = document.getElementById('recipientBloodType')?.value;
  const resultDiv = document.getElementById('compatibilityResult');
  
  if (!donorType || !recipientType || !resultDiv) {
    showNotification('Please select both blood types', 'error');
    return;
  }
  
  const compatible = isBloodCompatible(donorType, recipientType);
  
  resultDiv.className = `compatibility-result ${compatible ? 'compatible' : 'incompatible'}`;
  resultDiv.innerHTML = compatible ? 
    `✅ ${donorType} blood is compatible with ${recipientType} recipient` :
    `❌ ${donorType} blood is NOT compatible with ${recipientType} recipient`;
}

function isBloodCompatible(donor, recipient) {
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
}

// Donor Management
function populateRecentDonors() {
  if (!donationTicker) return;
  
  donationTicker.innerHTML = '';
  
  appData.recentDonors.forEach((donor, index) => {
    setTimeout(() => {
      const donationItem = createDonationItem(donor);
      donationTicker.appendChild(donationItem);
    }, index * 200); // Stagger the animations
  });
}

function createDonationItem(donor) {
  const item = document.createElement('div');
  item.className = 'donation-item';
  
  const avatars = ['👨‍⚕️', '👩‍⚕️', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓'];
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
  
  item.innerHTML = `
    <div class="donor-avatar">${randomAvatar}</div>
    <div class="donation-details">
      <h4>${donor.name}</h4>
      <div class="donation-meta">
        <span class="blood-type-badge">${donor.bloodType}</span>
        <span class="donation-time">${donor.donationTime}</span>
        ${donor.isFirstTime ? '<span class="first-time-badge">First Time!</span>' : ''}
      </div>
      <div class="donation-location">${donor.hospital}, ${donor.city}</div>
    </div>
    <div class="donation-count">
      ${donor.totalDonations} donations
    </div>
  `;
  
  return item;
}

function addNewDonation() {
  if (!donationTicker) return;
  
  // Generate a new random donation
  const names = ['Arjun Mehta', 'Kavya Sharma', 'Rohit Singh', 'Ananya Gupta', 'Siddharth Rao'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const cities = ['Delhi', 'Mumbai', 'Hyderabad', 'Bangalore'];
  const hospitals = ['City Hospital', 'Medical Center', 'General Hospital', 'Specialty Clinic'];
  
  const newDonor = {
    name: names[Math.floor(Math.random() * names.length)],
    bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    donationTime: 'Just now',
    hospital: hospitals[Math.floor(Math.random() * hospitals.length)],
    isFirstTime: Math.random() > 0.7,
    totalDonations: Math.floor(Math.random() * 20) + 1
  };
  
  const newItem = createDonationItem(newDonor);
  donationTicker.insertBefore(newItem, donationTicker.firstChild);
  
  // Remove old items to keep the list manageable
  if (donationTicker.children.length > 10) {
    donationTicker.removeChild(donationTicker.lastChild);
  }
  
  showNotification(`New donation by ${newDonor.name} (${newDonor.bloodType})`, 'success');
}

// Statistics Updates
function updateStatistics() {
  const stats = appData.statistics;
  
  // Simulate real-time growth
  stats.totalDonors += Math.floor(Math.random() * 3) + 1;
  stats.bloodUnitsCollected += Math.floor(Math.random() * 5) + 1;
  stats.livesHelped += Math.floor(Math.random() * 2) + 1;
  
  // Animate counter updates
  animateCounter('totalDonors', stats.totalDonors);
  animateCounter('bloodUnits', stats.bloodUnitsCollected);
  animateCounter('livesHelped', stats.livesHelped);
  animateCounter('hospitalPartners', stats.hospitalPartners);
}

function animateCounter(elementId, targetValue) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const currentValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
  const increment = Math.ceil((targetValue - currentValue) / 20);
  
  if (currentValue < targetValue) {
    const newValue = Math.min(currentValue + increment, targetValue);
    element.textContent = newValue.toLocaleString();
    
    if (newValue < targetValue) {
      setTimeout(() => animateCounter(elementId, targetValue), 50);
    }
  }
}

// Urgent Requests Rotation
function rotateUrgentRequests() {
  if (!urgentText || !appData.urgentRequests.length) return;
  
  urgentText.textContent = appData.urgentRequests[urgentRequestIndex];
  urgentRequestIndex = (urgentRequestIndex + 1) % appData.urgentRequests.length;
}

// Emergency Requests
function populateEmergencyRequests() {
  if (!emergencyRequests) return;
  
  emergencyRequests.innerHTML = '';
  
  appData.urgentRequests.forEach((request, index) => {
    const item = document.createElement('div');
    item.className = 'emergency-item';
    
    const timeAgo = ['5 minutes ago', '12 minutes ago', '1 hour ago'][index] || 'Recently';
    
    item.innerHTML = `
      <div class="emergency-text">${request}</div>
      <div class="emergency-time">Posted: ${timeAgo}</div>
    `;
    
    emergencyRequests.appendChild(item);
  });
}

// Blood Drives
function populateBloodDrives() {
  if (!bloodDrivesContainer) return;
  
  bloodDrivesContainer.innerHTML = '';
  
  appData.bloodDrives.forEach(drive => {
    const card = document.createElement('div');
    card.className = 'drive-card';
    
    const date = new Date(drive.date);
    const formattedDate = date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    card.innerHTML = `
      <h4 class="drive-title">${drive.title}</h4>
      <div class="drive-details">
        <div>📅 ${formattedDate}</div>
        <div>📍 ${drive.location}</div>
        <div>🏢 ${drive.organizer}</div>
      </div>
      <div class="drive-registrations">
        <span class="registration-count">${drive.registrations} registered</span>
        <button class="btn btn--primary btn--sm" onclick="registerForDrive('${drive.title}')">
          Register
        </button>
      </div>
    `;
    
    bloodDrivesContainer.appendChild(card);
  });
}

// Charts
function createBloodChart() {
  const canvas = document.getElementById('bloodChart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  const isDark = currentTheme === 'dark';
  const textColor = isDark ? '#f5f5f5' : '#134252';
  const gridColor = isDark ? 'rgba(119, 124, 124, 0.3)' : 'rgba(94, 82, 64, 0.2)';
  
  donationChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      datasets: [{
        label: 'Units Collected This Month',
        data: [1250, 890, 1180, 720, 560, 340, 1850, 980],
        backgroundColor: [
          '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', 
          '#5D878F', '#DB4545', '#D2BA4C', '#964325'
        ],
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
          }
        },
        x: {
          ticks: {
            color: textColor
          },
          grid: {
            color: gridColor
          }
        }
      }
    }
  });
}

// Modal Functions
function openDonorForm() {
  const modal = document.getElementById('donorModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  } else {
    // If modal doesn't exist, redirect to register page
    window.location.href = 'register.html';
  }
}

function closeDonorForm() {
  const modal = document.getElementById('donorModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Re-enable scrolling
  }
}

function openEmergencyForm() {
  showNotification('Emergency form feature coming soon! Call 108 for immediate help.', 'info');
}

function openVolunteerForm() {
  showNotification('Volunteer registration feature coming soon!', 'info');
}

// Form Handlers
function handleContactForm(e) {
  e.preventDefault();
  showNotification('Thank you for your message! We will get back to you soon.', 'success');
  e.target.reset();
}

function handleDonorForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
  
  showNotification(`Thank you ${name}! Your donor registration has been submitted.`, 'success');
  closeDonorForm();
  e.target.reset();
}

// Utility Functions
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = 70; // Account for fixed navbar
    const elementPosition = element.offsetTop - navHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}

function showNotification(message, type = 'info') {
  if (!notification) return;
  
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  
  const notificationIcon = notification.querySelector('.notification-icon');
  const notificationText = notification.querySelector('.notification-text');
  
  if (notificationIcon) notificationIcon.textContent = icons[type] || icons.info;
  if (notificationText) notificationText.textContent = message;
  
  notification.className = `notification show ${type}`;
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 4000);
}

function callHospital(phoneNumber) {
  window.open(`tel:${phoneNumber}`, '_self');
}

function requestBlood(hospitalName) {
  showNotification(`Blood request sent to ${hospitalName}. They will contact you shortly.`, 'success');
}

function registerForDrive(driveTitle) {
  showNotification(`Successfully registered for ${driveTitle}!`, 'success');
}

// Login Modal Logic
document.addEventListener('DOMContentLoaded', function() {
  const loginModal = document.getElementById('loginModal');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const loginForm = document.getElementById('loginForm');

  // Show login modal when clicking Login in nav (add this button in HTML if needed)
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    const loginBtn = document.createElement('a');
    loginBtn.href = '#login';
    loginBtn.className = 'nav-link';
    loginBtn.textContent = 'Login';
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      loginModal.classList.remove('hidden');
    });
    navMenu.appendChild(loginBtn);
  }

  // Close modal
  if (closeLoginModal) {
    closeLoginModal.addEventListener('click', function() {
      loginModal.classList.add('hidden');
    });
  }

  // Handle login form submit
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      // TODO: Send login request to backend
      showNotification('Login attempted for ' + email, 'info');
      loginModal.classList.add('hidden');
    });
  }
});