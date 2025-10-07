# Plaid OAuth Configuration Checklist

Use this checklist to ensure everything is configured correctly.

## ✅ 1. Plaid Dashboard Configuration

### Get Credentials
1. Visit: https://dashboard.plaid.com/
2. Sign up or log in
3. Navigate to **Team Settings** → **Keys**
4. Copy your credentials:
   - ✏️ `client_id`: ________________
   - ✏️ `sandbox secret`: ________________
   - ✏️ `development secret` (optional): ________________

### Set OAuth Redirect URI
1. Go to **Team Settings** → **API**
2. Scroll to **OAuth Settings**
3. Add redirect URI: **`https://luni.ca/plaid-oauth`**
4. Click **Save Changes**

⚠️ **Important**: The URI must match exactly (no trailing slash)

---

## ✅ 2. Backend Configuration

### Environment Variables

Create or update `backend/.env`:

```env
# Plaid Configuration
PLAID_CLIENT_ID=your_client_id_here
PLAID_SECRET=your_sandbox_secret_here
PLAID_ENV=sandbox

# Other existing variables...
PORT=5001
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### Restart Backend
```bash
cd backend
npm run dev
```

### Verify Backend
```bash
# Should see:
# ✅ Plaid client initialized (sandbox environment)
```

---

## ✅ 3. Frontend Deployment

### Verify Route
1. Deploy frontend to production
2. Visit: https://luni.ca/plaid-oauth
3. Should see the OAuth redirect page

### Test URL
Try: `https://luni.ca/plaid-oauth?oauth_state_id=test123`

Expected: Page shows success and attempts deep link

---

## ✅ 4. Flutter App Configuration

### Deep Linking Scheme
- **Scheme**: `luni`
- **Host**: `plaid-oauth`
- **Full URL**: `luni://plaid-oauth`

### iOS Configuration (`ios/Runner/Info.plist`)

Add inside `<dict>`:
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

### Android Configuration (`android/app/src/main/AndroidManifest.xml`)

Add inside `<activity>`:
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

### Dependencies (`pubspec.yaml`)
```yaml
dependencies:
  plaid_flutter: ^4.0.0
  uni_links: ^0.5.1
  url_launcher: ^6.1.0
  http: ^1.1.0
```

---

## ✅ 5. Backend API Endpoints

### Base URL
- Development: `http://localhost:5001`
- Production: `https://your-backend-url.com`

### Endpoints to Implement

#### Create Link Token
```
POST /api/plaid/link/token/create
Content-Type: application/json

{
  "user_id": "your_user_id"
}
```

#### Exchange Public Token
```
POST /api/plaid/token/exchange
Content-Type: application/json

{
  "public_token": "public-sandbox-xxx",
  "user_id": "your_user_id"
}
```

---

## ✅ 6. Database Setup (Optional)

### Supabase Table

```sql
CREATE TABLE plaid_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  item_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX idx_plaid_items_user_id ON plaid_items(user_id);

-- Add row level security (RLS) if needed
ALTER TABLE plaid_items ENABLE ROW LEVEL SECURITY;
```

---

## 🧪 Testing Checklist

### Test 1: Web Page
- [ ] Visit: https://luni.ca/plaid-oauth?oauth_state_id=test123
- [ ] Page loads without errors
- [ ] Shows success message
- [ ] Console shows deep link URL

### Test 2: Backend Health
```bash
curl https://your-backend-url/health
```
- [ ] Returns: `{"status":"OK","message":"Luni Backend API is running"}`

### Test 3: Link Token Creation
```bash
curl -X POST https://your-backend-url/api/plaid/link/token/create \
  -H "Content-Type: application/json" \
  -d '{"user_id":"test123"}'
```
- [ ] Returns link_token successfully
- [ ] No errors in response

### Test 4: Flutter Deep Link
```bash
# On iOS simulator/device with app installed
xcrun simctl openurl booted "luni://plaid-oauth?oauth_state_id=test123&status=success"

# On Android emulator/device with app installed
adb shell am start -a android.intent.action.VIEW -d "luni://plaid-oauth?oauth_state_id=test123&status=success"
```
- [ ] App opens successfully
- [ ] Receives oauth_state_id parameter

### Test 5: Complete OAuth Flow
- [ ] Open Plaid Link in Flutter app
- [ ] Select "First Platypus Bank" (OAuth bank in sandbox)
- [ ] Enter credentials: `user_good` / `pass_good`
- [ ] Redirects to https://luni.ca/plaid-oauth
- [ ] App receives oauth_state_id via deep link
- [ ] Plaid Link completes successfully
- [ ] Receives public_token
- [ ] Backend exchanges for access_token
- [ ] access_token saved to database

---

## 🚀 Production Deployment Checklist

### Before Going Live
- [ ] Change `PLAID_ENV` to `production` in backend
- [ ] Update Plaid credentials to production keys
- [ ] Update OAuth redirect URI in production Plaid settings
- [ ] Test with real bank accounts (your own test accounts)
- [ ] Implement user authentication for API endpoints
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Configure rate limiting
- [ ] Set up monitoring alerts
- [ ] Review Plaid production checklist: https://plaid.com/docs/launch-checklist/

### Security Review
- [ ] Access tokens encrypted in database
- [ ] API endpoints require authentication
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Logging configured (but not logging sensitive data)
- [ ] HTTPS everywhere
- [ ] Error messages don't expose sensitive info

---

## 📝 Important URLs

| Purpose | URL |
|---------|-----|
| OAuth Redirect | https://luni.ca/plaid-oauth |
| Plaid Dashboard | https://dashboard.plaid.com/ |
| Plaid Docs | https://plaid.com/docs/ |
| Plaid OAuth Docs | https://plaid.com/docs/link/oauth/ |
| Deep Link Scheme | luni://plaid-oauth |

---

## 🆘 Quick Troubleshooting

### "Missing oauth_state_id parameter"
- Check Plaid Dashboard has correct redirect URI
- Verify URL is exactly: `https://luni.ca/plaid-oauth`

### "Plaid is not configured on the server"
- Backend .env missing Plaid credentials
- Restart backend after adding credentials

### Deep link not working
- Flutter app not installed
- Deep link scheme not configured in iOS/Android
- App not in foreground (iOS requires app to be running)

### "Failed to exchange public token"
- Wrong Plaid environment (sandbox vs production)
- public_token expired (they expire after 30 minutes)
- Invalid public_token format

---

## ✨ Success Criteria

You'll know everything is working when:
1. ✅ Backend starts with "Plaid client initialized"
2. ✅ Can create link tokens via API
3. ✅ OAuth redirect page loads at luni.ca/plaid-oauth
4. ✅ Deep link opens Flutter app
5. ✅ Complete OAuth flow end-to-end
6. ✅ access_token saved to database

---

**Last Updated**: October 7, 2025
**Status**: Ready for Testing

Print this checklist and check off items as you complete them!

