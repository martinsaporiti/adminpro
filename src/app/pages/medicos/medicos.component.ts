import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';


declare var swal : any

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  desde : number = 0
  medicos : Medico[]
  cargando : boolean = true
  total : number = 0 

  constructor(public _medicoService : MedicoService) { }

  ngOnInit() {
    this.cargarMedicos()
  }

  /**
   * 
   */
  cargarMedicos(){
    this.cargando = true
    this._medicoService.cargarMedicos(this.desde).subscribe((resp:any) => {
      this.medicos = resp.medicos 
      this.total = resp.total
      this.cargando = false
    })
  }


  /**
   * 
   * @param termino 
   */
  buscarMedico(termino : string){
    if(termino.length <= 0){
      this.cargarMedicos()
      return
    }

    this.cargando = true
    this._medicoService.buscarMedicos(termino)
    .subscribe((medicos : any) => {
      this.cargando = false
      this.medicos = medicos
    })
  }


  /**
   * 
   */
  editarMedico(medico : Medico){

  }

  /**
   * 
   * @param medico 
   */
  borrarMedico(medico : Medico){
    swal({
      title: "Está seguro?",
      text: 'Está a punto de borrar a ' + medico.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      console.log(borrar)
      if(borrar){
        this._medicoService.borrarMedico(medico._id).subscribe( (borrado) => {
          this.desde = 0
          this.cargarMedicos()
        })
      } 
    });
  }


  crearMedico(){

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
    this.cargarMedicos()
  }


  /**
   * 
   * @param id 
   */
  mostrarModal(id: string){
    
  }
}
