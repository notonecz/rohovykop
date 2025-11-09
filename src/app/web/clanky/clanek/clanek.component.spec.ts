import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanekComponent } from './clanek.component';

describe('ClanekComponent', () => {
  let component: ClanekComponent;
  let fixture: ComponentFixture<ClanekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClanekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
