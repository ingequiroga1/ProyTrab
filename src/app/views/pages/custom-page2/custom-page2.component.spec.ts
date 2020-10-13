import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPage2Component } from './custom-page2.component';

describe('CustomPage2Component', () => {
  let component: CustomPage2Component;
  let fixture: ComponentFixture<CustomPage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
