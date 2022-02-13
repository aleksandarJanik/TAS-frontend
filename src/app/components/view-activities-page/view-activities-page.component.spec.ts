import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivitiesPageComponent } from './view-activities-page.component';

describe('ViewActivitiesModalComponent', () => {
  let component: ViewActivitiesPageComponent;
  let fixture: ComponentFixture<ViewActivitiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewActivitiesPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActivitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
