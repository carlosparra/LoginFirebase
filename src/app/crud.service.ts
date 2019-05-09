import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) { }

  create_NuevoPrestamo(prestamo){

    return this.firestore.collection('Prestamos').add(prestamo);
  
  }

  read_Prestamos(){
    return this.firestore.collection('Prestamos').snapshotChanges();
  }

  update_Prestamo(prestamoID, prestamo){
    this.firestore.doc('Prestamos/'+prestamoID).update(prestamo);
  }

  delete_Prestamo(prestamoID){
    this.firestore.doc('Prestamos/'+prestamoID).delete();
  }


}
