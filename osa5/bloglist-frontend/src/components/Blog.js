import {useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 3,
    border: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
}

 const [showData, setShowData] = useState(false)
 const [buttonText, setButtonText] = useState('View')
 const [likes, setLikes] = useState(blog.likes)

const showBlog = ()=> {
setShowData(!showData)
    if(!showData)
setButtonText('Hide')
    else setButtonText('View')
}

const addLike = async(event) => {
    event.preventDefault()
    const newLikes = likes+1
    const blogObject = {
        url: blog.url,
        title: blog.title,
        author: blog.author,
        user: blog.user.id,
        likes: newLikes,
        id: blog.id
    }
try {
    setLikes(newLikes)
    await blogService
        .update(blog.id,blogObject)
} catch (error){
    console.log(error.data)
}
    
}

return(
  <div style={blogStyle}>
    {blog.title} {blog.author}
    {showData && (
        <div>
        <p> {blog.url}</p>
        <p>likes: {likes}
        <button onClick={addLike}>like</button>
        </p>
        <p>{blog.user.username}</p>
            </div>
    )}
        <button onClick={showBlog}>{buttonText}</button>
        </div>
    )
}

export default Blog
