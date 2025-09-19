// Zapier Webhook Integration
// This module handles sending survey data to Zapier for email notifications

const axios = require('axios');

/**
 * Send survey data to Zapier webhook
 * @param {Object} surveyData - The survey response data
 * @param {string} zapierWebhookUrl - The Zapier webhook URL
 * @returns {Promise<Object>} - Response from Zapier
 */
async function sendToZapier(surveyData, zapierWebhookUrl) {
  try {
    const payload = {
      // Basic survey info
      email: surveyData.email,
      submitted_at: surveyData.submitted_at,
      survey_id: surveyData.id,
      
      // Survey responses
      current_tracking_method: surveyData.q1,
      biggest_expense: surveyData.q2,
      budget_overspend_frequency: surveyData.q3,
      monthly_savings: surveyData.q4,
      expense_splitting: surveyData.q5,
      money_confidence: surveyData.q6,
      savings_motivation: surveyData.q7,
      financial_education_importance: surveyData.q8,
      preferred_device: surveyData.q9,
      data_import_preference: surveyData.q10,
      biggest_financial_problem: surveyData.q11,
      ideal_solution: surveyData.q12,
      
      // Metadata for email template
      user_type: 'student',
      app_name: 'Luni',
      beta_program: true,
      
      // Timestamp for email
      timestamp: new Date().toISOString(),
      date_formatted: new Date().toLocaleDateString('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const response = await axios.post(zapierWebhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Luni-Survey-App/1.0'
      },
      timeout: 10000 // 10 second timeout
    });

    return {
      success: true,
      status: response.status,
      data: response.data
    };

  } catch (error) {
    console.error('Zapier webhook error:', error.message);
    
    // Return error details for logging
    return {
      success: false,
      error: error.message,
      status: error.response?.status,
      data: error.response?.data
    };
  }
}

/**
 * Format survey data for email template
 * @param {Object} surveyData - Raw survey data
 * @returns {Object} - Formatted data for email
 */
function formatSurveyDataForEmail(surveyData) {
  return {
    // Header info
    email: surveyData.email,
    submission_date: new Date(surveyData.submitted_at).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    
    // Survey responses with labels
    responses: [
      { question: 'Current spending tracking method', answer: surveyData.q1 },
      { question: 'Biggest monthly expense', answer: surveyData.q2 },
      { question: 'Budget overspending frequency', answer: surveyData.q3 },
      { question: 'Monthly savings habits', answer: surveyData.q4 },
      { question: 'Expense splitting with friends', answer: surveyData.q5 },
      { question: 'Money management confidence', answer: surveyData.q6 },
      { question: 'Savings motivation factors', answer: surveyData.q7 },
      { question: 'Financial education importance', answer: surveyData.q8 },
      { question: 'Preferred app device', answer: surveyData.q9 },
      { question: 'Data import preference', answer: surveyData.q10 }
    ],
    
    // Open-ended responses
    biggest_problem: surveyData.q11,
    ideal_solution: surveyData.q12,
    
    // Summary insights
    insights: {
      is_new_to_budgeting: surveyData.q1 === "I don't track it",
      struggles_with_budgeting: surveyData.q3 !== "Never",
      wants_financial_education: surveyData.q8 === "Very important",
      prefers_mobile: surveyData.q9 === "Mobile App (iOS/Android)",
      wants_bank_sync: surveyData.q10 === "Bank sync"
    }
  };
}

module.exports = {
  sendToZapier,
  formatSurveyDataForEmail
};
