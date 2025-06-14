import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail.component';
import { NEWS_ROUTES } from './news.routes';

@NgModule({
  declarations: [NewsComponent, NewsDetailComponent],
  imports: [CommonModule, RouterModule.forChild(NEWS_ROUTES)]
})
export class NewsModule {}
