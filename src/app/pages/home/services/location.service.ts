import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location } from '../../../shared/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  getLocations(): Observable<Location[]> {
    const locations: Location[] = [
      {
        id: 1,
        name: "Agence Centrale - Casablanca",
        address: "123 Boulevard Hassan II, Casablanca",
        phone: "+212 522-123456",
        email: "casablanca@globex.ma",
        hours: "Lun-Sam: 8h-20h",
        coordinates: { lat: 33.5731, lng: -7.5898 }
      },
      {
        id: 2,
        name: "Agence Rabat",
        address: "45 Avenue Mohammed V, Rabat",
        phone: "+212 537-123456",
        email: "rabat@globex.ma",
        hours: "Lun-Sam: 8h-20h",
        coordinates: { lat: 34.0209, lng: -6.8416 }
      },
      {
        id: 3,
        name: "Agence Marrakech",
        address: "78 Rue Ibn Sina, Marrakech",
        phone: "+212 524-123456",
        email: "marrakech@globex.ma",
        hours: "Lun-Sam: 8h-20h",
        coordinates: { lat: 31.6295, lng: -7.9811 }
      }
    ];
    return of(locations);
  }
}
