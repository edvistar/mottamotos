import { Component, Input } from '@angular/core';
import { Marca } from '../../../Marca/features/interfaces/marca';
import { Category } from '../../../Category/interfaces/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../../shared/data-access/storage.service';
import { ProductService } from '../../data-access/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '../../../Marca/data-access/marca.service';
import { CategoryService } from '../../../Category/data-access/category.service';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Imagen } from '../interfaces/imagen';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,
    MatSelectModule, ReactiveFormsModule, NgFor,FormsModule,
    MatInputModule, MatDialogModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
marcas: Marca[] = [];
category: Category[] = [];
productId:number | null = null;
selectedFiles: File[] = []; // Array para almacenar los archivos seleccionados
existingImages: Imagen[] = []; // Imágenes desde el backend
previewImages: string[] = [];
imagenesAEliminar: number[] = []; // Almacena los IDs de imágenes seleccionadas para eliminar


@Input() datosProduct: Marca | null = null;
  formProduct: FormGroup;
  titulo: string = "Crear";
  nombreBoton: string = "Guardar";
  errorMessage: string | undefined;
  previewUrls: any;

  constructor(private fb: FormBuilder,
    private _storageService: StorageService,
    private _productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private _marcaService: MarcaService,
    private _categoryService: CategoryService,
    private dialog: MatDialog
  ){
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
      imagenes: ['']
  });

  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.selectedFiles = Array.from(input.files);

      // Generar URLs para previsualización
      this.previewImages = this.selectedFiles.map((file) => URL.createObjectURL(file));

      console.log("Imágenes nuevas seleccionadas:", this.previewImages);
    }
  }


  // CrearModificarProduct() {
  //   console.log("Imágenes seleccionadas dentro de crear modificar:", this.selectedFiles);

  //   if (this.formProduct.valid) {
  //     const formData = new FormData();

  //     // Agregar los campos del producto
  //     formData.append("id", this.productId ? this.productId.toString() : "0");
  //     formData.append("name", this.formProduct.value.name);
  //     formData.append("serialNumber", this.formProduct.value.serialNumber);
  //     formData.append("description", this.formProduct.value.description);
  //     formData.append("status", this.formProduct.value.status);
  //     formData.append("offer", this.formProduct.value.offer.toString());
  //     formData.append("price", this.formProduct.value.price.toString());
  //     formData.append("cost", this.formProduct.value.cost.toString());
  //     formData.append("categoriaId", this.formProduct.value.categoriaId.toString());
  //     formData.append("marcaId", this.formProduct.value.marcaId.toString());

  //     // Aseguramos que `selectedFiles` contiene archivos antes de agregarlos
  //     if (this.selectedFiles && this.selectedFiles.length > 0) {
  //       this.selectedFiles.forEach((file) => {
  //         formData.append("archivos", file); // "imagenes[]" debe coincidir con el nombre esperado en el backend
  //         console.log("Enviando archivo:", file.name);
  //       });
  //     } else {
  //       console.warn("No hay archivos seleccionados.");
  //     }
  //     // Enviar al backend
  //     if (this.productId) {
  //       // Editar producto
  //       this._productService.editar(formData).subscribe({
  //         next: () => {
  //           this._storageService.mostrarAlerta('Producto actualizado con éxito!', 'Completo');
  //           this.router.navigate(['/layout/product/list-product']);
  //         },
  //         error: (e) => {
  //           console.error("Error al actualizar:", e);
  //           this._storageService.mostrarAlerta('Error al actualizar producto', 'Error!');
  //         }
  //       });
  //     } else {
  //       // Crear nuevo producto
  //       this._productService.crear(formData).subscribe({
  //         next: () => {
  //         console.log("formData",formData)
  //           this._storageService.mostrarAlerta('Producto creado con éxito!', 'Completo');
  //           this.router.navigate(['/layout/product/list-product']);
  //         },
  //         error: (e) => {
  //           console.error("Error al crear:", e);
  //           this._storageService.mostrarAlerta('Error al crear producto', 'Error!');
  //         }
  //       });
  //     }
  //   } else {
  //     this.errorMessage = 'Formulario inválido. Corrige los errores e intenta nuevamente.';
  //   }
  // }
  CrearModificarProduct() {
    console.log("Imágenes seleccionadas dentro de crear modificar:", this.selectedFiles);
    console.log("Imágenes a eliminar:", this.imagenesAEliminar); // Para verificar

    if (this.formProduct.valid) {
        const formData = new FormData();

        // Agregar los campos del producto
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

        // Aseguramos que `selectedFiles` contiene archivos antes de agregarlos
        if (this.selectedFiles && this.selectedFiles.length > 0) {
            this.selectedFiles.forEach((file) => {
                formData.append("archivos", file);
                console.log("Enviando archivo:", file.name);
            });
        } else {
            console.warn("No hay archivos seleccionados.");
        }

        // ✅ Agregar imágenes a eliminar (convertidas en JSON)
        if (this.imagenesAEliminar && this.imagenesAEliminar.length > 0) {
          this.imagenesAEliminar.forEach(id => {
            formData.append("imagenesAEliminar", id.toString());
        });

        } else {
            formData.append("imagenesAEliminar", "[]"); // Enviar array vacío si no hay imágenes a eliminar
        }

        // Enviar al backend
        if (this.productId) {
            // Editar producto
            this._productService.editar(formData).subscribe({
                next: () => {
                    this._storageService.mostrarAlerta('Producto actualizado con éxito!', 'Completo');
                    this.router.navigate(['/layout/product/list-product']);
                },
                error: (e) => {
                    console.error("Error al actualizar:", e);
                    this._storageService.mostrarAlerta('Error al actualizar producto', 'Error!');
                }
            });
        } else {
            // Crear nuevo producto
            this._productService.crear(formData).subscribe({
                next: () => {
                    console.log("formData", formData);
                    this._storageService.mostrarAlerta('Producto creado con éxito!', 'Completo');
                    this.router.navigate(['/layout/product/list-product']);
                },
                error: (e) => {
                    console.error("Error al crear:", e);
                    this._storageService.mostrarAlerta('Error al crear producto', 'Error!');
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
        this.productId = Number(id);
        this.cargarProducto(this.productId);
        this.titulo = "Editar Producto";
        this.nombreBoton = "Actualizar";
      } else {
        this.titulo = "Crear Producto";
        this.nombreBoton = "Guardar";
      }
    });

    this.obtenerMarcas();
    this.obtenerCategorias();
  }
  cargarProducto(id: number) {
    this._productService.getProductById(id).subscribe({
      next: (response) => {
        if (response.isExitoso && response.resultado) {
          console.log("Producto obtenido:", response.resultado);

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
            imagenes: response.resultado.imagenes ? response.resultado.imagenes.map((img: any) => img.ImageUrl) : []
          });

          // Cargar imágenes del backend
          this.existingImages = response.resultado.imagenes.map((img: any) => ({
            ...img,
            seleccionado: false // Para checkboxes
          }));

          console.log("Primera imagen en existingImages:", this.existingImages[0]);

        } else {
          console.warn("No se encontraron datos del producto.");
        }
      },
      error: (e) => {
        console.error("Error al obtener el producto:", e);
      }
    });
  }

  actualizarListaEliminar(imagen: Imagen) {
    imagen.seleccionado = !imagen.seleccionado; // Cambiar el estado del checkbox

    if (imagen.seleccionado) {
      if (!this.imagenesAEliminar.includes(imagen.id)) {
        this.imagenesAEliminar.push(imagen.id);
      }
    } else {
      this.imagenesAEliminar = this.imagenesAEliminar.filter(id => id !== imagen.id);
    }

    console.log("Lista de imágenes a eliminar:", this.imagenesAEliminar);
  }



  obtenerMarcas(){
      this._marcaService.lista().subscribe({
        next: (data) => {
            if(data.isExitoso){
              this.marcas = data.resultado;
              console.log("Marcas: ", data.resultado);
            } else
              this._storageService.mostrarAlerta(
                'No se  encontraron datos',
                'Advertencia!'
              );
          },
          error: (e) => {
            this._storageService.mostrarAlerta(e.error.mensaje, 'Error!');
            console.error('Error al obtener las marcas', e);
          },
      });
    }
    obtenerCategorias(){
      this._categoryService.lista().subscribe({
        next: (data) => {
            if(data.isExitoso){
              this.category = data.resultado;
              console.log("Categoria: ", data.resultado);
            } else
              this._storageService.mostrarAlerta(
                'No se  encontraron datos',
                'Advertencia!'
              );
          },
          error: (e) => {
            this._storageService.mostrarAlerta(e.error.mensaje, 'Error!');
            console.error('Error al obtener las marcas', e);
          },
      });
    }
}
