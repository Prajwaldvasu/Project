import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    Chip,
    Stack,
    Avatar,
    useTheme,
    useMediaQuery,
    Fade,
    Slide
} from '@mui/material';
import {
    Analytics,
    Speed,
    Security,
    Psychology,
    TrendingUp,
    HealthAndSafety,
    Science,
    SupportAgent
} from '@mui/icons-material';

const features = [
    {
        icon: <Analytics sx={{ fontSize: 40 }} />,
        title: 'AI-Powered Analysis',
        description: 'Advanced machine learning algorithms analyze your symptoms with high accuracy.',
        color: 'primary'
    },
    {
        icon: <Speed sx={{ fontSize: 40 }} />,
        title: 'Instant Results',
        description: 'Get predictions in seconds, not days. Quick and reliable health insights.',
        color: 'secondary'
    },
    {
        icon: <Security sx={{ fontSize: 40 }} />,
        title: 'Privacy First',
        description: 'Your health data is encrypted and never shared. Complete privacy protection.',
        color: 'success'
    },
    {
        icon: <Psychology sx={{ fontSize: 40 }} />,
        title: 'Smart Learning',
        description: 'Continuously improving AI that learns from medical research and patterns.',
        color: 'warning'
    }
];

const stats = [
    { label: 'Diseases Covered', value: '1000+', icon: <HealthAndSafety /> },
    { label: 'Accuracy Rate', value: '95%', icon: <TrendingUp /> },
    { label: 'Users Helped', value: '50K+', icon: <Science /> },
    { label: 'Support Available', value: '24/7', icon: <SupportAgent /> }
];

function LandingPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    background: `linear-gradient(135deg, 
            ${theme.palette.primary.main}15 0%, 
            ${theme.palette.secondary.main}15 50%, 
            ${theme.palette.primary.main}15 100%)`,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Animated Background Elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                        animation: 'float 6s ease-in-out infinite',
                        '@keyframes float': {
                            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                            '50%': { transform: 'translateY(-20px) rotate(180deg)' }
                        }
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '20%',
                        right: '15%',
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        background: `linear-gradient(45deg, ${theme.palette.secondary.main}20, ${theme.palette.primary.main}20)`,
                        animation: 'float 8s ease-in-out infinite reverse',
                        '@keyframes float': {
                            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                            '50%': { transform: 'translateY(-20px) rotate(180deg)' }
                        }
                    }}
                />

                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Fade in timeout={1000}>
                                <Box>
                                    <Chip
                                        label="AI-Powered Health Prediction"
                                        color="primary"
                                        variant="outlined"
                                        sx={{ mb: 3, fontWeight: 600 }}
                                    />
                                    <Typography
                                        variant="h1"
                                        component="h1"
                                        sx={{
                                            mb: 3,
                                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontWeight: 800
                                        }}
                                    >
                                        Predict Diseases with AI
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            mb: 4,
                                            color: 'text.secondary',
                                            lineHeight: 1.6,
                                            maxWidth: '90%'
                                        }}
                                    >
                                        Get instant, accurate disease predictions based on your symptoms.
                                        Our advanced AI analyzes patterns to provide reliable health insights.
                                    </Typography>
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            href="/predict"
                                            sx={{
                                                px: 4,
                                                py: 2,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                borderRadius: 3,
                                                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                                '&:hover': {
                                                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: `0 8px 25px ${theme.palette.primary.main}40`
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            Start Prediction
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            sx={{
                                                px: 4,
                                                py: 2,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                borderRadius: 3,
                                                borderWidth: 2,
                                                '&:hover': {
                                                    borderWidth: 2,
                                                    transform: 'translateY(-2px)'
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            Learn More
                                        </Button>
                                    </Stack>
                                </Box>
                            </Fade>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Slide direction="left" in timeout={1200}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        minHeight: 400
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 300,
                                            height: 300,
                                            borderRadius: '50%',
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            animation: 'pulse 2s ease-in-out infinite',
                                            '@keyframes pulse': {
                                                '0%, 100%': { transform: 'scale(1)' },
                                                '50%': { transform: 'scale(1.05)' }
                                            }
                                        }}
                                    >
                                        <Analytics sx={{ fontSize: 120, color: 'primary.main' }} />
                                    </Box>
                                </Box>
                            </Slide>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Stats Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    {stats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Fade in timeout={1500 + index * 200}>
                                <Card
                                    sx={{
                                        textAlign: 'center',
                                        p: 3,
                                        height: '100%',
                                        background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.primary.main}05)`,
                                        border: `1px solid ${theme.palette.divider}`,
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: `0 12px 40px ${theme.palette.primary.main}20`
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <CardContent>
                                        <Avatar
                                            sx={{
                                                mx: 'auto',
                                                mb: 2,
                                                bgcolor: 'primary.main',
                                                width: 60,
                                                height: 60
                                            }}
                                        >
                                            {stat.icon}
                                        </Avatar>
                                        <Typography variant="h3" fontWeight={800} color="primary">
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {stat.label}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Features Section */}
            <Box sx={{ py: 8, background: theme.palette.background.default }}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={8}>
                        <Typography variant="h2" component="h2" gutterBottom>
                            Why Choose Our Platform?
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                            Advanced AI technology meets healthcare expertise to provide you with the most accurate predictions.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Fade in timeout={1800 + index * 200}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            p: 4,
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: `0 20px 60px ${theme.palette.primary.main}15`
                                            },
                                            transition: 'all 0.4s ease'
                                        }}
                                    >
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    color: `${feature.color}.main`,
                                                    mb: 3,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                {feature.icon}
                                            </Box>
                                            <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                                                {feature.title}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                sx={{
                    py: 8,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
                        Ready to Get Started?
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
                        Join thousands of users who trust our AI-powered health prediction platform.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        href="/predict"
                        sx={{
                            px: 6,
                            py: 2,
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            borderRadius: 4,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            '&:hover': {
                                background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                                transform: 'translateY(-3px)',
                                boxShadow: `0 15px 35px ${theme.palette.primary.main}40`
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Start Your Prediction Now
                    </Button>
                </Container>
            </Box>
        </Box>
    );
}

export default LandingPage;

