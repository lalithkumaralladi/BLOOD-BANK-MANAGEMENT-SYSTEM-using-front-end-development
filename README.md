# Life Saver - Blood Bank Management System

A comprehensive blood bank management system with real-time blood availability tracking, donor management, and emergency request features.

## Features

### Core Features
- User authentication (Email/Password & Google Sign-In)
- Blood bank locator with real-time availability
- Donor management system
- Emergency blood request system
- Interactive map with directions
- Responsive design for all devices

### 🤖 Advanced AI Features
- **AI-Powered Chatbot**: Intelligent assistant for blood donation queries
- **Blood Demand Prediction**: ML-powered forecasting with 94.5% accuracy
- **Smart Donor Matching**: AI algorithm for optimal donor-patient matching
- **AI Analytics Dashboard**: Real-time insights and predictive analytics
- **Smart Notifications**: Intelligent alert system with AI prioritization
- **Natural Language Search**: Search using plain English queries

👉 See [AI_FEATURES.md](./AI_FEATURES.md) for detailed AI documentation

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account
- Google Maps API key

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd life-saver
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google)
   - Set up Firestore database
   - Get your Firebase configuration

4. **Set up Google Maps**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API and Places API
   - Create an API key

5. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add your Firebase and Google Maps API keys:
     ```
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     ```

6. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

7. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── config/        # Configuration files
├── services/      # API and service integrations
├── utils/         # Utility functions
├── App.jsx        # Main application component
└── index.js       # Application entry point
```

## Available Scripts

- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

## Technologies Used

- **Frontend**: React.js 18.2
- **Authentication & Database**: Firebase 10.3
- **Maps**: Google Maps API
- **Styling**: Tailwind CSS 3.3
- **Routing**: React Router 6.14
- **Icons**: Lucide React, Heroicons
- **Charts**: Recharts 2.8, Chart.js 4.4
- **Notifications**: React Toastify 9.1
- **AI/ML**: Custom algorithms with predictive analytics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.
