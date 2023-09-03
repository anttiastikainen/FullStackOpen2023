import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            id="title"
            value={newTitle}
            onChange={event => setNewTitle(event.target.value)}
            placeholder="Enter title..."
          />
        </div>
        <div>
        author:
          <input
            id="author"
            value={newAuthor}
            onChange={event => setNewAuthor(event.target.value)}
            placeholder="Enter author..."
          />
        </div>
        <div>
        url:
          <input
            id="url"
            value={newUrl}
            onChange={event => setNewUrl(event.target.value)}
            placeholder="Enter url..."
          />
        </div>

        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.protoTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm

