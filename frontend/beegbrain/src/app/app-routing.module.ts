import { PatientsComponent } from './layouts/patients/patients.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { WorkspaceComponent } from './layouts/workspace/workspace.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./layouts/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'workspace', children: [
          { path: '', component: WorkspaceComponent }
        ]
      },
      {
        path: 'patients', children: [
          { path: '', component: PatientsComponent }
        ]
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
