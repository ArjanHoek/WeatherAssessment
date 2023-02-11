import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentWeather } from 'src/models/weather-api-models';
import { WeatherApiService } from 'src/services/weather-api.service';

@Component({
  selector: 'app-weather-comparison',
  templateUrl: './weather-comparison.component.html',
  styleUrls: ['./weather-comparison.component.css'],
})
export class WeatherComparisonComponent implements OnInit {
  data: [CurrentWeather, CurrentWeather];
  loading: false;

  constructor(private weatherApiService: WeatherApiService) {}

  ngOnInit(): void {
    this.weatherApiService
      .getWeatherComparison('Nijmegen', 'Arnhem')
      .subscribe(([locationOne, locationTwo]) => {
        this.data = [locationOne, locationTwo];
      });
  }
}
