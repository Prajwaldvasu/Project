import os
import django

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'health_portal.settings')
django.setup()

from health_portal.appointments.models import Specialty, Hospital, Doctor


def seed():
    # Create specialties
    specs = [
        ('Allergist', 'allergist'),
        ('General Medicine', 'general-medicine'),
        ('Cardiology', 'cardiology'),
        ('Dermatology', 'dermatology'),
    ]
    for name, slug in specs:
        Specialty.objects.get_or_create(name=name, slug=slug)

    # Create hospitals (sample coordinates)
    hospitals = [
        ('City General Hospital', '1 Main St', 12.9716, 77.5946, '+911234567890'),
        ('Northside Clinic', '45 North Rd', 12.9760, 77.5920, '+911234567891'),
        ('Central Health Center', '100 Central Ave', 12.9680, 77.6000, '+911234567892'),
    ]
    hosp_objs = []
    for name, addr, lat, lon, phone in hospitals:
        h, _ = Hospital.objects.get_or_create(name=name, defaults={'address': addr, 'latitude': lat, 'longitude': lon, 'phone': phone})
        hosp_objs.append(h)

    # Create doctors
    mapping = {
        'Allergist': 'Allergist',
        'General Medicine': 'General Medicine',
        'Cardiology': 'Cardiology',
        'Dermatology': 'Dermatology',
    }
    # Simple doctors list
    doctors = [
        ('Dr. Asha', 'Allergist', hosp_objs[0], '+911100000001'),
        ('Dr. Ravi', 'General Medicine', hosp_objs[0], '+911100000002'),
        ('Dr. Meera', 'Cardiology', hosp_objs[1], '+911100000003'),
        ('Dr. Sunil', 'Dermatology', hosp_objs[2], '+911100000004'),
    ]
    for name, spec_name, hospital, phone in doctors:
        spec = Specialty.objects.filter(name__icontains=spec_name).first()
        Doctor.objects.get_or_create(name=name, hospital=hospital, specialty=spec, defaults={'phone': phone})

    print('Seeding complete')


if __name__ == '__main__':
    seed()
