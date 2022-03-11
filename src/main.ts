import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

if (environment.production) {
  enableProdMode();
}
 
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FudHRpYWdvNDkiLCJhIjoiY2t6emU5cGs0MDlqdTNlbmZtN2Z1MjZqeCJ9.Ga07FlVlueStBmRzGgD5zw';

if( !navigator.geolocation ) {
  alert('El navegador no soporta la geolocalización');
  throw new Error('El navegador no soporta la geolocalización');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

