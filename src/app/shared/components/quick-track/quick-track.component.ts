import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-quick-track',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './quick-track.component.html',
  styleUrls: ['./quick-track.component.scss'],
})
export class QuickTrackComponent {
  /** Placeholder for the input field */
  @Input() placeholder: string = 'Enter tracking number';
  /** Optional label displayed above the input */
  @Input() label?: string;
  /** Text displayed inside the submit button */
  @Input() buttonText: string = 'Track';

  trackingNumber = '';

  constructor(
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  track(): void {
    const number = this.trackingNumber.trim();
    if (!number) {
      this.notificationService.show(
        'Please enter a tracking number',
        'warning',
      );
      return;
    }

    this.router.navigate(['/tracking'], {
      queryParams: { number, type: 'quick' },
    });
    this.trackingNumber = '';
  }
}
