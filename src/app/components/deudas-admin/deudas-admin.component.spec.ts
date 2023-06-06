import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudasAdminComponent } from './deudas-admin.component';

describe('DeudasAdminComponent', () => {
  let component: DeudasAdminComponent;
  let fixture: ComponentFixture<DeudasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeudasAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeudasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
