# CIVINET - Civic Incident Reporting Platform

## Overview
CIVINET is a civic engagement platform designed to empower citizens to report and track local incidents such as potholes, graffiti, and other community issues. The platform aims to foster community involvement through features like user authentication, incident reporting with image upload, a social feed, leaderboards, and user profiles. Its core purpose is to streamline civic problem-solving and enhance local governance efficiency, ultimately improving community living standards.

## User Preferences
None set yet.

## System Architecture
CIVINET is a React-based single-page application built with a component-based architecture.

### UI/UX Decisions
- **Styling**: Custom CSS with CSS variables for flexible theming.
- **Icons**: Google Material Symbols.
- **Fonts**: Public Sans from Google Fonts.
- **Animations**: Utilizes Framer Motion for smooth scroll-triggered animations, transitions, and interactive elements across the platform. This includes glowing effects for leaderboard achievements, animated report process visualizations, seamless sidebar transitions, and dynamic elements on the landing page.
- **Responsiveness**: Mobile-first design with a responsive breakpoint at 768px, transitioning between a collapsible sidebar for desktop and a fixed bottom navigation bar for mobile.
- **Design Language**: Employs glassmorphism for cards and professional corporate aesthetics with gradient backgrounds, glowing elements, and subtle shadows for depth.
- **Interaction**: Implements custom notification toasts instead of browser alerts, enhanced delete confirmation modals with specific reasons, and interactive elements with visual feedback (e.g., like/dislike buttons, animated progress indicators).

### Technical Implementations
- **Frontend Framework**: React 18.3 with Vite for development.
- **State Management**: React Context API for global state (e.g., `SidebarContext`).
- **Routing**: React Router DOM 6.28.
- **Location Services**: Integrates OpenStreetMap Nominatim API for reverse geocoding, providing detailed address information for incident reports and user profiles.
- **Internationalization**: Includes a language selector with support for 10 Indian languages, saving preferences to `localStorage`.

### Feature Specifications
- **Authentication**: Login with OTP verification and account creation with feature highlights.
- **Incident Reporting**: Comprehensive form with required fields (title, category, description), optional fields, image upload, and animated instructions. Includes a visual 5-step report process component.
- **Social Features**: Incident feed with like/dislike functionality and a user leaderboard.
- **User Profile**: Displays impact statistics (reports filed, issues resolved, points, ranking), gamified achievements, and a timeline of recent activity.
- **Navigation**: Collapsible sidebar for desktop (260px expanded, 72px collapsed) and a fixed bottom navigation bar for mobile, with smooth transitions.

### System Design Choices
- **Component Reusability**: Emphasizes reusable UI components, page components, and custom hooks.
- **Persistent Data**: Uses `localStorage` for user location and language preferences.
- **Error Handling**: Robust error handling for location detection and other user interactions.
- **Performance**: Optimized with debouncing, WeakSet tracking for event listeners, and lightweight, hardware-accelerated animations.
- **Z-Index Hierarchy**: Meticulously managed z-indices to ensure correct layering of modals, notifications, and custom cursors.

## External Dependencies
- **OpenStreetMap Nominatim API**: Used for reverse geocoding to detect and display location information.
- **Google Material Symbols**: Provides a comprehensive set of icons for the UI.
- **Google Fonts (Public Sans)**: Supplies the primary typeface for the application.
- **Framer Motion**: Utilized for declarative animations and transitions throughout the application.