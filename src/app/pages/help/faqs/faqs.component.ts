import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FAQ } from '../../../shared/models/faq.model';
import { FaqService } from '../../../shared/services/faq.service';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  selectedCategory: string = 'all';
  searchQuery: string = '';

  categories = [
    { id: 'all', name: 'All FAQs' },
    { id: 'tracking', name: 'Tracking Basics' },
    { id: 'status', name: 'Status Updates' },
    { id: 'delivery', name: 'Delivery Issues' },
    { id: 'account', name: 'Account & Settings' },
    { id: 'technical', name: 'Technical Help' }
  ];

  faqs: FAQ[] = [];

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.faqService.getFaqs().subscribe(faqs => {
      this.faqs = faqs;
    });
  }

  toggleFAQ(faq: FAQ) {
    faq.isOpen = !faq.isOpen;
  }

  filterFAQs() {
    return this.faqs.filter(faq => {
      const matchesCategory = this.selectedCategory === 'all' || faq.category === this.selectedCategory;
      const matchesSearch = !this.searchQuery || 
        faq.question.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }
}
