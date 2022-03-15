import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  
  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];
  

  get isUserLocationReady(): boolean{
    return !!this.userLocation;
  }

  constructor(
    private http: HttpClient,
    private mapService: MapService
  ) { this.getUserLocation() } 

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject ) => {


      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude]
          resolve( this.userLocation );
        },
        (err) => {
          alert('No se pudo obtener la geolocalización')
          console.log(err);
          reject();
        }
      )
      
    })
      
  }

  getPlacesByQuery( query: string ){

    if(query.length === 0){
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ query }.json?country=ar&limit=5&proximity=-58.184036533984084,-26.158798019707206&language=es&access_token=pk.eyJ1Ijoic2FudHRpYWdvNDkiLCJhIjoiY2wwbWp0N2M5MTZ1eTNob3R4cng0bXlyOCJ9.NsrjdmOLmVtb5HzNZffqWQ`)
      .subscribe( resp => {
        console.log(resp.features);
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces(this.places, this.userLocation!)

        this.isLoadingPlaces = false;
      })


  }

}
