import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir : File;
  imagenTemp : string;

  constructor(public _subirArchivoService : SubirArchivoService, 
              public _modalUploadService : ModalUploadService) { 
    console.log('modal upload listo')
  }

  ngOnInit() {
  }


  cerrarModal(){
    this.imagenSubir = null
    this.imagenTemp = null
    this._modalUploadService.ocultarModal()
  }


  subirImagen(){
    this._subirArchivoService.subirAchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then( resp => {

      console.log(resp)
      this._modalUploadService.notificacion.emit(resp);
      this.cerrarModal()

    })
    .catch( err =>{
      console.log('Error en la carga de archivo.')
    });
  }

  seleccionImagen(archivo:File){

    if(!archivo){
      this.imagenSubir = null
      return
    }

    if (archivo.type.indexOf('image') < 0){
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null 
      return
    }
    this.imagenSubir = archivo


    // Ahora viene javascript puro
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }

  }

}
