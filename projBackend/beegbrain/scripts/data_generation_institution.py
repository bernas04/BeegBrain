import json
from app.models import Providence, RevisionCenter

def run():
    file =  open('./scripts/institutions.json', 'r')
    allDoctors = file.read().split('\n')

    for doctor in allDoctors:
        if doctor!='':
            doctor = json.loads(doctor)
            print(doctor['telephone'])
            d_object = Providence(name=doctor['name'],email=doctor['email'],address=doctor['address'],telephone=doctor['telephone'])
            d_object.save()