import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClanekDialogComponent } from './new-clanek-dialog.component';

describe('NewClanekDialogComponent', () => {
  let component: NewClanekDialogComponent;
  let fixture: ComponentFixture<NewClanekDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewClanekDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClanekDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
