import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 3,
    border: '2px solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showData, setShowData] = useState(false)
  const [buttonText, setButtonText] = useState('View')
  const [likes, setLikes] = useState(blog.likes)

  const showBlog = () => {
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

  const removeBlog = async(event) => {
    event.preventDefault()
    const token = blogService.getToken()

    try {
      await blogService
        .remove(blog.id, token , blog.title)
    } catch (error) {
      console.log(error.data)
    }
  }

  return(
    <div style={blogStyle} className='blog'>
      {blog.title} - {blog.author}
      {showData && (
        <div>
          <p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </p>
          <p>likes: {likes}
            <button onClick={addLike}>like</button>
          </p>
          <p>{blog.user.username}</p>
          <p><button onClick={removeBlog}>remove</button></p>
        </div>
      )}
      <button onClick={showBlog}>{buttonText}</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired
}

export default Blog
