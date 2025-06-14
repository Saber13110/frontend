import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
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
    trackingService.getTrackingData.and.returnValue(of({}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable track button when tracking number is invalid', () => {
    component.trackingNumber = '123';
    component.validateInput('tracking', component.trackingNumber);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.tracking-panel.active button.track-btn');
    expect(component.isTrackingValid).toBeFalse();
    expect(button.disabled).toBeTrue();
  });

  it('should enable track button when tracking number is valid', () => {
    component.trackingNumber = 'GBX123456';
    component.validateInput('tracking', component.trackingNumber);
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.tracking-panel.active button.track-btn');
    expect(component.isTrackingValid).toBeTrue();
    expect(button.disabled).toBeFalse();
  });

  it('should call services on trackPackage', fakeAsync(() => {
    component.trackingNumber = 'GBX123456';
    component.validateInput('tracking', component.trackingNumber);
    fixture.detectChanges();

    component.trackPackage(new Event('submit'));
    tick();

    expect(trackingService.getTrackingData).toHaveBeenCalledWith('GBX123456');
    expect(notificationService.success).toHaveBeenCalled();
  }));
});
