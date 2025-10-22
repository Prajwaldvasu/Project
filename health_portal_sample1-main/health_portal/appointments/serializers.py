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
    is_repeat_patient = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'doctor', 'hospital', 'scheduled_for', 'notes', 'status', 'created_at', 'token', 'is_repeat_patient']
        read_only_fields = ['patient', 'status', 'created_at', 'token', 'is_repeat_patient']

    def get_is_repeat_patient(self, obj):
        # Check if the patient has any previous appointments with the same doctor
        previous_appointments = Appointment.objects.filter(
            patient=obj.patient,
            doctor=obj.doctor,
            created_at__lt=obj.created_at
        ).exists()
        return previous_appointments
