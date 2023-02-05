import { Component, OnInit } from '@angular/core';
import {
  WeatherForecast,
  WeatherForecastDay,
} from 'src/models/weather-api-models';
import { WeatherApiService } from 'src/services/weather-api.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent implements OnInit {
  data: WeatherForecast;
  isLoading = true;
  selectedDay: WeatherForecastDay;

  locationInput = 'Deventer';

  constructor(private weatherApiService: WeatherApiService) {}

  formatDate(date: Date): string {
    return `${date.getDate()}-${date.getMonth() + 1}`;
  }

  selectDay(data: WeatherForecastDay): void {
    this.selectedDay = data;
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.weatherApiService.getWeatherForecast(this.locationInput).subscribe({
      next: data => {
        console.log(data);

        this.data = data;
        this.isLoading = false;
      },
      error: e => {
        console.log(e);
        this.isLoading = false;
      },
    });
  }
}
