from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Seed sample specialties, hospitals and doctors for development'

    def handle(self, *args, **options):
        from health_portal.appointments.models import Specialty, Hospital, Doctor

        specs = [
            ('Allergist', 'allergist'),
            ('General Medicine', 'general-medicine'),
            ('Cardiology', 'cardiology'),
            ('Dermatology', 'dermatology'),
            ('Neurology', 'neurology'),
            ('Orthopedics', 'orthopedics'),
            ('Pediatrics', 'pediatrics'),
            ('Gynecology', 'gynecology'),
            ('Ophthalmology', 'ophthalmology'),
            ('ENT', 'ent'),
            ('Dentistry', 'dentistry'),
            ('Psychiatry', 'psychiatry'),
            ('Radiology', 'radiology'),
            ('Pathology', 'pathology'),
            ('Emergency Medicine', 'emergency-medicine'),
            ('Surgery', 'surgery'),
            ('Oncology', 'oncology'),
        ]
        for name, slug in specs:
            Specialty.objects.get_or_create(name=name, slug=slug)

        # Karnataka hospitals across major cities
        hospitals = [
            # Bangalore
            ('City General Hospital', '1 Main St, Bangalore', 12.9716, 77.5946, '+911234567890'),
            ('Northside Clinic', '45 North Rd, Bangalore', 12.9760, 77.5920, '+911234567891'),
            ('Central Health Center', '100 Central Ave, Bangalore', 12.9680, 77.6000, '+911234567892'),
            ('Victoria Hospital', 'Fort Road, Bangalore', 12.9634, 77.5733, '+911234567893'),
            ('St. Johns Medical College Hospital', 'Sarjapur Road, Bangalore', 12.9237, 77.6821, '+911234567894'),
            ('Manipal Hospital', 'Old Airport Road, Bangalore', 12.9569, 77.7011, '+911234567895'),
            ('Apollo Hospitals', 'Bannerghatta Road, Bangalore', 12.8944, 77.5966, '+911234567896'),
            ('Fortis Hospital', 'Cunningham Road, Bangalore', 12.9857, 77.5963, '+911234567897'),

            # Mysore
            ('K.R. Hospital', 'Sayyaji Rao Road, Mysore', 12.2958, 76.6394, '+911234567898'),
            ('Columbia Asia Hospital', 'Mysore', 12.2825, 76.6228, '+911234567899'),
            ('JSS Hospital', 'Mysore', 12.3018, 76.6547, '+911234567900'),

            # Mangalore
            ('KMC Hospital', 'Dr. B.R. Ambedkar Circle, Mangalore', 12.8714, 74.8434, '+911234567901'),
            ('Unity Health Complex', 'Mangalore', 12.8647, 74.8364, '+911234567902'),
            ('A.J. Hospital', 'Mangalore', 12.8706, 74.8421, '+911234567903'),

            # Hubli
            ('KIMS Hospital', 'Hubli', 15.3647, 75.1240, '+911234567904'),
            ('HCG NMR Cancer Centre', 'Hubli', 15.3510, 75.1142, '+911234567905'),

            # Belgaum
            ('KLE Hospital', 'Belgaum', 15.8497, 74.4977, '+911234567906'),
            ('Jawaharlal Nehru Medical College Hospital', 'Belgaum', 15.8623, 74.5125, '+911234567907'),

            # Gulbarga
            ('HKE Society Hospital', 'Gulbarga', 17.3297, 76.8376, '+911234567908'),
            ('ESI Hospital', 'Gulbarga', 17.3374, 76.8267, '+911234567909'),

            # Davangere
            ('SSIMS Hospital', 'Davangere', 14.4644, 75.9218, '+911234567910'),
            ('Bapuji Hospital', 'Davangere', 14.4700, 75.9214, '+911234567911'),

            # Bellary
            ('Vijayanagar Institute of Medical Sciences', 'Bellary', 15.1394, 76.9214, '+911234567912'),
            ('ESI Hospital', 'Bellary', 15.1425, 76.9178, '+911234567913'),

            # Tumkur
            ('Shridevi Institute of Medical Sciences', 'Tumkur', 13.3409, 77.1014, '+911234567914'),
            ('Sri Siddhartha Medical College Hospital', 'Tumkur', 13.3382, 77.1136, '+911234567915'),

            # Raichur
            ('Navodaya Medical College Hospital', 'Raichur', 16.2120, 77.3431, '+911234567916'),
            ('ESI Hospital', 'Raichur', 16.2076, 77.3463, '+911234567917'),

            # Bidar
            ('Bidar Institute of Medical Sciences', 'Bidar', 17.9144, 77.5199, '+911234567918'),

            # Hospet
            ('Hospet District Hospital', 'Hospet', 15.2689, 76.3870, '+911234567919'),
            ('Sanjeevini Hospital', 'Hospet', 15.2714, 76.3856, '+911234567920'),

            # Gadag
            ('Gadag District Hospital', 'Gadag', 15.4297, 75.6297, '+911234567921'),

            # Robertsonpet (Kolar)
            ('Sri Devaraj Urs Medical College', 'Kolar', 13.1367, 78.1294, '+911234567922'),

            # Chikmagalur
            ('Chikmagalur District Hospital', 'Chikmagalur', 13.3154, 75.7755, '+911234567923'),

            # Bagalkot
            ('Bagalkot District Hospital', 'Bagalkot', 16.1725, 75.6569, '+911234567924'),

            # Haveri
            ('Haveri District Hospital', 'Haveri', 14.7951, 75.4005, '+911234567925'),

            # Koppal
            ('Koppal District Hospital', 'Koppal', 15.3452, 76.1548, '+911234567926'),

            # Yadgir
            ('Yadgir District Hospital', 'Yadgir', 16.7703, 77.1376, '+911234567927'),

            # Chamarajanagar
            ('Chamarajanagar District Hospital', 'Chamarajanagar', 11.9261, 76.9437, '+911234567928'),

            # Hassan
            ('Hassan District Hospital', 'Hassan', 13.0033, 76.1004, '+911234567929'),

            # Shimoga
            ('Shimoga District Hospital', 'Shimoga', 13.9299, 75.5681, '+911234567930'),
            ('TMC Hospital', 'Shimoga', 13.9322, 75.5714, '+911234567931'),

            # Chitradurga
            ('Chitradurga District Hospital', 'Chitradurga', 14.2266, 76.4005, '+911234567932'),

            # Udupi
            ('KMC Hospital', 'Udupi', 13.3409, 74.7421, '+911234567933'),
            ('Manipal Hospital', 'Udupi', 13.3515, 74.7854, '+911234567934'),

            # Dakshina Kannada
            ('Wenlock District Hospital', 'Dakshina Kannada', 12.8698, 74.8832, '+911234567935'),
        ]
        hosp_objs = []
        for name, addr, lat, lon, phone in hospitals:
            h, _ = Hospital.objects.get_or_create(name=name, defaults={'address': addr, 'latitude': lat, 'longitude': lon, 'phone': phone})
            hosp_objs.append(h)

        doctors = [
            # Bangalore doctors
            ('Dr. Asha', 'Allergist', hosp_objs[0], '+911100000001'),
            ('Dr. Ravi', 'General Medicine', hosp_objs[0], '+911100000002'),
            ('Dr. Meera', 'Cardiology', hosp_objs[1], '+911100000003'),
            ('Dr. Sunil', 'Dermatology', hosp_objs[2], '+911100000004'),
            ('Dr. Priya', 'Neurology', hosp_objs[3], '+911100000005'),
            ('Dr. Kumar', 'Orthopedics', hosp_objs[4], '+911100000006'),
            ('Dr. Anjali', 'Pediatrics', hosp_objs[5], '+911100000007'),
            ('Dr. Sharma', 'Gynecology', hosp_objs[6], '+911100000008'),
            ('Dr. Patel', 'Ophthalmology', hosp_objs[7], '+911100000009'),
            ('Dr. Reddy', 'ENT', hosp_objs[0], '+911100000010'),
            ('Dr. Gupta', 'Dentistry', hosp_objs[1], '+911100000011'),
            ('Dr. Singh', 'Psychiatry', hosp_objs[2], '+911100000012'),
            ('Dr. Khan', 'Radiology', hosp_objs[3], '+911100000013'),
            ('Dr. Joshi', 'Pathology', hosp_objs[4], '+911100000014'),
            ('Dr. Nair', 'Emergency Medicine', hosp_objs[5], '+911100000015'),

            # Mysore doctors
            ('Dr. Lakshmi', 'General Medicine', hosp_objs[8], '+911100000016'),
            ('Dr. Venkatesh', 'Cardiology', hosp_objs[9], '+911100000017'),
            ('Dr. Malini', 'Pediatrics', hosp_objs[10], '+911100000018'),

            # Mangalore doctors
            ('Dr. Shekhar', 'Orthopedics', hosp_objs[11], '+911100000019'),
            ('Dr. Divya', 'Gynecology', hosp_objs[12], '+911100000020'),
            ('Dr. Arun', 'Neurology', hosp_objs[13], '+911100000021'),

            # Hubli doctors
            ('Dr. Prakash', 'General Medicine', hosp_objs[14], '+911100000022'),
            ('Dr. Kavita', 'Oncology', hosp_objs[15], '+911100000023'),

            # Belgaum doctors
            ('Dr. Rajesh', 'Surgery', hosp_objs[16], '+911100000024'),
            ('Dr. Meenakshi', 'Pediatrics', hosp_objs[17], '+911100000025'),

            # Additional doctors for other cities
            ('Dr. Suresh', 'General Medicine', hosp_objs[18], '+911100000026'),
            ('Dr. Rekha', 'Gynecology', hosp_objs[19], '+911100000027'),
            ('Dr. Vijay', 'Orthopedics', hosp_objs[20], '+911100000028'),
            ('Dr. Anita', 'Pediatrics', hosp_objs[21], '+911100000029'),
            ('Dr. Ramesh', 'Cardiology', hosp_objs[22], '+911100000030'),
            ('Dr. Pooja', 'Dermatology', hosp_objs[23], '+911100000031'),
            ('Dr. Manoj', 'Neurology', hosp_objs[24], '+911100000032'),
            ('Dr. Kiran', 'ENT', hosp_objs[25], '+911100000033'),
            ('Dr. Deepa', 'Ophthalmology', hosp_objs[26], '+911100000034'),
            ('Dr. Santosh', 'Dentistry', hosp_objs[27], '+911100000035'),
        ]
        for name, spec_name, hospital, phone in doctors:
            spec = Specialty.objects.filter(name__icontains=spec_name).first()
            if spec:
                Doctor.objects.get_or_create(name=name, hospital=hospital, defaults={'specialty': spec, 'phone': phone})

        self.stdout.write(self.style.SUCCESS(f'Seeding complete - Added {len(hosp_objs)} hospitals and {len(doctors)} doctors across Karnataka'))
