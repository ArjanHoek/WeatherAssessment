import { Component, Input } from '@angular/core';
import { CurrentWeather } from 'src/models/weather-api-models';

@Component({
  selector: 'app-weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrls: ['./weather-summary.component.css'],
})
export class WeatherSummaryComponent {
  @Input() data: CurrentWeather;
}
