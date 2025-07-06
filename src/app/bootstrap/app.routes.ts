import { Routes } from '@angular/router';
import { TaskListComponent, TaskDetailsComponent } from '../../features';

export const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/create', component: TaskDetailsComponent },
  { path: 'tasks/:id', component: TaskDetailsComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];
