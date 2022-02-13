import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ClassWithStats } from 'src/app/models/class.model';
// import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() data: ClassWithStats;
  public pieChartOptions: ChartConfiguration['options'];
  public pieChartData: ChartData<'pie', number[], string | string[]>;
  public pieChartType: ChartType = 'pie';
  constructor() {}

  ngOnInit() {
    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    };
    this.pieChartData = {
      labels: [['Grade 1'], ['Grade 2'], ['Grade 3'], ['Grade 4'], ['Grade 5']],
      datasets: [
        {
          data: [
            this.data.numGradeOne,
            this.data.numGradeTwo,
            this.data.numGradeThree,
            this.data.numGradeFour,
            this.data.numGradeFive,
          ],
        },
      ],
    };
  }

  // Pie

  // public pieChartPlugins = [DatalabelsPlugin];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  // changeLabels(): void {
  //   const words = [
  //     'hen',
  //     'variable',
  //     'embryo',
  //     'instal',
  //     'pleasant',
  //     'physical',
  //     'bomber',
  //     'army',
  //     'add',
  //     'film',
  //     'conductor',
  //     'comfortable',
  //     'flourish',
  //     'establish',
  //     'circumstance',
  //     'chimney',
  //     'crack',
  //     'hall',
  //     'energy',
  //     'treat',
  //     'window',
  //     'shareholder',
  //     'division',
  //     'disk',
  //     'temptation',
  //     'chord',
  //     'left',
  //     'hospital',
  //     'beef',
  //     'patrol',
  //     'satisfied',
  //     'academy',
  //     'acceptance',
  //     'ivory',
  //     'aquarium',
  //     'building',
  //     'store',
  //     'replace',
  //     'language',
  //     'redeem',
  //     'honest',
  //     'intention',
  //     'silk',
  //     'opera',
  //     'sleep',
  //     'innocent',
  //     'ignore',
  //     'suite',
  //     'applaud',
  //     'funny',
  //   ];
  //   const randomWord = () => words[Math.trunc(Math.random() * words.length)];
  //   this.pieChartData.labels = new Array(3).map((_) => randomWord());

  //   this.chart?.update();
  // }

  // addSlice(): void {
  //   if (this.pieChartData.labels) {
  //     this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3']);
  //   }

  //   this.pieChartData.datasets[0].data.push(400);

  //   this.chart?.update();
  // }

  // removeSlice(): void {
  //   if (this.pieChartData.labels) {
  //     this.pieChartData.labels.pop();
  //   }

  //   this.pieChartData.datasets[0].data.pop();

  //   this.chart?.update();
  // }

  // changeLegendPosition(): void {
  //   if (this.pieChartOptions?.plugins?.legend) {
  //     this.pieChartOptions.plugins.legend.position =
  //       this.pieChartOptions.plugins.legend.position === 'left'
  //         ? 'top'
  //         : 'left';
  //   }

  //   this.chart?.render();
  // }

  // toggleLegend(): void {
  //   if (this.pieChartOptions?.plugins?.legend) {
  //     this.pieChartOptions.plugins.legend.display =
  //       !this.pieChartOptions.plugins.legend.display;
  //   }

  //   this.chart?.render();
  // }
}
