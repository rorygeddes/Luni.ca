import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-system-bg">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img src="/logo192.png" alt="Luni Logo" className="h-24 w-24 mx-auto drop-shadow-lg" />
                <div className="absolute -inset-4 bg-gradient-to-r from-system-accent/20 to-system-accent-light/20 rounded-full blur-xl"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent">
                Smart Budgeting
              </span>
              <br />
              <span className="text-system-text">for Students</span>
            </h1>
            <p className="text-xl text-system-text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              Take control of your finances with Luni. Track spending, develop good habits, and manage your money with real-time insights designed specifically for student life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-system-accent to-system-accent-light text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <i className="fas fa-download"></i>
                <span>Get Early Access</span>
              </button>
              <button className="border-2 border-system-accent text-system-accent px-8 py-4 rounded-full text-lg font-semibold hover:bg-system-accent hover:text-white transition-all duration-300 flex items-center space-x-2">
                <i className="fas fa-play"></i>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-system-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-system-text mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-system-accent to-system-accent-light bg-clip-text text-transparent"> Manage Your Money</span>
            </h2>
            <p className="text-xl text-system-text-muted max-w-2xl mx-auto">
              Built specifically for students, Luni helps you develop healthy financial habits while tracking your spending in real-time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-luni-gold/20">
              <div className="w-16 h-16 bg-gradient-to-r from-luni-gold to-luni-accent rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-chart-line text-black text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-Time Tracking</h3>
              <p className="text-gray-300 leading-relaxed">
                Monitor your spending habits with live updates and instant notifications. Stay aware of where your money goes with beautiful, easy-to-read visualizations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-luni-gold/20">
              <div className="w-16 h-16 bg-gradient-to-r from-luni-accent to-luni-gold rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-piggy-bank text-black text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Savings</h3>
              <p className="text-gray-300 leading-relaxed">
                Develop good financial habits with personalized savings goals and automated insights. Learn to budget like a pro with AI-powered recommendations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-luni-gold/20">
              <div className="w-16 h-16 bg-gradient-to-r from-luni-gold to-luni-accent rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-mobile-alt text-black text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Student-Focused</h3>
              <p className="text-gray-300 leading-relaxed">
                Designed specifically for student life with features like meal planning, textbook tracking, and social spending insights tailored to your lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why <span className="bg-gradient-to-r from-luni-gold to-luni-accent bg-clip-text text-transparent">Luni</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                As a student, managing money can be overwhelming. Luni simplifies budgeting by providing real-time insights, helping you develop healthy financial habits, and making money management actually enjoyable.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-luni-gold to-luni-accent rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-black text-sm"></i>
                  </div>
                  <span className="text-gray-300">Live spending tracking and notifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-luni-gold to-luni-accent rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-black text-sm"></i>
                  </div>
                  <span className="text-gray-300">Personalized budgeting recommendations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-luni-gold to-luni-accent rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-black text-sm"></i>
                  </div>
                  <span className="text-gray-300">Student-specific features and insights</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-luni-gold/20 to-luni-accent/20 rounded-3xl p-8 backdrop-blur-sm">
                <div className="bg-gray-900/90 rounded-2xl p-6 shadow-xl border border-luni-gold/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">This Month</h3>
                    <span className="text-sm text-luni-gold font-medium">+$150 saved</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Food & Dining</span>
                      <span className="font-semibold text-white">$320</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-luni-gold to-luni-accent h-2 rounded-full" style={{width: '64%'}}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Transportation</span>
                      <span className="font-semibold text-white">$85</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-luni-accent to-luni-gold h-2 rounded-full" style={{width: '34%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Survey CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-luni-gold to-luni-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Help Shape the Future of Student Budgeting
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take our quick survey and automatically join our beta program for early access to Luni. Your input will help us build the perfect budgeting app for Canadian students!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/survey" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <i className="fas fa-clipboard-list"></i>
              <span>Take Survey & Join Beta</span>
            </Link>
            <div className="text-white/80 text-sm">
              <i className="fas fa-gift mr-2"></i>
              Get exclusive early access!
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
