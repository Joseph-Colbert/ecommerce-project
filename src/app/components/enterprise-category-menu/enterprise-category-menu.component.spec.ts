import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseCategoryMenuComponent } from './enterprise-category-menu.component';

describe('EnterpriseCategoryMenuComponent', () => {
  let component: EnterpriseCategoryMenuComponent;
  let fixture: ComponentFixture<EnterpriseCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseCategoryMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpriseCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
