import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Renderer2 } from '@angular/core';
import { HelpComponent } from './help.component';
import { NotificationService } from '../../shared/services/notification.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

class MockNotificationService {
  show = jasmine.createSpy('show');
}

class MockLiveAnnouncer {
  announce = jasmine.createSpy('announce');
}

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;
  let liveAnnouncer: MockLiveAnnouncer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HelpComponent],
      providers: [
        { provide: NotificationService, useClass: MockNotificationService },
        { provide: LiveAnnouncer, useClass: MockLiveAnnouncer }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    liveAnnouncer = TestBed.inject(LiveAnnouncer) as unknown as MockLiveAnnouncer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should announce messages via LiveAnnouncer', () => {
    (component as any).announceToScreenReader('test message');
    expect(liveAnnouncer.announce).toHaveBeenCalledWith('test message');
  });

  it('should add tabindex using Renderer2', () => {
    const button = document.createElement('div');
    button.setAttribute('role', 'button');
    document.body.appendChild(button);

    (component as any).initializeAccessibility();

    expect(button.getAttribute('tabindex')).toBe('0');
    button.remove();
  });
});
