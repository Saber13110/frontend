import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FAQ } from '../app/shared/models/faq.model';

@Injectable()
export class MockFaqService {
  getFaqs(): Observable<FAQ[]> {
    return of([
      {
        question: 'Comment suivre mon colis ?',
        answer: 'Entrez votre numéro de suivi dans la barre de recherche en haut de la page pour suivre votre colis en temps réel.',
        isOpen: false
      },
      {
        question: 'Quels sont les délais de livraison ?',
        answer: 'Les délais de livraison varient selon le service choisi : Express (24h), Standard (2-3 jours), Économique (3-5 jours).',
        isOpen: false
      },
      {
        question: 'Comment contacter le service client ?',
        answer: 'Notre service client est disponible 24/7 par téléphone au +212522-123456 ou par email à support@globex.ma.',
        isOpen: false
      }
    ]);
  }
}
