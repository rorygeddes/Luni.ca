import React from 'react';

const Investors: React.FC = () => (
  <div className="pt-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-system-text mb-6">Investor Brief</h1>
      <p className="text-system-text mb-4">Market, product, traction, tech, monetization, roadmap.</p>
      <button className="inline-block px-5 py-3 rounded-lg bg-gradient-to-r from-system-accent to-system-accent-light text-white font-semibold cursor-pointer hover:shadow-lg transition-all duration-300">Download One-Pager</button>
    </div>
  </div>
);

export default Investors;


