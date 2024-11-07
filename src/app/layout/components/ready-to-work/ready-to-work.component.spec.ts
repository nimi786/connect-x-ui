import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToWorkComponent } from './ready-to-work.component';

describe('ReadyToWorkComponent', () => {
  let component: ReadyToWorkComponent;
  let fixture: ComponentFixture<ReadyToWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadyToWorkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadyToWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
