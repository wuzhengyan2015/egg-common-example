require('should');
const fs = require('fs');
const app = require('../app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('upload file', () => {
  it ('should store file', async () => {
    const response = await request
      .post('/api/upload')
      .set('Content-Type', 'multupart/form-data')
      .attach('file', 'test/watermelon.jpg')
      .expect(200)
    response._body.files.file.originalFilename.should.equal('watermelon.jpg')
    const picRes = await request
      .get('/images/watermelon.jpg')
      .expect(200)
    picRes.headers['content-length'].should.equal('10575')
  })
})