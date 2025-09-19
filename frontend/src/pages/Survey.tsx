import React, { useState } from 'react';
import surveyService from '../services/surveyService';
import Logo from '../components/Logo';

interface SurveyQuestion {
  id: string;
  type: 'text' | 'radio' | 'checkbox';
  question: string;
  options?: string[];
  required: boolean;
  placeholder?: string;
}

const Survey: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
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

  const questions: SurveyQuestion[] = [
    {
      id: 'name',
      type: 'text',
      question: 'What\'s your name and email address?',
      placeholder: 'Enter your full name and email (e.g., John Doe, john@example.com)',
      required: true
    },
    {
      id: 'q1',
      type: 'radio',
      question: 'How do you currently manage your money?',
      options: ['Spreadsheet', 'Budgeting App', 'Mental Tracking', 'Parents/Guardians', 'Other'],
      required: true
    },
    {
      id: 'q2',
      type: 'checkbox',
      question: 'What are your biggest financial concerns as a student?',
      options: ['Tuition Fees', 'Living Expenses (Rent, Groceries)', 'Textbooks and Course Materials', 'Social Life and Entertainment', 'Saving for Future Goals', 'Debt Management'],
      required: true
    },
    {
      id: 'q3',
      type: 'radio',
      question: 'How important is it for you to track your spending?',
      options: ['Very Important', 'Moderately Important', 'Slightly Important', 'Not Important'],
      required: true
    },
    {
      id: 'q4',
      type: 'checkbox',
      question: 'What features would you find most useful in a budgeting app?',
      options: ['Automatic Transaction Categorization', 'Customizable Budget Creation', 'Visual Spending Reports', 'Bill Reminders and Due Date Tracking', 'Financial Goal Tracking', 'Investment Tracking'],
      required: true
    },
    {
      id: 'q5',
      type: 'radio',
      question: 'How often do you typically check your bank account balance?',
      options: ['Daily', 'A Few Times a Week', 'Weekly', 'Monthly', 'Less Often'],
      required: true
    },
    {
      id: 'q6',
      type: 'text',
      question: 'Do you currently use any other financial apps or tools? If so, which ones?',
      placeholder: 'e.g., Mint, YNAB, bank\'s app',
      required: false
    },
    {
      id: 'q7',
      type: 'radio',
      question: 'What is your primary source of income as a student?',
      options: ['Part-time Job', 'Student Loans/Grants', 'Family Support', 'Scholarships', 'Other'],
      required: true
    },
    {
      id: 'q8',
      type: 'radio',
      question: 'How confident are you in managing your finances independently?',
      options: ['Very Confident', 'Moderately Confident', 'Slightly Confident', 'Not Confident'],
      required: true
    },
    {
      id: 'q9',
      type: 'radio',
      question: 'Would you be interested in financial literacy resources within the app?',
      options: ['Yes', 'No', 'Maybe'],
      required: true
    },
    {
      id: 'q10',
      type: 'text',
      question: 'What kind of financial literacy topics would you be interested in?',
      placeholder: 'e.g., Investing basics, student loan management, credit scores',
      required: false
    },
    {
      id: 'q11',
      type: 'text',
      question: 'Any additional features or suggestions?',
      placeholder: 'What else would you like to see in a budgeting app?',
      required: false
    },
    {
      id: 'q12',
      type: 'text',
      question: 'How did you hear about Luni?',
      placeholder: 'e.g., Social media, friend, university event',
      required: false
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOptionSelect = (questionId: string, value: string, isMultiple = false) => {
    setFormData(prev => {
      if (isMultiple) {
        const currentValues = prev[questionId as keyof typeof prev] as string;
        const valuesArray = currentValues ? currentValues.split(',') : [];
        const newValuesArray = valuesArray.includes(value)
          ? valuesArray.filter(v => v !== value)
          : [...valuesArray, value];
        return {
          ...prev,
          [questionId]: newValuesArray.join(',')
        };
      } else {
        return {
          ...prev,
          [questionId]: value
        };
      }
    });

    // Auto-advance to next question after selection
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 300);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentQuestion.type === 'text') {
      e.preventDefault();
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
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
      <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-system-bg/80 backdrop-blur-lg rounded-3xl p-8 border border-red-glow-soft/30 shadow-xl shadow-red-glow-subtle/20">
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
    <div className="min-h-screen relative">
      {/* Survey Header - Only show on first question */}
      {currentQuestionIndex === 0 && (
        <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
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
            <p className="text-xl text-system-text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
              Take our quick survey and automatically join our beta program for early access to Canada's premier student budgeting app.
            </p>
            <div className="bg-gradient-to-r from-red-glow-soft/20 to-red-glow-secondary/20 rounded-2xl p-6 border border-red-glow-soft/30">
              <p className="text-system-accent font-semibold">
                <i className="fas fa-gift mr-2"></i>
                Complete the survey and get exclusive early access to Luni!
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Flashcard Survey */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="max-w-2xl mx-auto w-full">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-system-text-muted">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-system-text-muted">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-system-gold-medium/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-system-accent to-system-accent-light h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Flashcard */}
          <div className="bg-system-bg/80 backdrop-blur-lg rounded-3xl p-8 border border-red-glow-soft/30 shadow-xl shadow-red-glow-subtle/20 transition-all duration-300">
            {/* Question Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-system-text leading-relaxed">
                {currentQuestion.question}
              </h2>
              {currentQuestion.required && (
                <p className="text-sm text-system-text-muted mt-2">* Required</p>
              )}
            </div>

            {/* Question Content */}
            <div className="space-y-4">
              {currentQuestion.type === 'text' ? (
                <form onSubmit={handleTextSubmit}>
                  <div className="space-y-4">
                    <textarea
                      name={currentQuestion.id}
                      value={formData[currentQuestion.id as keyof typeof formData]}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className="w-full px-6 py-4 bg-system-gold-light border border-system-accent/30 rounded-xl text-system-text placeholder-system-text-muted focus:outline-none focus:ring-2 focus:ring-system-accent focus:border-transparent resize-none"
                      placeholder={currentQuestion.placeholder}
                      rows={4}
                    />
                    <div className="flex justify-between items-center pt-4">
                      {currentQuestionIndex > 0 && (
                        <button
                          type="button"
                          onClick={handlePrevious}
                          className="flex items-center space-x-2 text-system-text-muted hover:text-system-accent transition-colors"
                        >
                          <i className="fas fa-arrow-left"></i>
                          <span>Previous</span>
                        </button>
                      )}
                      <div className="ml-auto">
                        {currentQuestionIndex === questions.length - 1 ? (
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-system-accent to-system-accent-light text-white font-semibold py-3 px-6 rounded-full transition duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                          >
                            <i className="fas fa-paper-plane"></i>
                            <span>{isSubmitting ? 'Submitting...' : 'Submit Survey'}</span>
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="bg-gradient-to-r from-system-accent to-system-accent-light text-white font-semibold py-3 px-6 rounded-full transition duration-300 hover:shadow-lg flex items-center space-x-2"
                          >
                            <span>Next</span>
                            <i className="fas fa-arrow-right"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(currentQuestion.id, option, currentQuestion.type === 'checkbox')}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        currentQuestion.type === 'checkbox' 
                          ? (formData[currentQuestion.id as keyof typeof formData]?.includes(option)
                              ? 'border-system-accent bg-system-accent/10 text-system-text'
                              : 'border-system-gold-medium/50 bg-system-gold-light/50 text-system-text hover:border-system-accent/50')
                          : (formData[currentQuestion.id as keyof typeof formData] === option
                              ? 'border-system-accent bg-system-accent/10 text-system-text'
                              : 'border-system-gold-medium/50 bg-system-gold-light/50 text-system-text hover:border-system-accent/50')
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {currentQuestion.type === 'checkbox' ? (
                          <i className={`fas fa-${formData[currentQuestion.id as keyof typeof formData]?.includes(option) ? 'check-square' : 'square'} text-system-accent`}></i>
                        ) : (
                          <i className={`fas fa-${formData[currentQuestion.id as keyof typeof formData] === option ? 'dot-circle' : 'circle'} text-system-accent`}></i>
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {currentQuestion.type === 'checkbox' && currentQuestionIndex > 0 && (
                    <div className="flex justify-between items-center pt-6">
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className="flex items-center space-x-2 text-system-text-muted hover:text-system-accent transition-colors"
                      >
                        <i className="fas fa-arrow-left"></i>
                        <span>Previous</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => currentQuestionIndex === questions.length - 1 ? handleSubmit() : setCurrentQuestionIndex(prev => prev + 1)}
                        className="bg-gradient-to-r from-system-accent to-system-accent-light text-white font-semibold py-3 px-6 rounded-full transition duration-300 hover:shadow-lg flex items-center space-x-2"
                      >
                        <span>{currentQuestionIndex === questions.length - 1 ? 'Submit Survey' : 'Next'}</span>
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-500 text-red-800 dark:text-red-300 rounded-xl">
                There was an error submitting your survey. Please try again.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Survey;