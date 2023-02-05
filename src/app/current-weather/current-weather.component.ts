import { Component, OnInit } from '@angular/core';
import { CurrentWeather } from 'src/models/weather-api-models';
import { WeatherApiService } from 'src/services/weather-api.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  data: CurrentWeather;
  errorMessage = '';

  constructor(private weatherApiService: WeatherApiService) {}

  ngOnInit(): void {
    const storedValue = this.weatherApiService.currentWeather.getValue();
    storedValue ? (this.data = storedValue) : this.refresh();
    this.weatherApiService.currentWeather.subscribe(data => (this.data = data));
  }

  refresh(): void {
    navigator.geolocation.getCurrentPosition(
      data => {
        this.errorMessage = '';

        const {
          coords: { latitude, longitude },
        } = data;

        this.weatherApiService.updateCurrentWeather(`${latitude},${longitude}`);
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }
}
