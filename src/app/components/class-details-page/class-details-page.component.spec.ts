import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetailsPageComponent } from './class-details-page.component';

describe('ClassDetailsPageComponent', () => {
  let component: ClassDetailsPageComponent;
  let fixture: ComponentFixture<ClassDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
