from django.db import models    
from django.apps import apps
from django.contrib.auth.models import AbstractUser, UserManager
from django.contrib.auth.hashers import make_password


class CustomUserManager(UserManager):
    
    def create_user(self, username=None, email=None, password=None, **extra_fields):
        return super(CustomUserManager, self).create_user(username, email, password, **extra_fields)

    def create_superuser(self, username=None, email=None, password=None, **extra_fields):
        return super(CustomUserManager, self).create_superuser(username, email, password, **extra_fields)

    def _create_user(self, username, email, password, **extra_fields):
        email = self.normalize_email(email)
        GlobalUserModel = apps.get_model(self.model._meta.app_label, self.model._meta.object_name)
        username = GlobalUserModel.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user


class User(AbstractUser):

    email = models.EmailField(null=False, unique=True)
    name = models.CharField(max_length=100, null=False)
    username = models.CharField(max_length=50, null=True)
    password = models.CharField(max_length=256, null=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    def create_superuser(self, email, username, password):  

        user = self.create_user(
            username=username,
            email=self.normalize_email(email),
            password=password)

# Institution -> Medical institution that can be divided in two different categories: Providence and RevisionCenter
class Institution(models.Model):

    name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=300)
    telephone = models.CharField(max_length=20)
    
    def __str__(self) -> str:
        return f'{self.name}'


# Providence -> Institution responsible for producing EEG exams, made by Operators
class Providence(Institution):

    def __str__(self) -> str:
        return 'Providence: ' + super().__str__()


# Revision Center -> Institution responsible for reviewing and creating reports for EEG exams, made by Doctors
class RevisionCenter(Institution):

    def __str__(self) -> str:
        return 'Revision Center: ' + super().__str__()


# Contract -> Exclusive contract between a Providence and a RevisionCenter (1:1 relation). 
# EEG exams produced by the Providence are sent only to the RevisionCenter.
class Contract(models.Model):

    providence = models.OneToOneField(Providence, verbose_name=('providence'), on_delete=models.CASCADE, related_name='%(class)s_providence')
    revision_center = models.OneToOneField(RevisionCenter, verbose_name=('revision_center'), on_delete=models.CASCADE, related_name='%(class)s_revision_center')

    def __str__(self) -> str:
        return f'Providence: ' + self.providence.name + ' RevisionCenter: ' + self.revision_center.name
    

# Person -> A person can be divided in three different entities: Patient, Doctor and Operator

class Person(models.Model):

    health_number = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=300)
    telephone = models.CharField(max_length=20)
    birthday = models.DateField()
    GENDERS = [("M","Male"),("F","Female"),("O","Other")]
    gender = models.CharField(max_length=1, choices=GENDERS)

    def __str__(self) -> str:
        return f'{self.id} {self.name}'


# Patient -> Entity that doesn't have access to the application, receiving the EEG reports via email.
class Patient(Person):

    medical_info = models.TextField(null=True)

    def __str__(self) -> str:
        return 'Patient: ' + super().__str__() + f' {self.health_number}'


# Doctor -> A Doctor can work in more than one Revision Center. He's responsible for visualizing, monitoring and reporting an EEG exam.
class Doctor(Person):

    medical_number = models.CharField(max_length=20)

    def __str__(self) -> str:
        return 'Doctor: ' + super().__str__() + f' {self.medical_number}'


# Operator -> An operator only works in one Providence. He's responsible for producing EEGs (outside the application) and uploading them
# into the platform to be seen by the Revision Center that holds a contract with his Providence.
class Operator(Person):

    operator_number = models.CharField(max_length=20)
    providence = models.ForeignKey(Providence, verbose_name=('providence'), on_delete=models.CASCADE, related_name='%(class)s_providence')
    
    def __str__(self) -> str:
        return 'Operator: ' + super().__str__() + f' {self.health_number}'
    

# DoctorRevisionCenter -> Defines what Revision Centers Doctors work on and vice versa.
class DoctorRevisionCenter(models.Model):

    # class Meta:
    #     unique_together = (('doctor', 'revision_center'))

    doctor = models.ForeignKey(Doctor, verbose_name=('doctor'), on_delete=models.CASCADE, related_name='%(class)s_doctor')
    revision_center = models.ForeignKey(RevisionCenter, verbose_name=('revision center'), on_delete=models.CASCADE, related_name='%(class)s_revision_center')


# Report -> Content written by a Doctor related to a EEG.
class Report(models.Model):

    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    doctor = models.ForeignKey(Doctor, verbose_name=('doctor'), on_delete=models.CASCADE, related_name='%(class)s_doctor')


# EEG -> Has all the information about an EEG exam
class EEG(models.Model):
    operator = models.ForeignKey(Operator, verbose_name=('operator'), on_delete=models.CASCADE, related_name='%(class)s_operator', null=False)
    patient = models.ForeignKey(Patient, verbose_name=('patient'), on_delete=models.CASCADE, related_name='%(class)s_patient', null=False)
    status = models.BooleanField(default=True)                     
    timestamp = models.DateTimeField(null=True, blank=True)
    PRIORITIES = [("1","Very Low"),("2","Low"),("3","Medium"),("4","High"),("5","Very High")]
    priority = models.CharField(max_length=1, choices=PRIORITIES)
    duration = models.IntegerField(null=True, blank=True)  
    report = models.ForeignKey(Report, verbose_name=('report'), on_delete=models.CASCADE, related_name='%(class)s_report', null=True, blank=True)
    

# Channel -> Represents a channel in a EEG exam (has a label 'A01', a file with the values of that channel and the EEG it belongs to)
class Channel(models.Model):

    label = models.CharField(null=False, max_length=50)
    file = models.FileField(null=False)              
    eeg = models.ForeignKey(EEG, verbose_name=('eeg'), on_delete=models.CASCADE, related_name='%(class)s_eeg', null=False)


# Annotation -> Information about some event occured during the EEG exam (with start time, duration and description)
class Annotation(models.Model):

    start = models.DateTimeField(null=False)
    duration = models.FloatField(null=False)
    description = models.TextField(null=False)              
    eeg = models.ForeignKey(EEG, verbose_name=('eeg'), on_delete=models.CASCADE, related_name='%(class)s_eeg', null=False)


# Event -> Entity responsible for monitoring the life-cycle of an EEG (examples: UPLOAD, DELETE, GENERATE_PDF, etc...).
# Associated with a person (Operator/Doctor) or an automatic proccess and a timestamp.
class Event(models.Model):

    # TODO: List of possible types.
    type = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    eeg = models.ForeignKey(EEG, verbose_name=('eeg'), on_delete=models.CASCADE, related_name='%(class)s_eeg')
    person = models.ForeignKey(Person, verbose_name=('person'), on_delete=models.CASCADE, related_name='%(class)s_person')


# SharedFolder -> Table responsible for defining the EEG exams that an institution (and its workers) is allowed to access.  
class SharedFolder(models.Model):
    
    institution = models.ForeignKey(Institution, verbose_name=('institution'), on_delete=models.CASCADE, related_name='%(class)s_institution')
    eeg = models.ForeignKey(EEG, verbose_name=('eeg'), on_delete=models.CASCADE, related_name='%(class)s_eeg')

