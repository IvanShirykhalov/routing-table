import {Routes} from '@angular/router';
import {LayoutComponent} from '../../shared';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'routes',
        loadComponent: () => import('../../features/routes-table').then(c => c.RoutesTableComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('../../features/settings').then(c => c.SettingsComponent)
      },
      {path: '', redirectTo: 'routes', pathMatch: 'full'}
    ]
  }
];
