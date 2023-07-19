const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    let likes = 0;

    for ( let i = 0; i < blogs.length; i++)
    {
        likes = likes + blogs[i].likes;
    }
    return likes;
}

favoriteBlog = (blogs) => {
    let favoriteBlog = {
        title: '',
        author: '',
        likes: 0
    }

    for( let i = 0; i < blogs.length; i++)
    {
        if(blogs[i].likes > favoriteBlog.likes)
        {
            favoriteBlog.title=blogs[i].title
            favoriteBlog.author=blogs[i].author
            favoriteBlog.likes=blogs[i].likes
        }
    }
    return favoriteBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
