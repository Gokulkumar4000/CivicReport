# CIVINET - Civic Incident Reporting Platform

## Overview
CIVINET is a civic engagement platform that allows citizens to report and track local incidents such as potholes, graffiti, and other community issues. The platform features user authentication, incident reporting with image upload, a social feed, leaderboards, and user profiles.

## Project Structure
This is a static HTML website using:
- **Frontend**: Pure HTML with Tailwind CSS (CDN)
- **Styling**: Tailwind CSS with custom theme configuration
- **Icons**: Google Material Symbols
- **Fonts**: Public Sans (Google Fonts)

## Pages
- `index.html` - Login page with OTP verification
- `createAccount.html` - Account creation page
- `feedPage.html` - Main feed showing reported incidents
- `ReportIncident.html` - Form to report new incidents
- `ReportIncidentSucess.html` - Success confirmation page
- `showALLReport.html` - View all reports
- `LeaderBord.html` - User leaderboard
- `profile.html` - User profile page
- `otpVerifiedWrong.html` - OTP verification error page
- `sucessCreated.html` - Account creation success page

## Technology Stack
- HTML5
- Tailwind CSS (via CDN)
- JavaScript (vanilla)
- Google Material Symbols icons
- Google Fonts (Public Sans)

## Development
The site is served using a Python HTTP server on port 5000 with cache control headers disabled for development.

## Recent Changes
- **2025-11-03**: Initial project setup in Replit environment
  - Created Python server script for serving static files
  - Configured workflow for frontend on port 5000
  - Added .gitignore for Python and Replit files
  - Documented project structure

## User Preferences
None set yet.

## Project Architecture
This is a static website with client-side navigation. All pages are standalone HTML files with embedded JavaScript for basic interactivity. The site uses a mobile-first design approach with responsive layouts.

### Key Design Decisions
- Static HTML approach for simplicity and ease of deployment
- Tailwind CSS via CDN for rapid styling without build step
- Dark mode support with class-based theming
- Mobile-optimized interface with bottom navigation
