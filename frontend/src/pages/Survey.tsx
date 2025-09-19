import React, { useState } from 'react';
import surveyService from '../services/surveyService';
import Logo from '../components/Logo';

const Survey: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await surveyService.submitSurvey(formData);
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting survey:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-system-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-system-gold-light/80 backdrop-blur-sm rounded-2xl p-8 border border-system-accent/30">
            <div className="w-16 h-16 bg-gradient-to-r from-system-accent to-system-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-system-text mb-4">Thank You!</h2>
            <p className="text-system-text-muted mb-6">
              Your survey has been submitted successfully. We'll be in touch soon with updates about Luni!
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-system-accent to-system-accent-light text-white font-semibold py-3 px-6 rounded-full transition duration-300 hover:shadow-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-system-bg">
      {/* Survey Header */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Logo className="h-20 w-20 mx-auto" alt="Luni Logo" />
                <div className="absolute -inset-4 bg-gradient-to-r from-system-accent/20 to-system-accent-light/20 rounded-full blur-xl"></div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">
              Help Shape Luni
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Take our quick survey and automatically join our beta program for early access to Canada's premier student budgeting app.
          </p>
          <div className="bg-gradient-to-r from-luni-gold/20 to-luni-accent/20 rounded-2xl p-6 border border-luni-gold/30">
            <p className="text-luni-gold font-semibold">
              <i className="fas fa-gift mr-2"></i>
              Complete the survey and get exclusive early access to Luni!
            </p>
          </div>
        </div>
      </section>

      {/* Survey Form */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <label className="block text-white text-lg font-semibold mb-4">
                <i className="fas fa-envelope mr-2 text-luni-gold"></i>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-system-gold-light dark:bg-system-gold-light border border-system-accent/30 rounded-xl text-system-text placeholder-system-text-muted focus:outline-none focus:ring-2 focus:ring-system-accent focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Question 1 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <h3 className="text-white text-lg font-semibold mb-6">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">1.</span>
                How do you currently track your spending?
              </h3>
              <div className="space-y-3">
                {['I don\'t track it', 'Budgeting app', 'Expense tracker', 'Investment tracker', 'All-in-one finance app'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="q1"
                      value={option}
                      checked={formData.q1 === option}
                      onChange={handleInputChange}
                      className="text-luni-gold focus:ring-luni-gold"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <h3 className="text-white text-lg font-semibold mb-6">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">2.</span>
                What's your biggest expense category?
              </h3>
              <div className="space-y-3">
                {['Rent/Housing', 'Food/Groceries', 'Transportation', 'Entertainment', 'School/Books'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="q2"
                      value={option}
                      checked={formData.q2 === option}
                      onChange={handleInputChange}
                      className="text-luni-gold focus:ring-luni-gold"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <h3 className="text-white text-lg font-semibold mb-6">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">3.</span>
                How often do you currently track your expenses?
              </h3>
              <div className="space-y-3">
                {['Daily', 'Weekly', 'Monthly', 'Sometimes', 'Never'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="q3"
                      value={option}
                      checked={formData.q3 === option}
                      onChange={handleInputChange}
                      className="text-luni-gold focus:ring-luni-gold"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 4 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <h3 className="text-white text-lg font-semibold mb-6">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">4.</span>
                Do you currently stick to a budget?
              </h3>
              <div className="space-y-3">
                {['Yes, consistently', 'Mostly', 'Sometimes', 'Rarely', 'No'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="q4"
                      value={option}
                      checked={formData.q4 === option}
                      onChange={handleInputChange}
                      className="text-luni-gold focus:ring-luni-gold"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 5 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <h3 className="text-white text-lg font-semibold mb-6">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">5.</span>
                How do you currently split expenses with roommates/friends?
              </h3>
              <div className="space-y-3">
                {['Shared apps (Splitwise, Venmo, etc.)', 'Manual calculations', 'One person pays', "We don't split", 'Other'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="q5"
                      value={option}
                      checked={formData.q5 === option}
                      onChange={handleInputChange}
                      className="text-luni-gold focus:ring-luni-gold"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 6 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <h3 className="text-white text-lg font-semibold mb-6">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">6.</span>
                How confident are you in managing your finances?
              </h3>
              <div className="space-y-3">
                {['Very confident', 'Somewhat confident', 'Neutral', 'Not very confident', 'Not confident at all'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="q6"
                      value={option}
                      checked={formData.q6 === option}
                      onChange={handleInputChange}
                      className="text-luni-gold focus:ring-luni-gold"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 7 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <h3 className="text-white text-lg font-semibold mb-6">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">7.</span>
                What would motivate you to use a budgeting app regularly?
              </h3>
              <div className="space-y-3">
                {['Progress tracking/visuals', 'Gamification/rewards', 'Automated categorization', 'Goal setting', 'Social features'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="q7"
                      value={option}
                      checked={formData.q7 === option}
                      onChange={handleInputChange}
                      className="text-luni-gold focus:ring-luni-gold"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 8 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <h3 className="text-white text-lg font-semibold mb-6">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">8.</span>
                How important is it for the app to sync with your bank account?
              </h3>
              <div className="space-y-3">
                {['Very important', 'Somewhat important', 'Neutral', 'Not very important', 'Not important at all'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="q8"
                      value={option}
                      checked={formData.q8 === option}
                      onChange={handleInputChange}
                      className="text-luni-gold focus:ring-luni-gold"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 9 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <h3 className="text-white text-lg font-semibold mb-6">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">9.</span>
                What platform would you primarily use?
              </h3>
              <div className="space-y-3">
                {['Mobile App (iOS/Android)', 'Web App', 'Desktop App', 'All platforms', 'Not sure'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="q9"
                      value={option}
                      checked={formData.q9 === option}
                      onChange={handleInputChange}
                      className="text-luni-gold focus:ring-luni-gold"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 10 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <h3 className="text-white text-lg font-semibold mb-6">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">10.</span>
                What's your preferred way to input expenses?
              </h3>
              <div className="space-y-3">
                {['Bank sync', 'Manual entry', 'Photo receipts', 'Voice input', 'QR codes'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="q10"
                      value={option}
                      checked={formData.q10 === option}
                      onChange={handleInputChange}
                      className="text-luni-gold focus:ring-luni-gold"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Question 11 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <label className="block text-white text-lg font-semibold mb-4">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">11.</span>
                What's your biggest financial challenge as a student?
              </label>
              <textarea
                name="q11"
                rows={3}
                value={formData.q11}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-system-gold-light dark:bg-system-gold-light border border-system-accent/30 rounded-xl text-system-text placeholder-system-text-muted focus:outline-none focus:ring-2 focus:ring-system-accent focus:border-transparent"
                placeholder="Tell us about your financial challenges..."
              />
            </div>

            {/* Question 12 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-luni-gold/20">
              <label className="block text-white text-lg font-semibold mb-4">
                <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">12.</span>
                Any additional features or suggestions?
              </label>
              <textarea
                name="q12"
                rows={3}
                value={formData.q12}
                onChange={handleInputChange}
                className="w-full px-6 py-4 bg-system-gold-light dark:bg-system-gold-light border border-system-accent/30 rounded-xl text-system-text placeholder-system-text-muted focus:outline-none focus:ring-2 focus:ring-system-accent focus:border-transparent"
                placeholder="What else would you like to see in a budgeting app?"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              {submitStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/50 border border-red-500 text-red-800 dark:text-red-300 rounded-xl">
                  There was an error submitting your survey. Please try again.
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-system-accent to-system-accent-light text-white font-semibold py-4 px-8 rounded-full text-lg transition duration-300 hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
              >
                <i className="fas fa-paper-plane"></i>
                <span>{isSubmitting ? 'Submitting...' : 'Submit Survey'}</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Survey;
