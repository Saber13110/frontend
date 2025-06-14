import { Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail.component';

export const NEWS_ROUTES: Routes = [
  {
    path: '',
    component: NewsComponent
  },
  {
    path: ':slug',
    component: NewsDetailComponent
  }
];
