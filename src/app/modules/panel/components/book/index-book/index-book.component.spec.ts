import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBookComponent } from './index-book.component';

describe('IndexBookComponent', () => {
  let component: IndexBookComponent;
  let fixture: ComponentFixture<IndexBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
