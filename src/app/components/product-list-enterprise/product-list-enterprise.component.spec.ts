import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListEnterpriseComponent } from './product-list-enterprise.component';

describe('PoductListEnterpriseComponent', () => {
  let component: ProductListEnterpriseComponent;
  let fixture: ComponentFixture<ProductListEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListEnterpriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
