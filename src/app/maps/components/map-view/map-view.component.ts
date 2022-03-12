import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor( 
    private placesService: PlacesService,
    private mapService: MapService
  ) { }
  
  ngAfterViewInit(): void {
    if(!this.placesService.userLocation) throw Error('No se encontro un placesService.userLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10',
      center: this.placesService.userLocation,
      zoom: 14 
    });

    const popup = new Popup({
        closeButton: false,
        closeOnMove: true
      })
      .setHTML('<span>This is your location</span>')


    new Marker({color: 'red'})
      .setLngLat( this.placesService.userLocation! )
      .setPopup(popup)
      .addTo(map)

    this.mapService.setMat( map );

  }

  
  

}
