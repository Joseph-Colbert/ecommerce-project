import { NewUser } from './../../../common/new-user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';



@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  newUser!: NewUser;
  name!: string;
  userName!: string;
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
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.newUser = new NewUser(/*this.name, this.userName, this.email, this.password*/);
    this.authService.nuevo(this.newUser).subscribe(
      data => {
   

        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;

      }
    );
  }

}
