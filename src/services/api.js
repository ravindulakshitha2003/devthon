// API service functions for the Tuora app
// Use Vite env `VITE_API_BASE_URL` in development, otherwise default to `/api` which is proxied in vite.config.js
const API_BASE_URL ='https://travel-ai-production-ae0f.up.railway.app/chat';

// Emergency/SOS API functions
export const emergencyAPI = {
  /**
   * Get nearest hospitals near a location
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @returns {Promise<Array>} List of hospitals
   */
  getNearestHospitals: async (lat = 6.8667, lng = 81.0461) => {
    try {
      const response = await fetch(`${API_BASE_URL}/emergency/hospitals?lat=${lat}&lng=${lng}`);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      // Return mock data as fallback
      return [
        { id: 1, name: 'Durdans Hospital', distance: '0.5 km', address: 'Ella, Sri Lanka', phone: '+94-812-387-400' },
        { id: 2, name: 'Kandy Hospital', distance: '25 km', address: 'Kandy, Sri Lanka', phone: '+94-812-223-135' }
      ];
    }
  },

  /**
   * Get nearest police stations near a location
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @returns {Promise<Array>} List of police stations
   */
  getNearestPoliceStations: async (lat = 6.8667, lng = 81.0461) => {
    try {
      const response = await fetch(`${API_BASE_URL}/emergency/police?lat=${lat}&lng=${lng}`);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching police stations:', error);
      // Return mock data as fallback
      return [
        { id: 1, name: 'Ella Police Station', distance: '1.2 km', address: 'Ella, Sri Lanka', phone: '+94-812-387-100' },
        { id: 2, name: 'Badulla Police Station', distance: '15 km', address: 'Badulla, Sri Lanka', phone: '+94-552-222-222' }
      ];
    }
  },

  /**
   * Send an SOS alert with user location and emergency type
   * @param {Object} sosData - { type, lat, lng, message }
   * @returns {Promise<Object>} Response from SOS endpoint
   */
  sendSOSAlert: async (sosData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/emergency/sos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sosData)
      });
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error sending SOS alert:', error);
      return { success: false, message: 'Failed to send SOS alert' };
    }
  },

  /**
   * Get emergency contact numbers by country
   * @param {string} country - Country code (default: 'LK' for Sri Lanka)
   * @returns {Promise<Object>} Emergency contacts
   */
  getEmergencyContacts: async (country = 'LK') => {
    try {
      const response = await fetch(`${API_BASE_URL}/emergency/contacts?country=${country}`);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching emergency contacts:', error);
      // Return default Sri Lankan contacts
      return {
        country: 'LK',
        contacts: [
          { type: 'Police Emergency', number: '118 / 119' },
          { type: 'Ambulance & Fire', number: '110' },
          { type: 'Suwaseriya Ambulance', number: '1990' },
          { type: 'Tourist Police', number: '011-2421052' },
          { type: 'Report Crimes', number: '011-2691500' },
          { type: 'Accident Service (Colombo)', number: '011-2691111' }
        ]
      };
    }
  }
};

// Dashboard API functions
export const dashboardAPI = {
  /**
   * Get user's trip plans
   * @returns {Promise<Array>} List of trip plans
   */
  getTripPlans: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/trips`);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching trip plans:', error);
      // Return mock data as fallback
      return [
        { id: 1, title: 'Trip to Ella', days: 3, budget: 37000, startDate: '2026-02-24' },
        { id: 2, title: 'Kandy Heritage Tour', days: 2, budget: 25000, startDate: '2026-02-27' }
      ];
    }
  },

  /**
   * Get dashboard statistics
   * @returns {Promise<Object>} Dashboard stats
   */
  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return mock data
      return {
        totalTrips: 5,
        upcomingTrips: 2,
        completedTrips: 3,
        totalExpense: 125000,
        savedPlans: 12
      };
    }
  },

  /**
   * Get recent chat messages/activity
   * @returns {Promise<Array>} Recent messages
   */
  getRecentActivity: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/activity`);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching activity:', error);
      // Return mock data
      return [
        { id: 1, type: 'message', text: 'Trip to Ella planned', timestamp: new Date() },
        { id: 2, type: 'alert', text: 'Weather alert for Nuwara Eliya', timestamp: new Date() }
      ];
    }
  }
};

// Chatbot API
export const chatAPI = {
  /**
   * Send a chat message to the chatbot service
   * @param {string} message
   * @returns {Promise<Object>} API response JSON
   */
  sendMessage: async (message) => {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error sending chat message:', error);
      // return a fallback text response
      return { reply: "Sorry, the chat service is unavailable right now." };
    }
  }
};
