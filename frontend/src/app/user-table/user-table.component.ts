// src/app/components/user-table/user-table.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Usuarios } from '../usuarios';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  usuarios: Usuarios[] = [];
  newUser: Omit<Usuarios, 'id'> = { name: '', email: '' };
  editingId: number | null = null;
  editingEmail: string | null = null;
  isEditing: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.userService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  createUsuario() {
    this.userService.createUsuario(this.newUser).subscribe(() => {
      this.loadUsuarios();
      this.newUser = { name: '', email: '' };
    });
  }

  startEdit(user: Usuarios) {
    this.newUser = { name: user.name, email: user.email };
    this.editingId = user.id;
    this.isEditing = true;
  }


  updateUsuario() {
    if (this.editingId !== null) {
      this.userService.updateUsuario(this.editingId, this.newUser).subscribe(() => {
        this.loadUsuarios();
        this.cancelEdit();
      });
    }
  }


  cancelEdit() {
    this.newUser = { name: '', email: '' };
    this.isEditing = false;
    this.editingId = null;
  }


  deleteUsuario(id: number) {
    this.userService.deleteUsuario(id).subscribe(() => {
      this.loadUsuarios();
    });
  }

}
