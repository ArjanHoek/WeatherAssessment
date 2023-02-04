import {
  CurrentWeather,
  CurrentWeatherRaw,
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

export const formatWeatherData = (data: CurrentWeatherRaw): CurrentWeather => {
  const {
    current: { temp_c, feelslike_c, wind_dir, wind_kph },
    location: { name, localtime_epoch },
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
    time: new Date(localtime_epoch),
  };
};
