import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnasComponent } from './onas.component';

describe('OnasComponent', () => {
  let component: OnasComponent;
  let fixture: ComponentFixture<OnasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
