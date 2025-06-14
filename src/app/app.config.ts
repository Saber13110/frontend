import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { GoogleMapsLoaderService } from './shared/services/google-maps-loader.service';

export function initializeGoogleMaps(loader: GoogleMapsLoaderService) {
  return () => loader.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeGoogleMaps,
      deps: [GoogleMapsLoaderService],
      multi: true
    }
  ]
};
