import json
from app.models import Doctor
from app.serializers import UserSerializer


def run():
    file = open('./scripts/doctors.json', 'r')
    allDoctors = file.read().split('\n')

    for doctor in allDoctors:
        if doctor != '':
            doctor = json.loads(doctor)
            serializer = UserSerializer(data=doctor)
            if serializer.is_valid():
                resp = serializer.createDoctor(doctor)             
            '''  d_object = Doctor(health_number=doctor['health_number'], name=doctor['name'], email=doctor['email'], password=doctor['password'], address=doctor['address'], telephone=doctor['telephone'], birthday=doctor['birthday'], 
                gender=doctor['gender'], medical_number=doctor['medical_number'])
            d_object.save()
     '''