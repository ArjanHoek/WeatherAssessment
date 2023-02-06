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
  errorMessage = '';

  constructor(private weatherApiService: WeatherApiService) {}

  formatDate(date: Date): string {
    return `${date.getDate()}-${date.getMonth() + 1}`;
  }

  selectDay(data: WeatherForecastDay): void {
    this.selectedDay = data;
  }

  ngOnInit(): void {
    const storedValue = this.weatherApiService.weatherForecast.getValue();
    storedValue ? (this.data = storedValue) : this.refresh();
    this.weatherApiService.weatherForecast.subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }

  refresh(): void {
    this.weatherApiService.updateByCurrentLocation(
      location => this.weatherApiService.updateWeatherForecast(location),
      message => (this.errorMessage = message)
    );
  }
}
