import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component } from '@angular/core';
import { ModalAddService } from '../modal-add.service';
import { Category } from '../../category';
import { ProductServiceService } from '../product-service.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-modal-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-add.component.html',
  styleUrl: './modal-add.component.css',
})
export class ModalAddComponent {
  productForm: FormGroup;
  categories: Category[] = [];
  isEditing: boolean = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductServiceService,
    private categoryService: CategoryService,
    public modalAddService: ModalAddService
  ) {
    this.productForm = this.fb.group({
      codigo: [null, [Validators.required, Validators.min(1)]],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0.01, [Validators.required, Validators.min(0.01)]],
      image: [''],
      stock: [1, [Validators.required, Validators.min(1)]],
      stockmin: [1, [Validators.required, Validators.min(0)]],
      categoriaId: ['', Validators.required],
    });

    this.loadCategories();

    if (this.modalAddService.isEditMode && this.modalAddService.productToEdit) {
      this.loadProductToEdit(this.modalAddService.productToEdit);
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        console.log('Categorías recibidas:', categories);
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      },
    });
  }

  loadProductToEdit(product: any): void {
    this.isEditing = true;
    this.productId = product.codigo;

    this.productForm.patchValue({
      codigo: product.codigo,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      image: product.image,
      stock: product.stock,
      stockmin: product.stockmin,
      categoriaId: product.categoriaId,
    });

    this.modalAddService.mostrarModalAdd();
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    const formValue = this.productForm.value;

    // Aseguramos que los campos que deben ser numéricos lo sean
    formValue.codigo = Number(formValue.codigo);
    formValue.precio = Number(formValue.precio);
    formValue.stock = Number(formValue.stock);
    formValue.stockmin = Number(formValue.stockmin);
    formValue.categoriaId = Number(formValue.categoriaId);

    if (this.isEditing && this.productId !== null) {
      this.productService.updateProduct(this.productId, formValue).subscribe(
        () => {
          this.modalAddService.ocultarModalAdd();
          window.location.reload();
        },
        (error) => console.error('Error actualizando producto', error)
      );
    } else {
      console.log('Producto enviado:', formValue); // asegúrate de ver el tipo de datos en consola
      this.productService.createProduct(formValue).subscribe(
        () => {
          this.modalAddService.ocultarModalAdd();
          window.location.reload();
        },
        (error) => console.error('Error creando producto', error)
      );
    }
  }

  resetModal() {
    this.productId = null;
    this.isEditing = false;
    this.productForm = this.fb.group({
      codigo: [null, [Validators.required, Validators.min(1)]],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0.01, [Validators.required, Validators.min(0.01)]],
      image: [''],
      stock: [1, [Validators.required, Validators.min(1)]],
      stockmin: [1, [Validators.required, Validators.min(0)]],
      categoriaId: ['', Validators.required],
    });
  }

  ocultarModalAdd(): void {
    this.modalAddService.ocultarModalAdd();
  }
}
