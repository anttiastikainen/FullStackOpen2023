// import [ useState } from 'react'
//import blogService from '../services/blogs'
//import PropTypes from 'prop-types'


const Blog = ({ blog }) => {

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 3,
    border: '2px solid',
    marginBottom: 5
}
return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
  </div>  
)

}


export default Blog
