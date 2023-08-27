import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  id!: number;
  sku!: '';
  name!: '';
  description!: '';
  unitPrice!: number;
  imageUrl!: string;
  active!: boolean;
  unitsInStock!: number;
  dateCreated!: Date;
  lastUpdated!:  Date;
  enterprise: string = "Maquillaje123";
  category!: string;
  
  

  constructor(
    private productService: ProductService,
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit() {
  }

  onCreate(): void {
    const product = new Product(this.id,this.sku, this.name, this.description, this.unitPrice, this.imageUrl, this.active, 
                                this.unitsInStock, this.dateCreated, this.lastUpdated, "/enterprises/2", this.category);
      this.productService.save(product).subscribe({
        next: data => {
          Swal.fire('Felicidades!',
                    'Producto Creado',
                    'success'); 
          
          this.router.navigate(['/list']);
        },
        error: err => {
          Swal.fire('Error!',
                    'Hubo un Error',
                    'error'); 
        }
    });
  }

  onFileSelected(event:any){
    const selectedFile = event.target.files[0] as File;
    const url = "/upload";
    const apiKey = "8b712b425588677ba3ced303c23e416a";
    const formData = new FormData();
    formData.append('image', selectedFile);
    this.image(url, formData, apiKey)
      .subscribe(
        response => {
          this.imageUrl = response.data.url
        })
}

image(url: string, formData: FormData, apiKey: string): Observable<any>{
  return this.http.post(url, formData, {params: { key:apiKey}})
}

  volver(): void {
    this.router.navigate(['/list']);
  }

}
