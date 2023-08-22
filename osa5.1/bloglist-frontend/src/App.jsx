import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/Error'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    refreshBlogs()  
  }, [])

  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          console.log(user.name)
          blogService.setToken(user.tokeni)
}
}, [])

  const refreshBlogs = async () => {
      blogService.getAll().then(blogs =>
          setBlogs( sortBlogs(blogs)))
  }

  const sortBlogs = (blogs) => {
      let sortedBlogs = blogs.sort(
          (blog1, blog2) => (blog1.likes < blog2.likes) ? 1: (blog1.likes > blog2.likes) ? -1 : 0)
      return sortedBlogs
  }

  const loginForm = () => {
      const hideWhenVisible = { display: loginVisible ? 'none' : ''}
      const showWhenVisible = { display: loginVisible ? '' : 'none'}

  return (
      <div>
       <div style={hideWhenVisible}>
       <button onClick={() => setLoginVisible(true)}> log in </button>
      </div>
      <div style={showWhenVisible}>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
      <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
      </div>
    )
  }

  const handleLogin = async (event) => {
      event.preventDefault()
      try {
          const user = await loginService.login({
              username, password
          })
          window.localStorage.setItem(
              'loggedBlogappUser', JSON.stringify(user)
          )

          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
      } catch (exception) {
          setErrorMessage('wrong username or password')
          setTimeout(() => {
              setErrorMessage(null)
          }, 5000)
      }
  }

    const logOffUser = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
    }

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
        .create(blogObject)
        .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
            refreshBlogs()
        })
        .catch(error => {
            console.log(error.message)
            setErrorMessage('Fill all the textfields to add blog!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        })
    }

    if (user === null) {
        return (
            <div>
            <h2> Log in to application </h2>
            <ErrorNotification message={errorMessage} />
            {loginForm()}
            </div>
        )
    }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <ErrorNotification message={errorMessage} />
      <p>{user.name} logged in
      <button onClick={() => logOffUser() }>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
