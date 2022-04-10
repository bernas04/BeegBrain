from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import *
from app import serializers

# Create your views here.

@api_view(['GET'])
def get_providence(request):
    """GET de todas as Proveniencias"""
    providences = Providence.objects.all()
    serializer = serializers.ProvidenceSerializer(providences, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_revision_center(request):
    """GET de todos os centros de revisão"""
    revision_centers = RevisionCenter.objects.all()
    serializer = serializers.RevisionCenterSerializer(revision_centers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_contract(request):
    """GET de todos os contratos"""
    contracts = Contract.objects.all()
    serializer = serializers.ContractSerializer(contracts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_patient(request):
    """GET de todos os pacientes"""
    patients = Patient.objects.all()
    serializer = serializers.PatientSerializer(patients, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_doctor(request):
    """GET de todos os médicos"""
    doctors = Doctor.objects.all()
    serializer = serializers.DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_doctor_revision_center(request):
    """GET de todos os doctor_revision_center"""
    doctor_revision_center = DoctorRevisionCenter.objects.all()
    serializer = serializers.DoctorRevisionCenterSerializer(doctor_revision_center, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_report(request):
    """GET de todos os relatórios"""
    reports = Report.objects.all()
    serializer = serializers.ReportSerializer(reports, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_eeg(request):
    """GET de todos os EEG's"""
    eegs = EEG.objects.all()
    serializer = serializers.EEGSerializer(eegs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_access_eeg(request):
    """GET de todos os access_eeg"""
    access_eegs = AccessEEG.objects.all()
    serializer = serializers.ReportSerializer(access_eegs, many = True)
    return Response(serializer.data)

#  GET de todos os relatórios

@api_view(['GET'])
def get_event(request):
    """GET de todos os eventos"""
    events = Event.objects.all()
    serializer = serializers.EventSerializer(events, many=True)
    return Response(serializer.data)

# GET de todos os relatórios
@api_view(['GET'])
def shared_folder(request):
    """GET de todas as pastas partilhadas"""
    shared_folders = SharedFolder.objects.all()
    serializer = serializers.SharedFolderSerializer(shared_folders, many=True)
    return Response(serializer.data)
