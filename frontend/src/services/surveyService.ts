import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? 'https://luni-ca.onrender.com' : 'http://localhost:5001');

const surveyService = {
  async submitSurvey(surveyData: any) {
    try {
      console.log('Submitting survey to:', `${API_BASE_URL}/api/survey`);
      console.log('Survey data:', surveyData);
      const response = await axios.post(`${API_BASE_URL}/api/survey`, surveyData);
      console.log('Survey response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error submitting survey:', error);
      console.error('Error details:', error.response?.data);
      console.error('Error status:', error.response?.status);
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
