require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new meal with POST', () => {
    return request(app)
      .post('/api/v1/meals')
      .send({
        name: 'pancake breakfast',
        description: 'Really yummy',
        consumedAt: Date.now(),
        category: 'breakfast',
        items: [
          { name: 'pancakes', calories: 1000 }
        ]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'pancake breakfast',
          description: 'Really yummy',
          consumedAt: Date.now(),
          category: 'breakfast',
          items: [
            { name: 'pancakes', calories: 1000 }
          ],
          __v: 0
        }
        );
      });
  });
});
