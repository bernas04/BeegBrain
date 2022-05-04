from datetime import datetime
from fileinput import filename
from time import time
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import *
from app import serializers
from rest_framework import status


# ############################### PROVENIENCIAS ###############################
@api_view(['GET'])
def getProvidence(request):
    """GET de todas as Proveniencias"""
    providences = Providence.objects.all()
    serializer = serializers.ProvidenceSerializer(providences, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createProvidence(request):
    """POST de uma Proveniencia"""
    serializer = serializers.ProvidenceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getProvidenceById(request):
    """GET de uma Proveniencia pelo seu id"""
    prov_id = int(request.GET['id'])
    try:
        ret = Providence.objects.get(id=prov_id)
        
    except Providence.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.ProvidenceSerializer(ret)
    return Response(serializer.data)


# ############################### REVISION CENTER ###############################
@api_view(['GET'])
def getRevisionCenter(request):
    """GET de todos os centros de revisão"""
    revision_centers = RevisionCenter.objects.all()
    serializer = serializers.RevisionCenterSerializer(revision_centers, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createRevisionCenter(request):
    """POST de um Centro de Revisão"""
    serializer = serializers.RevisionCenterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getRevisionCenterById(request, id):
    """GET de um Centro de Revisão pelo seu id"""
    rev_id = int(request.GET['id'])
    try:
        ret = RevisionCenter.objects.get(id=rev_id)
        
    except RevisionCenter.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.RevisionCenterSerializer(ret)
    return Response(serializer.data)

# ############################### CONTRACT ###############################
@api_view(['GET'])
def getContract(request):
    """GET de todos os contratos"""
    contracts = Contract.objects.all()
    serializer = serializers.ContractSerializer(contracts, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createContract(request):
    """POST de um Contracto"""
    serializer = serializers.ContractSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getContractById(request, id):
    """GET de um contrato pelo seu id"""
    cont_id = int(request.GET['id'])
    try:
        ret = Contract.objects.get(id=cont_id)
        
    except Contract.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.ContractSerializer(ret)
    return Response(serializer.data)


# ############################### PATIENTS ###############################
@api_view(['GET'])
def getPatients(request):
    """GET de todos os pacientes"""
    patients = Patient.objects.all()
    serializer = serializers.PatientSerializer(patients, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createPatient(request):
    """POST de um Paciente"""
    serializer = serializers.PatientSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getPatientByNss(request):
    """GET de um paciente pelo seu id"""
    pat_id = int(request.GET['nss'])
    try:
        ret = Patient.objects.get(health_number=pat_id)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.PatientSerializer(ret)
    return Response(serializer.data)


# ############################### DOCTORS ###############################
@api_view(['GET'])
def getDoctors(request):
    """GET de todos os médicos"""
    doctors = Doctor.objects.all()
    serializer = serializers.DoctorSerializer(doctors, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createDoctor(request):
    """POST de um Doctor"""
    serializer = serializers.DoctorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getDoctorById(request):
    """GET de um Doutor pelo seu id"""
    doc_id = int(request.GET['id'])
    try:
        ret = Doctor.objects.get(id=doc_id)
        
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.DoctorSerializer(ret)
    return Response(serializer.data)


# ############################### DOCTOR_REVISON _CENTER ###############################
@api_view(['GET'])
def getDoctorRevisionCenter(request):
    """GET de todos os doctor_revision_center"""
    doctor_revision_center = DoctorRevisionCenter.objects.all()
    serializer = serializers.DoctorRevisionCenterSerializer(doctor_revision_center, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createDoctorRevisionCenter(request):
    """POST de um Doctor_Revision_Center"""
    serializer = serializers.DoctorRevisionCenterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ############################### REPORT ###############################
@api_view(['GET'])
def getReport(request):
    """GET de todos os relatórios"""
    reports = Report.objects.all()
    serializer = serializers.ReportSerializer(reports, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createReport(request):
    """POST de um Report"""
    serializer = serializers.ReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getReportById(request):
    """GET de um relatório pelo seu id"""
    rep_id = int(request.GET['id'])
    try:
        ret = Report.objects.get(id=rep_id)
        
    except Report.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.ReportSerializer(ret)
    return Response(serializer.data)


# ############################### EEG ###############################
@api_view(['GET'])
def getEeg(request):
    """GET de todos os EEG's"""
    eegs = EEG.objects.all()
    serializer = serializers.EEGSerializer(eegs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createEEG(request):
    """POST de um EEG"""

    print("===================================")
    print("===================================")

    try:
        operator = Operator.objects.get(health_number=request.data['operatorID'])
    except Operator.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(health_number=request.data['patientID'])
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    print("===================================")

    file = request.data['file']

    eeg = {
        "operator":operator,
        "patient":patient,
        "file":file,
        "status":True,
        "priority":3,
        "report":None,
        "timestramp":datetime.now()
    }

    serializer = serializers.EEGSerializer(data=eeg)
    if serializer.is_valid():
        print("valid")
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    print("invalid")
    print("===================================")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getEegById(request, id):
    """GET de um EEG pelo seu id"""
    eeg_id = int(request.GET['id'])
    try:
        ret = EEG.objects.get(id=eeg_id)
        
    except EEG.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.EEGSerializer(ret)
    return Response(serializer.data)



# ############################### ACESS_EEG ###############################
@api_view(['GET'])
def getAccessEeg(request):
    """GET de todos os access_eeg"""
    access_eegs = AccessEEG.objects.all()
    serializer = serializers.ReportSerializer(access_eegs, many = True)
    return Response(serializer.data)


@api_view(['POST'])
def createAccessEeg(request):
    """POST de um Access EEG"""
    serializer = serializers.ReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ############################### EVENT ###############################
@api_view(['GET'])
def getEvent(request):
    """GET de todos os eventos"""
    events = Event.objects.all()
    serializer = serializers.EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createEvent(request):
    """POST de um evento"""
    serializer = serializers.EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getEventById(request, id):
    """GET de um evento pelo seu id"""
    eve_id = int(request.GET['id'])
    try:
        ret = Event.objects.get(id=eve_id)
        
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.EventSerializer(ret)
    return Response(serializer.data)


# ############################### SHARED_FOLDER ###############################
@api_view(['GET'])
def sharedFolder(request):
    """GET de todas as pastas partilhadas"""
    shared_folders = SharedFolder.objects.all()
    serializer = serializers.SharedFolderSerializer(shared_folders, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createSharedFolder(request):
    """POST de uma pasta partilhada"""
    serializer = serializers.SharedFolderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getSharedFolderById(request, id):
    """GET de uma pasta partilhada pelo seu id"""
    eve_id = int(request.GET['id'])
    try:
        ret = SharedFolder.objects.get(id=eve_id)
        
    except SharedFolder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.SharedFolderSerializer(ret)
    return Response(serializer.data)