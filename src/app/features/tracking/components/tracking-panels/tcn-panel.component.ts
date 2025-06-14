import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tcn-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule],
  templateUrl: './tcn-panel.component.html',
  styleUrls: ['./tcn-panel.component.scss']
})
export class TcnPanelComponent {
  @Output() submitTCN = new EventEmitter<{tcn: string; shipDate: string}>();
  @Input() isLoading = false;

  tcnNumber = '';
  shipDate = '';
  isValid = false;

  validate(): void {
    this.isValid = this.tcnNumber.length >= 6 && this.shipDate !== '';
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.isValid) {
      this.submitTCN.emit({tcn: this.tcnNumber, shipDate: this.shipDate});
    }
  }
}
