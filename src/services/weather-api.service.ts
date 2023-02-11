import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, delay, map, Observable } from 'rxjs';
import {
  CurrentWeather,
  CurrentWeatherRaw,
  WeatherForecast,
  WeatherForecastRaw,
} from '../models/weather-api-models';
import {
  formatCurrentWeatherData,
  formatWeatherForecastData,
} from 'src/utilities/helpers';

const url = 'https://api.weatherapi.com/v1/';
const apiKey = 'f40e5995730147ca8f3135201232301';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  weatherForecast = new BehaviorSubject<WeatherForecast>(null);

  constructor(private http: HttpClient) {}

  getCurrentWeather(location: string): Observable<CurrentWeather> {
    return this.http
      .get<CurrentWeatherRaw>(
        `${url}current.json?key=${apiKey}&q=${location}&aqi=no`
      )
      .pipe(delay(300), map(formatCurrentWeatherData));
  }

  updateWeatherForecast(location: string): void {
    this.weatherForecast.next(null);

    this.http
      .get<WeatherForecastRaw>(
        `${url}forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=yes`
      )
      .pipe(delay(300), map(formatWeatherForecastData))
      .subscribe(data => this.weatherForecast.next(data));
  }

  getWeatherComparison(
    locationOne: string,
    locationTwo: string
  ): Observable<[CurrentWeather, CurrentWeather]> {
    return combineLatest([
      this.getCurrentWeather(locationOne),
      this.getCurrentWeather(locationTwo),
    ]);
  }
}
