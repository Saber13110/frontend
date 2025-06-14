import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tracking-number-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './tracking-number-panel.component.html',
  styleUrls: ['./tracking-number-panel.component.scss']
})
export class TrackingNumberPanelComponent {
  @Output() submitTracking = new EventEmitter<string>();
  @Output() scanBarcode = new EventEmitter<void>();
  @Input() isLoading = false;

  trackingNumber = '';
  isValid = false;

  validate(value: string): void {
    this.isValid = value.length >= 8;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.isValid) {
      this.submitTracking.emit(this.trackingNumber);
    }
  }
}
