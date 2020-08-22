import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkmessagesTabComponent } from './workmessages-tab.component';

describe('WorkmessagesTabComponent', () => {
  let component: WorkmessagesTabComponent;
  let fixture: ComponentFixture<WorkmessagesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkmessagesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkmessagesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
