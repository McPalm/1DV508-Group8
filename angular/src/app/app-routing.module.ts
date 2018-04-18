import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard'

import { FrontpageComponent }   from './frontpage/frontpage.component';
import { LoginComponent }       from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/frontpage', pathMatch: 'full'},
  { path: 'frontpage', component: FrontpageComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'test', component: LoginComponent, canActivate: [AuthGuard]} // AuthGuard example
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ], 
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
