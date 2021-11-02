import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAuthorComponent } from './index-author.component';

describe('IndexAuthorComponent', () => {
  let component: IndexAuthorComponent;
  let fixture: ComponentFixture<IndexAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
