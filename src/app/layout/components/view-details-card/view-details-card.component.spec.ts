import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsCardComponent } from './view-details-card.component';

describe('ViewDetailsCardComponent', () => {
  let component: ViewDetailsCardComponent;
  let fixture: ComponentFixture<ViewDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDetailsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
