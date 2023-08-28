import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog content', () => {
  const blog = {
    id: '123',
    title: 'Example Blog',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 5
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText('Example Blog - John Doe')
  expect(titleElement).toBeInTheDocument()

})



test('clicking the "View" button shows additional information', () => {
  const blog = {
    id: '123',
    title: 'Example Blog',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 5,
    user: {
      id: 'user123',
      username: 'john'
    }
  }

  render(<Blog blog={blog} />)

  const viewButton = screen.getByText('View')
  fireEvent.click(viewButton)

})

