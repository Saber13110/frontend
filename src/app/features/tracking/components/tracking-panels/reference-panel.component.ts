import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reference-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './reference-panel.component.html',
  styleUrls: ['./reference-panel.component.scss']
})
export class ReferencePanelComponent {
  @Output() submitReference = new EventEmitter<{reference: string; country: string}>();
  @Input() isLoading = false;

  referenceNumber = '';
  selectedCountry = '';
  isValid = false;

  validate(): void {
    this.isValid = this.referenceNumber.length >= 3 && this.selectedCountry !== '';
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.isValid) {
      this.submitReference.emit({reference: this.referenceNumber, country: this.selectedCountry});
    }
  }
}
