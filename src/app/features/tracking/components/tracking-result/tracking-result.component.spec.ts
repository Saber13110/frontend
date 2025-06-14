import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TrackingResultComponent } from './tracking-result.component';
import { TrackingService } from '../../services/tracking.service';
import { NotificationService } from '../../../../shared/services/notification.service';

describe('TrackingResultComponent', () => {
  let component: TrackingResultComponent;
  let fixture: ComponentFixture<TrackingResultComponent>;
  let trackingService: jasmine.SpyObj<TrackingService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const trackingSpy = jasmine.createSpyObj('TrackingService', ['updateDeliveryOptions']);
    const notifSpy = jasmine.createSpyObj('NotificationService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [TrackingResultComponent],
      providers: [
        { provide: TrackingService, useValue: trackingSpy },
        { provide: NotificationService, useValue: notifSpy },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackingResultComponent);
    component = fixture.componentInstance;
    trackingService = TestBed.inject(TrackingService) as jasmine.SpyObj<TrackingService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    component.trackingNumber = 'GBX123456';
    fixture.detectChanges();
  });

  it('should submit schedule form', () => {
    trackingService.updateDeliveryOptions.and.returnValue(of({}));
    component.scheduleForm.date = '2025-06-20';
    component.scheduleForm.timeWindow = 'morning';

    component.saveScheduleDelivery();

    expect(trackingService.updateDeliveryOptions).toHaveBeenCalledWith('GBX123456', { schedule: component.scheduleForm });
    expect(notificationService.success).toHaveBeenCalled();
  });

  it('should submit address form', () => {
    trackingService.updateDeliveryOptions.and.returnValue(of({}));
    component.addressForm = {
      name: 'John',
      line1: '1 st',
      line2: '',
      city: 'NY',
      postalCode: '12345',
      country: 'MA',
      phone: ''
    };

    component.saveAddressChange();

    expect(trackingService.updateDeliveryOptions).toHaveBeenCalledWith('GBX123456', { address: component.addressForm });
    expect(notificationService.success).toHaveBeenCalled();
  });

  it('should submit location form', () => {
    trackingService.updateDeliveryOptions.and.returnValue(of({}));
    component.locationForm.selectedId = 'loc1';

    component.saveHoldLocation();

    expect(trackingService.updateDeliveryOptions).toHaveBeenCalledWith('GBX123456', { holdLocation: 'loc1' });
    expect(notificationService.success).toHaveBeenCalled();
  });

  it('should submit instructions form', () => {
    trackingService.updateDeliveryOptions.and.returnValue(of({}));
    component.instructionsForm = { type: 'leave-at-door', accessCode: '', details: '' };

    component.saveDeliveryInstructions();

    expect(trackingService.updateDeliveryOptions).toHaveBeenCalledWith('GBX123456', { instructions: component.instructionsForm });
    expect(notificationService.success).toHaveBeenCalled();
  });

  it('should disable schedule button when required fields missing', () => {
    component.showScheduleModal = true;
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.modal.show button.btn-primary');
    expect(button.disabled).toBeTrue();
  });

  it('should disable address button when required fields missing', () => {
    component.showAddressModal = true;
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('.modal.show button.btn-primary');
    const addressButton = buttons[buttons.length - 1] as HTMLButtonElement;
    expect(addressButton.disabled).toBeTrue();
  });

  it('should disable hold location button when none selected', () => {
    component.showLocationModal = true;
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.modal.show button.btn-primary');
    expect(button.disabled).toBeTrue();
  });
});
