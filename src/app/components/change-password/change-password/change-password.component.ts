import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordDto } from 'src/app/models/change-password-dto';
import { EmailPasswordService } from 'src/app/services/email-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {


  password!: string;
  confirmPassword!: string;
  tokenPassword!: string

  dto!: ChangePasswordDto;

  constructor(private emailPasswordService: EmailPasswordService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   
  }

  onChangePassword(): void{
    if(this.password !== this.confirmPassword) {
      Swal.fire({
        title:'Las contraseñas no coinciden',
        icon: 'error'});   
      //alert(`Las contraseñas no coinciden`);
        return;
      }
    
    this.tokenPassword = this.activatedRoute.snapshot.params?.['tokenPassword'];
    this.dto = new ChangePasswordDto(this.password, this.confirmPassword, this.tokenPassword)
    this.emailPasswordService.changePassword(this.dto).subscribe({
        next:  response => {
          Swal.fire({
            title: 'Cambio de contraseña exitosa', 
            icon:'success'}); 
          //alert(`Cambio de contraseña exitosa`);
          this.router.navigate(['/login']);
        },
        error: err => {
          Swal.fire({
            title:'Error!',
            text: err.message,
            icon: 'error'}); 
          //alert(`Hubo un error: ${err.message}`);
        }
      }
    );
  }
}
