import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingToolsComponent } from './tracking-tools.component';
import { NotificationService } from '../../../shared/services/notification.service';

class MockNotificationService { show = jasmine.createSpy('show'); }

describe('TrackingToolsComponent', () => {
  let component: TrackingToolsComponent;
  let fixture: ComponentFixture<TrackingToolsComponent>;
  let notif: MockNotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingToolsComponent],
      providers: [{ provide: NotificationService, useClass: MockNotificationService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackingToolsComponent);
    component = fixture.componentInstance;
    notif = TestBed.inject(NotificationService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should notify when opening tools', () => {
    component.openBulkTracking();
    component.openAPI();
    expect(notif.show).toHaveBeenCalledTimes(2);
  });
});
