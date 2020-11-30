import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices:AngularFirestore) { }

  create_Newemployee(Record)
  {
    return this.fireservices.collection('Cliente').add(Record);
  }

  get_Allemployee()
  {
    return this.fireservices.collection<Cliente>('Cliente').valueChanges().pipe(map(res=>{
      console.log("desde service",res);

      return res
    }));
  }

  update_employee(recordid, record)
  {
    this.fireservices.doc('Cliente/' + recordid).update(record);
  }

  delete_employee(record_id)
  {
    this.fireservices.doc('Cliente/' + record_id).delete();
  }



}
export interface Cliente {
  fechanac: string;
  nombre:   string;
  apellido: string;
  edad:     number;
}
