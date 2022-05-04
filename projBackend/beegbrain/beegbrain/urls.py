"""beegbrain URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from app import views


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/patients', views.getPatients),
    path('api/createPatient', views.createPatient),
    path('api/patient', views.getPatientByNss),
    
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
    path('api/createEeg', views.createEEG),
    path('api/eeg', views.getEegById),

    path('api/events', views.getEvent),
    path('api/createEvent', views.createEvent),
    path('api/event', views.getEventById),

    path('api/sharedFolders', views.sharedFolder),
    path('api/createSharedFolder', views.createSharedFolder),
    path('api/sharedFolder', views.getSharedFolderById),

    path('api/accessEeg', views.getAccessEeg),
    path('api/createAccessEeg', views.createAccessEeg),
    
    path('api/doctorevisioncenter', views.getDoctorRevisionCenter),
    path('api/createDoctorevisioncenter', views.createDoctorRevisionCenter),


    

]
