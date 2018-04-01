import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {


  ajustes: Ajustes = {
    temaUrl: "assets/css/colors/default.css",
    tema: "default"
  }


  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }


  guardarAjustes(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }


  cargarAjustes(){
    if( localStorage.getItem( 'ajustes' ) ){
      console.log('cargando valores del storage');
      this.ajustes = JSON.parse( localStorage.getItem( 'ajustes' ) );
      console.log('aplicando tema', this.ajustes.tema);
      this.aplicarTema(this.ajustes.tema);
    } else {
      console.log('utilizando valores por defecto');
      this.aplicarTema(this.ajustes.tema);

    }
  }

  aplicarTema(tema: string){

    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url)
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();

  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}