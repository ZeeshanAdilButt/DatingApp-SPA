import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //input output values
  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    // console.log(this.model);

    this.authService.register(this.model).subscribe(
      () => {
        console.log('registration succesfull');
      },
      error => {
        console.log(error);

      }
    )
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
