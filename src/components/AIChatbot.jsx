import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { toast } from 'react-toastify';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Blood Bank Assistant. I can help you with:\n• Finding blood banks near you\n• Blood donation information\n• Emergency requests\n• Blood type compatibility\n• Donor eligibility\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Knowledge Base
  const aiKnowledgeBase = {
    greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    bloodTypes: ['a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-'],
    emergencyKeywords: ['emergency', 'urgent', 'critical', 'asap', 'immediate'],
    donationKeywords: ['donate', 'donation', 'donor', 'give blood'],
    eligibilityKeywords: ['eligible', 'eligibility', 'can i donate', 'qualify'],
    locationKeywords: ['near me', 'nearby', 'closest', 'location', 'find'],
    compatibilityKeywords: ['compatible', 'compatibility', 'can receive', 'can give']
  };

  const bloodCompatibility = {
    'o-': { canGiveTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-'] },
    'o+': { canGiveTo: ['O+', 'A+', 'B+', 'AB+'], canReceiveFrom: ['O-', 'O+'] },
    'a-': { canGiveTo: ['A-', 'A+', 'AB-', 'AB+'], canReceiveFrom: ['O-', 'A-'] },
    'a+': { canGiveTo: ['A+', 'AB+'], canReceiveFrom: ['O-', 'O+', 'A-', 'A+'] },
    'b-': { canGiveTo: ['B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-', 'B-'] },
    'b+': { canGiveTo: ['B+', 'AB+'], canReceiveFrom: ['O-', 'O+', 'B-', 'B+'] },
    'ab-': { canGiveTo: ['AB-', 'AB+'], canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'] },
    'ab+': { canGiveTo: ['AB+'], canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] }
  };

  // AI Response Generator
  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Greeting detection
    if (aiKnowledgeBase.greetings.some(greeting => lowerMessage.includes(greeting))) {
      return "Hello! How can I help you with blood donation or finding blood banks today?";
    }

    // Emergency detection
    if (aiKnowledgeBase.emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "🚨 For emergency blood requests:\n\n1. Click on 'Send Emergency Appeal' on the dashboard\n2. Fill in the required details\n3. We'll immediately notify nearby donors\n4. You can also call our 24/7 emergency hotline: 1800-BLOOD-HELP\n\nIs this a critical situation requiring immediate assistance?";
    }

    // Blood type compatibility
    if (aiKnowledgeBase.compatibilityKeywords.some(keyword => lowerMessage.includes(keyword))) {
      const bloodType = aiKnowledgeBase.bloodTypes.find(type => lowerMessage.includes(type));
      if (bloodType) {
        const compat = bloodCompatibility[bloodType];
        return `Blood Type ${bloodType.toUpperCase()} Compatibility:\n\n✓ Can donate to: ${compat.canGiveTo.join(', ')}\n✓ Can receive from: ${compat.canReceiveFrom.join(', ')}\n\nNote: ${bloodType === 'o-' ? 'Universal donor!' : bloodType === 'ab+' ? 'Universal receiver!' : 'Always verify with medical professionals.'}`;
      }
      return "Please specify a blood type (A+, A-, B+, B-, AB+, AB-, O+, O-) to check compatibility.";
    }

    // Donation eligibility
    if (aiKnowledgeBase.eligibilityKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "✅ Blood Donation Eligibility:\n\n• Age: 18-65 years\n• Weight: At least 50 kg\n• Healthy with no chronic illnesses\n• No recent tattoos (last 6 months)\n• Not pregnant or breastfeeding\n• No recent surgeries (last 12 months)\n• Hemoglobin: Male ≥13g/dL, Female ≥12g/dL\n\nYou can donate every 3 months. Would you like to schedule a donation?";
    }

    // Finding blood banks
    if (aiKnowledgeBase.locationKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "🏥 To find blood banks near you:\n\n1. Go to the 'Map View' tab\n2. Click 'Use My Location' or enter your city\n3. Select your blood type\n4. View available blood banks with real-time inventory\n\nWould you like me to help you with anything else?";
    }

    // Donation information
    if (aiKnowledgeBase.donationKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return "💉 Blood Donation Process:\n\n1. Registration (5 min)\n2. Health screening (10 min)\n3. Donation (10-15 min)\n4. Refreshments & rest (10 min)\n\nTotal time: ~45 minutes\n\nBenefits:\n• Save up to 3 lives per donation\n• Free health checkup\n• Refreshments provided\n• Digital certificate\n\nReady to donate? Visit our 'Donate Blood' page!";
    }

    // Blood type query
    const mentionedBloodType = aiKnowledgeBase.bloodTypes.find(type => lowerMessage.includes(type));
    if (mentionedBloodType) {
      return `Searching for ${mentionedBloodType.toUpperCase()} blood...\n\nI can help you:\n• Find banks with ${mentionedBloodType.toUpperCase()} availability\n• Check compatibility\n• Connect with donors\n\nWhat specific information do you need?`;
    }

    // Default intelligent response
    return "I can assist you with:\n\n🔍 Finding blood banks\n💉 Donation information\n🆘 Emergency requests\n🩸 Blood type compatibility\n✅ Donor eligibility\n\nPlease let me know what you need help with!";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking and generate response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const botMsg = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
          aria-label="Open AI Chatbot"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-semibold">AI Blood Bank Assistant</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-red-700 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-bl-none shadow'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-red-600 text-white">
                  <Bot size={16} />
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg rounded-bl-none shadow">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
