import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutComponent } from "./components/about/about.component";
import { MapComponent } from "./components/map/map.component";
import { ItemsComponent } from "./components/items/items.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { UserItemsComponent } from "./components/user-items/user-items.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AdminComponent } from "./components/admin/admin.component";

import { AuthGuard } from "./guards/auth.guard";
import { AuthGuardAdmin } from "./guards/auth.guard.admin";

const routes: Routes = [
  { path: "items", component: ItemsComponent },
  { path: "about", component: AboutComponent },
  { path: "map", component: MapComponent },
  { path: "register", component: RegisterComponent },
  { path: "authenticate", component: LoginComponent },
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
  RegisterComponent,
  LoginComponent,
  UserItemsComponent,
  DashboardComponent,
  NotFoundComponent,
  MapComponent
];
