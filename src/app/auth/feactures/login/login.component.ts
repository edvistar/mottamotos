import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../../iterfaces/login';
import { StorageService } from '../../../shared/data-access/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin: FormGroup;
  ocultarPassword:boolean = true;
  mostrarLoading: boolean = false;

  constructor (private fb: FormBuilder,
                private router: Router,
                private loginService: LoginService,
                private _storageService: StorageService,
                private cookieService: CookieService){
    this.formLogin = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]

    });
  }
  iniciarSesion(){
    this.mostrarLoading = true;
    const request: Login = {
      userName: this.formLogin.value.username,
      password: this.formLogin.value.password
    };
    this.loginService.iniciarSesion(request).subscribe({
      next: (response) => {
        this._storageService.guardarSesion(response);
        this.cookieService.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );
        this.router.navigate(['layout']);

      },
      complete: ()=>{
        this.mostrarLoading = false;
      },
      error:(error) =>{
        this._storageService.mostrarAlerta(error.error, 'Error!');
        this.mostrarLoading = false;

      }
    });
  }
}
