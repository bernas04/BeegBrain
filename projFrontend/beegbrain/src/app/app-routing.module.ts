import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EegComponent } from './pages/eeg/eeg.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { UploadComponent } from './pages/upload/upload.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';

const routes: Routes = [

  { path: '', component: DashboardComponent },

  { 
    path: 'workspace', children: [
      { path: '', component: WorkspaceComponent },
      { path: ':id', component: EegComponent }
    ]
  },

  { path: 'patients', component: PatientsComponent },

  { path: 'profile', component: ProfileComponent },
  
  { path: 'login', component: LoginComponent },

  { path: 'upload', component: UploadComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }