import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styles: [
  ]
})
export class MapScreenComponent implements OnInit {

  constructor(private placesService: PlacesService) { }

  ngOnInit(): void {
  }

}
