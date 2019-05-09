import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CrudService} from './../crud.service'

@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {

  prestamos: any;
  prestamoNombre: string;
  prestamoCantidad: number;
  prestamoTelefono: string;

  constructor(private menuCtrl: MenuController, private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.read_Prestamos().subscribe(data => {
 
      this.prestamos = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Nombre: e.payload.doc.data()['Nombre'],
          Cantidad: e.payload.doc.data()['Cantidad'],
          Telefono: e.payload.doc.data()['Telefono'],
        };
      })
      console.log(this.prestamos);
 
    });

  }


  CreatePrestamo() {
    let prestamo = {};
    prestamo['Nombre'] = this.prestamoNombre;
    prestamo['Cantidad'] = this.prestamoCantidad;
    prestamo['Telefono'] = this.prestamoTelefono;
    this.crudService.create_NuevoPrestamo(prestamo).then(resp => {
      this.prestamoNombre = "";
      this.prestamoCantidad = undefined;
      this.prestamoTelefono = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
  RemovePrestamo(rowID) {
    this.crudService.delete_Prestamo(rowID);
  }
 
  EditPrestamo(prestamo) {
    prestamo.isEdit = true;
    prestamo.EditNombre = prestamo.Nombre;
    prestamo.EditCantidad = prestamo.Cantidad;
    prestamo.EditTelefono = prestamo.Telefono;
  }

  UpdatePrestamo(prestamoRow) {
    let prestamo = {};
    prestamo['Nombre'] = prestamoRow.EditNombre;
    prestamo['Cantidad'] = prestamoRow.EditCantidad;
    prestamo['Telefono'] = prestamoRow.EditTelefono;
    this.crudService.update_Prestamo(prestamoRow.id, prestamo);
    prestamoRow.isEdit = false;
  }

  openMenu(){
    this.menuCtrl.toggle()
  }

}
