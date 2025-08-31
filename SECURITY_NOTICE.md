# Security Notice

## Secret Rotation Completed

**Date**: December 2024

### Actions Taken:
1. **Removed exposed secrets** from git repository
2. **Generated new JWT secret** for authentication
3. **Updated .gitignore** to prevent future .env commits
4. **Removed .env from git tracking**

### Important Notes:
- All JWT tokens issued before this rotation are now invalid
- Users will need to re-authenticate
- The old JWT secret has been invalidated
- Environment variables are now properly secured

### For Deployment:
Make sure to update your deployment environment variables with:
- New JWT_SECRET
- Your actual MongoDB connection string
- Your email credentials for OTP functionality
- Google OAuth credentials if using Google sign-in

### Security Best Practices:
- Never commit .env files
- Rotate secrets regularly
- Use strong, unique secrets for production
- Monitor for secret exposure in repositories