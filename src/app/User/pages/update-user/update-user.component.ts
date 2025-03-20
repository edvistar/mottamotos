import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { StorageService } from '../../../shared/services/storage.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUser } from '../../interfaces/update-user';
import { ApiResponse } from '../../../interfaces/api-response';
import { User } from '../../interfaces/user';
import { Rol } from '../../interfaces/rol';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent implements OnInit {
  user: User = {
    id: '', // Inicializar con 0 o null
    userName: '',
    apellidos: '',
    nombres: '',
    documento: '',
    address: '',
    phoneNumber: '',
    rol: ''
  };
  formUser: FormGroup;
   listaRoles: Rol[] = [];
  constructor(
    private fb: FormBuilder,
    private _storageService: StorageService,
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formUser = this.fb.group({
      id: [''],
      userName: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      documento: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      rol: ['', Validators.required]
    });
    this._userService.listadoRoles().subscribe({
      next: (data) =>{
        if(data.isExitoso) this.listaRoles = data.resultado;
        console.log("roles",data.resultado);
      },
      error: (e) =>{}
    });
  }

  ngOnInit(): void {
    // Obtener el ID del usuario desde la ruta
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.user.id = userId; // Asignar el ID al objeto user
      this.obtenerUsuario(this.user);
    } else {
      console.error('El ID del usuario no está definido en la ruta.');
    }
  }

  obtenerUsuario(user: User): void {
    if (!user?.id) {
      console.error('El ID del usuario no es válido.');
      return;
    }

    console.log('Obteniendo usuario con ID:', user.id);

    this._userService.getUserById(user.id).subscribe({
      next: (response: ApiResponse) => {
        if (response.isExitoso) {
          // Extrae los datos del usuario desde response.resultado
          const usuario = response.resultado;
          // Rellena el formulario excluyendo el campo 'id'
          this.formUser.patchValue({
            id: usuario.id,
            userName: usuario.userName,
            apellidos: usuario.apellidos,
            nombres: usuario.nombres,
            documento: usuario.documento,
            address: usuario.address,
            phoneNumber: usuario.phoneNumber,
            rol: usuario.rol
          });
        } else {
          // Si isExitoso es false, muestra un mensaje de error en la consola
          console.error('Error en la respuesta del backend:', response.mensaje);
        }
      },
      error: (err) => {
        // Maneja errores de red o del servidor
        console.error('Error al obtener el usuario:', err);
      }
    });

  }
  // Nueva función para actualizar el usuario
  UpdateUser(): void {
  if (this.formUser.invalid) {
    console.error('El formulario no es válido.');
    return;
  }

  const usuarioActualizado: User = this.formUser.value;

  console.log('Enviando datos para actualizar usuario:', usuarioActualizado);

  this._userService.editar(usuarioActualizado).subscribe({
    next: () => {
      this._storageService.mostrarAlerta('El Usuario se actualizó con éxito!', 'Completo');
      this.router.navigate(['/layout/user/list-user']);
    },
    error: (e) => {
      console.error('Error al actualizar usuario:', e);
      this._storageService.mostrarAlerta('No se actualizó el Usuario', 'Error!');
    }
  });
}
}
