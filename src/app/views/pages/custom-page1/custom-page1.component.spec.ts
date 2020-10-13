import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPage1Component } from './custom-page1.component';

describe('CustomPage1Component', () => {
  let component: CustomPage1Component;
  let fixture: ComponentFixture<CustomPage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
