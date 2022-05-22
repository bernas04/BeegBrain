import json
from app.models import Providence, RevisionCenter

def run():
    file =  open('./scripts/institutions.json', 'r')
    allDoctors = file.read().split('\n')
    control=True
    for doctor in allDoctors:
        if doctor!='':
            if control:
                doctor = json.loads(doctor)
                d_object = Providence(name=doctor['name'],email=doctor['email'],address=doctor['address'],telephone=doctor['telephone'])
                d_object.save()
                control=False
            else:
                doctor = json.loads(doctor)
                d_object = RevisionCenter(name=doctor['name'],email=doctor['email'],address=doctor['address'],telephone=doctor['telephone'])
                d_object.save()
                control=True