/*import { OktaAuth } from '@okta/okta-auth-js';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private OktaAuth: OktaAuth) { }

  ngOnInit(): void {

    // suscribe a los cambios de estado de autenticacion 
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    )
  }

  getUserDetails() {
    
    if (this.isAuthenticated) {

      // Fetch el logeo en user details (user's claims)
      // El nombre completo del usuario esta expuesto como nombre de propiedad
      this.OktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;
        }
      );
    }
  }

  logout() {
    // Termina la sesion con okta y tambien remueve los tokens asignados
    this.OktaAuth.signOut();
  }

}
*/