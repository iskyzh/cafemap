import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CafeComponent } from './cafe/cafe.component';
import { ExploreComponent } from './explore/explore.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cafe', component: CafeComponent },
  { path: 'explore', component: ExploreComponent }
];

export const routing = RouterModule.forRoot(routes);
