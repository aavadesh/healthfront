import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyNavbarComponent } from './body-navbar.component';

describe('BodyNavbarComponent', () => {
  let component: BodyNavbarComponent;
  let fixture: ComponentFixture<BodyNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
