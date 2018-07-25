import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersForDriversComponent } from './orders-for-drivers.component';

describe('OrdersForDriversComponent', () => {
  let component: OrdersForDriversComponent;
  let fixture: ComponentFixture<OrdersForDriversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersForDriversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersForDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
