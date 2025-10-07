# Plaid OAuth HTML Implementation Guide

## 🎯 Overview

Your `plaid-oauth.html` file provides a **complete Plaid OAuth solution** that:
- ✅ Receives OAuth redirects from Plaid
- ✅ Completes the Plaid Link flow on the web
- ✅ Returns `public_token` directly to your Flutter app
- ✅ Uses deep linking: `lunifin://plaid-callback`

## 📍 File Location

**Deployed at**: `https://luni.ca/plaid-oauth.html`
**Local**: `frontend/public/plaid-oauth.html`

## 🔄 Complete OAuth Flow

### Step 1: Flutter App Starts OAuth

```dart
// 1. Get link token from your backend
final linkToken = await createLinkToken();

// 2. IMPORTANT: Store link token in web browser storage
// You'll need to open a web view first to set this
await _storeTokenInWebStorage(linkToken);

// 3. Open Plaid Link with OAuth redirect
final config = LinkConfiguration(
  token: linkToken,
  oauthRedirectUri: Uri.parse('https://luni.ca/plaid-oauth.html'),
);

await PlaidLink.open(configuration: config);
```

### Step 2: Plaid Redirects to Your HTML Page

```
User completes bank OAuth
↓
Bank redirects to: https://luni.ca/plaid-oauth.html?oauth_state_id=xxx
↓
Your HTML page loads
```

### Step 3: HTML Page Completes OAuth

```javascript
// Your plaid-oauth.html does this automatically:

1. Extracts oauth_state_id from URL
2. Gets link_token from localStorage
3. Initializes Plaid Link with receivedRedirectUri
4. Completes the OAuth flow
5. Receives public_token from Plaid
6. Deep links back to Flutter: lunifin://plaid-callback?public_token=xxx
```

### Step 4: Flutter Receives Public Token

```dart
// Deep link listener catches the callback
uriLinkStream.listen((Uri? uri) {
  if (uri?.scheme == 'lunifin' && uri?.host == 'plaid-callback') {
    final publicToken = uri?.queryParameters['public_token'];
    final error = uri?.queryParameters['error'];
    
    if (publicToken != null) {
      // Success! Exchange token with backend
      await exchangePublicToken(publicToken);
    } else if (error != null) {
      // Handle error
      showError(error);
    }
  }
});
```

## 🔧 Flutter Implementation

### 1. Add Dependencies

```yaml
# pubspec.yaml
dependencies:
  plaid_flutter: ^4.0.0
  uni_links: ^0.5.1
  webview_flutter: ^4.0.0  # For storing token in web storage
  http: ^1.1.0
```

### 2. Configure Deep Linking

#### iOS (`ios/Runner/Info.plist`)

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLName</key>
    <string>ca.luni.fin</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>lunifin</string>  <!-- matches lunifin:// -->
    </array>
  </dict>
</array>
```

#### Android (`android/app/src/main/AndroidManifest.xml`)

```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:scheme="lunifin"
        android:host="plaid-callback" />
</intent-filter>
```

### 3. Complete Flutter Implementation

```dart
import 'package:plaid_flutter/plaid_flutter.dart';
import 'package:uni_links/uni_links.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

class PlaidService {
  StreamSubscription? _linkSubscription;
  final String backendUrl = 'https://your-backend.com';
  
  /// Initialize deep link listener
  void initDeepLinkListener() {
    _linkSubscription = uriLinkStream.listen((Uri? uri) {
      if (uri != null) {
        _handleDeepLink(uri);
      }
    }, onError: (err) {
      print('Deep link error: $err');
    });
  }
  
  /// Handle incoming deep links
  void _handleDeepLink(Uri uri) {
    print('Received deep link: $uri');
    
    if (uri.scheme == 'lunifin' && uri.host == 'plaid-callback') {
      final publicToken = uri.queryParameters['public_token'];
      final error = uri.queryParameters['error'];
      final institution = uri.queryParameters['institution'];
      
      if (publicToken != null) {
        print('✅ Received public token from OAuth');
        _handlePlaidSuccess(publicToken, institution);
      } else if (error != null) {
        print('❌ OAuth error: $error');
        _handlePlaidError(error);
      }
    }
  }
  
  /// Store link token in web browser storage
  /// This is required for the OAuth HTML page to work
  Future<void> _storeLinkTokenInBrowser(String linkToken) async {
    // Create a hidden webview to set localStorage
    final controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadRequest(Uri.parse('https://luni.ca'));
    
    // Wait for page to load
    await Future.delayed(Duration(seconds: 1));
    
    // Set the link token in localStorage
    await controller.runJavaScript('''
      localStorage.setItem('plaid_link_token', '$linkToken');
      sessionStorage.setItem('plaid_link_token', '$linkToken');
    ''');
    
    print('✅ Link token stored in browser storage');
  }
  
  /// Main method to connect bank account
  Future<void> connectBankAccount(String userId) async {
    try {
      // Step 1: Get link token from backend
      print('📡 Requesting link token from backend...');
      final linkToken = await _createLinkToken(userId);
      
      // Step 2: Store link token in browser (required for OAuth)
      print('💾 Storing link token in browser...');
      await _storeLinkTokenInBrowser(linkToken);
      
      // Step 3: Open Plaid Link
      print('🏦 Opening Plaid Link...');
      final config = LinkConfiguration(
        token: linkToken,
        oauthRedirectUri: Uri.parse('https://luni.ca/plaid-oauth.html'),
      );
      
      await PlaidLink.open(configuration: config);
      
      // Step 4: Wait for deep link callback (handled by listener)
      print('⏳ Waiting for OAuth callback...');
      
    } catch (e) {
      print('❌ Error connecting bank: $e');
      _handlePlaidError(e.toString());
    }
  }
  
  /// Create link token from backend
  Future<String> _createLinkToken(String userId) async {
    final response = await http.post(
      Uri.parse('$backendUrl/api/plaid/link/token/create'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'user_id': userId}),
    );
    
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data['link_token'];
    } else {
      throw Exception('Failed to create link token: ${response.body}');
    }
  }
  
  /// Handle successful OAuth completion
  Future<void> _handlePlaidSuccess(String publicToken, String? institutionName) async {
    try {
      print('✅ Bank connected: ${institutionName ?? "Unknown"}');
      print('🔄 Exchanging public token for access token...');
      
      // Exchange public token for access token via backend
      final response = await http.post(
        Uri.parse('$backendUrl/api/plaid/token/exchange'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'public_token': publicToken,
          'user_id': 'current_user_id', // Replace with actual user ID
        }),
      );
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        print('✅ Access token received: ${data['item_id']}');
        
        // Show success to user
        _showSuccessDialog(institutionName ?? 'Your bank');
      } else {
        throw Exception('Token exchange failed: ${response.body}');
      }
    } catch (e) {
      print('❌ Error exchanging token: $e');
      _handlePlaidError('Failed to complete bank connection');
    }
  }
  
  /// Handle OAuth errors
  void _handlePlaidError(String error) {
    print('❌ Plaid error: $error');
    // Show error to user
    _showErrorDialog(error);
  }
  
  /// Show success dialog
  void _showSuccessDialog(String bankName) {
    // Implement your UI to show success
    print('🎉 Success! Connected to $bankName');
  }
  
  /// Show error dialog
  void _showErrorDialog(String error) {
    // Implement your UI to show error
    print('⚠️ Error: $error');
  }
  
  /// Clean up
  void dispose() {
    _linkSubscription?.cancel();
  }
}

// Usage in your app:
class BankConnectionScreen extends StatefulWidget {
  @override
  _BankConnectionScreenState createState() => _BankConnectionScreenState();
}

class _BankConnectionScreenState extends State<BankConnectionScreen> {
  final PlaidService _plaidService = PlaidService();
  
  @override
  void initState() {
    super.initState();
    _plaidService.initDeepLinkListener();
  }
  
  @override
  void dispose() {
    _plaidService.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          onPressed: () async {
            await _plaidService.connectBankAccount('user_123');
          },
          child: Text('Connect Bank Account'),
        ),
      ),
    );
  }
}
```

## 🔑 Key Features of Your HTML Implementation

### 1. **Complete OAuth Flow**
Your HTML file handles the entire OAuth process using Plaid's SDK with `receivedRedirectUri`.

### 2. **Error Handling**
Handles multiple error scenarios:
- Missing `oauth_state_id`
- Missing `link_token`
- User cancellation
- Plaid errors

### 3. **Visual Feedback**
Shows user-friendly messages:
- "Completing Bank Connection" (loading)
- "Success!" (on success)
- "Connection Failed" (on error)

### 4. **Deep Link Callbacks**

**Success**:
```
lunifin://plaid-callback?public_token=xxx&institution=Bank%20Name
```

**Error**:
```
lunifin://plaid-callback?error=Error%20message
```

## 🧪 Testing

### Test the HTML Page Directly

```bash
# Visit in browser with test parameters:
https://luni.ca/plaid-oauth.html?oauth_state_id=test123

# You'll see error: "Missing link token"
# This is expected - link token must be set first
```

### Test Deep Link

**iOS Simulator**:
```bash
xcrun simctl openurl booted "lunifin://plaid-callback?public_token=test-token&institution=Test%20Bank"
```

**Android Emulator**:
```bash
adb shell am start -a android.intent.action.VIEW -d "lunifin://plaid-callback?public_token=test-token&institution=Test%20Bank"
```

## ⚠️ Important Notes

### 1. Link Token Storage
Your HTML file requires the `link_token` to be stored in `localStorage` or `sessionStorage` BEFORE the OAuth redirect happens. This means:

- Option A: Open a hidden webview to set localStorage before opening Plaid Link
- Option B: Modify HTML to fetch link token from backend using a session ID
- Option C: Pass link token in URL (less secure)

### 2. Deep Link Scheme Change
Your HTML uses `lunifin://plaid-callback` instead of `luni://plaid-oauth`. Make sure:
- Flutter deep link configuration matches: `lunifin://`
- iOS URL scheme is `lunifin`
- Android scheme is `lunifin`

### 3. Production Configuration

Update Plaid Dashboard:
```
OAuth Redirect URI: https://luni.ca/plaid-oauth.html
```

Make sure it ends with `.html` since it's a static file!

## 🚀 Deployment

Your HTML file is in `frontend/public/plaid-oauth.html`, which means:

**Vercel**:
- Automatically served at `https://luni.ca/plaid-oauth.html`
- No routing needed - it's a static file ✅

**Local Testing**:
- Available at `http://localhost:3002/plaid-oauth.html`

## 📊 Flow Diagram

```
Flutter App
    ↓
1. Get link_token from backend
    ↓
2. Store link_token in web localStorage
    ↓
3. Open Plaid Link (oauthRedirectUri: luni.ca/plaid-oauth.html)
    ↓
4. User selects bank → Bank OAuth
    ↓
5. Bank redirects: luni.ca/plaid-oauth.html?oauth_state_id=xxx
    ↓
6. HTML page:
   - Gets link_token from localStorage
   - Initializes Plaid Link with receivedRedirectUri
   - Completes OAuth flow
   - Receives public_token
    ↓
7. Deep link: lunifin://plaid-callback?public_token=xxx
    ↓
8. Flutter receives public_token
    ↓
9. Send to backend to exchange for access_token
    ↓
10. Done! ✅
```

## ✅ Summary

Your `plaid-oauth.html` implementation:
- ✅ More complete than React component approach
- ✅ Uses Plaid SDK's proper OAuth handling
- ✅ Returns `public_token` directly to Flutter
- ✅ Handles all error cases
- ✅ Works as standalone static file
- ⚠️ Requires storing `link_token` before OAuth starts

This is actually the **recommended approach** for production Plaid OAuth! 🎉

