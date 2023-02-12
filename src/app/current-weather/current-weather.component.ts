import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrentWeather } from 'src/models/weather-api-models';
import { WeatherApiService } from 'src/services/weather-api.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  @ViewChild('inputField', { static: true }) inputField: ElementRef;
  data: CurrentWeather;

  constructor(private weatherApiService: WeatherApiService) {}

  ngOnInit(): void {
    this.setData();
  }

  setData(location?: string) {
    this.data = null;

    this.weatherApiService
      .getCurrentWeather(location || 'Nijmegen')
      .subscribe(data => (this.data = data));
  }

  updateOnEnter(event: KeyboardEvent) {
    const { key } = event;

    if (key === 'Enter') {
      this.update();
    }
  }

  update() {
    this.setData(this.inputField.nativeElement.value);
    this.inputField.nativeElement.value = '';
  }
}
