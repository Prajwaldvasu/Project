# Health Portal - Patient Location Tracking and Route Mapping

## Current Status
- ✅ User model has latitude, longitude, address fields
- ✅ API endpoints for hospital search with location data
- ✅ Django backend running on port 8000
- ✅ React frontend running on port 3001

## New Requirements
- [ ] Add hospital search component with map integration
- [ ] Implement patient location tracking using browser geolocation
- [ ] Display route map from patient location to selected hospital
- [ ] Add new route in React app for hospital search
- [ ] Install required mapping dependencies (react-leaflet, leaflet-routing-machine)

## Implementation Plan
1. Install mapping dependencies in frontend
2. Create HospitalSearch component with:
   - Location permission request
   - Map display with user location marker
   - Hospital search functionality
   - Route display to selected hospital
3. Update App.js to include new route
4. Test location tracking and routing functionality

## Testing
- [ ] Test geolocation permission and accuracy
- [ ] Test hospital search API integration
- [ ] Test route calculation and display
- [ ] Test responsive design on different devices
