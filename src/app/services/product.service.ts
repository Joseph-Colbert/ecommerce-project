import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {/*mapea el Json desde spring para el array de productos*/ 
  
  //construccion de URL basada en el id de la categoria
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
    map(response => response._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];

  }
}

// hace la peticion http para los productos meterlos en un array