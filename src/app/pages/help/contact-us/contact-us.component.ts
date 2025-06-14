import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../shared/services/notification.service';
import { ContactOption } from '../../../shared/models/contact-option.model';
import { HelpContactService } from '../services/help-contact.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  selectedOption: string | null = null;

  contactOptions: ContactOption[] = [];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private contactService: HelpContactService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      trackingNumber: [''],
      attachments: [[]]
    });
  }

  ngOnInit(): void {
    this.contactService.getContactOptions().subscribe(options => (this.contactOptions = options));
  }

  selectOption(optionId: string) {
    this.selectedOption = optionId;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.notificationService.success('Message sent', "Your message has been sent. We'll get back to you soon!");
      this.contactForm.reset();
      this.selectedOption = null;
    } else {
      this.notificationService.error('Form invalid', 'Please fill in all required fields correctly.');
    }
  }

  getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);
    if (!control) return '';
    
    if (control.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${minLength} characters`;
    }
    return '';
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      const attachments = this.contactForm.get('attachments');
      if (attachments) {
        attachments.setValue(Array.from(files));
      }
    }
  }
} 