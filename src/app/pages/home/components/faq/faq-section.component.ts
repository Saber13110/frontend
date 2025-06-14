import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FAQ } from '../../../../shared/models/faq.model';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrls: ['../../home.component.scss', './faq-section.component.scss']
})
export class FaqSectionComponent {
  @Input() faqList: FAQ[] = [];
  @Output() toggle = new EventEmitter<FAQ>();
}
