import React from 'react'
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog Component', () => {
    const mockBlog = {
        id: '123',
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'https://testi.fi',
        likes: 1,
        user: {
            id:'64da589724070b22f54578ff',
            username: 'testi',
            name:'Testi man'
        }
    }

test('renders title and author', () => {
    const blog = render(<Blog blog={mockBlog} />)
    expect(blog.container).toHaveTextContent('Test Blog Title')
    expect(blog.container).toHaveTextContent('Test Author')
    })
})
