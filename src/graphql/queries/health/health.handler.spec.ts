import { HealthHandler } from './health.handler.js';
import { HealthQuery } from './health.query.js';

describe('HealthHandler', () => {
  it('returns ok', async () => {
    await expect(new HealthHandler().execute()).resolves.toBe('ok');
    expect(new HealthQuery()).toBeInstanceOf(HealthQuery);
  });
});
