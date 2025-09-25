import { ByteBuffer } from "flatbuffers";
//import { WeatherApiResponse } from "./generated/weather_api_generated";

// TODO: Remove this file after testing Index page
// TODO: Remove src/utils/tests/openmeteo_sdk dir with all its files as well
export default async () => {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=44.43225&longitude=26.10626&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature&timezone=auto&format=flatbuffers"
  );

  // 1. Get binary buffer
  const buf = await res.arrayBuffer();

  // 2. Wrap it in a ByteBuffer
  const byteBuffer = new ByteBuffer(new Uint8Array(buf));

  console.log("the buffer is: ", buf);
  console.log("what is need", new Uint8Array(buf));
  //console.log("the byteBuffer is: ", byteBuffer);

  return byteBuffer;

  /*
  // 3. Decode the root object
  const weather = WeatherApiResponse.getRootAsWeatherApiResponse(byteBuffer);

  // 4. Access data via generated accessors
  console.log("Latitude:", weather.latitude());
  console.log("Longitude:", weather.longitude());
  console.log("Timezone:", weather.timezone());

  const hourly = weather.hourly();
  if (hourly) {
    console.log("Interval (seconds):", hourly.interval());

    const variablesLen = hourly.variablesLength();
    for (let i = 0; i < variablesLen; i++) {
      const variable = hourly.variables(i);
      if (!variable) continue;

      console.log("Variable:", variable.variable());
      console.log("Values length:", variable.valuesLength());

      for (let j = 0; j < variable.valuesLength(); j++) {
        console.log("Value:", variable.values(j));
      }
    }
  }
    */
};
