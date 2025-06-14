import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-tracking-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracking-tools.component.html',
  styleUrls: ['./tracking-tools.component.scss']
})
export class TrackingToolsComponent {
  constructor(private notificationService: NotificationService) {}

  openBulkTracking() {
    this.notificationService.info('Opening bulk tracking tool...', '');
  }

  openMobileApp() {
    this.notificationService.info('Opening mobile app download page...', '');
  }

  openAPI() {
    this.notificationService.info('Opening API documentation...', '');
  }

  openEmailTracking() {
    this.notificationService.info('Opening email tracking setup...', '');
  }

  openReports() {
    this.notificationService.info('Opening tracking reports...', '');
  }

  openIntegrations() {
    this.notificationService.info('Opening integration options...', '');
  }
} 