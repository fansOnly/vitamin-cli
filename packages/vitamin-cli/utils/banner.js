import gradient from "gradient-string";

let coolGradient = gradient([
  { color: "#42d392", pos: 0 },
  { color: "#42d392", pos: 0.1 },
  { color: "#647eff", pos: 1 },
]);

export const bannerText = "hello, vitamin hit you!";

export const bannerColored = coolGradient(bannerText);
