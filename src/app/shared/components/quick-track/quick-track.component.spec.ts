import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickTrackComponent } from './quick-track.component';

describe('QuickTrackComponent', () => {
  let component: QuickTrackComponent;
  let fixture: ComponentFixture<QuickTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickTrackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
