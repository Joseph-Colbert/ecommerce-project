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
                         theCategoryId: number,
                         theEnterpriseId: number): Observable<GetResponseProducts> {/*mapea el Json desde spring para el array de productos*/ 

  //construccion de URL basada en el id de la categoria/ pagina y tamaño
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;

    let searchUrlEnterprise = "";

    theEnterpriseId !== 1?  searchUrlEnterprise = `${this.baseUrl}/search/findByEnterpriseId?enterpriseId=${theEnterpriseId}`
                                                      + `&page=${thePage}&size=${thePageSize}`: searchUrlEnterprise = searchUrl
 
    return this.httpClient.get<GetResponseProducts>(searchUrlEnterprise);
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

  searchProductsPaginate(thePage: number,
                         thePageSize: number,
                         theKeyword: string): Observable<GetResponseProducts> {/*mapea el Json desde spring para el array de productos*/ 

    //construccion de URL basada en teclado de la categoria/ pagina y tamaño
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
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

  // CRUD
  public list(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl);
  }

  public detail(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + `detail/${id}`);
  }

  // public detailName(nombre: string): Observable<Product> {
  //   return this.httpClient.get<Product>(this.baseUrl + `detailname/${nombre}`);
  // }

  public save(product: Product): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, product);
  }

  // public update(id: number, product: Product): Observable<any> {
  //   return this.httpClient.put<any>(this.baseUrl + `update/${id}`, product);
  // }

  // public delete(id: number): Observable<any> {
  //   return this.httpClient.delete<any>(this.baseUrl + `delete/${id}`);
  // }

  updateProduct(id: number, product: Product): Observable<any> {
    const url = `${this.baseUrl}/edit/${id}`;
    return this.httpClient.put(url, product);
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.httpClient.delete(url);
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