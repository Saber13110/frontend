import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  trackingNumber: string = '';

  constructor(
    private titleService: Title,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Tracking Help & Support - Globex Logistics');
    this.initializeAccessibility();
  }


  private initializeAccessibility() {
    // Add ARIA labels to interactive elements
    const interactiveElements = document.querySelectorAll('[onclick], [role="button"]');
    interactiveElements.forEach(element => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
    });

    this.announceToScreenReader('Tracking help center loaded');
  }

  quickTrack() {
    if (!this.trackingNumber) {
      this.notificationService.warning('Warning', 'Please enter a tracking number');
      return;
    }

    this.notificationService.info('Tracking', `Tracking package ${this.trackingNumber}...`);
    
    setTimeout(() => {
      this.router.navigate(['/tracking'], {
        queryParams: { 
          number: this.trackingNumber,
          type: 'quick'
        }
      });
    }, 1500);
  }

  private announceToScreenReader(message: string) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  onTrackingSubmit(): void {
    if (this.trackingNumber) {
      // Implement tracking logic
      console.log('Tracking number submitted:', this.trackingNumber);
    }
  }
} 