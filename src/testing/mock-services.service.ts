import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceItem } from '../app/shared/models/service-item.model';

@Injectable()
export class MockServicesService {
  getServices(): Observable<ServiceItem[]> {
    return of([
      {
        title: 'Suivi par courrier',
        description: 'Recevez les mises à jour de vos colis directement par e-mail',
        image: 'assets/images/services/track-by-mail.jpg',
        icon: 'fas fa-envelope',
        link: '/services/track-by-mail'
      },
      {
        title: 'Générer un code-barres',
        description: 'Créez un code-barres pour identifier facilement vos colis',
        image: 'assets/images/services/generate-barcode.jpg',
        icon: 'fas fa-barcode',
        link: '/services/generate-barcode'
      },
      {
        title: 'Activer les notifications',
        description: 'Soyez alerté instantanément de chaque mise à jour',
        image: 'assets/images/services/activate-notifications.jpg',
        icon: 'fas fa-bell',
        link: '/services/notifications'
      }
    ]);
  }
}
