import { Routes } from '@angular/router';
import { TrackByMailComponent } from './track-by-mail.component';
import { GenerateBarcodeComponent } from './generate-barcode.component';
import { NotificationsComponent } from './notifications.component';

export const SERVICES_ROUTES: Routes = [
  {
    path: 'track-by-mail',
    component: TrackByMailComponent
  },
  {
    path: 'generate-barcode',
    component: GenerateBarcodeComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  }
];
