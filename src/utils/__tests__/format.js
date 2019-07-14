import { formatDate, formatTime } from 'utils/format';

describe('formatDate', () => {
  it('formats date properly', () => {
    const dateString = '2014-10-22';
    const expectString = 'October 22, 2014';
    expect(formatDate(dateString)).toEqual(expectString);
  });
});

describe('formatTime', () => {
  it('formats time properly', () => {
    const minutes = 120;
    const expectString = '2 hr 0 min';
    expect(formatTime(minutes)).toEqual(expectString);
  });

  it('formats time properly when minute is less than 60', () => {
    const minutes = 59;
    const expectString = '59 min';
    expect(formatTime(minutes)).toEqual(expectString);
  });
});
