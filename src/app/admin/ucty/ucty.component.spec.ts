import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UctyComponent } from './ucty.component';

describe('UctyComponent', () => {
  let component: UctyComponent;
  let fixture: ComponentFixture<UctyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UctyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UctyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
