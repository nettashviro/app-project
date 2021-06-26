import { Component, OnInit } from "@angular/core";
import { google } from "@agm/core/services/google-maps-types";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  lat = 31.969967312361632;
  lng = 34.77096515796263;
  address = "אלי ויזל 2, ראשון לציון";

  constructor() {}

  ngOnInit() {}
}
