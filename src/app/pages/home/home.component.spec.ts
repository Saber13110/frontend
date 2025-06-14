import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';
import { BarcodeReaderService } from '../../shared/services/barcode-reader.service';
import { TrackingService } from '../../features/tracking/services/tracking.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let barcodeService: jasmine.SpyObj<BarcodeReaderService>;
  let trackingService: jasmine.SpyObj<TrackingService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    barcodeService = jasmine.createSpyObj('BarcodeReaderService', ['decodeBarcode']);
    trackingService = jasmine.createSpyObj('TrackingService', ['getProofOfDelivery']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: BarcodeReaderService, useValue: barcodeService },
        { provide: TrackingService, useValue: trackingService },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should decode barcode and navigate', async () => {
    const file = new File(['dummy'], 'code.png');
    barcodeService.decodeBarcode.and.returnValue(Promise.resolve('ZX123'));
    const event = { target: { files: [file] } } as any;
    component.onBarcodeFileSelected(event);
    await fixture.whenStable();
    expect(barcodeService.decodeBarcode).toHaveBeenCalledWith(file);
    expect(router.navigate).toHaveBeenCalledWith(['/tracking', 'ZX123']);
  });
});
