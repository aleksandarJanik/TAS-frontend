import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishQuizPageComponent } from './publish-quiz-page.component';

describe('PublishQuizPageComponent', () => {
  let component: PublishQuizPageComponent;
  let fixture: ComponentFixture<PublishQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishQuizPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
