import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less'],
})
export class StatisticsComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Utilisateurs'],
    datasets: [
      {
        data: [100],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
}
