import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracking-advice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracking-advice.component.html',
  styleUrls: ['./tracking-advice.component.scss']
})
export class TrackingAdviceComponent {
  constructor(private router: Router) {}

  openTrackingGuide() {
    this.router.navigate(['/help/tracking-guide']);
  }

  openStatusGuide() {
    this.router.navigate(['/help/status-guide']);
  }

  openTroubleshooting() {
    this.router.navigate(['/help/troubleshooting']);
  }

  setupNotifications() {
    this.router.navigate(['/help/notification-preferences']);
  }

  viewDeliveryTimes() {
    this.router.navigate(['/help/delivery-times']);
  }

  learnSecurity() {
    this.router.navigate(['/help/security-info']);
  }
}
