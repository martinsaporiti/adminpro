import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';


// ng2-charts

import { ChartsModule } from 'ng2-charts';


// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent, 
        IncrementadorComponent,
        GraficoDonaComponent
        
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        BrowserModule,
        CommonModule
    ]
})

export class PagesModule {}