import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cliente-list.component.html',
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  // Para crear o editar
  newCliente: Cliente = {
    nombre: '',
    rut: '',
    password: '',
    direccion: '',
    telefono: ''
  };
  editingId: number | null = null;
  isEditing: boolean = false;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  createCliente() {
    this.clienteService.createCliente(this.newCliente).subscribe(() => {
      this.loadClientes();
      this.resetForm();
    });
  }

  startEdit(cliente: Cliente) {
    this.newCliente = { ...cliente };
    this.editingId = cliente.id!;
    this.isEditing = true;
  }

  updateCliente() {
    if (this.editingId !== null) {
      this.clienteService.updateCliente(this.editingId, this.newCliente).subscribe(() => {
        this.loadClientes();
        this.resetForm();
      });
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteCliente(id: number) {
    if (confirm('¿Seguro que quieres eliminar este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe(() => {
        this.loadClientes();
      });
    }
  }

  private resetForm() {
    this.newCliente = {
      nombre: '',
      rut: '',
      password: '',
      direccion: '',
      telefono: ''
    };
    this.editingId = null;
    this.isEditing = false;
  }
}
