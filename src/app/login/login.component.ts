import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rememberme : boolean = false;
  email: string;

  auth2: any;

  constructor(public router : Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit(); 
    
    this.email = localStorage.getItem('email') || ''; 
    if(this.email.length > 1){
      this.rememberme = true
    }
  }


  /**
   * 
   */
  googleInit(){

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init( {
         client_id: "264205947999-gn31va1qd2ch4c9ha58mrc0g0mhivl2o.apps.googleusercontent.com",
         coockiepolicy: 'single_host_origin',
         scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));
              

    });
  }


  attachSignin( element ){
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token).subscribe(resp => {
        // this.router.navigate(['/dashboard']) Esto no funciona no se sabe por qué.
        window.location.href ='#/dashboard';
      })
    })
  }


  /**
   * 
   * @param forma 
   */
  ingresar( forma: NgForm ){

    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(null,forma.value.email, forma.value.password, null, null, false, null )

    this._usuarioService.login(usuario, forma.value.rememberme)
      .subscribe( oks => {
        this.router.navigate(['dashboard'])
      })
    
    // this.router.navigate(['/dashboard']);
  }
}
