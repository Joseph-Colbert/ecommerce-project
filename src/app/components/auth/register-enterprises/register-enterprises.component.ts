import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewEnterprise } from 'src/app/common/new-enterprise';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
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
    private router: Router
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

}
