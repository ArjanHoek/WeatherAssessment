import { Component, VERSION } from '@angular/core';
import { WeatherApiService } from 'src/services/weather-api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private weatherApiService: WeatherApiService) {}

  logWeather() {
    const weather = this.weatherApiService.getCurrentWeather('Nijmegen');
    weather.subscribe(data => {
      console.log(data);
    });
  }
}
