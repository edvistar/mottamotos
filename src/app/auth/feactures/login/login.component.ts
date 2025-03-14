import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../../interfaces/login';
import { StorageService } from '../../../shared/data-access/storage.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule, 
    MatInputModule,
    MatButtonModule, 
    MatIconModule


  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin: FormGroup;
  ocultarPassword=signal(true);
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
        this.router.navigateByUrl('layout');
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
  BackHome(): void {
    this.router.navigate(['/']);
  }

  clickEvent(event: MouseEvent) {
    this.ocultarPassword.set(!this.ocultarPassword());
    event.stopPropagation();
  }
}
