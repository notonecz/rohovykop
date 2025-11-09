import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZajimavostiWebComponent } from './zajimavosti-web.component';

describe('ZajimavostiWebComponent', () => {
  let component: ZajimavostiWebComponent;
  let fixture: ComponentFixture<ZajimavostiWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZajimavostiWebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZajimavostiWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
