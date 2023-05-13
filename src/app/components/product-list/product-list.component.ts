import { CartService } from './../../services/cart.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  currentEnterpriseId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // nuevas propiedades para la paginacion
  thePageNumber : number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";


  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }  


  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } 
    else {
      this.handleListProducts();
    }
  }

  handleSearchProducts(){

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //si tenemos un diferente teclado que el anterior 
    //entonces set thePageNumber a 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumbert=${this.thePageNumber}`);

    //ahora buscaremos a los productos por teclado
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               theKeyword).subscribe(this.processResult());
  }

  handleListProducts() {

    //Verificar que el parametro "id" esa disponible
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId){
      // convertir string a number usando el simbolo "+"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      //Categoria no esta disponible, por defecto con el id 1
      this.currentCategoryId = 1;
    }




    
    const hasEnterpriseId: boolean = this.route.snapshot.paramMap.has('idEnterprise');

    if (hasEnterpriseId){
      
      this.currentEnterpriseId = +this.route.snapshot.paramMap.get('idEnterprise')!;
    }
    else {
      
      this.currentEnterpriseId = 1;
    }




      //
      // Verificar si tenemos una categoria diferente a la anterior
      // Si tenemos un id de categoria diferente
      if (this.previousCategoryId != this.currentCategoryId) {
        this.thePageNumber = 1;
      }

      this.previousCategoryId = this.currentCategoryId;

      console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


      // Obtener los productos de la categoria dada por id, entonces set thePageNumber de vuelta a 1
      this.productService.getProductListPaginate(this.thePageNumber -1,
                                                 this.thePageSize,
                                                 this.currentCategoryId, this.currentEnterpriseId)
                                                 .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();

  }

  processResult() {
    return (data:any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }

  volver(): void {
    this.router.navigate(['/enterprises']);
  }
}

