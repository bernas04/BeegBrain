import json
from app.models import Operator


def run():
    file =  open('./scripts/operators.json', 'r')
    allDoctors = file.read().split('\n')

    for doctor in allDoctors:
        if doctor!='':
            doctor = json.loads(doctor)
            

            d_object = Operator(health_number=doctor['health_number'], name=doctor['name'], email=doctor['email'], address=doctor['address'], telephone=doctor['telephone'], birthday=doctor['birthday'], 
                gender=doctor['gender'], operator_number=doctor['operator_number'])
            d_object.save()