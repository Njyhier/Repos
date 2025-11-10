import { Routes } from '@angular/router';
import { RepoDetails } from './repo-details/repo-details';
import { Landing } from './landing/landing';

export const routes: Routes = [
  {path:'', component: Landing},
  {path:'repo-details', component: RepoDetails}
];
