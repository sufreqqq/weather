export function speedCalc(
  gust: number | undefined,
  wind: number | undefined,
  pressure: number | undefined
): [number?, number?, number?] {
  const gustSpeed = gust ? gust / 3.6 : 0;
  const windSpeed = wind ? wind / 3.6 : 0;
  const pressureMm = pressure ? pressure * 0.750062 - 15 : 0;

  return [
    Number(gustSpeed.toFixed(2)),
    Number(windSpeed.toFixed(2)),
    Math.floor(pressureMm),
  ];
}

export function windDirectory(degree: number | undefined): string {

  if(typeof degree === "undefined"){
    return "undefined"
  }

  if (degree >= 22.5 && degree < 67.5) {
    return "Северо-восток";
  } else if (degree >= 67.5 && degree < 112.5) {
    return "Запад";
  } else if (degree >= 112.5 && degree < 157.5) {
    return "Юго-запад";
  } else if (degree >= 157.5 && degree < 202.5) {
    return "Юг";
  } else if (degree >= 202.5 && degree < 247.5) {
    return "Юго-восток";
  } else if (degree >= 247.5 && degree < 292.5) {
    return "Восток";
  } else if (degree >= 292.5 && degree < 337.5) {
    return "Северо-восток";
  } else if (degree >= 337.5 && degree < 361) {
    return "Север";
  } else {
    return "undefined"
  }
}
