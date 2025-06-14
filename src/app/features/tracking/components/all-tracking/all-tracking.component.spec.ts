import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TrackingService } from '../../services/tracking.service';
import { NotificationService } from '../../../../shared/services/notification.service';

import { AllTrackingComponent } from './all-tracking.component';

describe('AllTrackingComponent', () => {
  let component: AllTrackingComponent;
  let fixture: ComponentFixture<AllTrackingComponent>;

  beforeEach(async () => {
    const trackingSpy = jasmine.createSpyObj('TrackingService', ['track']);
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
