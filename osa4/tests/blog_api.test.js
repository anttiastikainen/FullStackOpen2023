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
        likes: 2
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

test('If like count is not given, it is set to 0', async() => {
    const newBlog2 = {
        title: 'No likes blog',
        author: 'Teppo Testaaja',
        url: 'www.test.fi',
    }

    await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('If title is not given, 400 response is returned', async() => {
    const newBlog3 = {
        author: 'Teppo Testaaja',
        url: 'www.test.fi',
        likes: 30
    }
    await api 
        .post('/api/blogs')
        .send(newBlog3)
        .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('If url is not given, 400 response is returned', async() => {
    const newBlog4 = {
        title: 'No url blog',
        author: 'Teppo Testaaja',
        likes: 30
    }
    await api 
        .post('/api/blogs')
        .send(newBlog4)
        .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})


afterAll(async () => {
    await mongoose.connection.close()
})


