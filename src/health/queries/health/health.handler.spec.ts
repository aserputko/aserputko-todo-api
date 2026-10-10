import { HealthHandler } from './health.handler.js';
import { HealthQuery } from './health.query.js';

describe('HealthHandler', () => {
  it('returns status ok', async () => {
    await expect(new HealthHandler().execute()).resolves.toEqual({ status: 'ok' });
    expect(new HealthQuery()).toBeInstanceOf(HealthQuery);
  });
});
