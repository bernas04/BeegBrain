import json
from app.models import Doctor


def run():
    file =  open('./scripts/doctors.json', 'r')
    allDoctors = file.read().split('\n')

    for doctor in allDoctors:
        if doctor!='':
            doctor = json.loads(doctor)
            

            d_object = Doctor(health_number=doctor['health_number'], name=doctor['name'], email=doctor['email'], address=doctor['address'], telephone=doctor['telephone'], birthday=doctor['birthday'], 
                gender=doctor['gender'], medical_number=doctor['medical_number'])
            d_object.save()
    