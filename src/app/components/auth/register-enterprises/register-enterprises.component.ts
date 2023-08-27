import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewEnterprise } from 'src/app/common/new-enterprise';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-enterprises',
  templateUrl: './register-enterprises.component.html',
  styleUrls: ['./register-enterprises.component.css']
})
export class RegisterEnterprisesComponent implements OnInit {

  isRegister = false;
  isRegisterFail = false;
  newEnterprise!: NewEnterprise;
  name!: string;
  userName!: string;
  address!: string;
  phone!: string;
  image_url!: string;
  categoryE!: number;
  email!: string;
  password!: string;
  mail!: string;
  nameE!: string;
  ci!: string;
  
  errMsj!: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    if(this.tokenService.getToken()) {
      this.isLogged = true;

    }
  }

  onRegisterEnterprise(): void {
    this.newEnterprise = new NewEnterprise(this.name, this.userName, this.address, this.phone, 
                                           this.image_url, this.email, this.password, this.ci, this.mail, this.nameE, this.categoryE);
    this.authService.nuevoE(this.newEnterprise).subscribe({
      next:  response => {
        this.isRegister = true;
        this.isRegisterFail = false;
        Swal.fire({
          title: 'Empresa Creada', 
          icon:'success'}); 
        //alert(`Cambio de contraseña exitosa`);
        this.router.navigate(['/login']);
      }, 
      error: err => {
        this.isRegister = false;
        this.isRegisterFail = true;
        this.errMsj = err.error.messagedto;
        console.log(this.errMsj);
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
          this.image_url = response.data.url
        })
}

image(url: string, formData: FormData, apiKey: string): Observable<any>{
  return this.http.post(url, formData, {params: { key:apiKey}})
}

}
