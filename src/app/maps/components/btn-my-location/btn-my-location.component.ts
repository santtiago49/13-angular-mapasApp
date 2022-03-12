import { Component, OnInit } from '@angular/core';
import { GeolocateControl } from "mapbox-gl";

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToMyLocation(){
    console.log('Esta es mi ubicación');
  }
 
}
