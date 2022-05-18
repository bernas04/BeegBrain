from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import *
from app import serializers
from rest_framework import status
import numpy as np
import pyedflib
import gzip


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
def getPatientBySSN(request):
    """GET de um paciente pelo seu id"""
    pat_id = int(request.GET['ssn'])
    try:
        ret = Patient.objects.get(health_number=pat_id)
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.PatientSerializer(ret)
    return Response(serializer.data)


# ############################### Operators ###############################
@api_view(['GET'])
def getOperators(request):
    """GET de todos os Operators"""
    operators = Operator.objects.all()
    serializer = serializers.OperatorSerializer(operators, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createOperator(request):
    """POST de um Operator"""
    serializer = serializers.OperatorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getOperatorById(request):
    """GET de um operator pelo seu id"""
    op_id = int(request.GET['operator'])
    try:
        ret = Operator.objects.get(operator_number=op_id)
    except Operator.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = serializers.OperatorSerializer(ret)
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
    doc_id = int(request.GET['medical'])
    try:
        ret = Doctor.objects.get(medical_number=doc_id)
        
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

    PRIORITIES = {'Very Low':1,'Low':2,'Medium':3,'High':4,'Very High':5}

    memoryFile = request.data['file']
    file = memoryFile.file
    f = pyedflib.EdfReader(file.name)
    priority = PRIORITIES[request.data['priority']]
    timestamp = f.getStartdatetime()
    duration = f.getFileDuration()
    n = f.signals_in_file-1 
    m = f.getNSamples()[0]
    signal_labels = f.getSignalLabels()
    sigbufs = np.zeros((n, m))

    try:
        operator = Operator.objects.get(health_number=request.data['operator'])
    except Operator.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        patient = Patient.objects.get(health_number=request.data['patient'])
    except Patient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    eeg = {
        "operator": operator,
        "patient": patient,
        "status": True,
        "timestamp": timestamp,
        "priority": priority,
        "report": None,
        "duration": duration,
    }

    # Criar o objeto EEG
    idEEG = None
    serializer_eeg = serializers.EEGSerializer(data=eeg)
    if serializer_eeg.is_valid():

        serializer_eeg.save()
        idEEG = EEG.objects.latest('id').id

    eegObject = EEG.objects.get(id=idEEG)
    
    for i in np.arange(n):
        sigbufs[i, :] = f.readSignal(i) 
        channelLabel = signal_labels[i]
        array = np.array(sigbufs[i,:])
        filename = str(eegObject.id) + '_' + channelLabel
        compressChannel(filename,array)
        chn = Channel.objects.create(label=channelLabel,eeg=eegObject)
        chn.file.name = filename + ".npy.gz"
        chn.save()

    return Response(serializer_eeg.data, status=status.HTTP_201_CREATED)

    
def compressChannel(filename, channelArray):
    file = gzip.GzipFile('./media/' + filename + ".npy.gz", "w")
    np.save(file=file, arr=channelArray)
    file.close()

def decompress(filename):
    file = gzip.GzipFile('./media/' + filename + '.npy.gz', "r"); 
    return np.load(file)

    
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


# ############################### CHANNEL ###############################

@api_view(['GET'])
def getAllEegChannels(request):
    """GET da LISTA (labels apenas) de um EEG"""
    eeg_id = int(request.GET['eeg'])
    channels = Channel.objects.filter(eeg_id=eeg_id)
    channelsLabels = [chn.label for chn in channels]
    return Response(channelsLabels)

@api_view(['GET'])
def getChannelByLabel(request):
    """GET de um channel pela sua label e id do EEG"""
    eeg_id = int(request.GET['eeg'])
    label = request.GET['label']
    try:
        channel = Channel.objects.get(eeg_id=eeg_id,label=label)
    except Channel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = serializers.ChannelSerializer(channel)
    return Response(serializer.data)

@api_view(['GET'])
def getAllEegChannels(request):
    """GET de todos os channels de um eeg"""
    eeg_id = int(request.GET['eeg'])
    channels = Channel.objects.filter(eeg_id=eeg_id)
    serializer = serializers.ChannelSerializer(channels, many=True)
    return Response(serializer.data)

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