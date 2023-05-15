import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Blog from './Blog';

test('renders the blog title and author but not the number of likes by default', () => {
  const blog = {
    id: 1,
    title: 'Blog 1',
    likes: 5,
    author: 'Ken follet',
  };

  const { container } = render(<Blog blog={blog} />);

  const title = screen.queryByText(blog.title);
  const author = screen.queryByText(blog.author);
  const likes = container.querySelector('.number-of-likes');
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(likes).toBeNull();
});
