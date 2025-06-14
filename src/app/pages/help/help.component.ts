import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuickTrackComponent } from '../../shared/components/quick-track/quick-track.component';
import { TrackingAdviceComponent } from './tracking-advice/tracking-advice.component';
import { TrackingToolsComponent } from './tracking-tools/tracking-tools.component';
import { FaqsComponent } from './faqs/faqs.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    QuickTrackComponent,
    TrackingAdviceComponent,
    TrackingToolsComponent,
    FaqsComponent,
    ContactUsComponent,
  ],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  currentTab: string = 'tracking-advice';

  constructor(
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // Subscribe to route changes to handle fragment navigation
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
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
    const fragment =
      tab === 'tracking-advice'
        ? 'advice'
        : tab === 'tracking-tools'
          ? 'tools'
          : tab === 'faqs'
            ? 'faq'
            : tab === 'contact-us'
              ? 'contact'
              : '';

    this.router.navigate([], {
      fragment,
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  private initializeAccessibility() {
    // Add ARIA labels to interactive elements
    const interactiveElements = document.querySelectorAll(
      '[onclick], [role="button"]',
    );
    interactiveElements.forEach((element) => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
    });

    this.announceToScreenReader('Tracking help center loaded');
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
}
