const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

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

test('blog posts id:s are defined', async() => {
    const response = await api
        .get('/api/blogs')
        .expect(200)

    const ids = response.body.map(r => r.id)

    for(let i = 0; i<ids.length;i++)
    {
        expect(ids[i]).toBeDefined()
    }
})

test('Posting blogs works', async() => {
const newBlog = {
    title: 'Test blog',
    author: 'Teppo Testaaja',
    url: 'www.test.fi',
    likes: 3
}

await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

const blogsAtEnd = await helper.blogsInDb()
expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)
expect(blogsAtEnd[blogsAtEnd.length - 1].title).toBe('Test blog')
    
})

afterAll(async () => {
    await mongoose.connection.close()
})


