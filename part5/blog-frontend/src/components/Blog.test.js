import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Blog from './Blog';

let container;
const blog = {
  id: 1,
  title: 'Blog 1',
  likes: 5,
  author: 'Ken Follet',
};

beforeEach(() => {
  const view = render(<Blog blog={blog} />);
  container = view.container;
});

test('renders the blog title and author but not the number of likes by default', () => {
  const title = screen.queryByText(blog.title);
  const author = screen.queryByText(blog.author);
  const likes = container.querySelector('.number-of-likes');
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(likes).toBeNull();
});

test('should display the number of likes when the show details button has been clicked', async () => {
  const user = userEvent.setup();
  const button = container.querySelector('.view-details-button');
  await user.click(button);

  const likes = screen.getByTestId('number-of-likes');
  expect(likes).toBeDefined();
  expect(likes.textContent.includes(blog.likes)).toBe(true);
});
