import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
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
  Container
} from '@mui/material';
import {
  Psychology,
  TrendingUp,
  HealthAndSafety,
  Info,
  Refresh,
  CheckCircle,
  LocalHospital,
  MedicalServices,
  Favorite,
  AccessibilityNew,
  MonitorHeart
} from '@mui/icons-material';
import axios from 'axios';

const symptomsList = [
  'itching', 'skin_rash', 'nodal_skin_eruptions', 'dischromic _patches',
  'continuous_sneezing', 'shivering', 'chills', 'watering_from_eyes',
  'stomach_pain', 'acidity', 'ulcers_on_tongue', 'vomiting', 'cough', 'chest_pain',
  'yellowish_skin', 'nausea', 'loss_of_appetite', 'abdominal_pain', 'yellowing_of_eyes',
  'burning_micturition', 'spotting_ urination', 'passage_of_gases', 'internal_itching',
  'indigestion', 'muscle_wasting', 'patches_in_throat', 'high_fever', 'extra_marital_contacts',
  'fatigue', 'weight_loss', 'restlessness', 'lethargy', 'irregular_sugar_level',
  'blurred_and_distorted_vision', 'obesity', 'excessive_hunger', 'increased_appetite',
  'polyuria', 'sunken_eyes', 'dehydration', 'diarrhoea', 'breathlessness', 'family_history',
  'mucoid_sputum', 'headache', 'dizziness', 'loss_of_balance', 'lack_of_concentration',
  'stiff_neck', 'depression', 'irritability', 'visual_disturbances', 'back_pain',
  'weakness_in_limbs', 'neck_pain', 'weakness_of_one_body_side', 'altered_sensorium',
  'dark_urine', 'sweating', 'muscle_pain', 'mild_fever', 'swelled_lymph_nodes', 'malaise',
  'red_spots_over_body', 'joint_pain', 'pain_behind_the_eyes', 'constipation',
  'toxic_look_(typhos)', 'belly_pain', 'yellow_urine', 'receiving_blood_transfusion',
  'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'acute_liver_failure',
  'swelling_of_stomach', 'distention_of_abdomen', 'history_of_alcohol_consumption',
  'fluid_overload', 'phlegm', 'blood_in_sputum', 'throat_irritation', 'redness_of_eyes',
  'sinus_pressure', 'runny_nose', 'congestion', 'loss_of_smell', 'fast_heart_rate',
  'rusty_sputum', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool',
  'irritation_in_anus', 'cramps', 'bruising', 'swollen_legs', 'swollen_blood_vessels',
  'prominent_veins_on_calf', 'weight_gain', 'cold_hands_and_feets', 'mood_swings',
  'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties',
  'abnormal_menstruation', 'muscle_weakness', 'anxiety', 'slurred_speech', 'palpitations',
  'drying_and_tingling_lips', 'knee_pain', 'hip_joint_pain', 'swelling_joints',
  'painful_walking', 'movement_stiffness', 'spinning_movements', 'unsteadiness',
  'pus_filled_pimples', 'blackheads', 'scurring', 'bladder_discomfort',
  'foul_smell_of urine', 'continuous_feel_of_urine', 'skin_peeling', 'silver_like_dusting',
  'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose',
  'yellow_crust_ooze'
];

function SymptomForm() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setError('');
      setPrediction('');
      setIsLoading(true);
      const response = await axios.post('/api/predict/', { symptoms: selectedSymptoms });
      setPrediction(response.data.disease);
    } catch (err) {
      // Prefer server-provided error message when available
      const serverMsg = err?.response?.data?.error;
      setError(serverMsg || 'Failed to get prediction. Try again.');
      console.error('Prediction request failed:', err);
    } finally {
      setIsLoading(false);
    }
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
      <Container maxWidth="lg">
        {/* Header Section */}
        <Fade in timeout={800}>
          <Box textAlign="center" mb={6}>
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
                  MediPredict AI
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
                  Advanced AI-Powered Disease Prediction System
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Harnessing the power of machine learning for accurate health insights
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Main Form Card */}
        <Slide direction="up" in timeout={1000}>
          <Card
            elevation={12}
            sx={{
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 4,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
            }}
          >
            <CardHeader
              title={
                <Box display="flex" alignItems="center" gap={2}>
                  <Box sx={{ position: 'relative' }}>
                    <MonitorHeart sx={{ fontSize: 32, color: '#e74c3c' }} />
                    <Favorite
                      sx={{
                        fontSize: 16,
                        color: '#e74c3c',
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        animation: 'pulse 2s infinite'
                      }}
                    />
                  </Box>
                  <Typography variant="h4" fontWeight={800} sx={{ color: '#2c3e50' }}>
                    Symptom Analysis
                  </Typography>
                </Box>
              }
              subheader="Select multiple symptoms to get the most accurate AI-powered prediction"
              sx={{
                background: 'linear-gradient(135deg, rgba(231,76,60,0.1), rgba(52,152,219,0.1))',
                '& .MuiCardHeader-subheader': {
                  opacity: 0.8,
                  mt: 1,
                  fontSize: '1.1rem',
                  fontWeight: 500
                }
              }}
            />
            <CardContent sx={{ p: 4 }}>
              <Autocomplete
                multiple
                options={symptomsList}
                value={selectedSymptoms}
                onChange={(event, newValue) => setSelectedSymptoms(newValue)}
                renderTags={(value, getTagProps) => (
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
                    {value.map((option, index) => (
                      <Chip
                        variant="filled"
                        color="primary"
                        label={option.replace(/_/g, ' ')}
                        {...getTagProps({ index })}
                        key={option}
                        sx={{
                          fontWeight: 500,
                          '&:hover': { transform: 'scale(1.05)' },
                          transition: 'all 0.2s ease'
                        }}
                      />
                    ))}
                  </Stack>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Symptoms"
                    placeholder="Type to search symptoms..."
                    fullWidth
                    margin="normal"
                    helperText="Start typing to search from 1000+ symptoms"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover': { transform: 'translateY(-1px)' },
                        transition: 'all 0.2s ease'
                      }
                    }}
                  />
                )}
                sx={{ mb: 3 }}
              />

              <Divider sx={{ my: 3 }} />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" justifyContent="space-between">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={selectedSymptoms.length === 0 || isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AccessibilityNew />}
                  sx={{
                    px: 6,
                    py: 2.5,
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
                  {isLoading ? 'AI Analyzing...' : 'Get AI Prediction'}
                </Button>

                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {selectedSymptoms.length === 0 ? 'Add symptoms to continue' : `${selectedSymptoms.length} symptoms selected`}
                  </Typography>
                  {selectedSymptoms.length > 0 && (
                    <Tooltip title="Clear all symptoms">
                      <IconButton
                        size="small"
                        onClick={() => setSelectedSymptoms([])}
                        sx={{ color: 'text.secondary' }}
                      >
                        <Refresh />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Stack>

              {/* Results Section */}
              {prediction && (
                <Fade in timeout={500}>
                  <Box
                    sx={{
                      mt: 4,
                      p: 4,
                      borderRadius: 4,
                      background: 'linear-gradient(135deg, rgba(39,174,96,0.1), rgba(46,204,113,0.1))',
                      border: '2px solid rgba(39,174,96,0.3)',
                      boxShadow: '0 8px 32px rgba(39,174,96,0.2)'
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <CheckCircle sx={{ fontSize: 40, color: '#27ae60' }} />
                      <Typography variant="h5" fontWeight={800} sx={{ color: '#27ae60' }}>
                        AI Prediction Result
                      </Typography>
                    </Box>
                    <Typography
                      variant="h3"
                      fontWeight={900}
                      sx={{
                        color: '#2c3e50',
                        textAlign: 'center',
                        py: 2,
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: 3,
                        border: '1px solid rgba(39,174,96,0.2)'
                      }}
                    >
                      {prediction.replace(/_/g, ' ').toUpperCase()}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', fontWeight: 500 }}>
                      Based on AI analysis of your selected symptoms
                    </Typography>
                  </Box>
                </Fade>
              )}

              {error && (
                <Fade in timeout={500}>
                  <Alert severity="error" sx={{ mt: 4, borderRadius: 3 }}>
                    <Typography variant="h6" fontWeight={600}>
                      Prediction Error
                    </Typography>
                    <Typography variant="body1">
                      {error}
                    </Typography>
                  </Alert>
                </Fade>
              )}
            </CardContent>
          </Card>
        </Slide>

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
                Important Medical Notice
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 500, lineHeight: 1.6 }}>
              This AI-powered diagnostic tool is for <strong>informational purposes only</strong> and should
              <strong> not replace professional medical advice, diagnosis, or treatment</strong>.
              Always consult with qualified healthcare providers for medical decisions and emergencies.
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={2}>
              <LocalHospital sx={{ fontSize: 20, color: '#e74c3c' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#e74c3c' }}>
                For emergencies, contact your local emergency services immediately
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default SymptomForm;