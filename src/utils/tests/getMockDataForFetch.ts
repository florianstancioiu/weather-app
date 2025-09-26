// TODO: Remove src/utils/tests/openmeteo_sdk dir with all its files as well
export default async () => {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=44.43225&longitude=26.10626&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature&timezone=auto&format=flatbuffers"
  );

  // 1. Get binary buffer
  const buf = await res.arrayBuffer();

  console.log("the buffer is: ", buf);
  console.log("what is need", new Uint8Array(buf));
  //console.log("the byteBuffer is: ", byteBuffer);

  return buf;
};
