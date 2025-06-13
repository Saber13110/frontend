import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { TrackingData } from '../models/tracking-data.model';
import { environment } from '../../../../environments/environment';

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
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTrackingData(trackingNumber: string): Observable<TrackingData> {
    if (!trackingNumber || !trackingNumber.trim()) {
      return throwError(() => new Error('Veuillez fournir un numéro de suivi valide'));
    }

    const url = `${this.apiUrl}/tracking/${trackingNumber}`;
    return this.http.get<TrackingData>(url).pipe(
      catchError(err => {
        console.error('Error fetching tracking data:', err);
        return throwError(() => new Error('Numéro de suivi invalide ou introuvable'));
      })
    );
  }

  downloadProofOfDelivery(trackingNumber: string): Observable<Blob> {
    const url = `${this.apiUrl}/tracking/proof/${trackingNumber}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      catchError(err => {
        console.error('Error fetching proof of delivery:', err);
        return throwError(() => new Error('Impossible de récupérer la preuve de livraison'));
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
} 