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
  { path: '', redirectTo: '/frontpage', pathMatch: 'full'},
  { path: 'frontpage', component: FrontpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: NavComponent, children: [
    {path: 'profile', component: UserprofileComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'order', component: OrderCatalogComponent},
    {path: 'basket', component: BasketComponent},
    {path: 'product', component: ProductPageComponent},
    {path: 'product/:uid', component: ItemdetailsComponent},
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
