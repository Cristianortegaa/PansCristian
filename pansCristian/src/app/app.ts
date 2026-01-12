import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // 1. DATOS DE LA PANADERÍA
  infoPanaderia = {
    nombre: 'Panadería Pans Cristian',
    direccion: 'C/La de alado, 28902 Madrid',
    telefono: '91 694 55 66'
  };

  // 2. LISTA DE PRODUCTOS
  productos = [
    { nombre: 'Chapata', precio: 0.65 },
    { nombre: 'Baguette', precio: 0.55 },
    { nombre: 'Pistola', precio: 0.45 },
    { nombre: 'Magdalena', precio: 1.50 }
  ];

  // 3. VARIABLES DEL FORMULARIO
  productoSeleccionado = this.productos[0]; 
  cantidadInput = 1;

  // 4. EL CARRITO (Lista vacía al principio)
  carrito: any[] = []; 

  // --- FUNCIONES ---

  // Añadir al carrito
  agregarProducto() {
    if (this.cantidadInput <= 0) {
      alert("La cantidad debe ser mayor que 0");
      return;
    }

    // Buscamos si el producto ya existe en el carrito
    let itemEncontrado = this.carrito.find(item => item.producto.nombre === this.productoSeleccionado.nombre);

    if (itemEncontrado) {
      itemEncontrado.cantidad += this.cantidadInput;
    } else {
      // NO EXISTE: Añadimos uno nuevo
      this.carrito.push({
        producto: this.productoSeleccionado,
        cantidad: this.cantidadInput,
        seleccionado: false
      });
    }

    this.cantidadInput = 1; // Volver el contador a 1
  }

  // Borrar los marcados
  borrarSeleccionados() {
    // Nos quedamos solo con los que NO (false) están seleccionados
    this.carrito = this.carrito.filter(item => item.seleccionado === false);
  }

  // Calcular Total (Hecho con un bucle simple, más fácil de entender)
  get totalGeneral() {
    let total = 0;
    // Recorremos cada producto del carrito y sumamos
    for (let item of this.carrito) {
      total = total + (item.producto.precio * item.cantidad);
    }
    return total;
  }

  // Imprimir Ticket
  imprimirTicket() {
    if (this.carrito.length === 0) return alert("El carrito está vacío");

    let ticket = `🧾 TICKET: ${this.infoPanaderia.nombre}\n\n`;

    // Escribimos cada línea del ticket
    for (let item of this.carrito) {
      let subtotal = (item.producto.precio * item.cantidad).toFixed(2);
      ticket += `${item.producto.nombre}: ${item.cantidad} x ${item.producto.precio}€ = ${subtotal}€\n`;
    }

    ticket += `\nTOTAL: ${this.totalGeneral.toFixed(2)}€`;
    localStorage.setItem('ultimoTicket', ticket);
    alert(ticket);
  }

  verTicketAnterior() {
    let ticketGuardado = localStorage.getItem('ultimoTicket');

    if (ticketGuardado) {
      alert("ESTE ES TU ÚLTIMO TICKET GUARDADO:\n\n" + ticketGuardado);
    } else {
      alert("No hay ningún ticket guardado todavía.");
    }
  }
}