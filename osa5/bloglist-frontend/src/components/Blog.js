const Blog = ({blog}) => (

  <div>
    {blog.title} {blog.author} <button onClick={() => console.log(blog.url+"\nlikes "+ blog.likes+"\n"+blog.user.username)}> view </button>
  </div>  
)

export default Blog
