import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map; 
  private markers: Marker[] = [];

  get isMapReady(){
    return !!this.map;
  }

  setMat( map: Map ){
    this.map = map;
  }

  flyTo( coords: LngLatLike ){
    if (!this.isMapReady) throw Error('El mapa no esta inicializado')

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })

  }

  createMarkersFromPlaces( places: Feature[] ){
    if( !this.map ) throw Error('Mapa no inicializado')

    this.markers.forEach( marker => marker.remove() )

    const newMarkers = []
    for (const place of places) {
      const [ lng, lat ] = place.center;

      const popup = new Popup()
        .setHTML(`
        <h6><b>${ place.text}</b><h6>
        <span>${place.place_name_es}</span>
        `)
      
      const marker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map)

        newMarkers.push(marker);
    }   
    this.markers = newMarkers;
    
    if(places.length === 0) return;

    // Limite del mapa
    const bounds = new LngLatBounds();
    newMarkers.forEach( marker => {
      bounds.extend(marker.getLngLat())
    });

     
    this.map.fitBounds(bounds, { padding: 200 })
    
 
  }

  
}
