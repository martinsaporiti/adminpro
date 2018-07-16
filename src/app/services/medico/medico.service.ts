import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  constructor(public http : HttpClient, 
      public _usuarioService : UsuarioService) { }


  /**
   * 
   * @param desde 
   */
  cargarMedicos(desde : number){
    let url = `${URL_SERVICIOS}/medico`;
    url += '?desde=' + desde
    return this.http.get(url)
  }


  /**
   * 
   * @param id 
   */
  cargarMedico( id:string ){
    let url = URL_SERVICIOS + '/medico/' + id
    return this.http.get(url)
      .map( (resp:any) => resp.medico)
  }


  /**
   * 
   * @param termino 
   */
  buscarMedicos(termino : string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino
    return this.http.get(url)
      .map( (resp:any) => {
        return resp.medicos
      })
  }

  /**
   * 
   * @param id 
   */
  borrarMedico( id: string ){
    let url = `${URL_SERVICIOS}/medico/${id}`;
    url += '?token=' + this._usuarioService.token
    return this.http.delete(url)
    .map( resp => {
      swal('Médico borrado', 'El Médico ha sido eliminado correctamente', 'success')
      return true
    })
  }



  /**
   * 
   * @param medico 
   */
  guardarMedico(medico : Medico){
    console.log(medico._id)
    
    let url = `${URL_SERVICIOS}/medico/`;

    if(medico._id){
      // Estoy modificando un médico existente.
      console.log('modificando médico')
      url += '/' + medico._id
      url += '?token=' + this._usuarioService.token

      return this.http.put(url, medico)
        .map ((resp:any) => {
          swal('Médico guardado', medico.nombre, 'success')
          return resp.medico;
        })

    } else {
      // Estoy guardando un nuevo médico.
      console.log('creando médico')
      url += '?token=' + this._usuarioService.token
      return this.http.post(url, medico)
        .map( (resp:any) => {
          swal('Médico guardado', medico.nombre, 'success')
          return resp.medico;
        });
    }
  }
}
