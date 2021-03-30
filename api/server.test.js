const server = require('./server');
const request = require('supertest');
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const User = require('./users/user-model')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  beforeEach(async () => {
    await db('my_plants').truncate()
  })
  afterAll(async () => {
    await db.destroy()
  })
  
  it('process.env.NODE_ENV must be "testing"', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })

  describe('users endpoints', () => {
    describe('[POST] /api/auth/register',() => {
      it('creates a new user in the db', async ()=> {
        await request(server).post('/api/auth/register')
        .send({name: 'juan', email: 'juan@juan.com', phone_number: '5205551234', password: 'abc123'})
        const juan = await db('users')
        .where('name', 'juan').first()
        expect(juan).toMatchObject({name: 'juan'})
      }), 500

      it('new user password is bcrypted', async () => {
        await request(server).post('/api/auth/register')
        .send({name: 'juan', email: 'juan@juan.com', phone_number: '5205551234', password: 'abc123'})
        const juan = await db('users')
        .where('name', 'juan').first()
        expect(bcrypt.compareSync('abc123', juan.password)).toBeTruthy()
      })
    })
    describe('[POST] /api/auth/login', () => {
      it('responds with the correct message when username or password are missing', async () => {
        const res = await request(server).post('/api/auth/login')
        .send({ email: 'juan@juan.com'})
        expect(res.body.message).toMatch('Email and password are required!')
      }, 500)

      it('can find a user by the id ', async () => {
        await db('users')
        const user= await User.getById(1)
        expect(user).toMatchObject({ user_id: 1, name: "juan", email: "juan@juan.com", phone_number: "5205551234"})
      })
    })

  
    })
