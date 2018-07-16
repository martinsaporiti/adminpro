import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal : any

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})

export class HospitalesComponent implements OnInit {

  hospitales : Hospital[]
  desde : number = 0
  total : number = 0
  cargando : boolean = true

  constructor(public _hospitalService : HospitalService, 
              public _modalUploadService : ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales()
    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarHospitales()
    });
  }


  /**
   * 
   */
  cargarHospitales(){
    this.cargando = true
    this._hospitalService.cargarHospitales().subscribe( (resp:any) => {
      this.hospitales = resp.hospitales
      this.total = resp.total;
      this.cargando = false
    })
  }

  /**
   * 
   * @param termino 
   */
  buscarHospital(termino : string){

    if(termino.length <= 0){
      this.cargarHospitales()
      return
    }

    this.cargando = true
    this._hospitalService.buscarHospital(termino)
    .subscribe((usuarios : any) => {
      this.cargando = false
      this.hospitales = usuarios
    })
  }


  /**
   * 
   * @param hospital 
   */
  borrarHospital( hospital : Hospital ){
    swal({
      title: "Está seguro?",
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      console.log(borrar)
      if(borrar){
        this._hospitalService.borrarHospital(hospital._id).subscribe( (borrado) => {
          this.desde = 0
          this.cargarHospitales()
        })
      } 
    });
  }


  /**
   * 
   * @param hospital 
   */
  guardarHospital(hospital : Hospital){
      this._hospitalService.actualizarHospital(hospital).subscribe(); 
  }

  /**
   * 
   * @param id 
   */
  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('hospitales', id);
  }


  /**
   * 
   * @param valor 
   */
  cambiarDesde(valor : number){
    let desde = this.desde + valor

    if(desde >= this.total){
      this.desde = this.total
      return;
    }

    if(desde <0){
      this.desde = 0
      return
    }
    
    this.desde += valor 
    this.cargarHospitales()
  }

  agregarHospital(){
    console.log('agregar hospital')

    swal({
      text: 'Ingrese el nombre del hospital',
      content: "input",
      icon:'info',
      button: {
        text: "Agregar!",
        closeModal: false,
      },
    })
    .then(name => {
      if (!name) throw null;
      return this._hospitalService.crearHospital(name)
      .subscribe((hospitalCreado:any)=> {
        swal({
          title: "Hospital Guradado:",
          text: hospitalCreado.nombre,
          icon : 'success'
        });
        this.cargarHospitales()
      })
    })
    
  }
}
