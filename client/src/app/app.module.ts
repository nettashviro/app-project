import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgFlashMessagesModule } from "ng-flash-messages";
import { JwtModule } from "@auth0/angular-jwt";
import { AgmCoreModule } from "@agm/core";

import { AppRoutingModule, RoutingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MapComponent } from "./components/map/map.component";

import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
import { ItemService } from "./services/item.service";
import { UserItemService } from "./services/user-item.service";

import { AuthGuard } from "./guards/auth.guard";
import { AdminComponent } from "./components/admin/admin.component";
import { ContactComponent } from "./components/contact/contact.component";
import { BarGraphComponent } from "./components/bar-graph/bar-graph.component";
import { D3ChartsDirective } from "./directives/d3-charts.directive";
import { D3BarChartDirective } from "./directives/d3-bar-chart.directive";
import { PieGraphComponent } from "./components/pie-graph/pie-graph.component";
import { D3PieChartDirective } from "./directives/d3-pie-chart.directive";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    ...RoutingComponents,
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent,
    MapComponent,
    ContactComponent,
    BarGraphComponent,
    PieGraphComponent,
    D3ChartsDirective,
    D3BarChartDirective,
    D3PieChartDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgFlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["http://localhost:5000"],
        blacklistedRoutes: ["http://localhost:5000/api/user/authenticate"],
      },
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDGjArdTCBPj47RCMqpb6jSjkgNaCDy3hw",
    }),
  ],
  providers: [
    ValidateService,
    AuthService,
    ItemService,
    UserItemService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
