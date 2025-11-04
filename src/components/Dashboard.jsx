import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showKnowledgeModal, setShowKnowledgeModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateForm, setDonateForm] = useState({
    name: '',
    bloodGroup: user?.bloodGroup || 'A+',
    contact: '',
    city: '',
    availableDate: '',
    notes: ''
  });
  const [emergencyText, setEmergencyText] = useState('');

  const generateEmergencyAppeal = () => {
    const appeal = `URGENT: Need ${user?.bloodGroup || 'blood'} donors in your area. Your donation can save a life! #DonateBlood #SaveLives`;
    setEmergencyText(appeal);
    setShowEmergencyModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emergencyText);
    alert('Copied to clipboard!');
  };

  const handleDonateChange = (e) => {
    const { name, value } = e.target;
    setDonateForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    setShowDonateModal(false);
    toast.success(`Thanks ${donateForm.name || 'Donor'}! We'll contact you in ${donateForm.city}.`, { autoClose: 4000 });
    setDonateForm({ name: '', bloodGroup: user?.bloodGroup || 'A+', contact: '', city: '', availableDate: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">Life Saver</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3 py-2 rounded-md text-sm font-medium bg-red-100 text-red-700"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/map')}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Find Blood Banks
            </button>
            <button
              onClick={() => navigate('/ai-hub')}
              className="px-3 py-2 rounded-md text-sm font-medium text-purple-700 hover:bg-purple-100 flex items-center gap-1"
            >
              🤖 AI Tools
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name || 'User'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                <h3 className="text-lg font-medium text-red-800">Donate Blood</h3>
                <p className="mt-2 text-sm text-red-600">Pledge to donate blood and help save lives.</p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setShowDonateModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Pledge to Donate
                  </button>
                  <button
                    onClick={() => navigate('/map')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Find Donation Centers
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800">Request Blood</h3>
                <p className="mt-2 text-sm text-blue-600">Need blood? Find donors and blood banks near you.</p>
                <button
                  onClick={() => navigate('/map')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Find Blood Banks
                </button>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-lg font-medium text-green-800">Emergency Appeal</h3>
                <p className="mt-2 text-sm text-green-600">Create an emergency blood request to share on social media.</p>
                <button
                  onClick={generateEmergencyAppeal}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Create Appeal
                </button>
              </div>
            </div>

            {/* AI Tools Highlight Section */}
            <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">🤖</span>
                    <h3 className="text-2xl font-bold">Powered by AI</h3>
                  </div>
                  <p className="text-purple-100 mb-4">
                    Access cutting-edge AI tools: Smart Donor Matching, Blood Demand Prediction, 
                    Analytics Dashboard, Natural Language Search, and more!
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate('/ai-hub')}
                      className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      Explore AI Tools
                    </button>
                    <div className="px-4 py-3 bg-purple-600 bg-opacity-50 rounded-lg">
                      <span className="text-sm font-medium">94.5% AI Accuracy</span>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block ml-8">
                  <div className="text-6xl">🧠✨</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => setShowKnowledgeModal(true)}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md transition-shadow text-left"
                >
                  <h4 className="font-medium text-gray-900">Blood Donation FAQs</h4>
                  <p className="mt-1 text-sm text-gray-500">Get answers to common questions about blood donation.</p>
                </button>
                <button
                  onClick={() => {
                    navigate('/map');
                  }}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md transition-shadow text-left"
                >
                  <h4 className="font-medium text-gray-900">Find {user?.bloodGroup || 'Your'} Blood Type</h4>
                  <p className="mt-1 text-sm text-gray-500">Locate blood banks with your blood type in stock.</p>
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md transition-shadow text-left"
                >
                  <h4 className="font-medium text-gray-900">Update Profile</h4>
                  <p className="mt-1 text-sm text-gray-500">Keep your information and preferences up to date.</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Emergency Appeal Modal */}
      {showEmergencyModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Emergency Blood Appeal
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Share this message on social media to request urgent blood donations:
                      </p>
                      <div className="mt-4 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-800">{emergencyText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Copy to Clipboard
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmergencyModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Base Modal */}
      {showKnowledgeModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Blood Donation Knowledge Base
                    </h3>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        Learn more about blood donation and how you can help save lives.
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="p-3 bg-gray-50 rounded-md">
                          <h4 className="font-medium text-gray-900">Who can donate blood?</h4>
                          <p className="mt-1 text-sm text-gray-600">
                            Most people can donate blood if they are in good health, weigh at least 50 kg, and are between 18-65 years old.
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md">
                          <h4 className="font-medium text-gray-900">How often can I donate?</h4>
                          <p className="mt-1 text-sm text-gray-600">
                            You can donate whole blood every 56 days. Platelet donations can be made more frequently.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowKnowledgeModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Donate Blood Modal */}
      {showDonateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 1.567 3 3.5S13 16 12 18c-1-2-3-3.843-3-6.5S10.343 8 12 8z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Pledge to Donate Blood
                    </h3>
                    <form onSubmit={handleDonateSubmit} className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={donateForm.name}
                          onChange={handleDonateChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                          <select
                            name="bloodGroup"
                            value={donateForm.bloodGroup}
                            onChange={handleDonateChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          >
                            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(g => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Available Date</label>
                          <input
                            type="date"
                            name="availableDate"
                            value={donateForm.availableDate}
                            onChange={handleDonateChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">City</label>
                          <input
                            type="text"
                            name="city"
                            value={donateForm.city}
                            onChange={handleDonateChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                          <input
                            type="tel"
                            name="contact"
                            value={donateForm.contact}
                            onChange={handleDonateChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
                        <textarea
                          name="notes"
                          rows="3"
                          value={donateForm.notes}
                          onChange={handleDonateChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-0 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowDonateModal(false)}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
