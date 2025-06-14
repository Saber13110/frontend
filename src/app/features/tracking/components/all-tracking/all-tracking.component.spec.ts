import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AllTrackingComponent } from './all-tracking.component';

describe('AllTrackingComponent', () => {
  let component: AllTrackingComponent;
  let fixture: ComponentFixture<AllTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate tracking number', () => {
    component.validateInput('tracking', '123');
    expect(component.isTrackingValid).toBeFalse();
    component.validateInput('tracking', '12345678');
    expect(component.isTrackingValid).toBeTrue();
  });

  it('should validate reference with country', () => {
    component.selectedCountry = 'MA';
    component.validateInput('reference', 'ab');
    expect(component.isReferenceValid).toBeFalse();
    component.validateInput('reference', 'abc');
    expect(component.isReferenceValid).toBeTrue();
  });

  it('should alert when scanner used on desktop', () => {
    spyOn(window, 'alert');
    component.isMobile = false;
    component.startBarcodeScanner();
    expect(window.alert).toHaveBeenCalledWith('Le scanner de code-barres est disponible uniquement sur mobile.');
  });

  it('should scan barcode on mobile', fakeAsync(() => {
    spyOn(window, 'alert');
    component.isMobile = true;
    component.startBarcodeScanner();
    expect(window.alert).toHaveBeenCalledWith("Scanner de code-barres activé!\n\n(Fonctionnalité à intégrer avec l'API caméra)");
    tick(2000);
    expect(component.trackingNumber).toBe('GBX123456789');
    expect(component.isTrackingValid).toBeTrue();
  }));

  it('should handle scanner errors', () => {
    spyOn(window, 'alert');
    component.isMobile = true;
    const original = window.setTimeout;
    spyOn(window, 'setTimeout').and.callFake(() => { throw new Error('fail'); });
    component.startBarcodeScanner();
    expect(window.alert).toHaveBeenCalledWith('Erreur lors du scan du code-barres.');
    (window.setTimeout as any) = original;
  });
});
