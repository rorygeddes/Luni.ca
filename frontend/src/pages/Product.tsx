import React from 'react';

const Product: React.FC = () => {
  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-system-text mb-6">Track · Split · Plan · Money Pool</h1>
        <p className="text-system-text-muted mb-10 max-w-3xl">A quick tour of the core product pillars aligned with the app design.</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl border border-system-border bg-white">
            <h3 className="text-xl font-semibold mb-2">Track</h3>
            <p className="text-system-text-muted">All your accounts and spending, organized automatically—no spreadsheets.</p>
          </div>
          <div className="p-6 rounded-2xl border border-system-border bg-white">
            <h3 className="text-xl font-semibold mb-2">Split</h3>
            <p className="text-system-text-muted">Settle with friends in two taps. No math, no awkward texts.</p>
          </div>
          <div className="p-6 rounded-2xl border border-system-border bg-white">
            <h3 className="text-xl font-semibold mb-2">Plan</h3>
            <p className="text-system-text-muted">Clear goals with steps and nudges that actually help.</p>
          </div>
          <div className="p-6 rounded-2xl border border-system-border bg-white">
            <h3 className="text-xl font-semibold mb-2">Money Pool</h3>
            <p className="text-system-text-muted">Auto-allocate a % of income, skim categories, and round‑ups—cash ready when you need it.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;


