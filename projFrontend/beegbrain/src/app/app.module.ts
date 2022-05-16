import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { PatientComponent } from './pages/patient/patient.component';
import { EegComponent } from './pages/eeg/eeg.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EegTableComponent } from './components/eeg-table/eeg-table.component';
import { EegFiltersComponent } from './components/eeg-filters/eeg-filters.component';
import { ErrorareaComponent } from './components/errorarea/errorarea.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EEGViewerComponent } from './components/eeg-viewer/eeg-viewer.component';
import { UploadComponent } from './pages/upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

import * as echarts from 'echarts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    WorkspaceComponent,
    PatientsComponent,
    PatientComponent,
    EegComponent,
    ProfileComponent,
    EegTableComponent,
    EegFiltersComponent,
    ErrorareaComponent,
    EditProfileComponent,
    EEGViewerComponent,
    UploadComponent
  ],
  imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
