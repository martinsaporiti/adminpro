import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {


  label: string = '';

  constructor( public _title:Title, public meta: Meta,
        private _router: Router) { 
    
    this.getDataRoute().subscribe( (data) => {

      // console.log(data);
      this.label = data.titulo;
      this._title.setTitle(this.label);

      let metaTagDesc: MetaDefinition = {
        name:'description',
        content:this.label,
      }
      this.meta.updateTag(metaTagDesc);

      let metaTagAuthor: MetaDefinition = {
        name:'author',
        content:'Martín Saporiti'
      }
      this.meta.updateTag(metaTagAuthor);

    })
  }


  getDataRoute(){
    return this._router.events
    .filter( evento => { return evento instanceof ActivationEnd })
    .filter( (evento: ActivationEnd) => { return evento.snapshot.firstChild === null })
    .map( (evento:ActivationEnd) => { return evento.snapshot.data })
  }

  ngOnInit() {
  }

}
