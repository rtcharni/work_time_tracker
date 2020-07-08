import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { WorkEntryPageComponent } from './pages/workentry-page/workentry-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'frontpage', component: FrontPageComponent },
  { path: 'workentry', component: WorkEntryPageComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', component: null }, // TODO: not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
