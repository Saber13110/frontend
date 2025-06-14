import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { NotificationService } from '../../shared/services/notification.service';

class MockNotificationService {
  success = jasmine.createSpy('success');
  warning = jasmine.createSpy('warning');
  error = jasmine.createSpy('error');
  info = jasmine.createSpy('info');
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HomeComponent],
      providers: [{ provide: NotificationService, useClass: MockNotificationService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should notify and navigate on tracking', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    const notifService = TestBed.inject(NotificationService);
    const successSpy = notifService.success as jasmine.Spy;

    component.trackingForm.get('trackingNumber')!.setValue('GBX1234567');
    component.trackPackage();

    expect(successSpy).toHaveBeenCalledWith(
      'Recherche en cours',
      'Recherche du colis #GBX1234567...'
    );

    tick(2000);

    expect(successSpy).toHaveBeenCalledWith(
      'Colis trouvé',
      'Colis #GBX1234567 en transit.'
    );
    expect(navigateSpy).toHaveBeenCalledWith(['/tracking/result', 'GBX1234567']);
  }));


  it('should handle feature selection', () => {
    component.trackingForm.get('trackingNumber')!.setValue('GBX000');
    component.selectHeroFeature('barcode_scan');
    expect(component.selectedHeroFeature).toBe('barcode_scan');
    component.selectHeroFeature(null);
    expect(component.selectedHeroFeature).toBeNull();
    expect(component.trackingForm.get('trackingNumber')!.value).toBeNull();
  });

  it('should initialize map and select location', () => {
    const setCenterSpy = jasmine.createSpy('setCenter');
    const setZoomSpy = jasmine.createSpy('setZoom');
    class MockMap {
      constructor(public el: any, public opts: any) {}
      setCenter = setCenterSpy;
      setZoom = setZoomSpy;
    }
    class MockMarker {
      addListener = jasmine.createSpy('addListener');
      setAnimation = jasmine.createSpy('setAnimation');
      constructor(public options: any) {}
      getTitle() { return this.options.title; }
    }
    (window as any).google = {
      maps: {
        Map: MockMap,
        Marker: MockMarker,
        Animation: { DROP: 'DROP', BOUNCE: 'BOUNCE' }
      }
    };

    component.locations = [{
      id: 1,
      name: 'Loc1',
      address: '',
      phone: '',
      email: '',
      hours: '',
      coordinates: { lat: 1, lng: 2 }
    }];

    (component as any).initializeMap();

    expect((component as any).map).toBeTruthy();
    expect((component as any).markers.length).toBe(1);

    const marker = (component as any).markers[0] as any;
    component.selectLocation(component.locations[0]);

    expect(component.selectedLocation).toEqual(component.locations[0]);
    expect(setCenterSpy).toHaveBeenCalledWith(component.locations[0].coordinates);
    expect(setZoomSpy).toHaveBeenCalledWith(15);
    expect(marker.setAnimation).toHaveBeenCalledWith('BOUNCE');
  });
});
