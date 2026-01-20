# How to Run Your Traffic Violation App

## Current Status
✅ Expo development server is RUNNING on your computer

## How to Access the App on Your Phone

### Method 1: Scan QR Code from Terminal (Easiest)

1. **Look at your PowerShell terminal** where you see "npx expo start" running
2. You should see a **QR code** displayed as text characters
3. **On your phone:**
   - Install **Expo Go** app (from Play Store or App Store)
   - Open Expo Go
   - Tap "Scan QR code"
   - Scan the QR code from your terminal

### Method 2: Open DevTools in Browser

1. In your **PowerShell terminal**, press the **`w`** key
2. This opens Expo DevTools in your browser
3. You'll see a large QR code you can scan with your phone

### Method 3: Use Tunnel Mode (If Above Don't Work)

1. In your terminal, press **`Ctrl+C`** to stop the server
2. Run this command:
   ```
   npx expo start --tunnel
   ```
3. This creates a public URL that works from anywhere
4. Scan the new QR code with Expo Go

## Troubleshooting

**Can't see QR code in terminal?**
- Press `w` to open in browser
- Or use tunnel mode (Method 3)

**Phone and computer on different WiFi?**
- Use tunnel mode (Method 3)

**Expo Go not connecting?**
- Make sure phone and computer are on the same WiFi network
- Try tunnel mode

## What Happens Next

Once connected, the app will load on your phone and you can:
- Use the camera to detect violations
- Capture photos/videos
- View gallery of captures
- Adjust settings

## Need Help?

The server is running at: `http://localhost:8081`

Press `?` in the terminal to see all available commands.
