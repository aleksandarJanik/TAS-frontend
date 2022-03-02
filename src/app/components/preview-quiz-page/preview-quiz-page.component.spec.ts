import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewQuizPageComponent } from './preview-quiz-page.component';

describe('PreviewQuizPageComponent', () => {
  let component: PreviewQuizPageComponent;
  let fixture: ComponentFixture<PreviewQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewQuizPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
