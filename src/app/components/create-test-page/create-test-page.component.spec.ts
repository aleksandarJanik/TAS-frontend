import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestPageComponent } from './create-test-page.component';

describe('CreateTestPageComponent', () => {
  let component: CreateTestPageComponent;
  let fixture: ComponentFixture<CreateTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
