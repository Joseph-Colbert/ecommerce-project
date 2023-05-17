import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValuesDto } from '../models/email-values-dto';
import { ChangePasswordDto } from '../models/change-password-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  private changePasswordURL = 'http://localhost:8080/email-password/';
  
  constructor(private httpClient:HttpClient) { }

  public sendEmail(dto: EmailValuesDto): Observable<any> {
    return this.httpClient.post<any>(this.changePasswordURL + 'send-email',dto);
  }

  public changePassword(dto: ChangePasswordDto): Observable<any> {
    return this.httpClient.post<any>(this.changePasswordURL + 'change-password',dto);
  }
}
