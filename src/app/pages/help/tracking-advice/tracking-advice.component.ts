import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-tracking-advice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracking-advice.component.html',
  styleUrls: ['./tracking-advice.component.scss']
})
export class TrackingAdviceComponent {
  constructor(private notificationService: NotificationService) {}

  openTrackingGuide() {
    this.notificationService.info('Tracking Guide', 'Opening comprehensive tracking guide...');
  }

  openStatusGuide() {
    this.notificationService.info('Status Guide', 'Opening status definitions guide...');
  }

  openTroubleshooting() {
    this.notificationService.info('Troubleshooting', 'Opening troubleshooting wizard...');
  }

  setupNotifications() {
    this.notificationService.info('Notifications', 'Opening notification preferences...');
  }

  viewDeliveryTimes() {
    this.notificationService.info('Delivery Times', 'Opening delivery time calculator...');
  }

  learnSecurity() {
    this.notificationService.info('Security', 'Opening security information...');
  }
}
