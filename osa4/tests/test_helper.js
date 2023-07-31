const Blog = require('../models/blog')
const User = require('../models/user')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Dogs are mans best friend.',
        author: 'Teppo Testaaja',
        url: 'www.localhost.com',
        likes: 3
    },
    {
        title: 'That belongs in a museum',
        author: 'Indiana Jones',
        url: 'www.britishmuseum.org',
        likes: 100
    },
    {
        title: 'Virtual insanity',
        author: 'Jamiroquai',
        url: '-',
        likes: 3
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog({ title: "removed soon ", url: "www.testi.fi"})
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const createUserAndToken = async () => {
    const user = {
        username: 'testuser123a',
        name: 'testname',
        password: 'testpassword'
    }
    const response = await api.post('/api/users').send(user).expect(201);

    const userForToken = {
        username: user.username,
        id:response.body.id
    }
    const token = jwt.sign(userForToken,process.env.SECRET)
    return token
}
module.exports = {
    initialBlogs,
    blogsInDb,
    nonExistingId,
    usersInDb,
    createUserAndToken
}
