import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {


  // @Input() public doughnutChartLabels : string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // @Input() public doughnutChartData : number[] = [350, 450, 100];

  @Input() public doughnutChartLabels : string[] = [];
  @Input() public doughnutChartData : number[] = [];
  @Input() public doughnutChartType : string = '';

  constructor() { }

  ngOnInit() {
  }

}
