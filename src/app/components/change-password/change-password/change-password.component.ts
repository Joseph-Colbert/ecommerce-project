import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordDto } from 'src/app/models/change-password-dto';
import { EmailPasswordService } from 'src/app/services/email-password.service';

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
        alert(`Las contraseñas no coinciden`);
        return;
      }
    
    this.tokenPassword = this.activatedRoute.snapshot.params?.['tokenPassword'];
    this.dto = new ChangePasswordDto(this.password, this.confirmPassword, this.tokenPassword)
    this.emailPasswordService.changePassword(this.dto).subscribe({
        next:  response => {
          alert(`Cambio de contraseña exitosa`);
          this.router.navigate(['/login']);
        },
        error: err => {
          alert(`Hubo un error: ${err.message}`);
        }
      }
    );
  }
}
