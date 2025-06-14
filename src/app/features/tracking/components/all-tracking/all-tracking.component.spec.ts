import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AllTrackingComponent } from './all-tracking.component';
import { TrackingService } from '../../services/tracking.service';

describe('AllTrackingComponent', () => {
  let component: AllTrackingComponent;
  let fixture: ComponentFixture<AllTrackingComponent>;
  let trackingService: jasmine.SpyObj<TrackingService>;

  beforeEach(async () => {
    trackingService = jasmine.createSpyObj('TrackingService', ['getProofOfDelivery']);
    await TestBed.configureTestingModule({
      imports: [AllTrackingComponent],
      providers: [{ provide: TrackingService, useValue: trackingService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service on proof download', () => {
    component.proofNumber = 'ABC123';
    component.isProofValid = true;
    const blob = new Blob();
    trackingService.getProofOfDelivery.and.returnValue(of(blob));
    const event = new Event('submit');
    component.getProofOfDelivery(event);
    expect(trackingService.getProofOfDelivery).toHaveBeenCalledWith('ABC123');
  });
});
