from rest_framework import serializers
from .models import Specialty, Hospital, Doctor, Appointment


class SpecialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialty
        fields = ['id', 'name', 'slug']


class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['id', 'name', 'address', 'latitude', 'longitude', 'phone']


class DoctorSerializer(serializers.ModelSerializer):
    hospital = HospitalSerializer()
    specialty = SpecialtySerializer()

    class Meta:
        model = Doctor
        fields = ['id', 'name', 'hospital', 'specialty', 'phone', 'bio']


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'doctor', 'hospital', 'scheduled_for', 'notes', 'status', 'created_at']
        read_only_fields = ['patient', 'status', 'created_at']
