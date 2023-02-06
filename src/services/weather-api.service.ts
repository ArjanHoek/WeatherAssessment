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
  currentWeather = new BehaviorSubject<CurrentWeather>(null);
  weatherForecast = new BehaviorSubject<WeatherForecast>(null);

  constructor(private http: HttpClient) {}

  updateCurrentWeather(location: string): void {
    this.currentWeather.next(null);

    this.http
      .get<CurrentWeatherRaw>(
        `${url}current.json?key=${apiKey}&q=${location}&aqi=no`
      )
      .pipe(delay(300), map(formatCurrentWeatherData))
      .subscribe(data => this.currentWeather.next(data));
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

  updateByCurrentLocation(
    onSuccess: (location: string) => void,
    onFail: (message: string) => void
  ): void {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        onSuccess(`${latitude},${longitude}`),
      error => onFail(error.message)
    );
  }

  //retourneert informatie over de twee locaties en de huidige weersinformatie voor beide
  getWeatherComparison(
    locationOne: string,
    locationTwo: string
  ): Observable<[CurrentWeatherRaw, CurrentWeatherRaw]> {
    return combineLatest(
      this.http.get<CurrentWeatherRaw>(
        `${url}current.json?key=${apiKey}&q=${locationOne}&days=5&aqi=no&alerts=yes`
      ),
      this.http.get<CurrentWeatherRaw>(
        `${url}current.json?key=${apiKey}&q=${locationTwo}&days=5&aqi=no&alerts=yes`
      )
    );
  }
}
