import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { SessionStorageService } from 'ngx-webstorage';
import {Config} from '../../../config';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  user = new User();
  url = Config.API_SERVER_SINGIN_CLIENT;
  constructor(public _authenticationService: AuthenticationService, 
    private _router : Router, public _locker  :SessionStorageService) { }

  ngOnInit() {
  }

  onSingIn(user: User) {
    user = this.user;
    this._authenticationService.SingIn(this.url, this.user.user, this.user.password).subscribe(
      (data) => {
        console.log(data)
          if(data.message === "Usuario o contraseña incorrecta"){
            this.user.user = "";
            this.user.password = "";
            this._router.navigate(['/loginClient']); 
          }else{
            this._authenticationService.user = data;
            this._authenticationService.hasSession = data.job;
            this._locker.store('user', data);
            this._router.navigate(['/homeClient']); 
        }
          
      },
      err => {
        console.error(err);
        this._authenticationService.hasSession = "";
      }
    );

  }
}
