import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from './../../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/common/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser!: LoginUser;
  userName!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;

  constructor( 
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if(this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.userName, this.password);
    this.authService.login(this.loginUser).subscribe({
      next: data => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/enterprises']);
      },
      error: err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsj = err.error.messagedto;
        console.log(this.errMsj);
      }
  });
  }

}
