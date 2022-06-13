import json
from app.models import Patient


def run():
    p1 = Patient(
        health_number="123456789",
        name="João Reis",
        email="joao@ua.pt",
        address="Ovar",
        telephone="961234567",
        birthday="2001-01-01",
        gender="M",
        medical_info=" - "
    )
    p2 = Patient(
        health_number="987654321",
        name="Mariana Rosa",
        email="mariana@ua.pt",
        address="Ribeira Grande",
        telephone="963291872",
        birthday="2001-01-01",
        gender="F",
        medical_info=" - "
    )
    p3 = Patient(
        health_number="543216789",
        name="João Farias",
        email="bernas@ua.pt",
        address="Campia",
        telephone="965746712",
        birthday="2001-01-01",
        gender="M",
        medical_info=" - "
    )
    p4 = Patient(
        health_number="678912345",
        name="Ricardo Rodriguez",
        email="ricardo@ua.pt",
        address="Estarreja",
        telephone="918273645",
        birthday="2001-01-01",
        gender="M",
        medical_info=" - "
    )
    p5 = Patient(
        health_number="678912847",
        name="Artur Romão",
        email="artur@ua.pt",
        address="Ovar",
        telephone="931123321",
        birthday="2001-01-01",
        gender="M",
        medical_info=" - "
    )

    lst = [p1,p2,p3,p4,p5]

    for i in lst:
        i.save()

    
    