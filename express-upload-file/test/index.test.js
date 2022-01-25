require('should');
const fs = require('fs');
const app = require('../app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('upload file', () => {
  it ('should store file', async () => {
    const response = await request
      .post('/api/upload')
      .set('Content-Type', 'multipart/form-data')
      .attach('file', 'test/watermelon.jpg')
      .expect(200)
    response.body.files.file.originalFilename.should.equal('watermelon.jpg')
    const picRes = await request
      .get('/images/watermelon.jpg')
      .expect(200)
    picRes.headers['content-length'].should.equal('10575')
  })

  it ('use multer to store file', async () => {
    const response = await request
      .post('/api/multer')
      .set('Content-Type', 'multipart/form-data')
      .field('title', 'my title')
      .attach('file', 'test/kfc.jpeg')

    response.body.body.title.should.equal('my title')
    response.body.file.originalname = 'kfc.jpeg'

    const picRes = await request
      .get('/images/kfc.jpeg')
      .expect(200)
    picRes.headers['content-length'].should.equal('28810')
  })
})