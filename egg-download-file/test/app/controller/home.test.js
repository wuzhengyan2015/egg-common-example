'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const path = require('path');
const fs = require('fs');

describe('test/app/controller/home.test.js', () => {
  it('should GET / and show download anchor', () => {
    return app.httpRequest()
      .get('/')
      .expect(200)
      .expect(/<a download href="\/download">download<\/a>/);
  });

  it('should GET /download and download hello.txt', async () => {
    const file = fs.readFileSync(path.resolve(app.config.static.dir, 'hello.txt'));
    await app.httpRequest()
      .get('/download')
      .expect('Content-Type', 'application/octet-stream')
      .expect('Content-Disposition', 'attachment; filename="hello.txt"')
      .expect(200)
      .expect(res => {
        assert.deepStrictEqual(file.toString(), res.body.toString());
      });
  });
});
