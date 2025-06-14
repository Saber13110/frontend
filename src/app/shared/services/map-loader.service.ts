import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapLoaderService {
  private loadingPromise: Promise<void> | null = null;

  load(): Promise<void> {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    if (typeof window !== 'undefined' && (window as any).google && (window as any).google.maps) {
      return Promise.resolve();
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;

    this.loadingPromise = new Promise<void>((resolve, reject) => {
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
    });

    document.head.appendChild(script);
    return this.loadingPromise;
  }
}
