import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, user }) => {

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

  const incrementLikes = () => {
    const updatedLikes = likes + 1
    setLikes(updatedLikes)
  }

  return(
    <div className='blog' style={blogStyle}>
      {blog.title} - {blog.author}
      {showData && (
        <div>
          <p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </p>
          <p>likes: {likes}
            <button onClick={() => {incrementLikes(), addLike()}}>like</button>
          </p>
          <p>{blog.user.username}</p>
          {user && user.username === blog.user.username && (
          <p><button onClick={removeBlog}>remove</button></p>
          )}
        </div>
      )}
      <button id="view-button" onClick={showBlog}>{buttonText}</button>
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
