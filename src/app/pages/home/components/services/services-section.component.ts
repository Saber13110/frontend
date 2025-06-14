import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceItem } from '../../../../shared/models/service-item.model';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services-section.component.html',
  styleUrls: ['../../home.component.scss', './services-section.component.scss']
})
export class ServicesSectionComponent {
  @Input() servicesList: ServiceItem[] = [];
}
