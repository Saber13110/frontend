import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceItem } from '../../../../shared/models/service-item.model';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-section.component.html',
  styleUrls: ['../../home.component.scss']
})
export class ServicesSectionComponent {
  @Input() servicesList: ServiceItem[] = [];
}
