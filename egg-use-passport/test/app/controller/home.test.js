'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  it('should GET /', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .get('/admin')
      .expect(302);

    const loginFormRes = await app.httpRequest()
      .get('/login');

    assert(loginFormRes.text.includes('<form action="/login" method="POST">'));

    const loginRes = await app.httpRequest()
      .post('/login')
      .send('username=admin&password=123456')
      .expect(302);

    assert(loginRes.header.location, '/admin');

    const cookie = loginRes.header['set-cookie'];

    await app.httpRequest()
      .get('/admin')
      .set('Cookie', cookie)
      .then(res => {
        assert(res.text.includes('Hi'));
      });

  });
});
