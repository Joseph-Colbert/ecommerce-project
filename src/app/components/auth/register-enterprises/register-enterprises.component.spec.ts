import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEnterprisesComponent } from './register-enterprises.component';

describe('RegisterEnterprisesComponent', () => {
  let component: RegisterEnterprisesComponent;
  let fixture: ComponentFixture<RegisterEnterprisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterEnterprisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEnterprisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
