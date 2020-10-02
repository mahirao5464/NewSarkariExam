import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitcardsComponent } from './admitcards.component';

describe('AdmitcardsComponent', () => {
  let component: AdmitcardsComponent;
  let fixture: ComponentFixture<AdmitcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmitcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
