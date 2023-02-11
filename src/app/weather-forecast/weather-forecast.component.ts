import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherForecast } from 'src/models/weather-api-models';
import { WeatherApiService } from 'src/services/weather-api.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent implements OnInit {
  data: WeatherForecast;
  errorMessage = '';

  constructor(private weatherApiService: WeatherApiService) {}

  formatDate(date: Date): string {
    return `${date.getDate()}-${date.getMonth() + 1}`;
  }

  ngOnInit(): void {
    this.weatherApiService.updateWeatherForecast('deventer');

    this.weatherApiService.weatherForecast.subscribe(
      data => (this.data = data)
    );
  }
}
