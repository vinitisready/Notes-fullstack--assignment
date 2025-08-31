# HD Notes - Full Stack Note Taking Application

⚠️ **SECURITY**: Never commit .env files or secrets to git

A modern, responsive note-taking application built with React TypeScript frontend and Node.js TypeScript backend.

## Features

- User authentication with email/OTP verification
- Google OAuth integration (configurable)
- JWT-based authorization
- Create, read, and delete notes
- Responsive design for mobile, tablet, and desktop
- Modern UI matching provided Figma designs

## Technology Stack

### Frontend
- React 19 with TypeScript
- React Router for navigation
- Axios for API calls
- CSS3 with responsive design

### Backend
- Node.js with Express and TypeScript
- MongoDB with Mongoose ODM
- JWT for authentication
- Nodemailer for OTP emails
- Google Auth Library for OAuth

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Gmail account for sending OTP emails

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd hd-notes-app
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hd-notes
JWT_SECRET=your-super-secret-jwt-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Database Setup
Ensure MongoDB is running locally or update the MONGODB_URI in .env to point to your MongoDB instance.

## Running the Application

### Development Mode

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build

1. Build the backend:
```bash
cd backend
npm run build
npm start
```

2. Build the frontend:
```bash
cd frontend
npm run build
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/signin` - User login
- `POST /api/auth/google` - Google OAuth

### Notes (Protected Routes)
- `GET /api/notes` - Get user notes
- `POST /api/notes` - Create new note
- `DELETE /api/notes/:id` - Delete note

## Email Configuration

To enable OTP functionality:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for Gmail
3. Update EMAIL_USER and EMAIL_PASS in .env file

## Google OAuth Setup (Optional)

1. Create a project in Google Cloud Console
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env

## Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set environment variables on your hosting platform
4. Ensure MongoDB connection is configured

### Frontend Deployment
1. Update API base URL in `src/services/api.ts`
2. Build the application: `npm run build`
3. Deploy the `build` folder to your hosting service

## Project Structure

```
hd-notes-app/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
│   └── public/
└── README.md
```

## Security Features

- JWT token-based authentication
- Password-less authentication with OTP
- Input validation and sanitization
- CORS protection
- Environment variable configuration

## Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop computers (1024px and up)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)