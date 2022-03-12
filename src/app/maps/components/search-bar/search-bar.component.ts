import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { PlacesService } from '../../services/places.service';
import { PlacesResponse } from '../../interfaces/places';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  
  
  private debounceTimer?: NodeJS.Timeout

  constructor( private placesService: PlacesService ) { }

  onQueryChanged( query: string = ''){

    if(this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout( () => {
      this.placesService.getPlacesByQuery(query)
    }, 350)


  }

}
