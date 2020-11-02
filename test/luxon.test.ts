import { DateTime } from 'luxon';

describe('Luxon', () => {
  it('should parse iso date', () => {
    console.log(DateTime.fromISO('2020-10-13').toISODate());
  });
});
