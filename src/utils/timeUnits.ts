export const getMillisFromSecs = (s: number): number => s * 1000;
export const getSecsFromMillis = (ms: number): number => ms / 1000;

export const getSecsFromMins = (mins: number): number => mins * 60;
export const getMinsFromSecs = (seconds: number): number => seconds / 60;

export const getHoursFromMins = (mins: number): number => mins / 60;
export const getMinsFromHours = (hrs: number): number => hrs * 60;

export const getMinsFromMillis = (ms: number): number =>
  getMinsFromSecs(getSecsFromMillis(ms));
export const getMillisFromMins = (mins: number): number =>
  getMillisFromSecs(getSecsFromMins(mins));

export const getMillisFromHours = (hrs: number): number =>
  getMillisFromSecs(getSecsFromMins(getMinsFromHours(hrs)));
export const getHoursFromMillis = (ms: number): number =>
  getHoursFromMins(getMinsFromSecs(getSecsFromMillis(ms)));

export const getHoursAndMinsFromMillis = (
  duration: number
): { hrs: number; mins: number } => ({
  hrs: Math.floor(getHoursFromMillis(duration)),
  mins: Math.round(getMinsFromMillis(duration) % 60),
});

export const getMillisFromHoursAndMins = ({
  hrs,
  mins,
}: {
  hrs: number;
  mins: number;
}): number => getMillisFromHours(hrs) + getMillisFromMins(mins);
