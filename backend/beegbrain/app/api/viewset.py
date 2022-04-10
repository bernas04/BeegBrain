from rest_framework import viewsets
from backend.beegbrain.app import serializers
from app import models


# super class
class InstitutionViewset(viewsets.ModelViewSet):
    serializer_class = serializers.InstitutionSerializer
    queryset = models.Institution.objects.all()

# extend Institution
class ProvidenceViewset(viewsets.ModelViewSet):
    serializer_class = serializers.ProvidenceSerializer
    queryset = models.Providence.objects.all()

# extend Institution
class RevisionCenterViewset(viewsets.ModelViewSet):
    serializer_class = serializers.RevisionCenterSerializer
    queryset = models.RevisionCenter.objects.all()

class ContractViewset(viewsets.ModelViewSet):
    serializer_class = serializers.ContractSerializer
    queryset = models.Contract.objects.all()



# super class
class PersonViewset(viewsets.ModelViewSet):
    serializer_class = serializers.PersonSerializer
    queryset = models.Person.objects.all()

# extend Person
class PatientViewset(viewsets.ModelViewSet):
    serializer_class = serializers.PatientSerializer
    queryset = models.Patient.objects.all()

# extend Person
class DoctorViewset(viewsets.ModelViewSet):
    serializer_class = serializers.DoctorSerializer
    queryset = models.Doctor.objects.all()

# extend Person
class OperatorViewset(viewsets.ModelViewSet):
    serializer_class = serializers.OperatorSerializer
    queryset = models.Operator.objects.all()


class DoctorRevisionCenterViewset(viewsets.ModelViewSet):
    serializer_class = serializers.DoctorRevisionCenterSerializer
    queryset = models.DoctorRevisionCenter.objects.all()


class ReportViewset(viewsets.ModelViewSet):
    serializer_class = serializers.ReportSerializer
    queryset = models.Report.objects.all()

class EEGViewset(viewsets.ModelViewSet):
    serialializer_class = serializers.EEGSerializer
    queryset = models.EEG.objects.all()

class AccessEEGViewset(viewsets.ModelViewSet):
    serializer_class = serializers.AccessEEGSerializer
    queryset = models.AccessEEG.objects.all()

class EventViewset(viewsets.ModelViewSet):
    serializer_class = serializers.EventSerializer
    queryset = models.Event.objects.all()

class SharedFolderViewset(viewsets.ModelViewSet):
    serializer_class = serializers.SharedFolderSerializer
    queryset = models.SharedFolder.objects.all()
