import React from 'react';

const Security: React.FC = () => (
  <div className="pt-24 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-system-text mb-6">Security & Privacy</h1>
      <ul className="space-y-3 text-system-text">
        <li>• Read‑only connections via Plaid; we never see credentials.</li>
        <li>• Encryption in transit and at rest.</li>
        <li>• You own your data; export and delete on request.</li>
      </ul>
      <p className="mt-6 text-system-text-muted">See our detailed Plaid docs in the repo for integration specifics.</p>
    </div>
  </div>
);

export default Security;


