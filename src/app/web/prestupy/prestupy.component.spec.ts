import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestupyComponent } from './prestupy.component';

describe('PrestupyComponent', () => {
  let component: PrestupyComponent;
  let fixture: ComponentFixture<PrestupyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestupyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestupyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
