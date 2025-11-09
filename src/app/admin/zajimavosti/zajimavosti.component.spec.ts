import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZajimavostiComponent } from './zajimavosti.component';

describe('ZajimavostiComponent', () => {
  let component: ZajimavostiComponent;
  let fixture: ComponentFixture<ZajimavostiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZajimavostiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZajimavostiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
