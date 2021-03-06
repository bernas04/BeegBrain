from django.urls import path
from django.contrib import admin

from app import views
from rest_framework.authtoken import views as auth_views


urlpatterns = [

    path('admin/', admin.site.urls),

    path('api/get_user', views.getUserByEmail),

    path('api/patients', views.getPatients),
    path('api/createPatient', views.createPatient),
    path('api/patient', views.getPatientBySSN),
    path('api/strPatients', views.getPatientsByStr),
    path('api/patient/<int:id>', views.getPatientById),

    path('api/operators', views.getOperators),
    path('api/createOperator', views.createOperator),
    path('api/operator', views.getOperatorById),
    
    path('api/institutions', views.getAllInstitutions),
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
    path('api/providence/operator', views.getProvidenceByOperatorId),


    path('api/revisioncenters', views.getRevisionCenter),
    path('api/createRevisionCenter', views.createRevisionCenter),
    path('api/revisioncenter', views.getRevisionCenterById),

    path('api/contracts', views.getContract),
    path('api/createContract', views.createContract),
    path('api/contract', views.getContractById),

    path('api/reports', views.getReport),
    path('api/createReport', views.createReport),
    path('api/report', views.getReportById),
    # path('api/report/<int:id>', views.getReportByEEG),

    path('api/eegs', views.getEeg),
    path('api/createEEG', views.createEEG),
    path('api/eeg', views.getEegById),
    path('api/eegs/<int:id>', views.getEegByPatient),
    path('api/eegLength', views.getEegChannelLenght),

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
    path('api/operatorSharedFolders', views.getOperatorSharedFolder),
    path('api/createSharedFolder', views.createSharedFolder),
    
    path('api/doctorRevisionCenters', views.getDoctorRevisionCenters),
    path('api/createDoctorevisioncenter', views.createDoctorRevisionCenter),
    
    path('api/filter', views.getEEGfilter),
    path('api/filter/patients', views.getPatientsEEG),
    path('api/filter/operators', views.getOperatorsInSharedFolder),
    path('api/filter/revcenter', views.getRevisionCentersByDoctor),

]
