import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {Cliente, CrudService} from './service/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular9-firebaseapp';

cliente: Cliente[];
sumaEdades: number;

nombre:string;
apellido:string;
edad:number;
fechanac:string;
message:string;







prueba : Observable<any>;

  constructor(public crudservice:CrudService){}

ngOnInit() {

this.prueba =  this.crudservice.get_Allemployee();

this.crudservice.get_Allemployee()

    .subscribe(data => {
      this.cliente = data;
      let sumaEdad =this.cliente.reduce((sumaEdad, clienteActual) => {

        return sumaEdad + Number(clienteActual.edad);
      }, this.promedio)
      console.log(sumaEdad);

      this.promedio = sumaEdad /this.cliente.length

    })






  // let sumaEdad =this.cliente.reduce((edadAcumular, edadActual) => {
  //   return edadAcumular + edadActual;
  // })

  // console.log(sumaEdad/ this.edad.);

  }
  promedio:number =0;

  CreateRecord()
  {
    let Record = {};
    Record['nombre'] = this.nombre;
    Record['apellido'] = this.apellido;
    Record['edad'] = this.edad;
    Record['fechanac'] = this.fechanac;

    this.crudservice.create_Newemployee(Record).then(res => {

        this.nombre = "";
        this.apellido = "";
        this.edad = undefined;
        this.fechanac ="";
        console.log(res);
        this.message = "Cliente creado";
    }).catch(error => {
      console.log(error);
    });

  }

  EditRecord(Record)
  {
    Record.isedit = true;

    Record.nombre = Record.nombre;
    Record.ediapellido = Record.apellido;
    Record.edad = Record.edad;
    Record.fechanac = Record.fechanac;


  }

  edadpromedio(record){
    record.edad = record.edad;
  }

  Updatarecord(recorddata)
  {
    let record = {};
    record['name'] = recorddata.editname;
    record['apellido'] = recorddata.edit
    record['age'] = recorddata.editage;
    record['address'] = recorddata.editaddress;

    this.crudservice.update_employee(recorddata.id, record);
    recorddata.isedit = false;
  }

  Deleteemployee(record_id)
  {
    this.crudservice.delete_employee(record_id);
  }




}
