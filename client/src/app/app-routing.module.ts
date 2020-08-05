import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { WorkEntryPageComponent } from './pages/workentry-page/workentry-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { ResetpasswordPageComponent } from './pages/resetpassword-page/resetpassword-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'frontpage', component: FrontPageComponent },
  { path: 'workentry', component: WorkEntryPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'resetpassword/:token', component: ResetpasswordPageComponent },
  { path: '404', component: NotfoundPageComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
