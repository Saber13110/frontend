import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-proof-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './proof-panel.component.html',
  styleUrls: ['./proof-panel.component.scss']
})
export class ProofPanelComponent {
  @Output() downloadProof = new EventEmitter<string>();
  @Input() isLoading = false;

  proofNumber = '';
  isValid = false;

  validate(value: string): void {
    this.isValid = value.length >= 8;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.isValid) {
      this.downloadProof.emit(this.proofNumber);
    }
  }
}
