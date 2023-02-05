import {
  CurrentWeather,
  CurrentWeatherRaw,
  WeatherForecast,
  WeatherForecastRaw,
} from 'src/models/weather-api-models';

const getWindDirectionString = (value: string): string =>
  value
    .split('')
    .map(
      char =>
        ({
          n: 'north',
          e: 'east',
          s: 'south',
          w: 'west',
        }[char.toLowerCase()])
    )
    .join('-');

export const formatCurrentWeatherData = (
  data: CurrentWeatherRaw
): CurrentWeather => {
  const {
    current: { temp_c, feelslike_c, wind_dir, wind_kph },
    location: { name, localtime },
  } = data;

  return {
    temperature: {
      actual: temp_c,
      perceived: feelslike_c,
    },
    wind: {
      speed: wind_kph,
      direction: getWindDirectionString(wind_dir),
    },
    location: name,
    time: new Date(localtime),
  };
};

export const formatWeatherForecastData = ({
  location: { name },
  forecast: { forecastday },
}: WeatherForecastRaw): WeatherForecast => ({
  location: name,
  days: forecastday.map(
    ({
      day: {
        mintemp_c,
        maxtemp_c,
        avgtemp_c,
        daily_chance_of_rain,
        totalprecip_mm,
        daily_chance_of_snow,
        totalsnow_cm,
      },
      date,
    }) => ({
      date: new Date(date),
      temperature: {
        min: mintemp_c,
        max: maxtemp_c,
        average: avgtemp_c,
      },
      precipitation: {
        rain: {
          chance: daily_chance_of_rain,
          amount_mm: totalprecip_mm,
        },
        snow: {
          chance: daily_chance_of_snow,
          amount_cm: totalsnow_cm,
        },
      },
    })
  ),
});
