/** Integration tests for Auth API */
import request from 'supertest';
import app from '../src/app';

describe('Auth API Integration Tests', () => {
  it('should login and set a cookie', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'irsyad_dev' });

    // ✅ Gunakan sintaks expect milik Jest
    expect(res.status).toBe(200);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should not access profile without cookie', async () => {
    const res = await request(app).get('/api/auth/profile');
    expect(res.status).toBe(401);
  });

  it('should access profile with valid cookie', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser' });

    const cookie = loginRes.headers['set-cookie'];

    const res = await request(app)
      .get('/api/auth/profile')
      .set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe('testuser');
  });
});

