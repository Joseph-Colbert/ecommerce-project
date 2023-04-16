import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product>  {
    
    //construir la URL para el id del producto
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number): Observable<GetResponseProducts> {/*mapea el Json desde spring para el array de productos*/ 
  
  //construccion de URL basada en el id de la categoria/ pagina y tamaño
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;
 
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
 
  getProductList(theCategoryId: number): Observable<Product[]> {/*mapea el Json desde spring para el array de productos*/ 
  
  //construccion de URL basada en el id de la categoria
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    //construccion de URL basada en el teclado
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
    map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
      );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

// hace la peticion http para los productos meterlos en un array