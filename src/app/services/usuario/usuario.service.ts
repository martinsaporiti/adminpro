import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map'
import { Router } from '@angular/router';



@Injectable() 
export class UsuarioService {


  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) { 
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




}
