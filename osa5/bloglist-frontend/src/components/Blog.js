import {useState } from 'react'

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

const showBlog = ()=> {
setShowData(!showData)
    if(!showData)
setButtonText('Hide')
    else setButtonText('View')
}

return(
  <div style={blogStyle}>
    {blog.title} {blog.author}
    {showData && (
        <div>
        <p> {blog.url}</p>
        <p>likes: {blog.likes}</p>
        <p>{blog.user.username}</p>
            </div>
    )}
        <button onClick={showBlog}>{buttonText}</button>
        </div>
    )
}

export default Blog
