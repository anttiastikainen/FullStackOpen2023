const Blog = require('../models/blog')
const User = require('../models/user')

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

module.exports = {
    initialBlogs,
    blogsInDb,
    nonExistingId,
    usersInDb
}
