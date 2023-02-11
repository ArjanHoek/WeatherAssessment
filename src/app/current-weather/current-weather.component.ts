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
    this.weatherApiService.getCurrentWeather('rotterdam').subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }
}
