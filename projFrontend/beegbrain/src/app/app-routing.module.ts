import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EegComponent } from './pages/eeg/eeg.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';

const routes: Routes = [

  { path: '', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent },

  { 
    path: 'workspace', children: [
      { path: '', component: WorkspaceComponent },
      { path: ':id', component: EegComponent }
    ]
  },

  { 
    path: 'patients', children: [
      { path: '', component: PatientsComponent },
      { path: ':id', component: PatientsComponent }
    ]
  },

  { path: 'profile', component: ProfileComponent },
  
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'editprofile', component: EditProfileComponent  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }