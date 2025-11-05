# CIVINET - Civic Incident Reporting Platform

## Overview
CIVINET is a civic engagement platform that allows citizens to report and track local incidents such as potholes, graffiti, and other community issues. The platform features user authentication, incident reporting with image upload, a social feed, leaderboards, and user profiles.

## Project Structure
This is a React-based web application:
- **Frontend**: React with Vite
- **Styling**: Custom CSS with CSS variables
- **Icons**: Google Material Symbols
- **Fonts**: Public Sans (Google Fonts)
- **State Management**: React Context API (SidebarContext)
- **Routing**: React Router DOM

## Pages/Routes
- `/login` - Login page with OTP verification and welcome stats
- `/create-account` - Account creation with feature highlights
- `/account-created` - Success confirmation page
- `/feed` - Main feed with leaderboard/reports preview and recent incidents
- `/report` - Incident reporting form with location detection
- `/report-success` - Report submission success page
- `/all-reports` - View all submitted reports with filtering
- `/leaderboard` - User leaderboard with weekly rankings
- `/profile` - User profile with location settings and editing

## Technology Stack
- React 18.3
- React Router DOM 6.28
- Vite 7.1
- Custom CSS with CSS Variables
- Google Material Symbols icons
- Google Fonts (Public Sans)
- OpenStreetMap Nominatim API (reverse geocoding)

## Development
The app runs on Vite dev server on port 5000 with hot module replacement enabled.

## Recent Changes
- **2025-11-05**: Major UX improvements and feature enhancements (Latest Update)
  - **Like/Dislike Feature**: Interactive engagement on all feed posts
    - Like and dislike buttons with state management
    - Mutual exclusivity (can't like and dislike same post)
    - Visual feedback with filled icons and colored backgrounds
    - Toast notifications for user actions
  - **Enhanced Mobile Optimizations**: Significantly improved mobile experience
    - Reduced base font size to 13px for better content fit
    - Ultra-compact padding (0.5rem) and margins throughout
    - Smaller icons (20px), buttons, and form elements
    - Optimized avatar sizes and card dimensions
    - Improved readability with proper text hierarchy
  - **Desktop 2-Column Feed Layout**: Professional dashboard layout (1024px+)
    - Left column: Main feed content (max 700px)
    - Right sidebar: Fixed widgets with scroll
      - Daily Leaderboard (top 5 users with avatars and points)
      - Community Stats (total reports, resolved, pending, success rate)
      - Recent Reports (clickable items with thumbnails and status badges)
    - Mobile view shows quick-access buttons instead
    - Fixed overlapping media queries (desktop ≥1024px, mobile ≤1023px)
  - **Menu Button Improvements**: Smooth positioning that follows sidebar
    - Moves from left: 272px to 84px when sidebar collapses
    - Smooth cubic-bezier transition
    - Never hides CIVINET name
  - **Sidebar Logo Enhancement**: Clean collapsed state
    - Shows "CIVINET" when expanded
    - Shows single "C" when collapsed (no rotation)
    - Straight, readable branding at all times
  - **Cursor UX Fix**: Native cursor now visible
    - Removed cursor: none from body
    - Animated blue ring cursor still present
    - Best of both worlds for user comfort
  - **Advanced Location Detection**: High-accuracy GPS with detailed addresses
    - Street name and house number when available
    - Neighborhood/suburb/district information
    - City, state, and country details
    - Proper error handling with coordinate fallback
    - enableHighAccuracy: true for precise positioning
    - 10-second timeout with retry options
  - **Language Selector**: Added to Profile page
    - 10 Indian languages supported (English, Hindi, Telugu, Tamil, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi)
    - Saves preference to localStorage
    - Toast notification on language change
  - **Zero Alert/Prompt Dialogs**: Completely removed all browser dialogs
    - Tag input: Inline form with check/cross buttons
    - Delete confirmation: Inline check/cross buttons with toast feedback
    - All notifications use custom toast system
  - **Sidebar Always Shows CIVINET**: Fixed visibility issue
    - Displays "CIVINET" text in both expanded and collapsed states
    - Vertical text when collapsed for better branding
  - **Custom Notification System**: Replaced all alert boxes with animated popup notifications
    - Types: success, error, warning, info
    - Auto-dismiss with manual close option
    - Smooth slide-in animations
    - Implemented across all pages (Feed, Report, Profile, AllReports)
  - **Reverse Geocoding Integration**: Location detection now shows city/district names
    - Profile page: Saves location globally (localStorage)
    - Report page: Shows detailed address (local only, doesn't persist)
    - Uses OpenStreetMap Nominatim API
  - **Menu Button Redesign**: Blue rounded button with better animations
    - Changed from white circular to blue rounded square
    - Removed excessive scale animations
    - Smooth hover lift effect
  - **Feed Page Enhancements**:
    - Added Leaderboard and My Reports preview cards
    - Clickable cards navigate to respective pages
    - Changed profile icon to notification bell
    - "Recent Reports" section heading
  - **Profile Editing UI**: Replaced Save/Cancel buttons with tick/cross icons
    - Green check icon for save
    - Red close icon for cancel
    - Compact and modern design

- **2025-11-03**: React migration and professional UX implementation
  - **Migrated from static HTML to React**: Complete rebuild with 100% visual parity
  - **Collapsible Sidebar Navigation**: Desktop-only with hamburger menu (260px ↔ 72px)
  - **Responsive Navigation**: Sidebar on desktop, bottom nav on mobile (≤768px)
  - **Professional Animations**: fadeIn, slideUp, scaleIn, card hover effects
  - **Enhanced Auth Pages**: Welcome content, stats, and feature highlights
  - **Inspirational Messaging**: Leaderboard banner and civic engagement themes

## User Preferences
None set yet.

## Project Architecture
React single-page application with component-based architecture:
- **Components**: Reusable UI components (Sidebar, MenuButton, BottomNav, Notification)
- **Pages**: Route-based page components
- **Contexts**: Global state management (SidebarContext)
- **Hooks**: Custom hooks (useIncidents, useNotification)
- **Utilities**: Shared utilities and data

### Key Design Decisions
- React for component reusability and state management
- Context API for global sidebar state
- Custom CSS with CSS variables for theming
- Responsive breakpoint at 768px (desktop vs mobile)
- localStorage for persistent user location
- OpenStreetMap API for free reverse geocoding
- Mobile-first design with desktop enhancements

### Navigation Pattern
- Desktop (>768px): Collapsible sidebar (260px expanded, 72px collapsed)
- Mobile (≤768px): Fixed bottom navigation bar
- Menu button visible on desktop only
- Smooth transitions between states (0.3s cubic-bezier)
