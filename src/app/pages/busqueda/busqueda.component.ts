import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {



  usuarios : Usuario[] = []
  medicos : Medico[] = []
  hospitales : Hospital[] = []


  constructor(public activatedRoute : ActivatedRoute, public http: HttpClient , 
              public router : Router) { 

    activatedRoute.params.subscribe( params => {
      let termino = params['termino']
      this.buscar(termino)
    })
  }

  ngOnInit() {
  }


  /**
   * 
   * @param termino 
   */
  buscar(termino : string){
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino

    this.http.get(url).subscribe( (resp:any) => {

      this.usuarios = resp.usuarios
      this.medicos = resp.medicos
      this.hospitales = resp.hospitales

      console.log('medicos', this.medicos)

    })

  }



  editarHospital(id:string){
    this.router.navigate(['/hospitales'])
  }


}
