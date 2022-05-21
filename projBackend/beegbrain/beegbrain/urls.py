from django.urls import path
from django.contrib import admin

from app import views


urlpatterns = [

    path('admin/', admin.site.urls),

    path('api/patients', views.getPatients),
    path('api/createPatient', views.createPatient),
    path('api/patient', views.getPatientBySSN),

    path('api/operators', views.getOperators),
    path('api/createOperator', views.createOperator),
    path('api/operator', views.getOperatorById),
    
    path('api/doctors', views.getDoctors),
    path('api/createDoctor', views.createDoctor),
    path('api/doctor', views.getDoctorById),

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

    path('api/channel', views.getChannelByLabel),
    path('api/labels', views.getAllEegChannels),
    path('api/eegChannels', views.getAllEegChannels),

    path('api/events', views.getEvent),
    path('api/createEvent', views.createEvent),
    path('api/event', views.getEventById),

    path('api/sharedFolders', views.sharedFolder),
    path('api/createSharedFolder', views.createSharedFolder),
    path('api/sharedFolder', views.getSharedFolderById),
    
    path('api/doctorevisioncenter', views.getDoctorRevisionCenter),
    path('api/createDoctorevisioncenter', views.createDoctorRevisionCenter),
    
]
