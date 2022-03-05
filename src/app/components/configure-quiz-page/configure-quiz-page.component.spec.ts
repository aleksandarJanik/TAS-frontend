import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureQuizPageComponent } from './configure-quiz-page.component';

describe('ConfigureQuizPageComponent', () => {
  let component: ConfigureQuizPageComponent;
  let fixture: ComponentFixture<ConfigureQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureQuizPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
