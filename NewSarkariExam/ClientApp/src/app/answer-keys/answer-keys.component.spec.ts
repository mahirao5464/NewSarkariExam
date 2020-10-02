import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerKeysComponent } from './answer-keys.component';

describe('AnswerKeysComponent', () => {
  let component: AnswerKeysComponent;
  let fixture: ComponentFixture<AnswerKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
