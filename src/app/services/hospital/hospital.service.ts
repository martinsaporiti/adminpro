import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class HospitalService {



  constructor(public http: HttpClient, public _usuarioService : UsuarioService) { 
    
  }

  /**
   * Retorna todos los hospitales desde la posición recibida como 
   * parámetro.
   * @param desde parámetro utilizado para paginar.
   */
  cargarHospitales(){
    let url = `${URL_SERVICIOS}/hospital`;
    return this.http.get(url)
  }

  /**
   * Obtiene un hospital a partir del id
   * @param id Identificador del hospital a retornar
   */
  obtenerHospital(id : string){
    let url = `${URL_SERVICIOS}/hospital/${id}`;
    return this.http.get(url)
      .map( (resp: any) => {
        if (resp.ok){
          return resp.hospital
        } else {
          swal('No se encontró el hospital con el id', id, 'warning')
          return null
        }
      })
  }

  /**
   * Elimina un hospital
   * @param id Identificador del hospital a borrar
   */
  borrarHospital( id: string ){
    let url = `${URL_SERVICIOS}/hospital/${id}`;
    url += '?token=' + this._usuarioService.token
    return this.http.delete(url)
    .map( resp => {
      swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success')
      return true
    })
  }

  /**
   * Crea un nuevo hospital a partir de un nombre
   * @param nombre Nombre del hospital a crear.
   */
  crearHospital( nombre: string ){
    let hospital = new Hospital(nombre, null, null)
    let url = `${URL_SERVICIOS}/hospital/`;
    url += '?token=' + this._usuarioService.token
    console.log(url)
    return this.http.post(url, hospital)
      .map( (resp:any) => {
        swal('Hospital creado', hospital.nombre, 'success')
        return resp.hospital;
      });
  }

  /**
   * Busca los hospitales a partir de un término de búsqueda.
   * @param termino Término a buscar dentro de los hospitales.
   */
  buscarHospital( termino: string ){
    let url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url)
      .map( (resp:any) => {
        return resp.hospitales
      })
  }

  /**
   * Actualiza un hospital
   * @param hospital Hospital a actualizar.
   */
  actualizarHospital( hospital: Hospital ){
    let url = `${URL_SERVICIOS}/hospital/${hospital._id}`;
    url += "?token=" + this._usuarioService.token
    return this.http.put(url, hospital)
    .map ( (resp: any) => {
      swal('Hospital Actualizado', hospital.nombre, 'success')
      return true
    })
  }
}
