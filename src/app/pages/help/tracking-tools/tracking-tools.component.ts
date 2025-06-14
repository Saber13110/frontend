import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tracking-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracking-tools.component.html',
  styleUrls: ['./tracking-tools.component.scss']
})
export class TrackingToolsComponent {
  constructor(private router: Router) {}

  openBulkTracking() {
    this.router.navigate(['/help/bulk-tracking']);
  }

  openMobileApp() {
    this.router.navigate(['/help/mobile-app']);
  }

  openAPI() {
    this.router.navigate(['/help/api-access']);
  }

  openEmailTracking() {
    this.router.navigate(['/help/email-tracking']);
  }

  openReports() {
    this.router.navigate(['/help/tracking-reports']);
  }

  openIntegrations() {
    this.router.navigate(['/help/integrations']);
  }
}
