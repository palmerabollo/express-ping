/* global test */

import request from 'supertest';
import app from './app';

test('/ping', function(done) {
  return request(app)
    .get('/ping')
    .expect(200);
});

