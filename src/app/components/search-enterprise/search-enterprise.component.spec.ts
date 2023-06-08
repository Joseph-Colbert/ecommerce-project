import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEnterpriseComponent } from './search-enterprise.component';

describe('SearchEnterpriseComponent', () => {
  let component: SearchEnterpriseComponent;
  let fixture: ComponentFixture<SearchEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEnterpriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
