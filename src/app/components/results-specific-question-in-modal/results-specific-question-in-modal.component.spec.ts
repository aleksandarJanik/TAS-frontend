import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsSpecificQuestionInModalComponent } from './results-specific-question-in-modal.component';

describe('ResultsSpecificQuestionInModalComponent', () => {
  let component: ResultsSpecificQuestionInModalComponent;
  let fixture: ComponentFixture<ResultsSpecificQuestionInModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsSpecificQuestionInModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsSpecificQuestionInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
