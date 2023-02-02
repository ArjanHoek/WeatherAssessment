import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from 'src/services/weather-api.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  currentWeatherData: {
    temperature: number;
  };

  constructor(private weatherApiService: WeatherApiService) {}

  ngOnInit(): void {
    this.updateCurrentWeather();
  }

  updateCurrentWeather() {
    this.weatherApiService.getCurrentWeather('Nijmegen').subscribe({
      next: data => {
        const {
          current: { temp_c: temperature },
        } = data;

        this.currentWeatherData = { ...this.currentWeatherData, temperature };
      },
      error: error => {
        if (error.status === 400) {
          console.log('You might have entered some invalid input...');
        }
      },
    });
  }
}
