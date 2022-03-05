import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTestModalComponent } from './select-test-modal.component';

describe('SelectTestModalComponent', () => {
  let component: SelectTestModalComponent;
  let fixture: ComponentFixture<SelectTestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
