'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const path = require('path');
const rimraf = require('mz-modules/rimraf');

describe('test/app/controller/home.test.js', () => {
  afterEach(async () => {
    await rimraf(path.join(app.config.baseDir, 'app/public/test'));
  });

  it('stream receive', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/form')
      .attach('file', path.join(__dirname, 'mc.jpeg'))
      .expect('Location', `/${app.config.uploadPath}/mc.jpeg`)
      .expect(302);

    await app.httpRequest()
      .get(`/${app.config.uploadPath}/mc.jpeg`)
      .expect('Content-Length', '6635')
      .expect(200);
  });

  it('multiple stream receive', async () => {
    app.mockCsrf();
    await app.httpRequest()
      .post('/multiple')
      .attach('file1', path.join(__dirname, 'mc.jpeg'))
      .attach('file1', path.join(__dirname, 'kfc.jpeg'))
      .then(res => {
        assert(res.body.result.length === 2);
      });

    await app.httpRequest()
      .get(`/${app.config.uploadPath}/mc.jpeg`)
      .expect('Content-Length', '6635')
      .expect(200);

    await app.httpRequest()
      .get(`/${app.config.uploadPath}/kfc.jpeg`)
      .expect('Content-Length', '28810')
      .expect(200);
  });
});
