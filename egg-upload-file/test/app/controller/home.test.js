'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const path = require('path');
const rimraf = require('mz-modules/rimraf');

describe('test/app/controller/home.test.js', () => {
  afterEach(async () => {
    await rimraf(path.join(app.config.baseDir, 'app/public/test'));
  });

  it('form upload', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/form')
      .attach('file', path.join(__dirname, 'mc.jpeg'))
      .expect('Location', `/${app.config.uploadPath}/mc.jpeg`)
      .expect(302);

    await app.httpRequest()
      .get(`/${app.config.uploadPath}/mc.jpeg`)
      .expect('content-length', '6635')
      .expect(200);

  });

  it('ajax upload', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/ajax')
      .attach('file', path.join(__dirname, 'kfc.jpeg'))
      .then(res => {
        assert(res.body.url === `/${app.config.uploadPath}/kfc.jpeg`);
      });

    await app.httpRequest()
      .get(`/${app.config.uploadPath}/kfc.jpeg`)
      .expect('content-length', '28810')
      .expect(200);

  });

  it('multiple upload', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/multiple')
      .attach('file1', path.join(__dirname, 'kfc.jpeg'))
      .attach('file2', path.join(__dirname, 'mc.jpeg'))
      .then(res => {
        assert(res.body.result.length === 2);
      });

    await app.httpRequest()
      .get(`/${app.config.uploadPath}/kfc.jpeg`)
      .expect('content-length', '28810')
      .expect(200);

    await app.httpRequest()
      .get(`/${app.config.uploadPath}/mc.jpeg`)
      .expect('content-length', '6635')
      .expect(200);

  });
});
