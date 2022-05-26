from django.contrib import admin
from app.models import *

# Register your models here.
admin.site.register(Institution)
admin.site.register(Person)
admin.site.register(Providence)
admin.site.register(RevisionCenter)
admin.site.register(Contract)
admin.site.register(Patient)
admin.site.register(Doctor)
admin.site.register(Operator)
admin.site.register(DoctorRevisionCenter)
admin.site.register(Report)
admin.site.register(EEG)
""" admin.site.register(AccessEEG) """
admin.site.register(Event)
admin.site.register(SharedFolder)
admin.site.register(Channel)
admin.site.register(Annotation)