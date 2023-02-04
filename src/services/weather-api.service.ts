import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, delay, map, Observable } from 'rxjs';
import {
  CurrentWeather,
  CurrentWeatherRaw,
  WeatherForecast,
} from '../models/weather-api-models';
import { formatWeatherData } from 'src/utilities/helpers';

const url = 'https://api.weatherapi.com/v1/';
const apiKey = 'f40e5995730147ca8f3135201232301';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  //retourneert informatie over de locatie en de huidige weersinformatie
  getCurrentWeather(location: string): Observable<CurrentWeather> {
    return this.http
      .get<CurrentWeatherRaw>(
        `${url}current.json?key=${apiKey}&q=${location}&aqi=no`
      )
      .pipe(
        delay(1000), // Delay was added to simulate slow connection, enablabling testing of UI loading
        map(data => formatWeatherData(data))
      );
  }

  //retourneert informatie over de locatie en de huidige weersvoorspelling voor de komende 5 dagen
  getWeatherForecast(location: string): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(
      `${url}forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=yes`
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
