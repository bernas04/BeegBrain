import json
from app.models import Patient


def run():
    file =  open('./scripts/patients.json', 'r')
    allDoctors = file.read().split('\n')

    for doctor in allDoctors:
        if doctor!='':
            doctor = json.loads(doctor)
            

            d_object = Patient(health_number=doctor['health_number'], name=doctor['name'], email=doctor['email'], address=doctor['address'], telephone=doctor['telephone'], birthday=doctor['birthday'], 
                gender=doctor['gender'], medical_info=doctor['medical_info'])
            d_object.save()
    