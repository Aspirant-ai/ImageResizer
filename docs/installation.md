# 🛠️ Installation Guide

## Quick Setup

PixelPerfect ImageResizer is a client-side web application that requires no server setup. Choose your preferred method:

### Method 1: Direct Download
```bash
# Clone the repository
git clone https://github.com/aspirant-ai/ImageResizer.git
cd ImageResizer

# Open in browser
open index.html
```

### Method 2: Local Development Server

#### Using Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Access at: http://localhost:8000
```

#### Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server

# Access at: http://localhost:8080
```

#### Using PHP
```bash
# Start PHP development server
php -S localhost:8000

# Access at: http://localhost:8000
```

### Method 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📋 Requirements

### System Requirements
- **Operating System:** Windows, macOS, Linux
- **RAM:** 2GB minimum (4GB recommended)
- **Storage:** 100MB free space
- **Internet:** Required for CDN resources (Font Awesome, etc.)

### Browser Requirements
| Browser | Minimum Version | Recommended |
|---------|----------------|-------------|
| Chrome  | 80+            | Latest      |
| Firefox | 75+            | Latest      |
| Safari  | 13+            | Latest      |
| Edge    | 80+            | Latest      |

## 🔧 Configuration

### Optional: Custom Configuration
Create a `config.js` file for custom settings:

```javascript
window.ImageResizerConfig = {
    maxFileSize: 50 * 1024 * 1024, // 50MB
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    defaultQuality: 90,
    theme: 'auto' // 'light', 'dark', 'auto'
};
```

### Environment Variables (Optional)
For advanced users, you can set environment-specific configurations:

```javascript
// For production
const PRODUCTION_CONFIG = {
    analytics: true,
    errorReporting: true
};

// For development
const DEVELOPMENT_CONFIG = {
    debug: true,
    verbose: true
};
```

## ✅ Verification

After installation, verify everything works:

1. **Open the application** in your browser
2. **Upload a test image** (any format)
3. **Try resizing** with different options
4. **Download the result** to confirm functionality

## 🚨 Troubleshooting

### Common Issues

**Issue:** Images not loading
- **Solution:** Check browser console for errors
- **Cause:** Usually CORS issues with local files

**Issue:** Slow performance
- **Solution:** Use a local server instead of file:// protocol
- **Cause:** Browser security restrictions

**Issue:** Features not working
- **Solution:** Ensure JavaScript is enabled
- **Cause:** Browser security settings

### Getting Help
- Check [Troubleshooting Guide](troubleshooting.md)
- Report issues on [GitHub](https://github.com/aspirant-ai/ImageResizer/issues)
- Contact: support@sscgram.com