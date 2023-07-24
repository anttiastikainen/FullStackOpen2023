const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('', async (request, response) => {

    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes!==undefined?body.likes:0
    })
    if(blog.title === undefined || blog.url === undefined)
        response.status(400).end()

    const savedBlog = await blog.save()
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
