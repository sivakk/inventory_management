import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCookComponent } from './admin-cook.component';

describe('AdminCookComponent', () => {
  let component: AdminCookComponent;
  let fixture: ComponentFixture<AdminCookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
