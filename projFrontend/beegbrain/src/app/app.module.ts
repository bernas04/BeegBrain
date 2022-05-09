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
import { EEGViewerComponent } from './components/eeg-viewer/eeg-viewer.component';
import { UploadComponent } from './pages/upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IgxCategoryChartModule, IgxLegendModule } from "igniteui-angular-charts";
import { IgxSliderModule } from "igniteui-angular";
import { NgApexchartsModule } from 'ng-apexcharts';

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
		EEGViewerComponent,
		UploadComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		IgxCategoryChartModule,
		IgxLegendModule,
		IgxSliderModule,
		NgApexchartsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
