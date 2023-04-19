import { Component, OnInit } from '@angular/core';
import { EnterpriseCategory } from 'src/app/common/enterprise-category';
import { EnterpriseService } from 'src/app/services/enterprise.service';

@Component({
  selector: 'app-enterprise-category-menu',
  templateUrl: './enterprise-category-menu.component.html',
  styleUrls: ['./enterprise-category-menu.component.css']
})
export class EnterpriseCategoryMenuComponent implements OnInit {

  enterpriseCategories: EnterpriseCategory[] = [];

  constructor(private enterpriseService: EnterpriseService) { }

  ngOnInit(): void {
    this.listEnterpriseCategories();
  }

  listEnterpriseCategories() {
    this.enterpriseService.getEnterpriseCategories().subscribe(
      ( data: EnterpriseCategory[]) => {
        console.log('Enterprise Categories=' + JSON.stringify(data));
        this.enterpriseCategories = data;
      }
    );
  }

}
