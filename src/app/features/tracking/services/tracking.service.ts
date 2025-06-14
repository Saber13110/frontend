import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { TrackingData } from '../models/tracking-data.model';

export interface HistoryItem {
  status: string;
  location: string;
  date: string;
  time: string;
  icon: string;
  state: 'completed' | 'current' | 'pending';
}

export interface PackageInfo {
  weight: string;
  dimensions: string;
  pieces: string;
  insurance: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getTrackingData(trackingNumber: string): Observable<TrackingData> {
    // Validation du numéro de suivi
    if (!trackingNumber || !trackingNumber.trim()) {
      return throwError(() => new Error('Veuillez fournir un numéro de suivi valide'));
    }

    // Si le numéro de suivi est 'ERROR', on retourne une erreur
    if (trackingNumber.toUpperCase() === 'ERROR') {
      return throwError(() => new Error('Numéro de suivi invalide ou introuvable'));
    }

    // Données mockées pour démonstration
    const mockData: TrackingData = {
      id: '123456',
      trackingNumber: trackingNumber,
      status: 'IN-TRANSIT',
      statusDetails: 'Votre colis est en cours d\'acheminement vers Casablanca, Maroc',
      statusDetail: 'Votre colis est en cours d\'acheminement vers Casablanca, Maroc',
      estimatedDeliveryDate: '2023-06-15',
      estimatedDelivery: {
        date: 'Mercredi, 15 Juin 2023',
        timeframe: 'Avant la fin de la journée'
      },
      shipDate: '2023-06-12',
      shippingDate: '12 Juin 2023',
      service: 'Globex Express International',
      sender: {
        name: 'Globex Express',
        address: 'Paris, France',
        location: 'Paris, France'
      },
      recipient: {
        name: 'Mohammed Alami',
        address: 'Casablanca, Maroc',
        location: 'Casablanca, Maroc'
      },
      currentLocation: {
        address: 'Centre de tri Globex, Casablanca Hub, Maroc'
      },
      packageInfo: {
        weight: '2.5 kg',
        dimensions: '30 x 20 x 15 cm',
        pieces: '3',
        insurance: 'Oui',
        items: 3,
        reference: 'ORD-7890123'
      },
      history: [
        {
          status: 'Shipment Information Received',
          location: 'Casablanca, Maroc',
          date: '12 Juin 2023',
          time: '14:35',
          isCompleted: true
        },
        {
          status: 'Pris en charge par Globex',
          location: 'Paris, France',
          date: '12 Juin 2023',
          time: '16:42',
          isCompleted: true
        },
        {
          status: 'En cours de traitement',
          location: 'Centre de tri Paris, France',
          date: '12 Juin 2023',
          time: '18:23',
          isCompleted: true
        },
        {
          status: 'Départ du centre de tri',
          location: 'Paris, France',
          date: '12 Juin 2023',
          time: '20:15',
          isCompleted: true
        },
        {
          status: 'En transit vers la destination',
          location: 'En vol - Paris à Casablanca',
          date: '13 Juin 2023',
          time: '08:30',
          isCompleted: true
        },
        {
          status: 'Arrivé au centre de tri',
          location: 'Casablanca Hub, Maroc',
          date: '13 Juin 2023',
          time: '15:30',
          isCompleted: true,
          isCurrent: true
        }
      ]
    };

    // Simulation d'un délai d'API avec gestion d'erreur
    return of(mockData).pipe(
      delay(1500),
      catchError(error => {
        console.error('Error fetching tracking data:', error);
        return throwError(() => new Error('Une erreur est survenue lors de la récupération des données de suivi'));
      })
    );
  }

  // Other methods would be implemented here in a real application
  saveToFavorites(trackingNumber: string): Observable<any> {
    if (!trackingNumber || !trackingNumber.trim()) {
      return throwError(() => new Error('Numéro de suivi invalide'));
    }
    
    // For demo, just return success
    return of({ success: true }).pipe(
      delay(500),
      catchError(error => {
        console.error('Error saving to favorites:', error);
        return throwError(() => new Error('Une erreur est survenue lors de l\'enregistrement dans les favoris'));
      })
    );
  }
  
  updateDeliveryOptions(trackingNumber: string, options: any): Observable<any> {
    if (!trackingNumber || !trackingNumber.trim()) {
      return throwError(() => new Error('Numéro de suivi invalide'));
    }

    // For demo, just return success
    return of({ success: true }).pipe(
      delay(500),
      catchError(error => {
        console.error('Error updating delivery options:', error);
        return throwError(() => new Error('Une erreur est survenue lors de la mise à jour des options de livraison'));
      })
    );
  }

  /**
   * Track a package by its tracking number
   * @param trackingNumber Tracking number to search
   */
  trackPackage(trackingNumber: string): Observable<any> {
    if (!trackingNumber || !trackingNumber.trim()) {
      return throwError(() => new Error('Numéro de suivi invalide'));
    }

    // For demo purposes reuse getTrackingData
    return this.getTrackingData(trackingNumber).pipe(
      catchError(error => {
        console.error('Error tracking package:', error);
        return throwError(() => new Error('Une erreur est survenue lors du suivi du colis'));
      })
    );
  }

  /**
   * Track a shipment by reference number
   * @param reference Reference number
   * @param country Destination country
   */
  trackByReference(reference: string, country: string): Observable<any> {
    if (!reference || !reference.trim() || !country) {
      return throwError(() => new Error('Référence ou pays invalide'));
    }

    const mockResponse = {
      reference,
      country,
      status: 'IN-TRANSIT'
    };

    return of(mockResponse).pipe(
      delay(1000),
      catchError(error => {
        console.error('Error tracking by reference:', error);
        return throwError(() => new Error('Une erreur est survenue lors du suivi par référence'));
      })
    );
  }

  /**
   * Track a shipment using a TCN number
   * @param tcn Transportation Control Number
   * @param shipDate Ship date associated with the TCN
   */
  trackByTCN(tcn: string, shipDate: string): Observable<any> {
    if (!tcn || !tcn.trim() || !shipDate) {
      return throwError(() => new Error('TCN ou date d\'expédition invalide'));
    }

    const mockResponse = {
      tcn,
      shipDate,
      status: 'IN-TRANSIT'
    };

    return of(mockResponse).pipe(
      delay(1000),
      catchError(error => {
        console.error('Error tracking by TCN:', error);
        return throwError(() => new Error('Une erreur est survenue lors du suivi TCN'));
      })
    );
  }

  /**
   * Obtain proof of delivery for a tracking number
   * @param trackingNumber Tracking number
   */
  getProofOfDelivery(trackingNumber: string): Observable<any> {
    if (!trackingNumber || !trackingNumber.trim()) {
      return throwError(() => new Error('Numéro de suivi invalide'));
    }

    const mockUrl = 'https://example.com/proof/' + trackingNumber + '.pdf';

    return of({ url: mockUrl }).pipe(
      delay(1000),
      catchError(error => {
        console.error('Error getting proof of delivery:', error);
        return throwError(() => new Error('Une erreur est survenue lors de la récupération de la preuve de livraison'));
      })
    );
  }
}
