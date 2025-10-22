from math import radians, cos, sin, asin, sqrt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Hospital, Doctor, Specialty, Appointment
from .serializers import DoctorSerializer, HospitalSerializer, AppointmentSerializer
from datetime import datetime


def haversine_distance(lat1, lon1, lat2, lon2):
	# returns distance in kilometers
	R = 6371.0
	dlat = radians(lat2 - lat1)
	dlon = radians(lon2 - lon1)
	a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
	c = 2 * asin(sqrt(a))
	return R * c


@api_view(['GET'])
@permission_classes([AllowAny])
def search_providers(request):
	lat = request.GET.get('lat')
	lon = request.GET.get('lon')
	disease = request.GET.get('disease')
	radius_km = float(request.GET.get('radius_km', 20))

	# If lat/lon not provided, try to use user's location if authenticated
	if lat is None or lon is None:
		if request.user.is_authenticated and request.user.latitude and request.user.longitude:
			lat = request.user.latitude
			lon = request.user.longitude
		else:
			return Response({'error': 'lat and lon required'}, status=400)

	try:
		lat = float(lat)
		lon = float(lon)
	except ValueError:
		return Response({'error': 'invalid lat/lon'}, status=400)

	disease_to_specialty = {
		'allergy': 'Allergist',
		'fever': 'General Medicine',
		'chest pain': 'Cardiology',
		'skin': 'Dermatology',
		# add more mappings as needed
	}
	specialty_name = None
	if disease:
		specialty_name = disease_to_specialty.get(disease.lower())

	results = []
	if specialty_name:
		doctors = Doctor.objects.filter(specialty__name__icontains=specialty_name)
		for d in doctors:
			dist = haversine_distance(lat, lon, d.hospital.latitude, d.hospital.longitude)
			if dist <= radius_km:
				ser = DoctorSerializer(d).data
				ser['distance_km'] = round(dist, 2)
				# include coordinates for mapping
				ser['latitude'] = d.hospital.latitude
				ser['longitude'] = d.hospital.longitude
				results.append(ser)

	# fallback to hospitals
	if not results:
		hospitals = Hospital.objects.all()
		for h in hospitals:
			dist = haversine_distance(lat, lon, h.latitude, h.longitude)
			if dist <= radius_km:
				ser = HospitalSerializer(h).data
				ser['distance_km'] = round(dist, 2)
				results.append(ser)

	results.sort(key=lambda x: x.get('distance_km', 9999))
	return Response({'count': len(results), 'results': results})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_appointment(request):
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(patient=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_appointment_by_token(request, token):
    try:
        appointment = Appointment.objects.get(token=token)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)
    except Appointment.DoesNotExist:
        return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)


from django.shortcuts import render

# Create your views here.
