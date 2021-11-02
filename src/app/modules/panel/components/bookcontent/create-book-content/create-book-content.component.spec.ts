import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookContentComponent } from './create-book-content.component';

describe('CreateBookContentComponent', () => {
  let component: CreateBookContentComponent;
  let fixture: ComponentFixture<CreateBookContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBookContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
