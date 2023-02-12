import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherForecast } from 'src/models/weather-api-models';
import { WeatherApiService } from 'src/services/weather-api.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent implements OnInit, OnDestroy {
  @ViewChild('inputField', { static: true }) inputField: ElementRef;
  data: WeatherForecast;
  subscription: Subscription;

  constructor(private weatherApiService: WeatherApiService) {}

  formatDate(date: Date): string {
    return `${date.getDate()}-${date.getMonth() + 1}`;
  }

  ngOnInit(): void {
    this.setData();

    this.subscription = this.weatherApiService.weatherForecast.subscribe(
      data => {
        this.data = data;
        console.log('===');
        console.log(data);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setData(location?: string) {
    this.data = null;

    this.weatherApiService.updateWeatherForecast(location || 'Nijmegen');
  }

  update() {
    this.setData(this.inputField.nativeElement.value);
    this.inputField.nativeElement.value = '';
  }

  updateOnEnter(event: KeyboardEvent) {
    const { key } = event;

    if (key === 'Enter') {
      this.update();
    }
  }
}
