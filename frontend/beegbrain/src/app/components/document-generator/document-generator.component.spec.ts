import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentGeneratorComponent } from './document-generator.component';

describe('DocumentGeneratorComponent', () => {
  let component: DocumentGeneratorComponent;
  let fixture: ComponentFixture<DocumentGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
