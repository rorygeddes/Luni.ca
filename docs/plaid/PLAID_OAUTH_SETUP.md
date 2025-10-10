# Plaid OAuth Integration Setup

This document explains how to integrate Plaid OAuth with your Flutter application using the web redirect page at `https://luni.ca/plaid-oauth`.

## Overview

The Plaid OAuth flow allows users to authenticate with their bank through the bank's own OAuth system. This implementation provides a web-based redirect handler that receives the OAuth callback from Plaid and deep links back to your Flutter app.

## Architecture

```
┌─────────────┐      ┌──────────┐      ┌─────────────┐      ┌────────────┐
│   Flutter   │─────▶│  Plaid   │─────▶│    Bank     │─────▶│  Web Page  │
│     App     │      │   Link   │      │   OAuth     │      │ luni.ca/   │
└─────────────┘      └──────────┘      └─────────────┘      │plaid-oauth │
       ▲                                                     └────────────┘
       │                                                            │
       └────────────────────────────────────────────────────────────┘
                    Deep Link with oauth_state_id
```

## Flow Steps

1. **User Initiates**: User clicks to link their bank account in your Flutter app
2. **Plaid Link Opens**: Flutter app opens Plaid Link with OAuth redirect URI set to `https://luni.ca/plaid-oauth`
3. **Bank OAuth**: User authenticates with their bank's OAuth system
4. **Redirect**: Bank redirects to `https://luni.ca/plaid-oauth?oauth_state_id=xxx`
5. **Deep Link**: Web page extracts `oauth_state_id` and deep links back to Flutter: `luni://plaid-oauth?oauth_state_id=xxx&status=success`
6. **Continue Link**: Flutter app receives the `oauth_state_id` and continues the Plaid Link flow
7. **Get Token**: After Link completion, Flutter receives `public_token`
8. **Exchange**: Flutter sends `public_token` to backend to exchange for `access_token`

## Flutter Setup

### 1. Add Dependencies

Add these packages to your `pubspec.yaml`:

```yaml
dependencies:
  plaid_flutter: ^4.0.0  # or latest version
  uni_links: ^0.5.1      # for deep linking
  url_launcher: ^6.1.0   # for launching URLs
```

### 2. Configure Deep Linking

#### iOS (ios/Runner/Info.plist)

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLName</key>
    <string>ca.luni</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>luni</string>
    </array>
  </dict>
</array>
```

#### Android (android/app/src/main/AndroidManifest.xml)

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:scheme="luni"
        android:host="plaid-oauth" />
</intent-filter>
```

### 3. Flutter Implementation

```dart
import 'package:plaid_flutter/plaid_flutter.dart';
import 'package:uni_links/uni_links.dart';
import 'dart:async';

class PlaidService {
  StreamSubscription? _sub;
  String? _pendingOAuthStateId;
  
  // Initialize Plaid Link
  Future<void> initializePlaidLink() async {
    // Listen for deep link callbacks
    _initDeepLinkListener();
    
    // Create link token from your backend
    final linkToken = await _createLinkToken();
    
    // Configure Plaid Link
    final config = LinkConfiguration(
      token: linkToken,
      // Set OAuth redirect URI
      oauthRedirectUri: Uri.parse('https://luni.ca/plaid-oauth'),
    );
    
    // Open Plaid Link
    try {
      final result = await PlaidLink.open(configuration: config);
      
      if (result.success) {
        final publicToken = result.publicToken;
        // Send public token to your backend
        await _exchangePublicToken(publicToken);
      }
    } catch (e) {
      print('Plaid Link error: $e');
    }
  }
  
  // Listen for OAuth callback deep links
  void _initDeepLinkListener() {
    _sub = uriLinkStream.listen((Uri? uri) {
      if (uri != null && uri.scheme == 'luni' && uri.host == 'plaid-oauth') {
        final oauthStateId = uri.queryParameters['oauth_state_id'];
        final status = uri.queryParameters['status'];
        
        if (status == 'success' && oauthStateId != null) {
          _pendingOAuthStateId = oauthStateId;
          // Continue Plaid Link with the oauth_state_id
          _continuePlaidLink(oauthStateId);
        } else if (status == 'error') {
          final error = uri.queryParameters['error'];
          print('OAuth error: $error');
          // Handle error
        }
      }
    }, onError: (err) {
      print('Deep link error: $err');
    });
  }
  
  // Continue Plaid Link after OAuth redirect
  Future<void> _continuePlaidLink(String oauthStateId) async {
    // The Plaid SDK will automatically handle this if configured correctly
    // You may need to call a specific method depending on your Plaid SDK version
    print('Continuing Plaid Link with oauth_state_id: $oauthStateId');
  }
  
  // Create link token from your backend
  Future<String> _createLinkToken() async {
    // Call your backend API to create a link token
    final response = await http.post(
      Uri.parse('https://your-backend-url/api/plaid/link/token/create'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'user_id': 'your-user-id',
      }),
    );
    
    final data = json.decode(response.body);
    return data['link_token'];
  }
  
  // Exchange public token for access token via your backend
  Future<void> _exchangePublicToken(String publicToken) async {
    final response = await http.post(
      Uri.parse('https://your-backend-url/api/plaid/token/exchange'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'public_token': publicToken,
      }),
    );
    
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      print('Access token: ${data['access_token']}');
      print('Item ID: ${data['item_id']}');
      // Save these securely
    }
  }
  
  // Clean up
  void dispose() {
    _sub?.cancel();
  }
}
```

## Backend Setup

### 1. Install Plaid SDK

```bash
cd backend
npm install plaid
```

### 2. Configure Environment Variables

Add to your `.env` file:

```env
PLAID_CLIENT_ID=your-plaid-client-id
PLAID_SECRET=your-plaid-secret
PLAID_ENV=sandbox
```

Get these credentials from the [Plaid Dashboard](https://dashboard.plaid.com/).

### 3. Set Redirect URI in Plaid Dashboard

1. Go to [Plaid Dashboard](https://dashboard.plaid.com/)
2. Navigate to Team Settings → API
3. Add `https://luni.ca/plaid-oauth` to your OAuth redirect URIs

### 4. Backend Endpoints

The backend already includes:

- `POST /api/plaid/token/exchange` - Exchanges public_token for access_token

You'll need to add:

```javascript
// Create link token endpoint
app.post('/api/plaid/link/token/create', async (req, res) => {
  try {
    const { user_id } = req.body;
    
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: user_id,
      },
      client_name: 'Luni',
      products: ['transactions'],
      country_codes: ['CA'], // Canada
      language: 'en',
      redirect_uri: 'https://luni.ca/plaid-oauth',
    });
    
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Link token creation error:', error);
    res.status(500).json({ error: error.message });
  }
});
```

## Testing

### Local Development

For local testing, you can use:
1. **ngrok**: Tunnel to your local backend
2. **Plaid Sandbox**: Use sandbox mode for testing without real bank credentials

### Test Flow

1. Run your Flutter app
2. Trigger Plaid Link
3. In sandbox mode, use test credentials:
   - Username: `user_good`
   - Password: `pass_good`
4. Complete OAuth flow
5. Verify deep link callback works
6. Check backend receives and exchanges tokens

## Troubleshooting

### Deep Link Not Working

- **iOS**: Check that URL scheme is registered in Info.plist
- **Android**: Verify intent filter in AndroidManifest.xml
- **Both**: Ensure app is in foreground or has proper background handling

### OAuth State ID Not Received

- Check Plaid Dashboard redirect URI matches exactly: `https://luni.ca/plaid-oauth`
- Verify web page is accessible and not blocked by CORS
- Check browser console for errors

### Backend Token Exchange Fails

- Verify Plaid credentials are correct
- Check Plaid environment matches (sandbox/development/production)
- Ensure public_token is being sent correctly

## Security Considerations

1. **Never expose access tokens**: Keep access_tokens on your backend only
2. **Validate deep links**: Check the origin and parameters of deep link callbacks
3. **HTTPS only**: Always use HTTPS for OAuth redirect URIs
4. **Token storage**: Store access_tokens securely with encryption
5. **User association**: Always associate tokens with authenticated users

## Production Checklist

- [ ] Update Plaid environment to `production`
- [ ] Set production Plaid credentials
- [ ] Add `https://luni.ca/plaid-oauth` to Plaid Dashboard redirect URIs
- [ ] Test OAuth flow with real bank accounts
- [ ] Implement proper error handling
- [ ] Add logging and monitoring
- [ ] Set up token refresh mechanism
- [ ] Implement secure token storage
- [ ] Add user consent and privacy notices

## Resources

- [Plaid OAuth Documentation](https://plaid.com/docs/link/oauth/)
- [Plaid Flutter Plugin](https://pub.dev/packages/plaid_flutter)
- [Deep Linking in Flutter](https://docs.flutter.dev/development/ui/navigation/deep-linking)
- [Plaid Dashboard](https://dashboard.plaid.com/)

## Support

For issues or questions:
- Check Plaid's [OAuth troubleshooting guide](https://plaid.com/docs/link/oauth/#troubleshooting)
- Review Flutter deep linking logs
- Check browser console at `https://luni.ca/plaid-oauth`
- Verify backend logs for API errors

