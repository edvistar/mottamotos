import { Component, OnInit } from '@angular/core';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Otros módulos
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { StorageService } from '../../../shared/services/storage.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from '../../interfaces/register-user';
import { ApiResponse } from '../../../interfaces/api-response';
import { Rol } from '../../interfaces/rol';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule,
    ReactiveFormsModule, NgFor,FormsModule,
    MatInputModule,MatDialogModule, MatInputModule,
MatIconModule,MatListModule, MatButtonModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{
  userId: number | null = null;
  formUser: FormGroup;
  listaRoles: Rol[] = [];
  username: string = '';
  rolUsuario: string = '';
    constructor(
      private fb: FormBuilder,
      private _storageService: StorageService,
      private _userService: UserService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.formUser = this.fb.group({
        userName: ['', Validators.required],
        apellidos: ['', Validators.required],
        nombres: ['', Validators.required],
        documento: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        rol: ['', Validators.required],
        password: [''] // Solo si es el formulario de registro
      });

      this._userService.listadoRoles().subscribe({
        next: (data) =>{
          if(data.isExitoso) this.listaRoles = data.resultado;
        },
        error: (e) =>{}
      });
    }
    CreateUser(){
      if(this.formUser.valid){
        const user: Register = {
          apellidos: this.formUser.value.apellidos,
          nombres: this.formUser.value.nombres,
          documento: this.formUser.value.documento,
          userName: this.formUser.value.userName,
          address: this.formUser.value.address,
          phoneNumber: this.formUser.value.phoneNumber,
          email: this.formUser.value.email,
          rol: String(this.formUser.value.rol),
          password: this.formUser.value.password
        };
        this._userService.crear(user).subscribe({
          next: () => {

          console.log("objetoUser",user);
            this._storageService.mostrarAlerta('El Usuario se Creo con éxito!', 'Completo');
            this.router.navigate(['/layout/user/list-user']);
          },
          error: (e) => {
            this._storageService.mostrarAlerta('No se creó el Usuario', 'Error!');
          }
        });
      }
    }
    ngOnInit(): void {
      const usuarioSesion = this._storageService.obtenerSesion();
      if (usuarioSesion && usuarioSesion.userName) {
        this.username = usuarioSesion.userName; // ✅ Ahora asigna solo el nombre de usuario
         this.rolUsuario = usuarioSesion.rol?.toLowerCase() || ''; 
      }

    }
}
