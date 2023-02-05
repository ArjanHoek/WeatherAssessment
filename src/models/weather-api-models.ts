export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface Forecast {
  forecastday: [
    {
      date: string;
      date_epoch: number;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        maxwind_mph: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        totalprecip_in: number;
        totalsnow_cm: number;
        avgvis_km: number;
        avgvis_miles: number;
        avghumidity: number;
        daily_will_it_rain: number;
        daily_chance_of_rain: number;
        daily_will_it_snow: number;
        daily_chance_of_snow: number;
        condition: Condition;
        uv: 2;
      };
    }
  ];
}

export interface CurrentWeatherRaw {
  location: Location;
  current: Current;
}

export interface WeatherForecastRaw {
  location: Location;
  current: Current;
  forecast: Forecast;
  alerts: {
    alert: [];
  };
}

// Custom models
export interface CurrentWeather {
  temperature: {
    actual: number;
    perceived: number;
  };
  wind: {
    speed: number;
    direction: string;
  };
  location: string;
  time: Date;
}

export interface WeatherForecastDay {
  date: Date;
  temperature: {
    min: number;
    max: number;
    average: number;
  };
  precipitation: {
    rain: {
      chance: number;
      amount_mm: number;
    };
    snow: {
      chance: number;
      amount_cm: number;
    };
  };
}

export interface WeatherForecast {
  days: WeatherForecastDay[];
  location: string;
}
