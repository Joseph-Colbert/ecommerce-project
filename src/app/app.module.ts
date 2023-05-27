import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseListComponent } from './components/enterprise-list/enterprise-list.component';
import { EnterpriseCategoryMenuComponent } from './components/enterprise-category-menu/enterprise-category-menu.component';
import { EnterpriseService } from './services/enterprise.service';
import { EnterpriseDetailsComponent } from './components/enterprise-details/enterprise-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { interceptorProvider } from './components/interceptors/prod-interceptor.service';
import { NewProductComponent } from './product-admin/new-product/new-product.component';
import { EditProductComponent } from './product-admin/edit-product/edit-product.component';
import { ProductDetailComponent } from './product-admin/product-detail/product-detail.component';
import { ProdGuardService as guard} from './components/guards/prod-guard.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListAdminComponent } from './product-admin/product-list-admin/product-list-admin.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProductListEnterpriseComponent } from './components/product-list-enterprise/product-list-enterprise.component';
import { RegisterEnterprisesComponent } from './components/auth/register-enterprises/register-enterprises.component';
import { SendEmailComponent } from './components/change-password/send-email/send-email.component';
import { ChangePasswordComponent } from './components/change-password/change-password/change-password.component';
import { CheckoutOnCreditComponent } from './components/checkout-on-credit/checkout-on-credit.component';
import { InicioComponent } from './inicio/inicio.component';
import { DebtsComponent } from './components/debts/debts.component';


//Rutas
const routes: Routes = [
  {path: 'inicio', component: InicioComponent},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'registerEnterprise', component: RegisterEnterprisesComponent},
  {path: 'sendemail', component: SendEmailComponent},
  {path: 'change-password/:tokenPassword', component: ChangePasswordComponent},
  
  {path: 'category-enterprise/:id', component: EnterpriseListComponent},
//  {path: 'category-enterprise', component: EnterpriseListComponent},
  {path: 'enterprises', component: EnterpriseListComponent}, 
  {path: '', redirectTo: '/enterprises', pathMatch: 'full'},
  {path: 'enterprises/:idEnterprise/products', component: ProductListEnterpriseComponent},
  {path: 'checkout', component: CheckoutComponent}, 
  {path: 'checkoutOnCredit', component: CheckoutOnCreditComponent}, 
  {path: 'cart-details', component: CartDetailsComponent}, 
  {path: 'products/:id', component: ProductDetailsComponent}, 
  {path: 'search/:keyword', component: ProductListComponent}, 
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'debts', component: DebtsComponent},

  { path: 'order-history', component: OrderHistoryComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'list', component: ProductListAdminComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'detail/:id', component: ProductDetailComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } }, //corroborar el productdetailcomponent
  { path: 'nuevo', component: NewProductComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'edit/:id', component: EditProductComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
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
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    NewProductComponent,
    EditProductComponent,
    ProductDetailComponent,
    ProductListAdminComponent,
    OrderHistoryComponent,
    ProductListEnterpriseComponent,
    RegisterEnterprisesComponent,
    SendEmailComponent,
    ChangePasswordComponent,
    CheckoutOnCreditComponent,
    InicioComponent,
    DebtsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule, 
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [EnterpriseService,
              ProductService,
              interceptorProvider,
  ],

  bootstrap: [AppComponent, InicioComponent]
})
export class AppModule { }
