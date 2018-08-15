import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterNumberComponent } from './enter-number.component';

describe('EnterNumberComponent', () => {
  let component: EnterNumberComponent;
  let fixture: ComponentFixture<EnterNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
