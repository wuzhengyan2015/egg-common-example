'use strict';

const { app } = require('egg-mock/bootstrap');
const path = require('path');

describe('test/app/controller/home.test.js', () => {
  it('multipart upload', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/upload')
      .field('part', 1)
      .attach('file', path.join(__dirname, 'slice/1/mc.jpeg'))
      .expect('upload')
      .expect(200);

    await app.httpRequest()
      .post('/upload')
      .field('part', 2)
      .attach('file', path.join(__dirname, 'slice/2/mc.jpeg'))
      .expect('upload')
      .expect(200);

    await app.httpRequest()
      .post('/merge')
      .field('filename', 'mc.jpeg')
      .expect('merge')
      .expect(200);

    await app.httpRequest()
      .get('/public/upload/mc.jpeg')
      .expect('content-length', '6635')
      .expect(200);
  });

});
