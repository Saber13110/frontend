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
    this.notificationService.info('Tracking', 'Opening comprehensive tracking guide...');
  }

  openStatusGuide() {
    this.notificationService.info('Tracking', 'Opening status definitions guide...');
  }

  openTroubleshooting() {
    this.notificationService.info('Tracking', 'Opening troubleshooting wizard...');
  }

  setupNotifications() {
    this.notificationService.info('Tracking', 'Opening notification preferences...');
  }

  viewDeliveryTimes() {
    this.notificationService.info('Tracking', 'Opening delivery time calculator...');
  }

  learnSecurity() {
    this.notificationService.info('Tracking', 'Opening security information...');
  }
} 