import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAppointsComponent } from './doc-appoints.component';

describe('DocAppointsComponent', () => {
  let component: DocAppointsComponent;
  let fixture: ComponentFixture<DocAppointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocAppointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocAppointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
