import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClenDialogComponent } from './edit-clen-dialog.component';

describe('EditClenDialogComponent', () => {
  let component: EditClenDialogComponent;
  let fixture: ComponentFixture<EditClenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClenDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
