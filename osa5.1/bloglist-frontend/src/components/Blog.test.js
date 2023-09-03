import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog tests', () => {

  test('renders blog title and author', () => {
    const blog = {
      id: '123',
      title: 'testi blog',
      author: 'Teppo Taputtaja',
      url: 'http://google.com',
      likes: 5,
      user: {
        id: '456',
        username: 'testuser',
        name: 'Test User'
      }

    }

    render(<Blog blog={blog} />)

    const titleElement = screen.getByText('testi blog - Teppo Taputtaja')
    expect(titleElement).toBeInTheDocument()

  })

  test('renders children after button pressed', async () => {

    const user = userEvent.setup()
    const blog = {
      id: '123',
      title: 'testi blog',
      author: 'Teppo Taputtaja',
      url: 'http://google.com',
      likes: 5,
      user: {
        id: '456',
        username: 'testuser',
        name: 'Test User'
      }
    }

    const { container } = render(<Blog blog={blog} />)

    const button = screen.getByText('View')

    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).toHaveStyle('display: block')

    const linkElement = screen.getByRole('link', { name: 'http://google.com' })
    expect(linkElement).toHaveAttribute('href', 'http://google.com')

    const likesText = screen.getByText('likes: 5')
    expect(likesText).toBeVisible()

    const userText = screen.getByText('testuser')
    expect(userText).toBeVisible()


  })
  test('test if event handler is called twice when button is pressed twice', async () => {

    const user = userEvent.setup()
    const blog = {
      id: '123',
      title: 'testi blog',
      author: 'Teppo Taputtaja',
      url: 'http://google.com',
      likes: 0,
      user: {
        id: '456',
        username: 'testuser',
        name: 'Test User'
      }
    }

    const addLikeMock = jest.fn()

    render(<Blog blog={blog} addLike={addLikeMock} />)

    const viewButton = screen.getByText('View')

    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    expect(likeButton).toBeVisible()

    await user.click(likeButton)

    await user.click(likeButton)

    expect(addLikeMock.mock.calls).toHaveLength(2)

    const likeCount = screen.getByText('likes: 2')
    expect(likeCount).toBeVisible()

  })

  test('test if createblog function is called with correct data when new blog is created', async () => {

    const addBlogMock = jest.fn()

    render (<BlogForm createBlog={addBlogMock} />)

    const titleInput = screen.getByPlaceholderText('Enter title...')
    const authorInput = screen.getByPlaceholderText('Enter author...')
    const urlInput = screen.getByPlaceholderText('Enter url...')

    expect(titleInput).toBeVisible()
    expect(authorInput).toBeVisible()
    expect(urlInput).toBeVisible()

    await userEvent.type(titleInput, 'Test Title')
    await userEvent.type(authorInput, 'Test Author')
    await userEvent.type(urlInput, 'https://testi.fi')

    const createNewBlogButton = screen.getByText('create')

    expect(createNewBlogButton).toBeVisible()

    await userEvent.click(createNewBlogButton)

    expect(addBlogMock.mock.calls).toHaveLength(1)

    expect(addBlogMock.mock.calls[0][0].title).toBe('Test Title')
    expect(addBlogMock.mock.calls[0][0].author).toBe('Test Author')
    expect(addBlogMock.mock.calls[0][0].url).toBe('https://testi.fi')
  })

})
