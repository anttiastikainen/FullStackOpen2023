const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const logger = require('../utils/logger')
const config = require('../utils/config')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('All blog posts are returned', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('First blog post is written by Teppo Testaaja', async () => {
    const response = await api.get('/api/blogs/')

expect(response.body[0].author).toBe('Teppo Testaaja')
})

afterAll(async () => {
    await mongoose.connection.close()
})


