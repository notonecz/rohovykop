import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnSuperadminComponent } from './warn-superadmin.component';

describe('WarnSuperadminComponent', () => {
  let component: WarnSuperadminComponent;
  let fixture: ComponentFixture<WarnSuperadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarnSuperadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarnSuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
