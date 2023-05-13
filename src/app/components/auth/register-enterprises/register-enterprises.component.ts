import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewEnterprise } from 'src/app/common/new-enterprise';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


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
  enterpriseName!: string;
  address!: string;
  phone!: number;
  imageUrl!: string;
  category!: number;
  email!: string;
  password!: string;
  
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
    this.newEnterprise = new NewEnterprise(this.name, this.enterpriseName, this.address, this.phone, this.imageUrl, this.category, this.email, this.password);
    this.authService.nuevoE(this.newEnterprise).subscribe({
      next: data => {
        this.isRegister = true;
        this.isRegisterFail = false;


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
