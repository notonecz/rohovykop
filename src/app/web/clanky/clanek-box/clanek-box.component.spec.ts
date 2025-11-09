import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanekBoxComponent } from './clanek-box.component';

describe('ClanekBoxComponent', () => {
  let component: ClanekBoxComponent;
  let fixture: ComponentFixture<ClanekBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClanekBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanekBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
