import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  WeatherForecast,
  WeatherForecastDay,
} from 'src/models/weather-api-models';
import { WeatherApiService } from 'src/services/weather-api.service';

@Component({
  selector: 'app-weather-forecast-detail',
  templateUrl: './weather-forecast-detail.component.html',
  styleUrls: ['./weather-forecast-detail.component.css'],
})
export class WeatherForecastDetailComponent implements OnInit {
  data: WeatherForecastDay;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private weatherApiService: WeatherApiService
  ) {}

  getDateString(): string {
    return `${this.data.date.getDate()}-${this.data.date.getMonth() + 1}`;
  }

  ngOnInit(): void {
    const { daysAhead } = this.route.snapshot.params;

    const storedValue = this.weatherApiService.weatherForecast.getValue();
    this.data = storedValue.days[daysAhead];

    console.log(this.data);

    this.route.params.subscribe(({ daysAhead }) => {
      this.data = storedValue.days[daysAhead];
    });
  }

  close() {
    this.router.navigate(['/weather-forecast']);
  }
}
