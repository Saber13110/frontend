import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-track-by-mail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './track-by-mail.component.html',
  styleUrls: ['./track-by-mail.component.scss']
})
export class TrackByMailComponent {
  trackForm: FormGroup;

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
    this.trackForm = this.fb.group({
      trackingNumber: ['', [Validators.required, Validators.pattern('^[A-Z0-9]{8,}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.trackForm.valid) {
      const { email } = this.trackForm.value;
      console.log('Track by mail request:', this.trackForm.value);
      this.notificationService.success('Subscription confirmed', `Updates will be sent to ${email}`);
      this.trackForm.reset();
    } else {
      this.trackForm.markAllAsTouched();
      this.notificationService.error('Invalid form', 'Please correct the errors and try again.');
    }
  }
}
