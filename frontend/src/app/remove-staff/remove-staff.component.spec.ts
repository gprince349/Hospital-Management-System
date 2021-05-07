import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveStaffComponent } from './remove-staff.component';

describe('RemoveStaffComponent', () => {
  let component: RemoveStaffComponent;
  let fixture: ComponentFixture<RemoveStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
