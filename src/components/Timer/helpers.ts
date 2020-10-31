export const millisecondsToOtherUnits = (
  ms: number
): { hours: number; mins: number; secs: number } => {
  const hours = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.round((ms % 60000) / 1000);
  return { hours, mins, secs };
};

const padNum = (num: number): string => `${num < 10 ? '0' : ''}${num}`;

export const millisecondsInFormattedTime = (ms: number): string => {
  const { hours, mins, secs } = millisecondsToOtherUnits(ms);
  return `${hours ? `${padNum(hours)}:` : ''}${
    hours ? padNum(mins) : mins
  }:${padNum(secs)}`;
};

export const millisecondsInReadableTime = (ms: number): string => {
  const { hours, mins, secs } = millisecondsToOtherUnits(ms);
  return `${
    hours ? `${hours} hours, ` : ''
  }${mins} minutes and ${secs} seconds`;
};
