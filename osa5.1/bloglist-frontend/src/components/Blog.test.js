import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

  const linkElement = screen.getByRole('link', { name: 'http://google.com' });
  expect(linkElement).toHaveAttribute('href', 'http://google.com');

    const likesText = screen.getByText('likes: 5')
    expect(likesText).toBeVisible()

    const userText = screen.getByText('testuser')
    expect(userText).toBeVisible()


})

})
