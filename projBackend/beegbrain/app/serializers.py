from dataclasses import field, fields
from pyexpat import model
from rest_framework import serializers
from app.models import *

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = "__all__"

class ProvidenceSerializer(serializers.ModelSerializer):
    parent_model = InstitutionSerializer(many=False, read_only=True)
    class Meta:
        model = Providence
        fields = "__all__"

class RevisionCenterSerializer(serializers.ModelSerializer):
    parent_institution = InstitutionSerializer(many=False, read_only=True)
    class Meta:
        model = RevisionCenter
        fields = "__all__"

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = "__all__"

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = "__all__"

class PatientSerializer(serializers.ModelSerializer):
    parent_person = PersonSerializer(many=False, read_only = True)
    class Meta:
        model = Patient
        fields = "__all__"


class DoctorSerializer(serializers.ModelSerializer):
    parent_person = PersonSerializer(many=False, read_only = True)
    class Meta:
        model = Doctor
        fields = "__all__"

class OperatorSerializer(serializers.ModelSerializer):
    parent_person = PersonSerializer(many=False, read_only = True)
    class Meta:
        model = Operator
        fields = "__all__"

class DoctorRevisionCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorRevisionCenter
        fields = "__all__"

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"

class EEGSerializer(serializers.ModelSerializer):
    class Meta:
        model = EEG
        fields = "__all__"

"""
Ver para n ser preciso fazer parsing dos dados na view
    class Meta: 
        model = EEG
        fields = ('id','file','status', 'timestamp', 'priority','report','operator','patient')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['report'] = ReportSerializer(Report.objects.get(id=data['report'])).data
        data['operator'] = OperatorSerializer(Operator.objects.get(id=data['operator'])).data
        data['patient'] = PatientSerializer(Patient.objects.get(id=data['patient'])).data
        return data
"""

""" class AccessEEGSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessEEG
        fields = "__all__"
 """
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

class SharedFolderSerializer(serializers.ModelSerializer):
    class Meta: 
        model = SharedFolder
        fields = "__all__"
