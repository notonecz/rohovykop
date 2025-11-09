import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RozhovoryComponent } from './rozhovory.component';

describe('RozhovoryComponent', () => {
  let component: RozhovoryComponent;
  let fixture: ComponentFixture<RozhovoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RozhovoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RozhovoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
