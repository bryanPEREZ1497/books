import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  label = 'Answers';
  labels = ['No', 'Yes'];

  public barChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [10, 0],
        label: this.label,
        // backgroundColor: 'rgba(148,159,177,0.2)',
        // borderColor: 'rgba(148,159,177,1)',
        // pointBackgroundColor: 'rgba(148,159,177,1)',
        // pointBorderColor: '#fff',
        // pointHoverBackgroundColor: '#fff',
        // pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        // fill: 'origin',
      }
    ],
    labels: ['No', 'Yes']
  };

  public barChartType: ChartType = 'bar';

  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.http.get('http://localhost:5000/grafica')
      .subscribe((data: any) => {
        console.log(data);
        this.barChartData = {
          datasets: [{ data, label: this.label }],
          labels: this.labels
        }
      });

    this.escucharSocket();
  }

  escucharSocket() {

    this.wsService.listen('cambio-grafica')
      .subscribe((data: any) => {
        console.log(data);

        this.barChartData = {
          datasets: [{ data, label: this.label }],
          labels: this.labels
        }
      });

  }

}
