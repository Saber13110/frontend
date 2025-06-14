import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NewsService } from '../../shared/services/news.service';
import { LocationService } from '../../shared/services/location.service';
import { FaqService } from '../../shared/services/faq.service';
import { ServicesService } from '../../shared/services/services.service';
import { MockNewsService } from '../../../testing/mock-news.service';
import { MockLocationService } from '../../../testing/mock-location.service';
import { MockFaqService } from '../../../testing/mock-faq.service';
import { MockServicesService } from '../../../testing/mock-services.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: NewsService, useClass: MockNewsService },
        { provide: LocationService, useClass: MockLocationService },
        { provide: FaqService, useClass: MockFaqService },
        { provide: ServicesService, useClass: MockServicesService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
