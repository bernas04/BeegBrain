from pickle import TRUE
from django.db import models

# Create your models here.

# Institution -> Medical institution that can be divided in two different categories: Providence and RevisionCenter
class Institution(models.Model):

    name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=300)
    telephone = models.CharField(max_length=20)

# Providence -> Institution responsible for producing EEG exams, made by Operators
class Providence(Institution):
    institution = models.OneToOneField(Institution, on_delete=models.CASCADE, primary_key=True, related_name='%(class)s_institution')
    #id = models.ForeignKey(Institution, verbose_name=('id'), primary_key=True, on_delete=models.CASCADE)

# Revision Center -> Institution responsible for reviewing and creating reports for EEG exams, made by Doctors
class RevisionCenter(Institution):
    institution = models.OneToOneField(Institution, on_delete=models.CASCADE, primary_key=True, related_name='%(class)s_institution')
    #id = models.ForeignKey(Institution, verbose_name=('id'), primary_key=True, on_delete=models.CASCADE)

# Contract -> Exclusive contract between a Providence and a RevisionCenter (1:1 relation). 
# EEG exams produced by the Providence are sent only to the RevisionCenter.
class Contract(models.Model):

    providence = models.ForeignKey(Providence, verbose_name=('providence'), on_delete=models.CASCADE, related_name='%(class)s_providence')
    revision_center = models.ForeignKey(RevisionCenter, verbose_name=('revision_center'), on_delete=models.CASCADE, related_name='%(class)s_revision_center')

# Person -> A person can be divided in three different entities: Patient, Doctor and Operator
class Person(models.Model):
    health_number = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=300)
    telephone = models.CharField(max_length=20)
    birthday = models.DateField()
    GENDERS = [("M","Male"),("F","Female")]
    gender = models.CharField(max_length=1, choices=GENDERS)

# Patient -> Entity that doesn't have access to the application, receiving the EEG reports via email.
class Patient(Person):
    #person = models.OneToOneField(Person, on_delete=models.CASCADE, primary_key=True)
    #health_number = models.ForeignKey(Person, verbose_name=('health_number'), primary_key=True, on_delete=models.CASCADE)
    medical_info = models.TextField()

# Doctor -> A Doctor can work in more than one Revision Center. He's responsible for visualizing, monitoring and reporting an EEG exam.
class Doctor(Person):
    #person = models.OneToOneField(Person, on_delete=models.CASCADE, primary_key=True)
    #health_number = models.ForeignKey(Person, verbose_name=('health_number'), primary_key=True, on_delete=models.CASCADE)
    medical_number = models.CharField(max_length=20)

# Operator -> An operator only works in one Providence. He's responsible for producing EEGs (outside the application) and uploading them
# into the platform to be seen by the Revision Center that holds a contract with his Providence.
class Operator(Person):
    #person = models.OneToOneField(Person, on_delete=models.CASCADE, primary_key=True)

    #health_number = models.ForeignKey(Person, verbose_name=('health_number'), primary_key=True, on_delete=models.CASCADE)
    operator_number = models.CharField(max_length=20)
    providence = models.ForeignKey(Providence, verbose_name=('providence'), on_delete=models.CASCADE, related_name='%(class)s_providence')
    
# DoctorRevisionCenter -> Defines what Revision Centers Doctors work on and vice versa.
class DoctorRevisionCenter(models.Model):
    class Meta:
        unique_together = (('doctor', 'revision_center'),)
    doctor = models.ForeignKey(Doctor, verbose_name=('doctor'), on_delete=models.CASCADE, related_name='%(class)s_doctor')
    revision_center = models.ForeignKey(RevisionCenter, verbose_name=('revision_center'), on_delete=models.CASCADE, related_name='%(class)s_revision_center')

# Report -> Content written by a Doctor related to a EEG.
class Report(models.Model):

    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    doctor = models.ForeignKey(Doctor, verbose_name=('doctor'), on_delete=models.CASCADE, related_name='%(class)s_doctor')

# EEG -> Has all the information about an EEG exam
class EEG(models.Model):

    file = models.FileField()                                       # TODO: Check if we need to add any parameters (like: specify size range?)
    status = models.BooleanField(default=True)                      # If false: The file has an error
    timestamp = models.DateTimeField(auto_now_add=True)
    PRIORITIES = [(1,"Very Low"),(2, "Low"),(3, "Medium"),(4, "High"),(5, "Very High")]
    priority = models.IntegerField(choices=PRIORITIES)
    report = models.ForeignKey(Report, verbose_name=('report'), on_delete=models.CASCADE, related_name='%(class)s_report', null=True)
    operator = models.ForeignKey(Operator, verbose_name=('operator'), on_delete=models.CASCADE, related_name='%(class)s_operator')
    patient = models.ForeignKey(Patient, verbose_name=('patient'), on_delete=models.CASCADE, related_name='%(class)s_patient')

# AccessEEG -> Table responsible for defining what Persons have access to a specific EEG
class AccessEEG(models.Model):

    patient = models.ForeignKey(Patient, verbose_name=('patient'), on_delete=models.CASCADE, null=True, related_name='%(class)s_patient')
    eeg = models.ForeignKey(EEG, verbose_name=('eeg'), on_delete=models.CASCADE, related_name='%(class)s_eeg')

# Event -> Entity responsible for monitoring the life-cycle of an EEG (examples: UPLOAD, DELETE, GENERATE_PDF, etc...).
# Associated with a person (Operator/Doctor) or an automatic proccess and a timestamp.
class Event(models.Model):

    # TODO: List of possible types.
    type = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    eeg = models.ForeignKey(EEG, verbose_name=('eeg'), on_delete=models.CASCADE, related_name='%(class)s_eeg')
    doctor = models.ForeignKey(Doctor, verbose_name=('doctor'), on_delete=models.CASCADE, related_name='%(class)s_doctor')

# SharedFolder -> Table responsible for defining the EEG exams that an institution (and its workers) is allowed to access.  
class SharedFolder(models.Model):
    
    institution = models.ForeignKey(Institution, verbose_name=('institution'), on_delete=models.CASCADE, related_name='%(class)s_institution')
    eeg = models.ForeignKey(EEG, verbose_name=('eeg'), on_delete=models.CASCADE, related_name='%(class)s_eeg')