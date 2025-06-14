import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Notification signup:', this.signupForm.value);
      this.notificationService.success('Subscribed', 'You will now receive notifications.');
      this.signupForm.reset();
    } else {
      this.signupForm.markAllAsTouched();
      this.notificationService.error('Invalid form', 'Please provide a valid email.');
    }
  }
}
