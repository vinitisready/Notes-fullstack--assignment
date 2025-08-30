# Deployment Guide

## Quick Deploy Links

### Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/hd-notes-app&project-name=hd-notes-app&repository-name=hd-notes-app)

### Backend (Railway)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template-id)

## Manual Deployment Steps

### 1. Database Setup (MongoDB Atlas)
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create new cluster (free tier available)
3. Create database user and get connection string
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)

### 2. Backend Deployment (Railway)
1. Push code to GitHub repository
2. Connect Railway to your GitHub repo
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Random secure string
   - `EMAIL_USER`: Gmail address for OTP
   - `EMAIL_PASS`: Gmail app password
   - `GOOGLE_CLIENT_ID`: (optional) Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: (optional) Google OAuth secret
4. Deploy automatically triggers

### 3. Frontend Deployment (Vercel)
1. Connect Vercel to your GitHub repo
2. Set build settings:
   - Framework: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
3. Set environment variable:
   - `REACT_APP_API_URL`: Your Railway backend URL
4. Deploy

### 4. Email Setup (Gmail)
1. Enable 2-factor authentication on Gmail
2. Generate App Password:
   - Google Account → Security → App passwords
   - Select app: Mail, device: Other
   - Use generated password in `EMAIL_PASS`

### 5. Google OAuth Setup (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins:
   - `https://your-vercel-app.vercel.app`
   - `http://localhost:3000` (for development)

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/hd-notes
JWT_SECRET=your-jwt-secret-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-railway-app.up.railway.app/api
```

## Deployment URLs
- Frontend: https://hd-notes-app.vercel.app
- Backend: https://hd-notes-backend.up.railway.app
- Health Check: https://hd-notes-backend.up.railway.app/health