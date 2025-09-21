import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? 'https://luni-ca.onrender.com' : 'http://localhost:5001');

const surveyService = {
  async submitSurvey(surveyData: any) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/survey`, surveyData);
      return response.data;
    } catch (error) {
      console.error('Error submitting survey:', error);
      throw error;
    }
  },

  async getSurveyResponses() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/survey`);
      return response.data;
    } catch (error) {
      console.error('Error fetching survey responses:', error);
      throw error;
    }
  }
};

export default surveyService;
