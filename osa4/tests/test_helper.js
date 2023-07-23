const Blog = require('../models/blog')

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
    },
    {
        title: 'bad blog',
        url: '-',
        likes: 6
    }
]

module.exports = {
    initialBlogs
}
