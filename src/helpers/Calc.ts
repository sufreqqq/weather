export function speedCalc(gust: number | undefined, wind: number | undefined): [number?, number?] {
  const gustSpeed = gust ? gust / 3.6 : 0;
  const windSpeed = wind ? wind / 3.6 : 0;

  return [Number(gustSpeed.toFixed(2)), Number(windSpeed.toFixed(2))];
}
