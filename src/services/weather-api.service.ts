import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  delay,
  map,
  Observable,
  Subject,
} from 'rxjs';
import {
  CurrentWeather,
  CurrentWeatherRaw,
  WeatherForecast,
  WeatherForecastDay,
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
  // BehaviorSubject is used to be able to get the current value
  currentWeather = new BehaviorSubject<CurrentWeather>(null);

  weatherForecastDay = new Subject<WeatherForecastDay>();

  constructor(private http: HttpClient) {}

  //retourneert informatie over de locatie en de huidige weersinformatie
  getCurrentWeather(location: string): Observable<CurrentWeather> {
    return this.http
      .get<CurrentWeatherRaw>(
        `${url}current.json?key=${apiKey}&q=${location}&aqi=no`
      )
      .pipe(
        delay(300), // Delay was added to simulate slow connection, enablabling testing of UI loading
        map(formatCurrentWeatherData)
      );
  }

  // This method is used to retrieve current weather data and store it in the service
  updateCurrentWeather(location: string): void {
    this.currentWeather.next(null);

    this.getCurrentWeather(location).subscribe(data =>
      this.currentWeather.next(data)
    );
  }

  //retourneert informatie over de locatie en de huidige weersvoorspelling voor de komende 5 dagen
  getWeatherForecast(location: string): Observable<WeatherForecast> {
    return this.http
      .get<WeatherForecastRaw>(
        `${url}forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=yes`
      )
      .pipe(delay(300), map(formatWeatherForecastData));
  }

  setWeatherForecastDay(weatherForecastDay: WeatherForecastDay): void {
    this.weatherForecastDay.next(weatherForecastDay);
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
