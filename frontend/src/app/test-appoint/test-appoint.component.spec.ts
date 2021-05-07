import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAppointComponent } from './test-appoint.component';

describe('TestAppointComponent', () => {
  let component: TestAppointComponent;
  let fixture: ComponentFixture<TestAppointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAppointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
