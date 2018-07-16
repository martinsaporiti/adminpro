import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales : Hospital[]
  medico : Medico = new Medico('','','','','')
  hospital : Hospital = new Hospital('','', '')

  constructor(public _medicoService : MedicoService, public _hospitalService : HospitalService,
              public router : Router, 
              public activatedRoute : ActivatedRoute, 
              public _modalUploadService : ModalUploadService) { 

    activatedRoute.params.subscribe( params => {
      let id = params['id']

      if(id !== 'nuevo'){
        this.cargarMedico(id)
      }
    })
  }
  

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe( (resp:any) => {
      this.hospitales = resp.hospitales
    })

    this._modalUploadService.notificacion.subscribe( resp => {
      this.medico.img = resp.medico.img
    })
  }


  cargarMedico(id : string){
    this._medicoService.cargarMedico(id).subscribe( (medico) => {
      this.medico = medico
      this.medico.hospital = medico.hospital._id
      this.cambioHospital(this.medico.hospital)
    })
  }

  /**
   * 
   * @param f 
   */
  guardarMedico(f : NgForm){

    if(!f.valid){ return }
    console.log(f.value)
    this._medicoService.guardarMedico(this.medico).subscribe((resp:any) => {
      this.medico = resp
      this.router.navigate(['/medico/', this.medico._id])
    })

  }

  /**
   * 
   * @param id 
   */
  cambioHospital(id:string){
    this._hospitalService.obtenerHospital(id).subscribe( hospital => {
      this.hospital = hospital
    })
  }

  /**
   * 
   */
  cambiarFoto(){
    this._modalUploadService.mostrarModal('medicos', this.medico._id)
  }
}
