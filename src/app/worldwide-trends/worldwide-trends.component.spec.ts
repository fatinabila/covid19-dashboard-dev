import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldwideTrendsComponent } from './worldwide-trends.component';

describe('WorldwideTrendsComponent', () => {
  let component: WorldwideTrendsComponent;
  let fixture: ComponentFixture<WorldwideTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldwideTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldwideTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
