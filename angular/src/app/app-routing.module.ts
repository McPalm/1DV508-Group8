import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard'

import { FrontpageComponent }   from './frontpage/frontpage.component';
import { LoginComponent }       from './login/login.component';
import {NavComponent} from "./nav/nav.component";
import {Profile} from "selenium-webdriver/firefox";
import {UserprofileComponent} from "./userprofile/userprofile.component";
import {AdminComponent} from "./admin/admin.component";
import {OrderCatalogComponent} from "./order-catalog/order-catalog.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ItemdetailsComponent} from "./itemdetails/itemdetails.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {BasketComponent} from "./basket/basket.component";


const routes: Routes = [
  { path: '', redirectTo: '/main/front', pathMatch: 'full'},
  { path: 'frontpage', redirectTo: '/main/front'},
  { path: 'login', component: LoginComponent },
  { path: 'main', component: NavComponent, children: [
    {path: 'profile', component: UserprofileComponent},
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    {path: 'order', component: OrderCatalogComponent, canActivate: [AuthGuard]},
    {path: 'basket', component: BasketComponent},
    {path: 'product', component: ProductPageComponent},
    {path: 'product-list', component: ProductListComponent},
    {path: 'product-list/:category', component: ProductListComponent},
    {path: 'product/:uid', component: ItemdetailsComponent},
    {path: 'front', component: FrontpageComponent},
    ]},
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
