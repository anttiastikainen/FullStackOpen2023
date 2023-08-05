import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/Error'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
    const [loginVisible, setLoginVisible] = useState(false)

    const [blogs, setBlogs] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )  
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    
    const loginForm = () => {
        const hideWhenVisible = { display: loginVisible ? 'none' : '' }
        const showWhenVisible = { display: loginVisible ? '' : 'none' }
            
            return (
                <div>
                <div style={hideWhenVisible}>
                <button onClick={() => setLoginVisible(true)}>log in</button>
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

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl 
        }

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNotification(`a new blog ${newTitle} by ${newAuthor} added`)
                setNewTitle('')
                setNewAuthor('')
                setNewUrl('')
            setTimeout(() => {
                setNotification(null)
            }, 5000)

            })
        .catch(error=> {
            console.log(error.message)
            setErrorMessage('Fill all the textfields to add blog!')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        })

    }

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const blogForm = () => (
        <form onSubmit={addBlog}>
        <div>
        title:
        <input
            value={newTitle}
            onChange={handleTitleChange}
        />
        </div>
        <div>
        author:
        <input
            value={newAuthor}
            onChange={handleAuthorChange}
        />
        </div>
        <div>
        url:
        <input
            value={newUrl}
            onChange={handleUrlChange}
        />
        </div>

           <button type="submit">create</button>
            </form>
)


    if (user === null) {
        return (
            <div>
            <h2> Log in to application</h2>
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
        <h2>create new</h2>
        {blogForm()}
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
        </div>
    )
}

export default App
