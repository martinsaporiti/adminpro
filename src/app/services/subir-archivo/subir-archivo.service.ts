import { Injectable } from '@angular/core';
import { resolve } from 'path';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirAchivo( archivo : File , tipo: string, id: string ){
    
    return new Promise( (resolve, reject) => {

      // Lo siguiente es javascript puro con ajax.
      // Angular para este mmomento on soporta la subida de archivos.

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name)

      xhr.onreadystatechange = function(){

        if(xhr.readyState == 4){

          if(xhr.status == 200){
            console.log('imagen subida')
            resolve(JSON.parse(xhr.response))
          } else {
            console.log('falló la subida de la imagen')
            reject(xhr.response)
          }

        }
      }

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }
}
