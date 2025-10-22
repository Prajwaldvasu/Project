import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    TextField,
    Autocomplete,
    Chip,
    Stack,
    Alert,
    CircularProgress,
    Paper,
    Divider,
    IconButton,
    Tooltip,
    Fade,
    Slide,
    Grid,
    CardActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    MyLocation,
    LocalHospital,
    MedicalServices,
    Favorite,
    AccessibilityNew,
    Map,
    Directions,
    LocationOn,
    Phone,
    Info,
    Refresh,
    CheckCircle,
    Navigation
} from '@mui/icons-material';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icons
const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const hospitalIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to update map center
function ChangeMapView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

const diseasesList = [
    'allergy', 'fever', 'chest pain', 'skin', 'general'
];

function HospitalSearch() {
    const [userLocation, setUserLocation] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState('');
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [route, setRoute] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [locationPermission, setLocationPermission] = useState(false);
    const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); // Default to Bangalore
    const [mapZoom, setMapZoom] = useState(12);
    const [showRouteDialog, setShowRouteDialog] = useState(false);

    // Get user location on component mount
    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    setMapCenter([latitude, longitude]);
                    setMapZoom(15);
                    setLocationPermission(true);
                    setIsLoading(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setError('Unable to get your location. Please allow location access.');
                    setLocationPermission(false);
                    setIsLoading(false);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const searchHospitals = async () => {
        if (!userLocation) {
            setError('Please allow location access first.');
            return;
        }

        try {
            setError('');
            setIsLoading(true);
            const response = await axios.get('/api/appointments/search/', {
                params: {
                    lat: userLocation.lat,
                    lon: userLocation.lng,
                    disease: selectedDisease,
                    radius_km: 20
                }
            });

            setHospitals(response.data.results);
            if (response.data.results.length === 0) {
                setError('No hospitals found in your area.');
            }
        } catch (err) {
            setError('Failed to search hospitals. Please try again.');
            console.error('Search error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const showRoute = (hospital) => {
        if (!userLocation) return;

        setSelectedHospital(hospital);
        setRoute({
            start: [userLocation.lat, userLocation.lng],
            end: [hospital.latitude, hospital.longitude]
        });
        setShowRouteDialog(true);
        setMapCenter([(userLocation.lat + hospital.latitude) / 2, (userLocation.lng + hospital.longitude) / 2]);
        setMapZoom(13);
    };

    const openInMaps = (hospital) => {
        if (!userLocation) return;

        const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${hospital.latitude},${hospital.longitude}`;
        window.open(url, '_blank');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundAttachment: 'fixed',
                py: 4
            }}
        >
            <Container maxWidth="xl">
                {/* Header Section */}
                <Fade in timeout={800}>
                    <Box textAlign="center" mb={4}>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 3,
                                mb: 4,
                                p: 4,
                                borderRadius: 4,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <LocalHospital sx={{ fontSize: 60, color: '#e74c3c', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                                <MedicalServices
                                    sx={{
                                        fontSize: 30,
                                        color: '#3498db',
                                        position: 'absolute',
                                        top: -5,
                                        right: -5,
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    variant="h3"
                                    fontWeight={900}
                                    gutterBottom
                                    sx={{
                                        background: 'linear-gradient(45deg, #e74c3c, #3498db)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    Find Nearby Hospitals
                                </Typography>
                                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
                                    Locate healthcare facilities and get directions
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                                    Real-time location tracking and route mapping
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Fade>

                {/* Location Permission and Search Section */}
                <Slide direction="up" in timeout={1000}>
                    <Card
                        elevation={12}
                        sx={{
                            overflow: 'hidden',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: 4,
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                            mb: 4
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} md={4}>
                                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                                        <MyLocation sx={{ fontSize: 32, color: locationPermission ? '#27ae60' : '#e74c3c' }} />
                                        <Typography variant="h6" fontWeight={600}>
                                            Your Location
                                        </Typography>
                                    </Box>
                                    {userLocation ? (
                                        <Typography variant="body2" color="success.main">
                                            ✓ Location detected: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                                        </Typography>
                                    ) : (
                                        <Typography variant="body2" color="error.main">
                                            ✗ Location access required
                                        </Typography>
                                    )}
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={getUserLocation}
                                        disabled={isLoading}
                                        startIcon={<Refresh />}
                                        sx={{ mt: 1 }}
                                    >
                                        {isLoading ? 'Getting Location...' : 'Refresh Location'}
                                    </Button>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Autocomplete
                                        options={diseasesList}
                                        value={selectedDisease}
                                        onChange={(event, newValue) => setSelectedDisease(newValue)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Disease/Specialty (Optional)"
                                                placeholder="e.g., fever, allergy"
                                                fullWidth
                                            />
                                        )}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={searchHospitals}
                                        disabled={!userLocation || isLoading}
                                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <LocalHospital />}
                                        sx={{
                                            px: 6,
                                            py: 2,
                                            fontSize: '1.2rem',
                                            fontWeight: 700,
                                            borderRadius: 4,
                                            background: 'linear-gradient(45deg, #e74c3c, #3498db)',
                                            boxShadow: '0 8px 25px rgba(231,76,60,0.3)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #c0392b, #2980b9)',
                                                transform: 'translateY(-3px)',
                                                boxShadow: '0 12px 35px rgba(231,76,60,0.4)'
                                            },
                                            '&:disabled': {
                                                background: 'rgba(0,0,0,0.12)',
                                                color: 'rgba(0,0,0,0.26)',
                                                boxShadow: 'none'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {isLoading ? 'Searching...' : 'Find Hospitals'}
                                    </Button>
                                </Grid>
                            </Grid>

                            {error && (
                                <Alert severity="error" sx={{ mt: 3, borderRadius: 3 }}>
                                    {error}
                                </Alert>
                            )}
                        </CardContent>
                    </Card>
                </Slide>

                {/* Map and Results Section */}
                <Grid container spacing={4}>
                    {/* Map Section */}
                    <Grid item xs={12} lg={8}>
                        <Card
                            elevation={12}
                            sx={{
                                height: 600,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: 4,
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
                            }}
                        >
                            <CardContent sx={{ p: 0, height: '100%' }}>
                                <MapContainer
                                    center={mapCenter}
                                    zoom={mapZoom}
                                    style={{ height: '100%', width: '100%', borderRadius: 16 }}
                                >
                                    <ChangeMapView center={mapCenter} zoom={mapZoom} />
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />

                                    {userLocation && (
                                        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                                            <Popup>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Your Location
                                                </Typography>
                                                <Typography variant="body2">
                                                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                                                </Typography>
                                            </Popup>
                                        </Marker>
                                    )}

                                    {hospitals.map((hospital, index) => (
                                        <Marker
                                            key={index}
                                            position={[hospital.latitude, hospital.longitude]}
                                            icon={hospitalIcon}
                                        >
                                            <Popup>
                                                <Box sx={{ minWidth: 200 }}>
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        {hospital.name}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                                        {hospital.address}
                                                    </Typography>
                                                    {hospital.phone && (
                                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                                            📞 {hospital.phone}
                                                        </Typography>
                                                    )}
                                                    {hospital.distance_km && (
                                                        <Typography variant="body2" color="primary">
                                                            📍 {hospital.distance_km} km away
                                                        </Typography>
                                                    )}
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        onClick={() => showRoute(hospital)}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        Show Route
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        onClick={() => openInMaps(hospital)}
                                                    >
                                                        Open in Maps
                                                    </Button>
                                                </Box>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Results Section */}
                    <Grid item xs={12} lg={4}>
                        <Card
                            elevation={12}
                            sx={{
                                height: 600,
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: 4,
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                overflow: 'auto'
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={600} mb={2}>
                                    Nearby Hospitals ({hospitals.length})
                                </Typography>

                                {hospitals.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">
                                        No hospitals found. Try searching with different criteria.
                                    </Typography>
                                ) : (
                                    <Stack spacing={2}>
                                        {hospitals.map((hospital, index) => (
                                            <Card key={index} variant="outlined" sx={{ borderRadius: 2 }}>
                                                <CardContent sx={{ pb: 1 }}>
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                        {hospital.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                        {hospital.address}
                                                    </Typography>
                                                    {hospital.phone && (
                                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                                            📞 {hospital.phone}
                                                        </Typography>
                                                    )}
                                                    {hospital.distance_km && (
                                                        <Chip
                                                            label={`${hospital.distance_km} km`}
                                                            size="small"
                                                            color="primary"
                                                            variant="outlined"
                                                            sx={{ mb: 1 }}
                                                        />
                                                    )}
                                                </CardContent>
                                                <CardActions sx={{ pt: 0 }}>
                                                    <Button
                                                        size="small"
                                                        onClick={() => showRoute(hospital)}
                                                        startIcon={<Directions />}
                                                    >
                                                        Route
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        onClick={() => openInMaps(hospital)}
                                                        startIcon={<Navigation />}
                                                    >
                                                        Maps
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        ))}
                                    </Stack>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Route Dialog */}
                <Dialog
                    open={showRouteDialog}
                    onClose={() => setShowRouteDialog(false)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Directions sx={{ color: 'primary.main' }} />
                            <Typography variant="h6" fontWeight={600}>
                                Route to {selectedHospital?.name}
                            </Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        {selectedHospital && (
                            <Box>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>From:</strong> Your Location ({userLocation?.lat.toFixed(4)}, {userLocation?.lng.toFixed(4)})
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 3 }}>
                                    <strong>To:</strong> {selectedHospital.name} - {selectedHospital.address}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Click "Open in Maps" to get detailed directions with traffic and multiple route options.
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowRouteDialog(false)}>Close</Button>
                        <Button
                            variant="contained"
                            onClick={() => openInMaps(selectedHospital)}
                            startIcon={<Navigation />}
                        >
                            Open in Maps
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Footer Info */}
                <Fade in timeout={1200}>
                    <Paper
                        elevation={0}
                        sx={{
                            mt: 6,
                            p: 4,
                            textAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: 4,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Box display="flex" alignItems="center" justifyContent="center" gap={2} mb={2}>
                            <Info sx={{ fontSize: 24, color: '#e74c3c' }} />
                            <Typography variant="h6" fontWeight={700} sx={{ color: '#2c3e50' }}>
                                Location Services
                            </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 500, lineHeight: 1.6 }}>
                            This feature uses your browser's geolocation API to provide accurate location services.
                            Your location data is processed locally and not stored on our servers.
                        </Typography>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={2}>
                            <LocationOn sx={{ fontSize: 20, color: '#e74c3c' }} />
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#e74c3c' }}>
                                Location access is required for hospital search and routing features
                            </Typography>
                        </Box>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
}

export default HospitalSearch;
