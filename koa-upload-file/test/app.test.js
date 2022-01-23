require('should');
const fs = require('fs');
const app = require('../app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('upload file', () => {
  it('should store file', async () => {
    const response = await request
      .post('/api/upload')
      .set('Content-Type', 'multipart/form-data')
      .attach('file', 'test/watermelon.jpg')
      .expect(200)
    response.text.should.equal('/public/watermelon.jpg')

    const picRes = await request
      .get('/public/watermelon.jpg')
      .expect(200)
    picRes.headers['content-length'].should.equal('10575')
  });
});
