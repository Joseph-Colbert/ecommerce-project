import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';

import { Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseListComponent } from './components/enterprise-list/enterprise-list.component';
import { EnterpriseCategoryMenuComponent } from './components/enterprise-category-menu/enterprise-category-menu.component';
import { EnterpriseService } from './services/enterprise.service';
import { EnterpriseDetailsComponent } from './components/enterprise-details/enterprise-details.component';


//Rutas
const routes: Routes = [
  //{path: 'search/:keyword', component: EnterpriseListComponent}, 
  {path: 'category-enterprise/:id', component: EnterpriseListComponent},
  {path: 'category-enterprise', component: EnterpriseListComponent},
  {path: 'enterprises', component: EnterpriseListComponent}, 
  {path: '', redirectTo: '/enterprises', pathMatch: 'full'},
  {path: 'enterprises/:idEnterprise/products', component: ProductListComponent},
  {path: 'products/:id', component: ProductDetailsComponent}, 
  {path: 'search/:keyword', component: ProductListComponent}, 
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent}
];
//

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    EnterpriseListComponent,
    EnterpriseCategoryMenuComponent,
    EnterpriseDetailsComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [EnterpriseService,
             ProductService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
