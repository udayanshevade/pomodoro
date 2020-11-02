import * as timeUnits from '../timeUnits';

describe('Time units helpers', () => {
  it('give expected results', () => {
    expect(timeUnits.getMillisFromSecs(1)).toBe(1000);
    expect(timeUnits.getSecsFromMillis(1000)).toBe(1);

    expect(timeUnits.getSecsFromMins(1)).toBe(60);
    expect(timeUnits.getMinsFromSecs(60)).toBe(1);

    expect(timeUnits.getHoursFromMins(60)).toBe(1);
    expect(timeUnits.getMinsFromHours(1)).toBe(60);

    expect(timeUnits.getMinsFromMillis(60 * 1000)).toBe(1);
    expect(timeUnits.getMillisFromMins(1)).toBe(60 * 1000);

    expect(timeUnits.getMillisFromHours(1)).toBe(60 * 60 * 1000);
    expect(timeUnits.getHoursFromMillis(60 * 60 * 1000)).toBe(1);

    expect(
      timeUnits.getHoursAndMinsFromMillis(60 * 60 * 1000 + 60 * 1000)
    ).toEqual({ hrs: 1, mins: 1 });
    expect(timeUnits.getMillisFromHoursAndMins({ hrs: 1, mins: 1 })).toBe(
      60 * 60 * 1000 + 60 * 1000
    );
  });
});
