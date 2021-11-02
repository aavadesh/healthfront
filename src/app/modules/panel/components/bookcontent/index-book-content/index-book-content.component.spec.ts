import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBookContentComponent } from './index-book-content.component';

describe('IndexBookContentComponent', () => {
  let component: IndexBookContentComponent;
  let fixture: ComponentFixture<IndexBookContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBookContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBookContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
