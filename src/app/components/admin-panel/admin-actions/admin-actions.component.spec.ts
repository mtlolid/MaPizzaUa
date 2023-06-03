import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActionsComponent } from './admin-actions.component';
import { Firestore } from '@angular/fire/firestore';

describe('AdminActionsComponent', () => {
  let component: AdminActionsComponent;
  let fixture: ComponentFixture<AdminActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminActionsComponent ],
      providers: [
        {provide: Storage, useValue: {}},
        {provide: Firestore, useValue: {}},         
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
