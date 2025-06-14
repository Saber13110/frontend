import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { News } from '../../../../shared/models/news.model';

@Component({
  selector: 'app-news-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-section.component.html',
  styleUrls: ['../../home.component.scss', './news-section.component.scss']
})
export class NewsSectionComponent {
  @Input() news: News[] = [];
}
