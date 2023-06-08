import { Injectable } from '@angular/core';
import { HttpClient }from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Enterprise } from "../common/enterprise";
import { EnterpriseCategory } from '../common/enterprise-category';


@Injectable({
    providedIn: 'root'
  })

export class EnterpriseService {

  private baseUrl = 'http://localhost:8080/api/enterprises';

  private categoryUrl = 'http://localhost:8080/api/enterprise-category';

  constructor(private httpClient: HttpClient) { }

  getEnterprise(theEnterpriseId: number): Observable<Enterprise>  {
    
    //construir la URL para el id del producto
    const enterpriseUrl = `${this.baseUrl}/${theEnterpriseId}`;

    return this.httpClient.get<Enterprise>(enterpriseUrl);
  }

getEnterpriseListPaginate(thePage: number,
                        thePageSize: number,
                        theCategoryId: number) {/*mapea el Json desde spring para el array de productos*/ 

//construccion de URL basada en el id de la categoria/ pagina y tamaño
    const searchUrl = `${this.baseUrl}/search/findByCategoryEId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseEnterprises >(searchUrl);
}

/*getEnterpriseList(theCategoryId: number): Observable<Enterprise[]> {/*mapea el Json desde spring para el array de productos*/ 

//construccion de URL basada en el id de la categoria
 /*   const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getEnterprise(searchUrl);
}*/
get
getEnterpriseJSON(): Observable<Enterprise[]> {
    return this.httpClient.get<GetResponseEnterprises>(this.baseUrl).pipe(
      map(response => response._embedded.enterprises)
      );
  }

  searchEnterprise(theKeyword: string): Observable<Enterprise[]> {
       //construccion de URL basada en el teclado
       const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

       return this.getEnterprises(searchUrl)
  }

  private getEnterprises(searchUrl: string): Observable<Enterprise[]> {
    return this.httpClient.get<GetResponseEnterprises>(searchUrl).pipe(
    map(response => response._embedded.enterprises)
    );
}


getEnterpriseCategories(): Observable<EnterpriseCategory[]> {
    return this.httpClient.get<GetResponseEnterpriseCategory>(this.categoryUrl).pipe(
    map(response => response._embedded.enterpriseCategory)
    );
}
}

    interface GetResponseEnterprises {
    _embedded: {
        enterprises: Enterprise[];
    },

    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    }
}

    interface GetResponseEnterpriseCategory {
    _embedded: {
        enterpriseCategory: EnterpriseCategory[];
    }
}

    // hace la peticion http para las empresas meterlas en un array
