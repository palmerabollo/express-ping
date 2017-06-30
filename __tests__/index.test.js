/* global test */

import request from 'supertest';
import app from './app';

test('/ping', function() {
  return request(app)
    .get('/ping')
    .expect(200);
});

