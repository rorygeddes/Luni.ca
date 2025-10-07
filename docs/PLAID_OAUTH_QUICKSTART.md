# Plaid OAuth Quick Start Guide

## What Was Created

✅ **Frontend OAuth Redirect Page** (`/plaid-oauth`)
- Receives OAuth callback from Plaid
- Extracts `oauth_state_id` from URL
- Deep links back to Flutter app: `luni://plaid-oauth?oauth_state_id=xxx&status=success`
- Beautiful UI with loading, success, and error states

✅ **Backend Plaid Integration**
- Link token creation endpoint: `POST /api/plaid/link/token/create`
- Public token exchange endpoint: `POST /api/plaid/token/exchange`
- Plaid SDK initialized with environment configuration
- Database integration for storing access tokens

✅ **Documentation**
- Comprehensive setup guide in `PLAID_OAUTH_SETUP.md`
- Flutter integration examples
- Deep linking configuration

## Quick Setup Steps

### 1. Backend Setup (5 minutes)

```bash
cd backend
npm install  # Installs plaid package
```

Add to your `.env`:
```env
PLAID_CLIENT_ID=your_client_id_here
PLAID_SECRET=your_sandbox_secret_here
PLAID_ENV=sandbox
```

Get credentials: https://dashboard.plaid.com/

### 2. Configure Plaid Dashboard (2 minutes)

1. Go to [Plaid Dashboard](https://dashboard.plaid.com/)
2. Navigate to **Team Settings** → **API**
3. Add OAuth redirect URI: `https://luni.ca/plaid-oauth`
4. Save

### 3. Deploy Frontend (if needed)

The frontend is already set up and ready. Just deploy as normal:

```bash
cd frontend
npm run build
# Deploy to your hosting provider
```

### 4. Test the Flow

#### Local Testing:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

#### Test URL:
Visit: `http://localhost:3000/plaid-oauth?oauth_state_id=test123`

You should see the redirect page attempt to deep link to your app.

## Flutter Integration (10 minutes)

### 1. Add Dependencies

```yaml
dependencies:
  plaid_flutter: ^4.0.0
  uni_links: ^0.5.1
  url_launcher: ^6.1.0
```

### 2. Configure Deep Links

**iOS** (`ios/Runner/Info.plist`):
```xml
<key>CFBundleURLSchemes</key>
<array>
  <string>luni</string>
</array>
```

**Android** (`android/app/src/main/AndroidManifest.xml`):
```xml
<data android:scheme="luni" android:host="plaid-oauth" />
```

### 3. Basic Integration Code

```dart
import 'package:plaid_flutter/plaid_flutter.dart';
import 'package:uni_links/uni_links.dart';

// Initialize Plaid
final config = LinkConfiguration(
  token: linkToken, // Get from your backend
  oauthRedirectUri: Uri.parse('https://luni.ca/plaid-oauth'),
);

// Listen for OAuth callbacks
uriLinkStream.listen((Uri? uri) {
  if (uri?.queryParameters['oauth_state_id'] != null) {
    // Continue Plaid Link flow
  }
});
```

See `PLAID_OAUTH_SETUP.md` for complete Flutter code examples.

## API Endpoints

### Create Link Token
```bash
POST https://your-backend-url/api/plaid/link/token/create
Content-Type: application/json

{
  "user_id": "your_user_id"
}
```

**Response:**
```json
{
  "link_token": "link-sandbox-xxx",
  "expiration": "2024-01-01T00:00:00Z",
  "request_id": "xxx",
  "success": true
}
```

### Exchange Public Token
```bash
POST https://your-backend-url/api/plaid/token/exchange
Content-Type: application/json

{
  "public_token": "public-sandbox-xxx",
  "user_id": "your_user_id"
}
```

**Response:**
```json
{
  "access_token": "access-sandbox-xxx",
  "item_id": "xxx",
  "success": true
}
```

## Architecture Flow

```
1. Flutter App
   ↓ (Create link token)
2. Your Backend (/api/plaid/link/token/create)
   ↓ (Return link token)
3. Flutter App (Open Plaid Link)
   ↓ (User selects bank with OAuth)
4. Bank OAuth Page
   ↓ (User authenticates)
5. Redirect to https://luni.ca/plaid-oauth?oauth_state_id=xxx
   ↓ (Extract oauth_state_id)
6. Deep Link: luni://plaid-oauth?oauth_state_id=xxx
   ↓ (Flutter receives)
7. Flutter continues Plaid Link
   ↓ (Link completion)
8. Flutter receives public_token
   ↓ (Send to backend)
9. Your Backend (/api/plaid/token/exchange)
   ↓ (Exchange for access_token)
10. Backend stores access_token
```

## Testing

### Sandbox Test Credentials
- Username: `user_good`
- Password: `pass_good`
- MFA: `1234`

### Test Banks
In sandbox mode, search for:
- "First Platypus Bank" (OAuth)
- "Tartan Bank" (Simple auth)

### Verify Setup
1. ✅ Plaid credentials in backend `.env`
2. ✅ OAuth redirect URI in Plaid Dashboard
3. ✅ Deep linking configured in Flutter
4. ✅ Backend endpoints accessible
5. ✅ Frontend deployed at luni.ca

## Production Checklist

Before going live:

- [ ] Change `PLAID_ENV` to `production`
- [ ] Use production Plaid credentials
- [ ] Update OAuth redirect URI in production Plaid settings
- [ ] Test with real bank accounts
- [ ] Implement proper error handling
- [ ] Set up logging and monitoring
- [ ] Encrypt access tokens in database
- [ ] Add user authentication
- [ ] Implement token refresh mechanism
- [ ] Add rate limiting
- [ ] Review security best practices

## Troubleshooting

### "Plaid is not configured"
- Check `.env` has `PLAID_CLIENT_ID` and `PLAID_SECRET`
- Restart backend server after adding env vars

### Deep link not working
- Verify URL scheme in iOS/Android config
- Check deep link format: `luni://plaid-oauth`
- Test with app in foreground

### OAuth redirect fails
- Verify redirect URI in Plaid Dashboard matches exactly
- Check HTTPS is used (required for OAuth)
- Ensure luni.ca/plaid-oauth is accessible

### Token exchange fails
- Verify Plaid environment matches (sandbox vs production)
- Check public_token is valid and not expired
- Review backend logs for Plaid API errors

## Resources

- 📖 [Full Setup Guide](./PLAID_OAUTH_SETUP.md)
- 🏦 [Plaid Dashboard](https://dashboard.plaid.com/)
- 📚 [Plaid OAuth Docs](https://plaid.com/docs/link/oauth/)
- 🐦 [Flutter Deep Linking](https://docs.flutter.dev/development/ui/navigation/deep-linking)

## Support

For questions or issues:
1. Check the full documentation in `PLAID_OAUTH_SETUP.md`
2. Review Plaid's OAuth troubleshooting guide
3. Check backend logs: `npm run dev` (backend)
4. Check Flutter console logs
5. Verify browser console at luni.ca/plaid-oauth

---

**Quick Test URL**: `https://luni.ca/plaid-oauth?oauth_state_id=test123&status=success`

This should trigger the deep link to your Flutter app!

