import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios
import { StorageService } from '../../../shared/data-access/storage.service';
import { ProductService } from '../../services/product.service';
import { MarcaService } from '../../../Marca/services/marca.service';
import { CategoryService } from '../../../Category/services/category.service';

// Interfaces
import { Marca } from '../../../Marca/interfaces/marca';
import { Category } from '../../../Category/interfaces/category';
import { Imagen } from '../../interfaces/imagen';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// Otros módulos
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-product',
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
    MatDialogModule,
    MatInputModule,
MatIconModule,
MatListModule,
MatButtonModule,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  marcas: Marca[] = [];
  category: Category[] = [];
  productId: number | null = null;
  selectedFiles: File[] = []; // Array para almacenar los archivos seleccionados
  existingImages: Imagen[] = []; // Imágenes desde el backend
  previewImages: string[] = [];
  imagenesAEliminar: number[] = []; // IDs de imágenes seleccionadas para eliminar
  imagenPrincipalId: number | null = null; // Variable de imagen principal

  @Input() datosProduct: Marca | null = null;
  formProduct: FormGroup;
  titulo: string = "Crear";
  nombreBoton: string = "Guardar";
  errorMessage: string | undefined;
  previewUrls: any;

  constructor(
    private fb: FormBuilder,
    private _storageService: StorageService,
    private _productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private _marcaService: MarcaService,
    private _categoryService: CategoryService,
    private dialog: MatDialog
  ) {
    this.formProduct = this.fb.group({
      name: ['', Validators.required],
      serialNumber: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      offer: ['', Validators.required],
      price: ['', Validators.required],
      cost: ['', Validators.required],
      categoriaId: ['', Validators.required],
      marcaId: ['', Validators.required],
      imagenPrincipalId: [null], // ✅ Se inicializa correctamente
      imagenes: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      this.previewImages = this.selectedFiles.map(file => URL.createObjectURL(file));
    }
  }

  seleccionarImagenPrincipal(imagenId: number) {
    this.imagenPrincipalId = imagenId; // Guardamos el ID de la imagen principal
    this.formProduct.patchValue({ imagenPrincipalId: imagenId }); // También actualizamos el formulario
  }


  CrearModificarProduct() {
    if (this.formProduct.valid) {
      const formData = new FormData();
      formData.append("id", this.productId ? this.productId.toString() : "0");
      formData.append("name", this.formProduct.value.name);
      formData.append("serialNumber", this.formProduct.value.serialNumber);
      formData.append("description", this.formProduct.value.description);
      formData.append("status", this.formProduct.value.status);
      formData.append("offer", this.formProduct.value.offer.toString());
      formData.append("price", this.formProduct.value.price.toString());
      formData.append("cost", this.formProduct.value.cost.toString());
      formData.append("categoriaId", this.formProduct.value.categoriaId.toString());
      formData.append("marcaId", this.formProduct.value.marcaId.toString());

      if (this.selectedFiles.length > 0) {
        this.selectedFiles.forEach(file => {
          formData.append("archivos", file);
          console.log("Enviando archivo:", file.name);
        });
      }

      if (this.imagenesAEliminar.length > 0) {
        this.imagenesAEliminar.forEach(id => {
          formData.append("imagenesAEliminar", id.toString());
        });
      }

      if (this.imagenPrincipalId) {
        formData.append("imagenPrincipalId", this.imagenPrincipalId.toString());
      } else {
        console.error("⚠️ imagenPrincipalId está vacío o indefinido.");
      }

      const request = this.productId
        ? this._productService.editar(formData)
        : this._productService.crear(formData);

      request.subscribe({
        next: () => {
          this._storageService.mostrarAlerta(
            `Producto ${this.productId ? 'actualizado' : 'creado'} con éxito!`,
            'Completo'
          );
          this.router.navigate(['/layout/product/list-product']);
        },
        error: (e) => {
          console.error("Error en la operación:", e);
          this._storageService.mostrarAlerta(
            `Error al ${this.productId ? 'actualizar' : 'crear'} producto`,
            'Error!'
          );
        }
      });
    } else {
      this.errorMessage = 'Formulario inválido. Corrige los errores e intenta nuevamente.';
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = Number(id);
        this.cargarProducto(this.productId);
        this.titulo = "Editar Producto";
        this.nombreBoton = "Actualizar";
      }
    });

    this.obtenerMarcas();
    this.obtenerCategorias();
  }

  cargarProducto(id: number) {
    this._productService.getProductById(id).subscribe({
      next: (response) => {
        if (response.isExitoso && response.resultado) {
          const imagenPrincipal = response.resultado.imagenes?.find((img: any) => img.esPrincipal);
          this.imagenPrincipalId = imagenPrincipal ? imagenPrincipal.id : null;

          this.formProduct.patchValue({
            name: response.resultado.name,
            serialNumber: response.resultado.serialNumber,
            description: response.resultado.description,
            status: response.resultado.status,
            offer: response.resultado.offer,
            price: response.resultado.price,
            cost: response.resultado.cost,
            categoriaId: response.resultado.categoriaId,
            marcaId: response.resultado.marcaId,
            imagenPrincipalId: this.imagenPrincipalId,
            imagenes: response.resultado.imagenes || []
          });
        }
      },
      error: (e) => console.error("Error al obtener el producto:", e)
    });
  }

  obtenerMarcas() {
    this._marcaService.lista().subscribe(data => {
      if (data.isExitoso) this.marcas = data.resultado;
    });
  }

  obtenerCategorias() {
    this._categoryService.lista().subscribe(data => {
      if (data.isExitoso) this.category = data.resultado;
    });
  }
  actualizarListaEliminar(event: Event, id: number) {
    if (!this.imagenesAEliminar) {
      this.imagenesAEliminar = []; // Asegura que siempre esté definido
    }

    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!this.imagenesAEliminar.includes(id)) {
        this.imagenesAEliminar.push(id);
      }
    } else {
      this.imagenesAEliminar = this.imagenesAEliminar.filter(imgId => imgId !== id);
    }
  }

}
