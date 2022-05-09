import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';

const routes: Routes = [

  { path: '', component: DashboardComponent },

  { path: 'workspace', component: WorkspaceComponent },

  { path: 'patients', component: PatientsComponent },

  { path: 'profile', component: ProfileComponent },
  
  { path: 'login', component: LoginComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
