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
    this.notificationService.info('Bulk Tracking', 'Opening bulk tracking tool...');
  }

  openMobileApp() {
    this.notificationService.info('Mobile App', 'Opening mobile app download page...');
  }

  openAPI() {
    this.notificationService.info('API', 'Opening API documentation...');
  }

  openEmailTracking() {
    this.notificationService.info('Email Tracking', 'Opening email tracking setup...');
  }

  openReports() {
    this.notificationService.info('Reports', 'Opening tracking reports...');
  }

  openIntegrations() {
    this.notificationService.info('Integrations', 'Opening integration options...');
  }
}
