import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WeatherForecast } from 'src/models/weather-api-models';
import { WeatherApiService } from 'src/services/weather-api.service';

@Component({
  selector: 'app-weather-forecast-detail',
  templateUrl: './weather-forecast-detail.component.html',
  styleUrls: ['./weather-forecast-detail.component.css'],
})
export class WeatherForecastDetailComponent implements OnInit {
  data: WeatherForecast;
  daysAhead: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private weatherApiService: WeatherApiService
  ) {}

  formatDate(date: Date): string {
    return `${date.getDate()}-${date.getMonth() + 1}`;
  }

  getDay() {
    return this.data.days[this.daysAhead];
  }

  getDate() {
    return this.formatDate(this.getDay().date);
  }

  ngOnInit(): void {
    const storedValue = this.weatherApiService.weatherForecast.getValue();
    this.data = storedValue;

    const { daysAhead } = this.route.snapshot.params;
    this.daysAhead = +daysAhead;

    this.route.params.subscribe(({ daysAhead }) => {
      this.daysAhead = +daysAhead;
    });
  }

  close() {
    this.router.navigate(['/weather-forecast']);
  }
}
