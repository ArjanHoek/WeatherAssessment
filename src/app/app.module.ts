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

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { WeatherForecastDetailComponent } from './weather-forecast-detail/weather-forecast-detail.component';

const routes = [
  { path: '', component: LandingPageComponent },
  { path: 'current-weather', component: CurrentWeatherComponent },
  {
    path: 'weather-forecast',
    component: WeatherForecastComponent,
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
    NzListModule,
  ],
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    WeatherComparisonComponent,
    LandingPageComponent,
    WeatherForecastDetailComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
