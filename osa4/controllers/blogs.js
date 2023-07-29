const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name:1 })

    response.json(blogs)
})
/*
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}
*/
blogsRouter.post('/', async (request, response) => {

    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
/*    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }*/

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        user: user._id,
        likes: body.likes!==undefined?body.likes:0
    })
    if(blog.title === undefined || blog.url === undefined)
        response.status(400).end()

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndRemove(request.params.id)
    if(blog) {
        response.status(204).end()
    }else{
        response.status(400)
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body
    let blog = await Blog.findById(request.params.id)
    if(blog) {

        blog = Blog.findByIdAndUpdate(
            request.params.id,
            { title, author, url, likes },
            { new: true })
            .then(updatedBlog => {
                response.json(updatedBlog)
            })
    } else {
        response.status(400)
    }
})

module.exports = blogsRouter
