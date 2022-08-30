import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteTakerComponent } from './vote-taker.component';

describe('VoteTakerComponent', () => {
  let component: VoteTakerComponent;
  let fixture: ComponentFixture<VoteTakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteTakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
