import { EmailValuesDto } from './../../../models/email-values-dto';
import { EmailPasswordService } from './../../../services/email-password.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  mailTo!: string;
  dto!: EmailValuesDto;

  constructor(private emailpasswordService: EmailPasswordService) { }

  ngOnInit(): void {
  }

  onSendEmail(): void {
    this.dto = new EmailValuesDto(this.mailTo);
    this.emailpasswordService.sendEmail(this.dto).subscribe(
      {
        next:  response => {
          alert(`Te hemos enviado un correo`);
        },
        error: err => {
          alert(`Hubo un error: ${err.message}`);
        }
      }
    )
  }
}
