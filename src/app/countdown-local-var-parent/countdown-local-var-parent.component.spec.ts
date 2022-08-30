import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownLocalVarParentComponent } from './countdown-local-var-parent.component';

describe('CountdownLocalVarParentComponent', () => {
  let component: CountdownLocalVarParentComponent;
  let fixture: ComponentFixture<CountdownLocalVarParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountdownLocalVarParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownLocalVarParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
