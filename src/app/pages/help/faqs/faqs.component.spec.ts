import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqsComponent } from './faqs.component';

describe('FaqsComponent', () => {
  let component: FaqsComponent;
  let fixture: ComponentFixture<FaqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle faq', () => {
    const faq = component.faqs[0];
    expect(faq.isOpen).toBeFalse();
    component.toggleFAQ(faq);
    expect(faq.isOpen).toBeTrue();
  });

  it('should filter by category and search', () => {
    component.selectedCategory = 'tracking';
    component.searchQuery = 'multiple';
    const filtered = component.filterFAQs();
    expect(filtered.length).toBe(1);
    expect(filtered[0].question).toContain('multiple');
  });
});
