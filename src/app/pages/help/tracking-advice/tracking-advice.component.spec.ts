import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingAdviceComponent } from './tracking-advice.component';
import { NotificationService } from '../../../shared/services/notification.service';

class MockNotificationService { show = jasmine.createSpy('show'); }

describe('TrackingAdviceComponent', () => {
  let component: TrackingAdviceComponent;
  let fixture: ComponentFixture<TrackingAdviceComponent>;
  let notif: MockNotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingAdviceComponent],
      providers: [{ provide: NotificationService, useClass: MockNotificationService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackingAdviceComponent);
    component = fixture.componentInstance;
    notif = TestBed.inject(NotificationService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should notify when opening guides', () => {
    component.openTrackingGuide();
    component.openStatusGuide();
    expect(notif.show).toHaveBeenCalledTimes(2);
  });
});
