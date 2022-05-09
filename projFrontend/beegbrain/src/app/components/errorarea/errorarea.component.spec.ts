import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorareaComponent } from './errorarea.component';

describe('ErrorareaComponent', () => {
  let component: ErrorareaComponent;
  let fixture: ComponentFixture<ErrorareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
