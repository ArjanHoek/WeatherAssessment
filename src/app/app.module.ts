import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WeatherComparisonComponent } from './weather-comparison/weather-comparison.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WeatherForecastDetailComponent } from './weather-forecast-detail/weather-forecast-detail.component';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { WeatherSummaryComponent } from './weather-summary/weather-summary.component';

const routes = [
  { path: '', component: LandingPageComponent },
  { path: 'current-weather', component: CurrentWeatherComponent },
  {
    path: 'weather-forecast',
    component: WeatherForecastComponent,
    children: [
      { path: ':daysAhead', component: WeatherForecastDetailComponent },
    ],
  },
  { path: 'weather-comparison', component: WeatherComparisonComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzDrawerModule,
  ],
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    WeatherComparisonComponent,
    LandingPageComponent,
    WeatherForecastDetailComponent,
    WeatherSummaryComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
