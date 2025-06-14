import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AllTrackingComponent } from './all-tracking.component';

describe('AllTrackingComponent', () => {
  let component: AllTrackingComponent;
  let fixture: ComponentFixture<AllTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AllTrackingComponent]
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
