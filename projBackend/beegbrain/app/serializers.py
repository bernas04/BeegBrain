from dataclasses import field, fields
from pyexpat import model
from rest_framework import serializers
from app import models

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Institution
        fields = "__all__"

class ProvidenceSerializer(serializers.ModelSerializer):
    parent_model = InstitutionSerializer(many=False, read_only=True)
    class Meta:
        model = models.Providence
        fields = "__all__"

class RevisionCenterSerializer(serializers.ModelSerializer):
    parent_institution = InstitutionSerializer(many=False, read_only=True)
    class Meta:
        model = models.RevisionCenter
        fields = "__all__"

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contract
        fields = "__all__"

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Person
        fields = "__all__"

class PatientSerializer(serializers.ModelSerializer):
    parent_person = PersonSerializer(many=False, read_only = True)
    class Meta:
        model = models.Patient
        fields = "__all__"


class DoctorSerializer(serializers.ModelSerializer):
    parent_person = PersonSerializer(many=False, read_only = True)
    class Meta:
        model = models.Doctor
        fields = "__all__"

class OperatorSerializer(serializers.ModelSerializer):
    parent_person = PersonSerializer(many=False, read_only = True)
    class Meta:
        model = models.Operator
        fields = "__all__"

class DoctorRevisionCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DoctorRevisionCenter
        fields = "__all__"

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Report
        fields = "__all__"

class EEGSerializer(serializers.ModelSerializer):
    class Meta: 
        model = models.EEG
        fields = "__all__"

class AccessEEGSerializer(serializers.ModelSerializer):
    class Meta:
        models = models.AccessEEG
        fields = "__all__"

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        models = models.Event
        fields = "__all__"

class SharedFolderSerializer(serializers.ModelSerializer):
    class Meta: 
        models = models.SharedFolder
        fields = "__all__"
