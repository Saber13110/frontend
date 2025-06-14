import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NotificationService } from '../../shared/services/notification.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';
import { TrackingAdviceComponent } from './tracking-advice/tracking-advice.component';
import { TrackingToolsComponent } from './tracking-tools/tracking-tools.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    A11yModule,
    TrackingAdviceComponent,
    TrackingToolsComponent,
    FaqsComponent,
    ContactUsComponent
  ],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  currentTab: string = 'tracking-advice';
  trackingNumber: string = '';

  constructor(
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private renderer: Renderer2,
    private liveAnnouncer: LiveAnnouncer
  ) {
    // Subscribe to route changes to handle fragment navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        this.handleFragmentNavigation(fragment);
      }
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Tracking Help & Support - Globex Logistics');
    this.initializeAccessibility();
    
    // Handle initial fragment if present
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      this.handleFragmentNavigation(fragment);
    }
  }

  private handleFragmentNavigation(fragment: string) {
    switch (fragment) {
      case 'advice':
        this.currentTab = 'tracking-advice';
        break;
      case 'tools':
        this.currentTab = 'tracking-tools';
        break;
      case 'faq':
        this.currentTab = 'faqs';
        break;
      case 'contact':
        this.currentTab = 'contact-us';
        break;
    }
  }

  switchTab(tab: string) {
    this.currentTab = tab;
    // Update URL fragment without triggering a navigation
    const fragment = tab === 'tracking-advice' ? 'advice' :
                    tab === 'tracking-tools' ? 'tools' :
                    tab === 'faqs' ? 'faq' :
                    tab === 'contact-us' ? 'contact' : '';
    
    this.router.navigate([], {
      fragment,
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  private initializeAccessibility() {
    const interactiveElements = document.querySelectorAll('[onclick], [role="button"]');
    interactiveElements.forEach(element => {
      if (!element.hasAttribute('tabindex')) {
        this.renderer.setAttribute(element as HTMLElement, 'tabindex', '0');
      }
    });

    this.announceToScreenReader('Tracking help center loaded');
  }

  quickTrack() {
    if (!this.trackingNumber) {
      this.notificationService.warning('Validation', 'Please enter a tracking number');
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
    this.liveAnnouncer.announce(message);
  }

  onTrackingSubmit(): void {
    if (this.trackingNumber) {
      // Implement tracking logic
      console.log('Tracking number submitted:', this.trackingNumber);
    }
  }
} 