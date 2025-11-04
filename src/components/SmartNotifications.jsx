import { useState, useEffect } from 'react';
import { Bell, BellRing, Check, X, AlertTriangle, Info, CheckCircle, Clock, Filter, Settings } from 'lucide-react';
import { toast } from 'react-toastify';

const SmartNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [settings, setSettings] = useState({
    emergency: true,
    donations: true,
    reminders: true,
    system: true,
    aiInsights: true
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Initialize with AI-generated smart notifications
    generateSmartNotifications();

    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        addNewNotification();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const generateSmartNotifications = () => {
    const notificationTypes = [
      {
        id: 1,
        type: 'emergency',
        priority: 'critical',
        title: 'Critical Blood Request',
        message: 'O- blood needed urgently at City Hospital. Patient in critical condition.',
        timestamp: new Date(Date.now() - 5 * 60000),
        read: false,
        action: 'Respond Now',
        aiScore: 98,
        location: 'City Hospital, 2.3 km away'
      },
      {
        id: 2,
        type: 'aiInsight',
        priority: 'high',
        title: 'AI Prediction Alert',
        message: 'Your blood type (A+) will be in high demand next week. Consider scheduling a donation.',
        timestamp: new Date(Date.now() - 30 * 60000),
        read: false,
        action: 'Schedule',
        aiScore: 87
      },
      {
        id: 3,
        type: 'donation',
        priority: 'medium',
        title: 'Donation Camp Nearby',
        message: 'Blood donation camp at Community Center tomorrow. You\'re eligible to donate!',
        timestamp: new Date(Date.now() - 2 * 3600000),
        read: false,
        action: 'Register',
        aiScore: 75,
        location: 'Community Center, 1.5 km away'
      },
      {
        id: 4,
        type: 'reminder',
        priority: 'low',
        title: 'Donation Reminder',
        message: 'It\'s been 3 months since your last donation. You\'re now eligible to donate again!',
        timestamp: new Date(Date.now() - 5 * 3600000),
        read: true,
        action: 'Find Camp',
        aiScore: 65
      },
      {
        id: 5,
        type: 'system',
        priority: 'low',
        title: 'Profile Updated',
        message: 'Your donor profile has been successfully updated with new health information.',
        timestamp: new Date(Date.now() - 24 * 3600000),
        read: true,
        aiScore: 40
      },
      {
        id: 6,
        type: 'aiInsight',
        priority: 'medium',
        title: 'Donation Impact Report',
        message: 'Your last donation helped save 3 lives! View your impact report.',
        timestamp: new Date(Date.now() - 48 * 3600000),
        read: false,
        action: 'View Report',
        aiScore: 82
      }
    ];

    setNotifications(notificationTypes);
  };

  const addNewNotification = () => {
    const newNotifications = [
      {
        type: 'emergency',
        priority: 'critical',
        title: 'New Emergency Request',
        message: 'B+ blood needed at Emergency Care Center. Match found in your area.',
        aiScore: 95,
        location: 'Emergency Care, 3.1 km away'
      },
      {
        type: 'aiInsight',
        priority: 'high',
        title: 'Smart Recommendation',
        message: 'Based on your history, donating today would be optimal for your health.',
        aiScore: 88
      },
      {
        type: 'donation',
        priority: 'medium',
        title: 'Thank You!',
        message: 'A patient received your blood donation and is recovering well.',
        aiScore: 70
      }
    ];

    const randomNotification = newNotifications[Math.floor(Math.random() * newNotifications.length)];
    const newNotif = {
      id: Date.now(),
      ...randomNotification,
      timestamp: new Date(),
      read: false,
      action: randomNotification.type === 'emergency' ? 'Respond' : 'View'
    };

    setNotifications(prev => [newNotif, ...prev]);
    
    // Show toast for high-priority notifications
    if (newNotif.priority === 'critical' || newNotif.priority === 'high') {
      toast.warning(newNotif.title);
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast.success('Notification deleted');
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  const handleAction = (notification) => {
    toast.success(`Action triggered: ${notification.action}`);
    markAsRead(notification.id);
  };

  const getIcon = (type) => {
    const icons = {
      emergency: <AlertTriangle className="text-red-500" />,
      aiInsight: <BellRing className="text-purple-500" />,
      donation: <CheckCircle className="text-green-500" />,
      reminder: <Clock className="text-blue-500" />,
      system: <Info className="text-gray-500" />
    };
    return icons[type] || <Bell />;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20',
      high: 'border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20',
      medium: 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
      low: 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
    };
    return colors[priority] || '';
  };

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="text-purple-600" size={32} />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Smart Notifications
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  AI-powered intelligent alerts
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Settings className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-3">
                {Object.entries(settings).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()} Notifications
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Filters and Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="emergency">Emergency</option>
                <option value="aiInsight">AI Insights</option>
                <option value="donation">Donations</option>
                <option value="reminder">Reminders</option>
                <option value="system">System</option>
              </select>
            </div>
            <button
              onClick={markAllAsRead}
              className="px-4 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
            >
              Mark all as read
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
              <Bell className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Notifications
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You're all caught up! Check back later for updates.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow ${getPriorityColor(notification.priority)} ${!notification.read ? 'ring-2 ring-purple-500' : ''}`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                            {notification.title}
                            {!notification.read && (
                              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          {notification.location && (
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 flex items-center gap-1">
                              <span>📍</span> {notification.location}
                            </p>
                          )}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                              title="Mark as read"
                            >
                              <Check size={16} className="text-green-600" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                            title="Delete"
                          >
                            <X size={16} className="text-red-600" />
                          </button>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <span>{getTimeAgo(notification.timestamp)}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            🤖 AI Score: {notification.aiScore}%
                          </span>
                          <span>•</span>
                          <span className={`px-2 py-0.5 rounded-full ${
                            notification.priority === 'critical' ? 'bg-red-100 text-red-700' :
                            notification.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                            notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {notification.priority}
                          </span>
                        </div>
                        {notification.action && (
                          <button
                            onClick={() => handleAction(notification)}
                            className="px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                          >
                            {notification.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartNotifications;
