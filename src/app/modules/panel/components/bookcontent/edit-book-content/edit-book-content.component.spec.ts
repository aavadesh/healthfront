import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookContentComponent } from './edit-book-content.component';

describe('EditBookContentComponent', () => {
  let component: EditBookContentComponent;
  let fixture: ComponentFixture<EditBookContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBookContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
