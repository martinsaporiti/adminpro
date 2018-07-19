import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';
import { resolve } from 'path';

@Injectable()
export class VerificatokenGuard implements CanActivate {
  
  constructor(public _usuarioService : UsuarioService, public router : Router){

  }

  canActivate(): Promise<boolean> | boolean {
    console.log('inicio de verifica token guard')
    let token = this._usuarioService.token;
    let payload = JSON.parse( atob(token.split('.')[1]) )
    let expirado = this.tokenExpirado(payload.exp);

    if(expirado){
      // Si está expirado no lo dejo pasar.
      this.router.navigate(['/login']);
      return false
    } 

    return this.verificaRenueva(payload.exp);
  }



/**
 * 
 * @param fechaExp 
 */
  tokenExpirado(fechaExp : number){
    let ahora = new Date().getTime() / 1000;

    // Expiro?
    if(fechaExp < ahora){
      return true
    } else {
      return false
    }
  }

  /**
   * 
   * @param fechaExp 
   */
  verificaRenueva(fechaExp : number) : Promise<boolean> {
    return new Promise( (resolve, reject) => {

      let tokenExp = new Date(fechaExp * 1000)
      let ahora = new Date()

      ahora.setTime( ahora.getTime() + (1 * 60 *  60 * 1000)) // Lo incremento 1 horas

      if(tokenExp.getTime() > ahora.getTime()){
        resolve(true)
      }else{
        // En este caso el token está próximo a vencer
        this._usuarioService.renuevaToken()
          .subscribe( () => {
            resolve(true)
          }, () => {
            this.router.navigate(['/login']);
            reject(false)
          });
      }

    });
  }

}
