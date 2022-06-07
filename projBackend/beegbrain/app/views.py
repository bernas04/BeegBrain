from ast import operator
from http import HTTPStatus
import multiprocessing
from webbrowser import Opera
# from attr import assoc
import pytz
from rest_framework.decorators import api_view
from datetime import date, datetime, timedelta, timezone
from django.db.models import Q
from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from app.models import *
from app import serializers
from rest_framework import status
import numpy as np
import pyedflib
import gzip
from django.dispatch import receiver
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import pyedflib
import re
from django.db import connection


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# ############################### USER ###############################

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUserByEmail(request):
    email = request.GET['email']
    try:
        user = Person.objects.get(email=email)
        print(user)
    except Person.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        d = Doctor.objects.get(email=email)
        type = 'doctor'
    except Doctor.DoesNotExist:
        type = 'operator'
    data = {'id': user.id, 'health_number' : user.health_number, 'type': type}
    return Response(data)

# ############################### INSTITUTIONS ###############################

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getAllInstitutions(request):
    """GET de todas as instituições"""
    institutions = Institution.objects.all()
    serializer = serializers.InstitutionSerializer(institutions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getInstitutionById(request):
    """GET de instituição por id"""
    institution_id = int(request.GET['id'])
    try:
        institution = Institution.objects.get(id=institution_id)
    except Institution.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = serializers.InstitutionSerializer(institution)
    return Response(serializer.data)


# get da instituição por nome!!!!!!!!!


# ############################### PROVENIENCIAS ###############################

@api_view(['GET'])
def getProvidence(request):
    """GET de todas as Proveniencias"""
    providences = Providence.objects.all()
    serializer = serializers.ProvidenceSerializer(providences, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createProvidence(request):
    """POST de uma Proveniencia"""
    serializer = serializers.ProvidenceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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
    serializer = serializers.RevisionCenterSerializer(
        revision_centers, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createRevisionCenter(request):
    """POST de um Centro de Revisão"""
    serializer = serializers.RevisionCenterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getContract(request):
    """GET de todos os contratos"""
    contracts = Contract.objects.all()
    serializer = serializers.ContractSerializer(contracts, many=True)
    return Response(serializer.data)

def getContractFromRevisionCenters(revision_centers):
    contracts = []
    for revision_center in revision_centers:
        try:
            contract = Contract.objects.get(revision_center=revision_center)
            contracts.append(contract)
        except Contract.DoesNotExist:
            continue
    return contracts

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createContract(request):
    """POST de um Contracto"""
    serializer = serializers.ContractSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPatients(request):
    """GET de todos os pacientes"""
    patients = Patient.objects.all()
    serializer = serializers.PatientSerializer(patients, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPatientsByStr(request):
    lst = []
    strToFind = request.GET['str'].lower()
    patients = Patient.objects.all()
    for patient in patients:
        if (strToFind in patient.getName().lower()):
            lst.append(patient)
    
    serializer = serializers.PatientSerializer(lst, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createPatient(request):
    """POST de um Paciente"""
    serializer = serializers.PatientSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPatientBySSN(request):
    """GET de um paciente pelo seu id"""
    pat_id = int(request.GET['ssn'])
    try:
        ret = Patient.objects.get(health_number=pat_id)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.PatientSerializer(ret)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getPatientById(request, id):
    """GET de um paciente pelo seu id"""
    try:
        ret = Patient.objects.get(id=id)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.PatientSerializer(ret)
    return Response(serializer.data)


# ############################### Operators ###############################

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getOperators(request):
    """GET de todos os Operators"""
    operators = Operator.objects.all()
    serializer = serializers.OperatorSerializer(operators, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createOperator(request):
    serializer = serializers.UserSerializer(data=request.data)
    if serializer.is_valid():
        resp = serializer.createOperator(request.data)
        token = serializers.TokenSerializer(data={'key': resp['token'].key, 'id': resp['id'], 'type':'operator', 'health_number' : request.data['health_number']})
        return Response(token.initial_data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getOperatorById(request):
    """GET de um operator pelo seu id"""
    op_id = int(request.GET['operator'])
    try:
        ret = Operator.objects.get(operator_number=op_id)
    except Operator.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.OperatorSerializer(ret)
    return Response(serializer.data)


@api_view(['POST'])
def create_operator_user(request):
    serializer = serializers.OperatorSerializer(data=request.data)
    if serializer.is_valid():
        ret = serializer.create(request.data)
        token = serializers.TokenSerializer(data={'key': ret.key})
        return Response(token.initial_data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ############################### DOCTORS ###############################


@api_view(['GET'])
def getDoctors(request):
    """GET de todos os médicos"""
    doctors = Doctor.objects.all()
    serializer = serializers.DoctorSerializer(doctors, many=True)
    
    return Response(serializer.data)


@api_view(['POST'])
def createDoctor(request):
    serializer = serializers.UserSerializer(data=request.data)
    if serializer.is_valid():
        print("CRIEIEIEIEIEIw")
        resp = serializer.createDoctor(request.data)   
        token = serializers.TokenSerializer(data={'key': resp['token'].key, 'id': resp['id'], 'type':'doctor', 'health_number' : request.data['health_number']})
        return Response(token.initial_data)
    else:
        print(serializer.errors)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getDoctorById(request):
    """GET de um Doutor pelo seu id"""
    doc_id = int(request.GET['medical'])
    try:
        ret = Doctor.objects.get(medical_number=doc_id)
        
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.DoctorSerializer(ret)
    return Response(serializer.data)


@api_view(['POST'])
def create_doctor_user(request):
    serializer = serializers.DoctorSerializer(data=request.data)
    if serializer.is_valid():
        ret = serializer.create(request.data)
        token = serializers.TokenSerializer(data={'key': ret.key})
        return Response(token.initial_data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


###################     LOGIN     ##################

@api_view(['GET'])
def get_user_by_email(request):

    #isOperator = request.GET['operator_number']
    isDoctor = request.GET['medical_number']
    email = request.GET['email']

    if isDoctor:
        try:
            user = Doctor.objects.get(email=email)
        except Doctor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.DoctorSerializer(user)
        return Response(serializer.data)

    # if isOperator:
    #     try:
    #         user = Operator.objects.get(email=email)
    #     except Operator.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
    #     serializer = serializers.DoctorSerializer(user)
    #     return Response(serializer.data)

# Métodos do User
@api_view(['POST'])
def create_user(request):
    serializer = serializers.DoctorSerializer(data=request.data)
    if serializer.is_valid():
        ret = serializer.create(request.data)
        token = serializers.TokenSerializer(data={'key': ret.key})
        return Response(token.initial_data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ############################### DOCTOR_REVISON_CENTER ###############################

def getDoctorRevisionCenters(doctor_id):
    """GET de todos os doctor_revision_center"""
    try:
        doctor = Doctor.objects.get(id=doctor_id)
        print(doctor)
    except Doctor.DoesNotExist:
        print("doutor n existe")
        return None
    doctor_revision_centers = DoctorRevisionCenter.objects.filter(doctor=doctor)
    return [doctor_revision_center.revision_center for doctor_revision_center in doctor_revision_centers]


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createDoctorRevisionCenter(request):
    """POST de um Doctor_Revision_Center"""
    serializer = serializers.DoctorRevisionCenterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ############################### REPORT ###############################

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getReport(request):
    """GET de todos os relatórios"""
    reports = Report.objects.all()
    serializer = serializers.ReportSerializer(reports, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createReport(request):
    """POST de um Report"""
    print(request.data)
    serializer = serializers.ReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getReportById(request):
    """GET de um relatório pelo seu id"""

    if request.method == 'GET': 
        rep_id = int(request.GET['id'])
        try:
            ret = Report.objects.get(id=rep_id)
            
        except Report.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.ReportSerializer(ret)
        return Response(serializer.data)

    elif request.method == 'POST':
        try:
            rep_id = int(request.data["id"])
            report = Report.objects.get(id=rep_id)
            report.content = request.data["content"]
            report.save()
            
        except Report.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        return Response(True)


# ############################### EEG ###############################

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getEeg(request):
    """GET de todos os EEG's"""
    eegs = EEG.objects.all()
    serializer = serializers.EEGSerializer(eegs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getEegByPatient(request, id):
    """GET de todos os EEG's de um determinado paciente"""
    try:
        eegs = EEG.objects.filter(patient=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = serializers.EEGSerializer(eegs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createEEG(request):

    print("CREATE EEG!")
    
    PRIORITIES = {'Very Low':1,'Low':2,'Medium':3,'High':4,'Very High':5}


    try:
        operator = Operator.objects.get(health_number=request.data['operatorID'])
    except Operator.DoesNotExist:
        operator = None

    try:
        patient = Patient.objects.get(health_number=request.data['patientID'])
    except Patient.DoesNotExist:
        patient = None


    for memoryFile in request.FILES.getlist('file'):

        file = memoryFile.file

        try:
            f = pyedflib.EdfReader(file.name)
            priority = PRIORITIES[request.data['priority']]
            timestamp = f.getStartdatetime()
            duration = f.getFileDuration()
            n = f.signals_in_file-1 
            signal_labels = f.getSignalLabels()
            annotations = f.readAnnotations()
            stat = None

        except Exception as e:
            print()
            print('<ERROR MESSAGE>', str(e))
            print()

            stat = str(e)
            timestamp = None
            priority = PRIORITIES[request.data['priority']]
            duration = None

        if (not patient): stat = 'patient undefined'
        empty_report = Report.objects.create(content="", timestamp=datetime.now())

        eeg = {
            "operator": operator,
            "patient": patient,
            "status": stat,
            "timestamp": timestamp,
            "priority": priority,
            "report": empty_report.id,
            "duration": duration,
        }

        print(eeg)

        # Criar o objeto EEG
        idEEG = None
        serializer_eeg = serializers.EEGSerializer(data=eeg)
        if serializer_eeg.is_valid():
            print("É VALIDO")
            serializer_eeg.save()
            idEEG = EEG.objects.latest('id').id

        else:
            print(serializer_eeg.errors)


        if stat is not None:
            print("RETURN DO EEG COM ERRO")
            # continue
            return Response(serializer_eeg.data, status=status.HTTP_201_CREATED)


        eegObject = EEG.objects.get(id=idEEG)

        # Create annotations
        for i in range(len(annotations[0])):
            start = annotations[0][i]
            duration = annotations[1][i]
            description = annotations[2][i]    
            Annotation.objects.create(start=start,duration=duration,description=description,eeg=eegObject)

        # Split EEG by channels
        poolSize = multiprocessing.cpu_count()
        pool = multiprocessing.Pool(poolSize)
        for i in np.arange(n):
            signal = f.readSignal(i) 
            channelLabel = re.sub('[^0-9a-zA-Z]+', '', signal_labels[i])
            pool.apply_async(worker,(channelLabel,eegObject,signal,))

        # Shared Folder
        try:
            print("getting contract...")
            print(" - operator: ", operator)
            contract = Contract.objects.get(providence=operator.providence)
        except Contract.DoesNotExist:
            print("CONTRACT NOT FOUND")
            return Response(status=status.HTTP_404_NOT_FOUND)

        SharedFolder.objects.create(contract=contract,eeg=eegObject)

    return Response(serializer_eeg.data, status=status.HTTP_201_CREATED)

def saveChannel(label,eeg,array):
    filename = str(eeg.id) + '_' + label
    compressChannel(filename,array)
    chn = Channel.objects.create(label=label,eeg=eeg)
    chn.file.name = filename + ".npy"
    chn.save()

def worker(label,eeg,signal):
    saveChannel(label,eeg,signal)

def compressChannel(filename, channelArray):
    file = gzip.GzipFile('./media/' + filename + ".npy.gz", "wb")
    np.save(file, channelArray)
    file.close()

def decompress(filename):
    file = gzip.GzipFile('./media/' + filename + '.gz', "rb")
    return np.load(file)

@api_view(['GET', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getEegById(request):
    """GET ou DELETE de um EEG pelo seu id"""
    
    if request.method == 'GET':
        eeg_id = int(request.GET['id'])
        try:
            ret = EEG.objects.get(id=eeg_id)
        except EEG.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND) 
        serializer = serializers.EEGSerializer(ret)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        eeg_id = int(request.GET['id'])
        try:
            
            ret = EEG.objects.get(id=eeg_id)
        except EEG.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        ret.delete()
        return  Response(True)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getEegChannelLenght(request):

    eeg_id = int(request.GET['id'])
    try:
        eeg = EEG.objects.get(id=eeg_id)
    except EEG.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND) 

    try:
        channel = Channel.objects.filter(eeg=eeg).first()
    except Channel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND) 

    length = len(decompress(channel.file.name))
    return Response(length)



# ############################### CHANNEL ###############################

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getChannelLabels(request):
    """GET da LISTA (labels apenas) de um EEG"""
    eeg_id = int(request.GET['eeg'])
    channels = Channel.objects.filter(eeg_id=eeg_id)
    channelsLabels = list(set([chn.label for chn in channels]))
    channelLabels = sorted(channelsLabels, key=lambda x: (x[0],int(x[1:])))
    return Response(channelLabels)

"""Retorna um array com os valores de um canal de um EEG, desde o momento de início (start - numero do tick inicial) até ao start + timeInterval (em segundos)"""
def getChannelIntervalValues(eeg_id,label,timeInterval,start):
    try:
        channel = Channel.objects.get(eeg_id=eeg_id,label=label)
    except Channel.DoesNotExist:
        return False
    try:
        eeg = EEG.objects.get(id=eeg_id)
    except EEG.DoesNotExist:
        return False
    data = decompress(channel.file.name)
    fileDuration = eeg.duration
    ticksPerSecond = len(data) / fileDuration
    data = data[start:start+timeInterval*ticksPerSecond]
    return data

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getChannelByLabel(request):
    """GET de um channel pela sua label e id do EEG"""
    eeg_id = int(request.GET['eeg'])
    label = request.GET['label']
    try:
        channel = Channel.objects.get(eeg_id=eeg_id,label=label)
    except Channel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    data = { channel.label : decompress(channel.file.name) }
    return Response(data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getChannelsByLabels(request):
    """GET de channels por um array de labels e id do EEG"""
    poolSize = multiprocessing.cpu_count()
    print(poolSize)
    pool = multiprocessing.Pool(poolSize)
    start = int(request.GET['start'])  
    end = int(request.GET['end'])  
    eeg_id = int(request.GET['eeg'])
    eeg = EEG.objects.get(id=eeg_id)  
    labels = request.GET.getlist('labels')
    manager = multiprocessing.Manager()
    data = manager.dict()
    for label in labels:
        pool.apply_async(bufferWorker(data,label,eeg,start,end),)
    
    pool.close()
    pool.join() 
    connection.close()
    return Response(data,status=status.HTTP_200_OK)

def bufferWorker(data,label,eeg,start,end):
    # chn = Channel.objects.filter(label=label,eeg=eeg).last()
    array = decompress(str(eeg.id) + "_" + label + ".npy")
    # final_end = start + (end-start)*len(array)//eeg.duration
    valuesMap = {}
    for idx in range(start,end):
        valuesMap[idx + 1] = round(array[idx], 5)
    data[label] = valuesMap
    print("label done --> " + label)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getAllEegChannels(request):
    """GET de todos os channels de um eeg"""
    poolSize = multiprocessing.cpu_count()
    pool = multiprocessing.Pool(poolSize)
    eeg_id = int(request.GET['eeg'])    
    manager = multiprocessing.Manager()
    data = manager.dict()
    for channel in Channel.objects.filter(eeg_id=eeg_id):
        pool.apply_async(workerDecompress(data,channel.label,channel.file.name),)
    pool.close()
    pool.join() 
    connection.close()
    return Response(data,status=status.HTTP_200_OK)

def workerDecompress(data,label,filename):
    data[label] = decompress(filename)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createAccessEeg(request):
    """POST de um Access EEG"""
    serializer = serializers.ReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ############################### ANNOTATIONS ###############################

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getEegAnnotations(request):
    """GET de todas as annotations de um EEG"""
    eeg_id = int(request.GET['eeg'])
    try:
        eeg = EEG.objects.get(id=eeg_id)
    except EEG.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    annotations = Annotation.objects.filter(eeg=eeg)
    serializer = serializers.AnnotationSerializer(annotations, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createAnnotation(request):
    """POST de uma annotation"""
    serializer = serializers.AnnotationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ############################### EVENT ###############################

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getEvent(request):
    """GET de todos os eventos"""
    events = Event.objects.all()
    serializer = serializers.EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getEegEvents(request):
    """GET de todos os eventos de um eeg"""
    events = Event.objects.filter(eeg=request.data['eeg'])
    serializer = serializers.EventSerializer(events, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createEvent(request):
    """POST de um evento"""

    print(request.data)
    data = request.data

    try:
        person = Person.objects.get(id=int(data["person"]))
        
    except Person.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        eeg = EEG.objects.get(id=int(data["eeg_id"]))
        
    except EEG.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    event = {
        "type": data["type"],
        "person": person.id,
        "eeg": eeg.id
    }

    serializer = serializers.EventSerializer(data=event)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getEventById(request):
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getDoctorSharedFolder(request):
    """GET de todas as pastas partilhadas"""

    doctor_id = int(request.GET['id'])
    doctor_revision_centers = getDoctorRevisionCenters(doctor_id)
    contracts = getContractFromRevisionCenters(doctor_revision_centers)
    eegs = []
    for contract in contracts:
        shared_folders = SharedFolder.objects.filter(contract=contract)
        eegs.extend([shared_folder.eeg for shared_folder in shared_folders])
    print(eegs)

    # CHECK CACHE VALID

    serializer = serializers.EEGSerializer(eegs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getOperatorSharedFolder(request):
    """GET de todas as pastas partilhadas"""
    
    operator_id = int(request.GET['id'])
    try:
        operator = Operator.objects.get(id=operator_id)
    except Operator.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    try:
        contract = Contract.objects.get(providence__id=operator.providence.id)
    except Contract.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    eegs = [shared_folder.eeg for shared_folder in SharedFolder.objects.filter(contract=contract) if notExpired(shared_folder)]
    print(eegs)
    serializer = serializers.EEGSerializer(eegs, many=True)
    return Response(serializer.data)


def notExpired(shared_folder):
    return datetime.now(timezone.utc) - shared_folder.created_at < timedelta(days=7) # alterar isto para uma semana ou x dias


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createSharedFolder(request):
    """POST de uma pasta partilhada"""
    serializer = serializers.SharedFolderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getSharedFolderById(request, id):
    """GET de uma pasta partilhada pelo seu id"""
    eve_id = int(request.GET['id'])
    try:
        ret = SharedFolder.objects.get(id=eve_id)
    except SharedFolder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = serializers.SharedFolderSerializer(ret)
    return Response(serializer.data)




