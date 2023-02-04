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
  isLoading = true;
  locationInput = 'Deventer';

  constructor(private weatherApiService: WeatherApiService) {}

  ngOnInit(): void {
    this.updateCurrentWeather();
  }

  updateCurrentWeather() {
    this.isLoading = true;

    this.weatherApiService.getCurrentWeather(this.locationInput).subscribe({
      next: data => {
        this.data = data;
        this.isLoading = false;
        console.log(this.data);
      },
      error: error => {
        if (error.status === 400) {
          console.log('You might have entered some invalid input...');
        }

        this.isLoading = false;
      },
    });
  }
}
