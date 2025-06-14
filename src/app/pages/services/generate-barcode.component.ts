import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-generate-barcode',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generate-barcode.component.html',
  styleUrls: ['./generate-barcode.component.scss']
})
export class GenerateBarcodeComponent {
  barcodeForm: FormGroup;
  generatedData: string | null = null;

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
    this.barcodeForm = this.fb.group({
      data: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.barcodeForm.valid) {
      this.generatedData = this.barcodeForm.value.data;
      console.log('Barcode data:', this.generatedData);
      this.notificationService.success('Barcode created', 'Use the generated barcode below.');
    } else {
      this.barcodeForm.markAllAsTouched();
      this.notificationService.error('Invalid data', 'Please provide text to encode.');
    }
  }
}
