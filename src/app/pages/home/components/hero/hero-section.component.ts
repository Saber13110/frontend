import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['../../home.component.scss']
})
export class HeroSectionComponent {
  @Input() selectedHeroFeature: 'barcode_scan' | 'obtain_proof' | null = null;
  @Input() trackingForm!: FormGroup;
  @Output() submit = new EventEmitter<void>();
  @Output() selectFeature = new EventEmitter<'barcode_scan' | 'obtain_proof' | null>();
  @Output() barcodeSelected = new EventEmitter<any>();

  onSubmit() {
    this.submit.emit();
  }

  onSelectFeature(feature: 'barcode_scan' | 'obtain_proof' | null) {
    this.selectFeature.emit(feature);
  }

  onBarcodeFileSelected(event: any) {
    this.barcodeSelected.emit(event);
  }
}
