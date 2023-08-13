import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from '../common/new-user';
import { Observable } from 'rxjs';
import { LoginUser } from '../common/login-user';
import { JwtDTO } from '../common/jwt-dto';
import { NewEnterprise } from '../common/new-enterprise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  public nuevo(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', newUser);
  }

  public login(loginUser: LoginUser): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUser);
  }

  public nuevoE(newEnterprise: NewEnterprise): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevoE', newEnterprise);
  }
}
