import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPage3Component } from './custom-page3.component';

describe('CustomPage3Component', () => {
  let component: CustomPage3Component;
  let fixture: ComponentFixture<CustomPage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
