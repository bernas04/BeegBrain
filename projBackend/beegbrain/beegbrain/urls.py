from django.urls import path
from django.contrib import admin

from app import views
from rest_framework.authtoken import views as auth_views


urlpatterns = [

    path('login/', auth_views.ObtainAuthToken.as_view()),
    path('admin/', admin.site.urls),

    path('api/patients', views.getPatients),
    path('api/createPatient', views.createPatient),
    path('api/patient', views.getPatientBySSN),
    path('api/patient/<int:id>', views.getPatientById),

    path('api/operators', views.getOperators),
    path('api/createOperator', views.createOperator),
    path('api/operator', views.getOperatorById),
    
    path('api/doctors', views.getDoctors),
    path('api/createDoctor', views.createDoctor),
    path('api/doctor', views.getDoctorById),

    path('api/login_token', auth_views.ObtainAuthToken.as_view()),
    path('api/profile', views.create_user),
    #path('api/login_user', views.login_view),
    path('api/login_doctor', views.createDoctor),


    path('api/proveniences', views.getProvidence),
    path('api/createProveniences', views.createProvidence),
    path('api/providence', views.getProvidenceById),

    path('api/revisioncenters', views.getRevisionCenter),
    path('api/createRevisionCenter', views.createRevisionCenter),
    path('api/revisioncenter', views.getRevisionCenterById),

    path('api/contracts', views.getContract),
    path('api/createContract', views.createContract),
    path('api/contract', views.getContractById),

    path('api/reports', views.getReport),
    path('api/createReport', views.createReport),
    path('api/report', views.getReportById),

    path('api/eegs', views.getEeg),
    path('api/createEEG', views.createEEG),
    path('api/eeg', views.getEegById),
    path('api/eegs/<int:id>', views.getEegByPatient),

    path('api/channel', views.getChannelByLabel),
    path('api/labels', views.getChannelLabels),
    path('api/eegChannels', views.getAllEegChannels),
    path('api/channelsByLabels', views.getChannelsByLabels),

    path('api/events', views.getEvent),
    path('api/createEvent', views.createEvent),
    path('api/event', views.getEventById),

    path('api/createAnnotation', views.createAnnotation),
    path('api/eegAnnotations', views.getEegAnnotations),

    path('api/doctorSharedFolders', views.getDoctorSharedFolder),
    path('api/createSharedFolder', views.createSharedFolder),
    path('api/institutionSharedFolder', views.getInstitutionSharedFolder),
    
    path('api/doctorRevisionCenters', views.getDoctorRevisionCenters),
    path('api/createDoctorevisioncenter', views.createDoctorRevisionCenter),
    
]
