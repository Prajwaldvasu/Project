from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Specialty, Hospital, Doctor, Appointment
from datetime import datetime, timedelta

User = get_user_model()

class AppointmentBookingTestCase(APITestCase):
    def setUp(self):
        # Create test user
        self.user = User.objects.create_user(username='testuser', password='testpass')
        # Create specialty
        self.specialty = Specialty.objects.create(name='General Medicine', slug='general-medicine')
        # Create hospital
        self.hospital = Hospital.objects.create(
            name='Test Hospital',
            address='123 Test St',
            latitude=40.7128,
            longitude=-74.0060,
            phone='123-456-7890'
        )
        # Create doctor
        self.doctor = Doctor.objects.create(
            name='Dr. Test',
            specialty=self.specialty,
            hospital=self.hospital,
            phone='987-654-3210',
            bio='Test bio'
        )

    def test_book_appointment(self):
        self.client.login(username='testuser', password='testpass')
        url = reverse('book_appointment')
        data = {
            'doctor': self.doctor.id,
            'hospital': self.hospital.id,
            'scheduled_for': (datetime.now() + timedelta(days=1)).isoformat(),
            'notes': 'Test appointment'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertEqual(response.data['status'], 'pending')
        # Check if appointment was created
        appointment = Appointment.objects.get(token=response.data['token'])
        self.assertEqual(appointment.patient, self.user)
        self.assertEqual(appointment.doctor, self.doctor)

    def test_repeat_patient_logic(self):
        # Create first appointment
        first_appointment = Appointment.objects.create(
            patient=self.user,
            doctor=self.doctor,
            hospital=self.hospital,
            scheduled_for=datetime.now() + timedelta(days=1),
            notes='First visit'
        )
        # Create second appointment
        second_appointment = Appointment.objects.create(
            patient=self.user,
            doctor=self.doctor,
            hospital=self.hospital,
            scheduled_for=datetime.now() + timedelta(days=2),
            notes='Second visit'
        )
        # Check serializer for second appointment
        from .serializers import AppointmentSerializer
        serializer = AppointmentSerializer(second_appointment)
        self.assertTrue(serializer.data['is_repeat_patient'])
        # For first appointment, should be False
        serializer_first = AppointmentSerializer(first_appointment)
        self.assertFalse(serializer_first.data['is_repeat_patient'])
