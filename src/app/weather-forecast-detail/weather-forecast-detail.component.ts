import { Component, Input, OnInit } from '@angular/core';
import { WeatherForecastDay } from 'src/models/weather-api-models';

@Component({
  selector: 'app-weather-forecast-detail',
  templateUrl: './weather-forecast-detail.component.html',
  styleUrls: ['./weather-forecast-detail.component.css'],
})
export class WeatherForecastDetailComponent implements OnInit {
  @Input() data: WeatherForecastDay;

  constructor() {}

  ngOnInit(): void {}
}
