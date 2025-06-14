import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TrackingResultComponent } from './tracking-result.component';
import { TrackingService } from '../../services/tracking.service';
import { TrackingData } from '../../models/tracking-data.model';

describe('TrackingResultComponent', () => {
  let component: TrackingResultComponent;
  let fixture: ComponentFixture<TrackingResultComponent>;
  let trackingService: jasmine.SpyObj<TrackingService>;

  const mockData: TrackingData = {
    id: '1',
    trackingNumber: 'GBX123456789',
    status: 'IN-TRANSIT',
    statusDetails: '',
    statusDetail: '',
    estimatedDeliveryDate: '2025-01-01',
    estimatedDelivery: { date: '2025-01-01', timeframe: 'AM' },
    shipDate: '2024-12-31',
    shippingDate: '2024-12-31',
    service: 'Express',
    sender: { name: 'A', address: '', location: '' },
    recipient: { name: 'B', address: '', location: '' },
    currentLocation: { address: '' },
    packageInfo: { weight: '', dimensions: '', pieces: '', insurance: '', items: 1, reference: '' },
    history: []
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TrackingService', ['getTrackingData']);
    await TestBed.configureTestingModule({
      imports: [TrackingResultComponent],
      providers: [{ provide: TrackingService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackingResultComponent);
    component = fixture.componentInstance;
    trackingService = TestBed.inject(TrackingService) as jasmine.SpyObj<TrackingService>;
  });

  it('should load tracking data successfully', fakeAsync(() => {
    trackingService.getTrackingData.and.returnValue(of(mockData));
    component.trackingNumber = 'GBX123456789';
    component.loadTrackingData();
    tick();

    expect(trackingService.getTrackingData).toHaveBeenCalledWith('GBX123456789');
    expect(component.trackingData).toEqual(mockData);
    expect(component.error).toBeFalse();
    expect(component.isLoading).toBeFalse();
  }));

  it('should handle service error', fakeAsync(() => {
    trackingService.getTrackingData.and.returnValue(throwError(() => new Error('fail')));
    component.trackingNumber = 'BAD';
    component.loadTrackingData();
    tick();

    expect(component.error).toBeTrue();
    expect(component.trackingData).toBeNull();
    expect(component.errorMessage).toBe('Numéro de suivi invalide ou introuvable');
  }));
});
