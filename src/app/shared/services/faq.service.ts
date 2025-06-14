import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FAQ } from '../models/faq.model';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private readonly apiUrl = `${environment.apiUrl}/faqs`;

  constructor(private http: HttpClient) { }

  getFaqs(): Observable<FAQ[]> {
    return this.http.get<FAQ[]>(this.apiUrl);
  }
}
