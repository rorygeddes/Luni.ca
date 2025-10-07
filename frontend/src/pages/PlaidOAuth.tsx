import React, { useEffect, useState } from 'react';

const PlaidOAuth: React.FC = () => {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const handleOAuthCallback = () => {
      try {
        // Get URL parameters from Plaid OAuth redirect
        const urlParams = new URLSearchParams(window.location.search);
        const oauthStateId = urlParams.get('oauth_state_id');
        
        if (!oauthStateId) {
          throw new Error('Missing oauth_state_id parameter');
        }

        setStatus('success');

        // Deep link back to Flutter app with the oauth_state_id
        // The Flutter app will continue the Plaid Link flow with this oauth_state_id
        // Format: luni://plaid-oauth?oauth_state_id=xxx&status=success
        const deepLinkUrl = `luni://plaid-oauth?oauth_state_id=${encodeURIComponent(oauthStateId)}&status=success`;
        
        console.log('Redirecting to Flutter app with oauth_state_id:', oauthStateId);
        
        // Attempt to open the deep link
        window.location.href = deepLinkUrl;

        // Fallback: Show success message if deep link doesn't work immediately
        setTimeout(() => {
          if (document.visibilityState === 'visible') {
            // User is still on the page, deep link might not have worked
            console.log('Deep link attempted:', deepLinkUrl);
          }
        }, 1000);

      } catch (error: any) {
        console.error('Plaid OAuth error:', error);
        setStatus('error');
        const errMsg = error.message || 'An unknown error occurred';
        setErrorMessage(errMsg);

        // Deep link back to Flutter app with error
        const deepLinkUrl = `luni://plaid-oauth?status=error&error=${encodeURIComponent(errMsg)}`;
        window.location.href = deepLinkUrl;
      }
    };

    handleOAuthCallback();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-luni-gold/20">
        <div className="text-center">
          {status === 'processing' && (
            <>
              <div className="mb-6">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-luni-gold"></div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Completing Your Connection
              </h2>
              <p className="text-gray-300">
                Please wait while we finalize your bank connection...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Connection Successful!
              </h2>
              <p className="text-gray-300 mb-6">
                Your bank account has been connected successfully. Redirecting you back to the app...
              </p>
              <p className="text-sm text-gray-400">
                If you're not redirected automatically, please close this window and return to the app.
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full">
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Connection Failed
              </h2>
              <p className="text-gray-300 mb-4">
                We encountered an error while connecting your bank account:
              </p>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400 text-sm">
                  {errorMessage}
                </p>
              </div>
              <p className="text-sm text-gray-400">
                Please close this window and try again from the app.
              </p>
            </>
          )}
        </div>

        {/* Branding */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-luni-gold to-luni-accent font-bold text-lg">
              Luni
            </span>
            <span className="text-gray-500 text-sm">Secure Banking Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaidOAuth;

