import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '../../../../shared/models/location.model';

@Component({
  selector: 'app-locations-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './locations-section.component.html',
  styleUrls: ['../../home.component.scss']
})
export class LocationsSectionComponent {
  @Input() locations: Location[] = [];
  @Input() selectedLocation: Location | null = null;
  @Output() selectLocation = new EventEmitter<Location>();
  @ViewChild('mapContainer') mapContainer!: ElementRef;
}
