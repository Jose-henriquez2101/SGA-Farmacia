import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../servicio/carrito-service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-carrito-listar',
  templateUrl: './carrito-listar.component.html',
})
export class CarritoListarComponent implements OnInit {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.carrito = this.carritoService.obtener();
    console.log('Carrito cargado:', this.carrito);
  }

  incrementar(item: any) {
    item.cantidad++;
    this.carritoService.actualizar(this.carrito);
  }

  decrementar(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.carritoService.actualizar(this.carrito);
    }
  }

  eliminar(item: any) {
    this.carrito = this.carrito.filter(i => i !== item);
    this.carritoService.actualizar(this.carrito);
  }

  vaciarCarrito() {
    this.carritoService.vaciar();
    this.carrito = [];
  }

  getTotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

generarPDF() {
  console.log('generarPDF() se ha llamado');

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Boleta de Compra', 14, 22);

  const headers = [['Producto', 'Descripción', 'Precio', 'Cantidad', 'Subtotal']];
  const data = this.carrito.map(item => [
    item.nombre,
    item.descripcion,
    `$${item.precio.toFixed(2)}`,
    item.cantidad,
    `$${(item.precio * item.cantidad).toFixed(2)}`
  ]);

  autoTable(doc, {
    head: headers,
    body: data,
    startY: 30,
  });

  const total = this.getTotal().toFixed(2);
  doc.text(`Total: $${total}`, 14, ((doc as any).lastAutoTable?.finalY || 40) + 10);

  doc.save('boleta.pdf');
}


}
