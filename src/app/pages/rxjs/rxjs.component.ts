import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/retry'
import 'rxjs/add/operator/filter'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 

   this.subscription = this.regresaObservable()
    .subscribe( 
      numero => {
        console.log('subs', numero);
      }, 
      error => {
        console.log('Error en el obs (dos veces)', error);
      }, 
      () => {
        console.log('El observador terminó')
    })

  }

  ngOnInit() {
  }


  // Función que regresa un observable.
  regresaObservable(): Observable<any>{

    return new Observable( observer  => {

      let contador = 0
      let intervalo = setInterval( () => {
        contador += 1

        let salida = {
          valor:contador
        };

        observer.next( salida );

        // if(contador === 3){
        //   clearInterval(intervalo);
        //   observer.complete();
        // } 

        // if( contador === 2){
        //   observer.error('Auxilio!')
        // }

      }, 500);

    })
    .retry(2)
    .map( (resp:any) => {
      return resp.valor
    })
    .filter( (valor , index) => {
      // console.log('filer', valor, index);
      // Filtro solamente para retornar los impares.
      return (valor % 2 === 1)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
