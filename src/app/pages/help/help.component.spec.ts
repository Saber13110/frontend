import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { HelpComponent } from './help.component';
import { NotificationService } from '../../shared/services/notification.service';

class MockNotificationService {
  show = jasmine.createSpy('show');
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
  warning = jasmine.createSpy('warning');
  info = jasmine.createSpy('info');
}

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let router: Router;
  let notif: MockNotificationService;

  beforeEach(async () => {
    const events$ = new Subject();
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HelpComponent],
      providers: [
        { provide: NotificationService, useClass: MockNotificationService },
        { provide: ActivatedRoute, useValue: { snapshot: { fragment: null }, events: events$ } },
        { provide: Title, useValue: { setTitle: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    notif = TestBed.inject(NotificationService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch tab and update fragment', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.switchTab('faqs');

    expect(component.currentTab).toBe('faqs');
    expect(navigateSpy).toHaveBeenCalledWith([], {
      fragment: 'faq',
      relativeTo: TestBed.inject(ActivatedRoute),
      replaceUrl: true
    });
  });

  it('should warn when quick tracking without number', () => {
    component.trackingNumber = '';
    component.quickTrack();
    expect(notif.show).toHaveBeenCalledWith('Please enter a tracking number', 'warning');
  });

  it('should navigate on quick tracking', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    component.trackingNumber = 'GBX123';
    component.quickTrack();

    expect(notif.show).toHaveBeenCalledWith('Tracking package GBX123...', 'info');
    tick(1500);
    expect(navigateSpy).toHaveBeenCalledWith(['/tracking'], {
      queryParams: { number: 'GBX123', type: 'quick' }
    });
  }));
});
