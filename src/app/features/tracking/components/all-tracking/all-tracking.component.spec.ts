import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { TrackingService } from '../../services/tracking.service';
import { NotificationService } from '../../../../shared/services/notification.service';

import { AllTrackingComponent } from './all-tracking.component';

describe('AllTrackingComponent', () => {
  let component: AllTrackingComponent;
  let fixture: ComponentFixture<AllTrackingComponent>;

  beforeEach(async () => {
    const trackingSpy = jasmine.createSpyObj('TrackingService', ['getTrackingData']);
    const notifSpy = jasmine.createSpyObj('NotificationService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AllTrackingComponent],
      providers: [
        { provide: TrackingService, useValue: trackingSpy },
        { provide: NotificationService, useValue: notifSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTrackingComponent);
    component = fixture.componentInstance;
    TestBed.inject(TrackingService);
    TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate inputs correctly', () => {
    component.validateInput('tracking', '1234567');
    expect(component.isTrackingValid).toBeFalse();
    component.validateInput('tracking', '12345678');
    expect(component.isTrackingValid).toBeTrue();

    component.selectedCountry = '';
    component.validateInput('reference', 'abc');
    expect(component.isReferenceValid).toBeFalse();
    component.selectedCountry = 'FR';
    component.validateInput('reference', 'abc');
    expect(component.isReferenceValid).toBeTrue();

    component.shipDate = '';
    component.validateInput('tcn', '12345');
    expect(component.isTCNValid).toBeFalse();
    component.shipDate = '2023-01-01';
    component.validateInput('tcn', '123456');
    expect(component.isTCNValid).toBeTrue();

    component.validateInput('proof', '1234567');
    expect(component.isProofValid).toBeFalse();
    component.validateInput('proof', '12345678');
    expect(component.isProofValid).toBeTrue();
  });

  it('should call services and navigate on tracking number submit', async () => {
    const router = TestBed.inject(Router);
    const trackingService = TestBed.inject(TrackingService);
    const notifService = TestBed.inject(NotificationService);
    const navigateSpy = spyOn(router, 'navigate');
    (trackingService.getTrackingData as jasmine.Spy).and.returnValue(of({}));

    component.trackingNumber = 'GBX1234567';
    component.validateInput('tracking', component.trackingNumber);
    await component.trackPackage(new Event('submit'));

    expect(trackingService.getTrackingData).toHaveBeenCalledWith('GBX1234567');
    expect(notifService.success).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/tracking/result'], { queryParams: { number: 'GBX1234567', type: 'number' } });
  });

  it('should call services and navigate on reference submit', async () => {
    const router = TestBed.inject(Router);
    const trackingService = TestBed.inject(TrackingService);
    const notifService = TestBed.inject(NotificationService);
    const navigateSpy = spyOn(router, 'navigate');
    (trackingService.getTrackingData as jasmine.Spy).and.returnValue(of({}));

    component.referenceNumber = 'REF1';
    component.selectedCountry = 'FR';
    component.validateInput('reference', component.referenceNumber);
    await component.trackByReference(new Event('submit'));

    expect(trackingService.getTrackingData).toHaveBeenCalledWith('REF1');
    expect(notifService.success).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/tracking/result'], { queryParams: { number: 'REF1', type: 'reference' } });
  });
});
