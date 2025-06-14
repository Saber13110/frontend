import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContactOption } from '../../../shared/models/contact-option.model';

@Injectable({
  providedIn: 'root'
})
export class HelpContactService {
  getContactOptions(): Observable<ContactOption[]> {
    const contactOptions: ContactOption[] = [
      {
        id: 'chat',
        icon: 'fa-comments',
        title: 'Live Chat',
        description: 'Chat with our support team in real-time',
        link: '#chat'
      },
      {
        id: 'email',
        icon: 'fa-envelope',
        title: 'Email Support',
        description: 'Send us a detailed message',
        isForm: true
      },
      {
        id: 'phone',
        icon: 'fa-phone-alt',
        title: 'Phone Support',
        description: 'Call us at +1 (800) 123-4567',
        link: 'tel:+18001234567'
      },
      {
        id: 'social',
        icon: 'fa-users',
        title: 'Social Media',
        description: 'Connect with us on social media',
        link: '#social'
      }
    ];

    return of(contactOptions);
  }
}
