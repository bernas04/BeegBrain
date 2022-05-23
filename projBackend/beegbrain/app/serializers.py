from dataclasses import field, fields
from multiprocessing import parent_process
from pyexpat import model
from re import U
from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import *
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


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
    def create(self, val_data):
        print(val_data)
        user = User.objects.create_user(val_data['username'], val_data['password'])
        user.set_password(val_data['password'])
        user.is_active = True
        user.save()
        return Token.objects.get(user=user)



class OperatorSerializer(serializers.ModelSerializer):
    parent_person = PersonSerializer(many=False, read_only = True)
    class Meta:
        model = Operator
        fields = "__all__"
        
    def create(self, val_data):
        user = User.objects.create_user(val_data['email'], val_data['password'])
        user.set_password(val_data['password'])
        user.is_active = True
        user.save()
        return Token.objects.get(user=user)
        


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


    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        print("hahahah")

    def create(self, validated_data):
        print("hahahAAAAAAAAAAAAAAAAAAAAAAAAah")

        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.is_active = True
        user.save()
        return Token.objects.get(user=user)



class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key',)

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
