import { Routes } from '@angular/router';
import { ADVANCED_SHIPMENT_TRACKING_ROUTES } from './pages/advanced-shipment-tracking/advanced-shipment-tracking.routes';
import { HISTORY_ROUTES } from './pages/history/history.routes';
import { HOME_ROUTES } from './pages/home/home.routes';
import { CONTACT_ROUTES } from './pages/contact/contact.routes';
import { SUPPORT_ROUTES } from './pages/support/support.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    children: HOME_ROUTES
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'tracking',
    loadChildren: () => import('./features/tracking/tracking.module').then(m => m.TrackingModule)
  },
  {
    path: 'advanced-tracking',
    children: ADVANCED_SHIPMENT_TRACKING_ROUTES
  },
  {
    path: 'history',
    children: HISTORY_ROUTES
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.routes').then(m => m.SERVICES_ROUTES)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.routes').then(m => m.HELP_ROUTES)
  },
  {
    path: 'contact',
    children: CONTACT_ROUTES
  },
  {
    path: 'support',
    children: SUPPORT_ROUTES
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.routes').then(m => m.PROFILE_ROUTES)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.routes').then(m => m.ABOUT_ROUTES)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'find-location',
    loadChildren: () => import('./pages/find-location/find-location.routes').then(m => m.FIND_LOCATION_ROUTES)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.routes').then(m => m.NOTIFICATIONS_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
