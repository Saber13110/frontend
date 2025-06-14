import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactUsComponent } from './contact-us.component';
import { NotificationService } from '../../../shared/services/notification.service';

class MockNotificationService {
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
}

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;
  let notif: MockNotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUsComponent],
      providers: [{ provide: NotificationService, useClass: MockNotificationService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    notif = TestBed.inject(NotificationService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should error on invalid form submit', () => {
    component.onSubmit();
    expect(notif.error).toHaveBeenCalled();
  });

  it('should submit valid form', () => {
    component.contactForm.setValue({
      name: 'John',
      email: 'john@example.com',
      subject: 'Help',
      message: 'Hello world!',
      trackingNumber: '',
      attachments: []
    });
    component.onSubmit();
    expect(notif.success).toHaveBeenCalled();
    expect(component.selectedOption).toBeNull();
  });

  it('should return error message', () => {
    const control = component.contactForm.get('name');
    control?.setValue('');
    control?.markAsTouched();
    expect(component.getErrorMessage('name')).toBe('Name is required');
  });
});
