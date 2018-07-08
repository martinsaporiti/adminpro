import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';



@Injectable() 
export class UsuarioService {


  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) { 
    console.log('Servicio de usuario listo')
    this.cargarStorage()
  }

  /**
   * 
   */
  estaLogueado(){
    return this.token.length > 5;
  }

  /**
   * 
   */
  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  /**
   * Almacena en el local storage información del usuario logueado.
   * @param id 
   * @param token 
   * @param usuario 
   */
  guardarStorage(id:string, token: string, usuario:Usuario){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  /**
   * 
   */
  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);

  }

  /**
   * 
   * @param token 
   */
  loginGoogle( token: string){

    let URL = `${URL_SERVICIOS}/login/google/`;

    return this.http.post(URL, {token: token})
      .map((resp:any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      });
  }

  /**
   * Servicio que autentica a un usuario mediante username (email) 
   * y password.
   * Es el login normal.
   * @param username - nombre de usuario del usuario que se desea loguear.
   * @param password - password del usuario que se desea loguear.
   * @param rememberme - Indica si el usuario dese que se recuerde nombre de usuario y contraseña. 
   * @returns Promise
   */
  login(usuario: Usuario, rememberme: boolean = false){
    
    if(rememberme){
      localStorage.setItem('email', usuario.email)
    } else {
      localStorage.removeItem('email')
    }

    let url = `${URL_SERVICIOS}/login`;
    usuario.email

    return this.http.post(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      });

  }

  /**
   * Crea un usuario nuevo en el backend
   * @param usuario - usuario a crear
   */
  crearUsuario(usuario: Usuario){

    let url = `${URL_SERVICIOS}/usuario`;

    return this.http.post( url, usuario)
      .map( (resp:any) => {
        swal('Usuario creado', usuario.email, 'success')
        return resp.usuario;
      });

  }

  actualizarUsuario(usuario : Usuario ){
    console.log(usuario._id)
    let url = `${URL_SERVICIOS}/usuario/${usuario._id}`;
    url += "?token=" + this.token
    return this.http.put(url, usuario)
      .map ( (resp: any) => {

        if(usuario._id === this.usuario._id){
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario)
        }
        swal('Usuario Actualizado', usuario.nombre, 'success')
        return true
      })

  }


  cambiarImagen(archivo: File, id: string){

    this._subirArchivoService.subirAchivo(archivo, 'usuarios', id)
    .then( (resp:any) => {
      console.log(resp) 
      this.usuario.img = resp.usuario.img
      swal('Imagen actualizada', this.usuario.nombre, 'success')
      this.guardarStorage(id, this.token, this.usuario)
    })
    .catch( resp => {
      console.log(resp)
    })

  }

  cargarUsuarios(desde: number = 0){
    let url = URL_SERVICIOS + '/usuario?desde=' + desde
    return this.http.get(url);
  }

  buscarUsuarios(termino : string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino
    return this.http.get(url)
      .map( (resp:any) => {
        return resp.usuarios
      })
  }

  borrarUsuario(id : string){
    let url = URL_SERVICIOS + '/usuario/' + id
    url += '?token=' + this.token

    return this.http.delete(url)
      .map( resp => {
        swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success')
        return true
      })
  }
}
