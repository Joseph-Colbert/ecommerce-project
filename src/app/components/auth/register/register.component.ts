import { NewUser } from './../../../common/new-user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';



@Component({
  selector: 'app-record',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isRegister = false;
  isRegisterFail = false;
  newUser!:NewUser;
  name!: string;
  userName!: string;
  email!: string;
  password!: string;
  //roles!: string;
  
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

  onRegister(): void {
    this.newUser = new NewUser(this.name, this.userName, this.email,this.password);
    this.authService.nuevo(this.newUser).subscribe({
      next: data => {
        this.isRegister = true;
        this.isRegisterFail = false;
        alert(`Cuenta Creada`)

        this.router.navigate(['/login']);
      },
      error: err => {
        this.isRegister = false;
        this.isRegisterFail = true;
        this.errMsj = err.error.messagedto; // messagedto no esta respondiendo 
        alert(`Asegurate de introducir los datos correctamente`);
        console.log(this.errMsj);
      }
  });
  }

}
