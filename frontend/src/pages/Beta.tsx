import React from 'react';
import { Link } from 'react-router-dom';

const Beta: React.FC = () => (
  <div className="pt-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-system-text mb-6">Join the Beta</h1>
      <p className="text-system-text-muted mb-8">Be first. Get early access perks and shape the roadmap.</p>
      <Link to="/survey" className="px-6 py-3 rounded-full bg-gradient-to-r from-system-accent to-system-accent-light text-white">Join Beta</Link>
    </div>
  </div>
);

export default Beta;


