import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RozhovoryWebComponent } from './rozhovory-web.component';

describe('RozhovoryWebComponent', () => {
  let component: RozhovoryWebComponent;
  let fixture: ComponentFixture<RozhovoryWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RozhovoryWebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RozhovoryWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
