import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-white overflow-x-hidden">
      {/* Hero Section with Split Layout */}
      <section className="pt-32 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gradient-to-r from-system-accent/20 to-system-accent-light/20 border border-system-accent/30">
                <span className="text-sm font-medium text-system-accent">Now Available</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
                Fix Your Money Problems
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-2xl mx-auto lg:mx-0">
                A Private Platform for Smart Financial Management
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Luni is an AI Financial System that brings your money management systems all into one simple place. Now you can limit your financial stress and feel in control of your spending.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to="/survey" 
                  className="bg-gradient-to-r from-system-accent to-system-accent-light text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Join the Beta
                </Link>
                <Link 
                  to="/why" 
                  className="border-2 border-system-accent text-system-accent px-8 py-4 rounded-full text-lg font-semibold hover:bg-system-accent hover:text-white transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Side - Mobile Mockup */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
              <div className="relative w-full max-w-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-system-accent/10 via-transparent to-transparent rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-system-accent/5 to-transparent rounded-3xl p-8 border border-system-accent/20 shadow-2xl">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-system-accent/30 bg-white">
                      <img 
                        src="/track.png" 
                        alt="Track your spending" 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-system-accent/30 bg-white">
                      <img 
                        src="/split.png" 
                        alt="Split bills with friends" 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-system-accent/30 bg-white">
                      <img 
                        src="/plan.png" 
                        alt="Plan your money" 
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track -> Split -> Plan Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Track → Split → Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All your financial management in one simple place
            </p>
          </div>

          {/* Three Screenshots - Centered */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center group">
              <div className="rounded-3xl border-2 border-system-accent/30 bg-gradient-to-br from-system-accent/5 to-transparent p-6 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-2">
                <img 
                  src="/track.png" 
                  alt="Track your spending" 
                  className="w-full max-w-[280px] h-auto object-contain drop-shadow-2xl rounded-2xl"
                />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mt-6 mb-3">Track</h3>
              <p className="text-lg text-gray-600 text-center max-w-xs leading-relaxed">
                Sync your bank accounts all in one place. Categorization made simple, with the help of Lun AI.
              </p>
            </div>

            <div className="flex flex-col items-center group">
              <div className="rounded-3xl border-2 border-system-accent/30 bg-gradient-to-br from-system-accent/5 to-transparent p-6 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-2">
                <img 
                  src="/split.png" 
                  alt="Split bills with friends" 
                  className="w-full max-w-[280px] h-auto object-contain drop-shadow-2xl rounded-2xl"
                />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mt-6 mb-3">Split</h3>
              <p className="text-lg text-gray-600 text-center max-w-xs leading-relaxed">
                No more 'who owes who?'. Create groups, assign spending, settle fast.
              </p>
            </div>

            <div className="flex flex-col items-center group">
              <div className="rounded-3xl border-2 border-system-accent/30 bg-gradient-to-br from-system-accent/5 to-transparent p-6 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-2">
                <img 
                  src="/plan.png" 
                  alt="Plan your money" 
                  className="w-full max-w-[280px] h-auto object-contain drop-shadow-2xl rounded-2xl"
                />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mt-6 mb-3">Plan</h3>
              <p className="text-lg text-gray-600 text-center max-w-xs leading-relaxed">
                View your money in a new way to plan ahead. Create goals, follow through by staying consistent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              How it works?
            </h2>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-6 mb-8">
              <div className="flex-1 flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-system-accent/20 min-h-[220px]">
                <div className="w-16 h-16 bg-gradient-to-r from-system-accent to-system-accent-light rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                  <i className="fas fa-link text-white text-2xl"></i>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">Plaid API</h3>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="text-4xl text-system-accent">→</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-system-accent/20 min-h-[220px]">
                <div className="w-16 h-16 bg-gradient-to-r from-system-accent to-system-accent-light rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                  <i className="fas fa-university text-white text-2xl"></i>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">Connects with Your Bank</h3>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="text-4xl text-system-accent">→</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-system-accent/20 min-h-[220px]">
                <div className="w-16 h-16 bg-gradient-to-r from-system-accent to-system-accent-light rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                  <i className="fas fa-shield-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">Login in a trusted way</h3>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <div className="text-4xl text-system-accent">→</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-system-accent/20 min-h-[220px]">
                <div className="w-16 h-16 bg-gradient-to-r from-system-accent to-system-accent-light rounded-full flex items-center justify-center mb-4 flex-shrink-0">
                  <i className="fas fa-sync-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">Realtime Updates</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Lun AI System */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Lun AI System
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Let Luni do the heavy work for your planning, while you stay in control of the final say. Lun AI cannot touch your real banking info, only provide smart insights for you to follow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-system-accent/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-system-accent to-system-accent-light rounded-full flex items-center justify-center">
                  <i className="fas fa-tools text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">5 built in agent tools</h3>
              </div>
              <p className="text-gray-600">
                to easily plan with
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-system-accent/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-system-accent to-system-accent-light rounded-full flex items-center justify-center">
                  <i className="fas fa-chart-line text-white text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Realtime insights</h3>
              </div>
              <p className="text-gray-600">
                of your data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Security & Privacy</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read-only connections. Bank-grade encryption. You own your data.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-system-accent to-system-accent-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to fix your money?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the beta and start taking control of your finances today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/survey" 
              className="bg-white text-system-accent px-10 py-5 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-xl"
            >
              Join the Beta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
