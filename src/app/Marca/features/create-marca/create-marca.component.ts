import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../../shared/data-access/storage.service';
import { MarcaService } from '../../data-access/marca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from '../interfaces/marca';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-marca',
  standalone: true,
  imports: [MatCardModule, 
    MatFormFieldModule,
    MatSelectModule, 
    ReactiveFormsModule, 
    NgFor, 
    NgIf,
    MatInputModule,
    MatIconModule, 
    MatListModule, 
    MatButtonModule,

  ],
  templateUrl: './create-marca.component.html',
  styleUrl: './create-marca.component.scss'
})
export class CreateMarcaComponent {
  marcaId:number | null = null;
  selectedFiles: File[] = []; // Array para almacenar los archivos seleccionados
  images: string[] = []; // Lista de rutas de imágenes seleccionadas para previsualización
  @Input() datosMarca: Marca | null = null;
    formMarca: FormGroup;
    titulo: string = "Agregar";
    nombreBoton: string = "Guardar";
    errorMessage: string | undefined;
    previewUrls: any;
    previewImage: string | ArrayBuffer | null = null;

    constructor(private fb: FormBuilder,
      private _storageService: StorageService,
      private _marcaService: MarcaService,
      private route: ActivatedRoute,
      private router: Router
    ){
      this.formMarca = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        status: ['', Validators.required],
        imageUrl: ['']
    });

    }
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;

      if (input.files && input.files.length > 0) {
        // Solo tomamos el primer archivo seleccionado
        this.selectedFiles = [input.files[0]];

        // Generamos la miniatura para previsualización
        this.images = [URL.createObjectURL(this.selectedFiles[0])];

        console.log("Imagen seleccionada:", this.selectedFiles[0]);
      }
    }

    CrearModificarMarca() {
      if (this.formMarca.valid) {
        const formData = new FormData();

        // Agregar los campos del formulario
        formData.append("id", this.marcaId ? this.marcaId.toString() : "0");
        formData.append("name", this.formMarca.value.name);
        formData.append("description", this.formMarca.value.description);
        formData.append("status", this.formMarca.value.status);

        // Asegurar que se agrega la imagen correctamente
        if (this.selectedFiles && this.selectedFiles.length > 0) {
          const file = this.selectedFiles[0];

          if (!(file instanceof File)) {
            console.error("El archivo seleccionado no es válido.");
            return;
          }

          formData.append("imagen", file); // Se agrega al mismo FormData
          console.log("Enviando archivo:", file.name);
        }

        console.log("FormData enviado:", formData);

        // Enviar al backend
        if (this.marcaId) {
          // Editar producto
          this._marcaService.editar(formData).subscribe({
            next: () => {
              this._storageService.mostrarAlerta('Marca actualizada con éxito!', 'Completo');
              this.router.navigate(['/layout/marca/list-marca']);
            },
            error: (e) => {
              console.error("Error al actualizar:", e);
              this._storageService.mostrarAlerta('Error al actualizar Marca', 'Error!');
            }
          });
        } else {
          // Crear nuevo producto
          this._marcaService.crear(formData).subscribe({
            next: () => {
              this._storageService.mostrarAlerta('Marca creada con éxito!', 'Completo');
              this.router.navigate(['/layout/marca/list-marca']);
            },
            error: (e) => {
              console.error("Error al crear:", e);
              this._storageService.mostrarAlerta('Error al crear Marca', 'Error!');
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
          this.marcaId = Number(id);
          this.cargarMarca(this.marcaId);
          this.titulo = "Editar Marca";
          this.nombreBoton = "Actualizar";
        } else {
          this.titulo = "Crear Marca";
          this.nombreBoton = "Guardar";
        }
      });
}
cargarMarca(id: number) {
  this._marcaService.getMarcaById(id).subscribe({
    next: (response) => {
      console.log(response);
      if (response.isExitoso && response.resultado) {
        console.log("Producto obtenido:", response.resultado);
        console.log("URL de imagen:", response.resultado.imageUrl);
        this.formMarca.patchValue({
          name: response.resultado.name,
          description: response.resultado.description,
          status: response.resultado.status,
          imageUrl: response.resultado.imageUrl
        });
      } else {
        console.warn("No se encontraron datos de la marca.");
      }
    },
    error: (e) => {
      console.error("Error al obtener la marca:", e);
    }
  });
}
onImageSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
}
