import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FAQ } from '../models/faq.model';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  // Static list used as a fallback/demo data
  private faqs: FAQ[] = [
    {
      question: 'How do I track my package?',
      answer: 'Enter your tracking number in the search box on our homepage or in the quick track section. You can also track through our mobile app or by email notifications if you\'ve set those up.',
      isOpen: false,
      category: 'tracking'
    },
    {
      question: 'What do the different tracking statuses mean?',
      answer: 'Common statuses include: "In Transit" (package is moving), "Out for Delivery" (will be delivered today), "Delivered" (package has arrived), and "Exception" (delivery issue). Check our status guide for more details.',
      isOpen: false,
      category: 'status'
    },
    {
      question: 'My tracking number isn\'t working, what should I do?',
      answer: 'First, verify the number is correct. Wait 24-48 hours after shipping as it may take time to appear in our system. If still not working, contact our support team.',
      isOpen: false,
      category: 'tracking'
    },
    {
      question: 'How often is tracking information updated?',
      answer: 'Tracking information is typically updated every 2-4 hours, but may vary depending on the shipping carrier and location. Enable notifications to get real-time updates.',
      isOpen: false,
      category: 'status'
    },
    {
      question: 'Can I track multiple packages at once?',
      answer: 'Yes! Use our bulk tracking tool to track up to 25 packages simultaneously. You can also create an account to save and manage multiple tracking numbers.',
      isOpen: false,
      category: 'tracking'
    },
    {
      question: 'What should I do if my package is delayed?',
      answer: 'Check the tracking details for any exception notices. Weather, customs, or local events may cause delays. If delayed more than 48 hours, contact the carrier or our support.',
      isOpen: false,
      category: 'delivery'
    },
    {
      question: 'How do I set up email notifications?',
      answer: 'Go to your account settings, select "Notification Preferences," and choose your preferred notification types. You can get updates for status changes, delivery attempts, and more.',
      isOpen: false,
      category: 'account'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes! Our mobile app is available for both iOS and Android devices. Download from the App Store or Google Play Store for on-the-go tracking.',
      isOpen: false,
      category: 'technical'
    }
  ];

  constructor(private http: HttpClient) {}

  /**
   * Retrieve FAQs. Replace the returned value with the HTTP
   * request below when the backend endpoint is available.
   */
  getFaqs(): Observable<FAQ[]> {
    // return this.http.get<FAQ[]>(`${environment.apiUrl}/faqs`);
    return of(this.faqs);
  }
}

