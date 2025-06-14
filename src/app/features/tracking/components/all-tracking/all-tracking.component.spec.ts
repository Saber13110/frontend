import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TrackingService } from '../../services/tracking.service';
import { NotificationService } from '../../../../shared/services/notification.service';

import { AllTrackingComponent } from './all-tracking.component';

describe('AllTrackingComponent', () => {
  let component: AllTrackingComponent;
  let fixture: ComponentFixture<AllTrackingComponent>;
  let trackingService: jasmine.SpyObj<TrackingService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const trackingSpy = jasmine.createSpyObj('TrackingService', ['getTrackingData']);
    const notifSpy = jasmine.createSpyObj('NotificationService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AllTrackingComponent],
      providers: [
        { provide: TrackingService, useValue: trackingSpy },
        { provide: NotificationService, useValue: notifSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AllTrackingComponent);
    component = fixture.componentInstance;
    trackingService = TestBed.inject(TrackingService) as jasmine.SpyObj<TrackingService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
