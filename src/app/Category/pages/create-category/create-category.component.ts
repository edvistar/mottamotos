import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../shared/data-access/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,
    MatSelectModule, ReactiveFormsModule, NgFor, NgIf,
    MatInputModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {
   categoryId:number | null = null;
    selectedFiles: File[] = []; // Array para almacenar los archivos seleccionados
    images: string[] = []; // Lista de rutas de imágenes seleccionadas para previsualización
    @Input() datosCategory: Category | null = null;
      formCategory: FormGroup;
      titulo: string = "Agregar";
      nombreBoton: string = "Guardar";
      errorMessage: string | undefined;

        constructor(private fb: FormBuilder,
            private _storageService: StorageService,
            private _categotyService: CategoryService,
            private route: ActivatedRoute,
            private router: Router
          ){
            this.formCategory = this.fb.group({
              name: ['', Validators.required],
              description: ['', Validators.required],
              status: ['', Validators.required],
              imageUrl: ['']
          });

          }
          CrearModificarCategoria() {
            if (this.formCategory.valid) {
              const formData = new FormData();

              // Agregar los campos del formulario
              formData.append("id", this.categoryId ? this.categoryId.toString() : "0");
              formData.append("name", this.formCategory.value.name);
              formData.append("description", this.formCategory.value.description);
              formData.append("status", this.formCategory.value.status);

              // Enviar al backend
              if (this.categoryId) {
                // Editar producto
                this._categotyService.editar(formData).subscribe({
                  next: () => {
                    this._storageService.mostrarAlerta('Categoria actualizada con éxito!', 'Completo');
                    this.router.navigate(['/layout/category/list-category']);
                  },
                  error: (e) => {
                    console.error("Error al actualizar:", e);
                    this._storageService.mostrarAlerta('Error al actualizar Marca', 'Error!');
                  }
                });
              } else {
                // Crear nuevo producto
                this._categotyService.crear(formData).subscribe({
                  next: () => {
                    this._storageService.mostrarAlerta('Categoria creada con éxito!', 'Completo');
                    this.router.navigate(['/layout/category/list-category']);
                  },
                  error: (e) => {
                    console.error("Error al crear:", e);
                    this._storageService.mostrarAlerta('Error al crear Categoria', 'Error!');
                  }
                });
              }
            } else {
              this.errorMessage = 'Formulario inválido. Corrige los errores e intenta nuevamente.';
            }
          }
          ngOnInit(): void {
            this.route.paramMap.subscribe(params => {
              const id = params.get('id');
              if (id) {
                this.categoryId = Number(id);
                this.cargarCategoria(this.categoryId);
                this.titulo = "Editar Marca";
                this.nombreBoton = "Actualizar";
              } else {
                this.titulo = "Crear Marca";
                this.nombreBoton = "Guardar";
              }
            });
}

cargarCategoria(id: number) {
  this._categotyService.getMarcaById(id).subscribe({
    next: (response) => {
      console.log(response);
      if (response.isExitoso && response.resultado) {
        console.log("Categoria obtenido:", response.resultado);
        console.log("URL de imagen:", response.resultado.imageUrl);
        this.formCategory.patchValue({
          name: response.resultado.name,
          description: response.resultado.description,
          status: response.resultado.status
        });
      } else {
        console.warn("No se encontraron datos de la Categoria.");
      }
    },
    error: (e) => {
      console.error("Error al obtener la marca:", e);
    }
  });
}
}
