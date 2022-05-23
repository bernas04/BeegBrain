import json
from app.models import Operator, Providence
from random import randint


def run():
    file =  open('./scripts/operators.json', 'r')
    allDoctors = file.read().split('\n')

    for doctor in allDoctors:
        if doctor!='':
            doctor = json.loads(doctor)
            rng = randint(1,127)
            if rng%2==0:
                rng-=1

            d_object = Operator(health_number=doctor['health_number'], name=doctor['name'], email=doctor['email'],password=['password'], address=doctor['address'], telephone=doctor['telephone'], birthday=doctor['birthday'], 
                gender=doctor['gender'], operator_number=doctor['operator_number'], providence=Providence.objects.get(institution_ptr_id=rng))
            d_object.save()