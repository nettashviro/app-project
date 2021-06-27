import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutComponent } from "./components/about/about.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ShippingComponent } from "./components/shipping/shipping.component";
import { ConditionsComponent } from "./components/conditions/conditions.component";
import { MapComponent } from "./components/map/map.component";
import { ItemsComponent } from "./components/items/items.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { UserItemsComponent } from "./components/user-items/user-items.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AdminComponent } from "./components/admin/admin.component";
import { ContactComponent } from "./components/contact/contact.component";

import { AuthGuard } from "./guards/auth.guard";
import { AuthGuardAdmin } from "./guards/auth.guard.admin";
import { LoginGuard } from "./guards/login.guard";

const routes: Routes = [
  { path: "items", component: ItemsComponent },
  { path: "about", component: AboutComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "shipping", component: ShippingComponent },
  { path: "conditions", component: ConditionsComponent },
  { path: "map", component: MapComponent },
  { path: "register", component: RegisterComponent, canActivate: [LoginGuard] },
  {
    path: "authenticate",
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  { path: "contact", component: ContactComponent },
  {
    path: "",
    component: DashboardComponent,
  },
  {
    path: "managment",
    component: AdminComponent,
    canActivate: [AuthGuardAdmin],
  },
  {
    path: "user/item/:id",
    component: UserItemsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "user/orders",
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponents = [
  ItemsComponent,
  AboutComponent,
  CheckoutComponent,
  ShippingComponent,
  ConditionsComponent,
  MapComponent,
  RegisterComponent,
  LoginComponent,
  UserItemsComponent,
  OrdersComponent,
  DashboardComponent,
  NotFoundComponent,
];
