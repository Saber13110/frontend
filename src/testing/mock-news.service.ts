import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { News } from '../app/shared/models/news.model';

@Injectable()
export class MockNewsService {
  getNews(): Observable<News[]> {
    return of([
      {
        id: 1,
        title: 'Nouveau service de livraison express',
        content: 'Nous lançons notre nouveau service de livraison express en 24h sur tout le territoire marocain.',
        image: './assets/images/news/shipping-routes.jpg',
        imageUrl: './assets/images/news/shipping-routes.jpg',
        date: new Date('2024-03-15'),
        category: 'Services',
        summary: 'Un nouveau service de livraison express pour une livraison plus rapide...',
        slug: 'nouveau-service-express'
      },
      {
        id: 2,
        title: 'Expansion de notre réseau de distribution',
        content: 'Nous ouvrons 5 nouvelles agences dans les principales villes du Maroc pour mieux vous servir.',
        image: './assets/images/news/expansion.jpg',
        imageUrl: './assets/images/news/expansion.jpg',
        date: new Date('2024-03-10'),
        category: 'Développement',
        summary: 'Nous étendons notre réseau de distribution à de nouvelles villes...',
        slug: 'expansion-reseau'
      },
      {
        id: 3,
        title: 'Partenariat stratégique avec les leaders du e-commerce',
        content: 'Nous renforçons notre présence dans le e-commerce avec de nouveaux partenariats stratégiques.',
        image: './assets/images/news/partnership.jpg',
        imageUrl: './assets/images/news/partnership.jpg',
        date: new Date('2024-03-05'),
        category: 'Partenariats',
        summary: 'Nous annonçons un nouveau partenariat pour améliorer nos services...',
        slug: 'partenariat-ecommerce'
      }
    ]);
  }
}
