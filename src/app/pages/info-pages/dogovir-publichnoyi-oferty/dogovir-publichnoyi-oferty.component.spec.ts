import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogovirPublichnoyiOfertyComponent } from './dogovir-publichnoyi-oferty.component';

describe('DogovirPublichnoyiOfertyComponent', () => {
  let component: DogovirPublichnoyiOfertyComponent;
  let fixture: ComponentFixture<DogovirPublichnoyiOfertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogovirPublichnoyiOfertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogovirPublichnoyiOfertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
