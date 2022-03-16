import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeQuizComponent } from './analyze-quiz.component';

describe('AnalyzeQuizComponent', () => {
  let component: AnalyzeQuizComponent;
  let fixture: ComponentFixture<AnalyzeQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyzeQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
