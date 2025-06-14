import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AllTrackingComponent } from './all-tracking.component';

describe('AllTrackingComponent', () => {
  let component: AllTrackingComponent;
  let fixture: ComponentFixture<AllTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AllTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
