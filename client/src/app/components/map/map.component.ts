import { Component, OnInit } from '@angular/core';
import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat = 31.4117257;
  lng = 35.0818155;

  constructor() { }

  ngOnInit() {
  }

}
