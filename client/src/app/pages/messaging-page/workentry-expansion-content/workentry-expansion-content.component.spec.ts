import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkentryExpansionContentComponent } from './workentry-expansion-content.component';

describe('WorkentryExpansionContentComponent', () => {
  let component: WorkentryExpansionContentComponent;
  let fixture: ComponentFixture<WorkentryExpansionContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkentryExpansionContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkentryExpansionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
