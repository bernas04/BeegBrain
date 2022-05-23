from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password

# Create your models here.
##User

from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False) # a admin user; non super-user
    admin = models.BooleanField(default=False) # a superuser

    # notice the absence of a "Password field", that is built in.

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.
    objects = UserManager()

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_admin(self):
        "Is the user a admin member?"
        return self.admin
            
    

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
    password= models.CharField(max_length=20, null=True)
    username = models.CharField(max_length=20, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


    def __str__(self) -> str:
        return 'Doctor: ' + super().__str__() + f' {self.medical_number}'


# Operator -> An operator only works in one Providence. He's responsible for producing EEGs (outside the application) and uploading them
# into the platform to be seen by the Revision Center that holds a contract with his Providence.
class Operator(Person):
    operator_number = models.CharField(max_length=20)
    providence = models.ForeignKey(Providence, verbose_name=('providence'), on_delete=models.CASCADE, related_name='%(class)s_providence')
    password= models.CharField(max_length=20, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
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

    file = models.FileField(null=False)                                     
    status = models.BooleanField(default=True)                     
    timestamp = models.DateTimeField(auto_now_add=True)
    PRIORITIES = [("1","Very Low"),("2","Low"),("3","Medium"),("4","High"),("5","Very High")]
    priority = models.CharField(max_length=1, choices=PRIORITIES)
    report = models.ForeignKey(Report, verbose_name=('report'), on_delete=models.CASCADE, related_name='%(class)s_report', null=True, blank=True)
    operator = models.ForeignKey(Operator, verbose_name=('operator'), on_delete=models.CASCADE, related_name='%(class)s_operator', null=False)
    patient = models.ForeignKey(Patient, verbose_name=('patient'), on_delete=models.CASCADE, related_name='%(class)s_patient', null=False)

"""
Vamos retirar, porque o acesso ao EEG é feito pelo shared folder, só os medicos duma instituição é que tem acesso aos EEGs

# AccessEEG -> Table responsible for defining what Persons have access to a specific EEG
class AccessEEG(models.Model):

    patient = models.ForeignKey(Patient, verbose_name=('patient'), on_delete=models.CASCADE, null=True, related_name='%(class)s_patient')
    eeg = models.ForeignKey(EEG, verbose_name=('eeg'), on_delete=models.CASCADE, related_name='%(class)s_eeg')

"""

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
    
    path = models.CharField(max_length=300, null=True)
    institution = models.ForeignKey(Institution, verbose_name=('institution'), on_delete=models.CASCADE, related_name='%(class)s_institution')
    eeg = models.ForeignKey(EEG, verbose_name=('eeg'), on_delete=models.CASCADE, related_name='%(class)s_eeg')

