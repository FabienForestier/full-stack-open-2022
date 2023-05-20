import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import BlogForm from './BlogForm';

test('should call addBlog when form is submitted', async () => {
  const addBlog = jest.fn();
  const user = userEvent.setup();
  const blog = {
    title: 'blog title',
    author: 'ken follet',
    url: 'https://ken-follet.com'
  };

  render(<BlogForm addBlog={addBlog} />);

  const titleInput = screen.getByTestId('title-input');
  const authorInput = screen.getByTestId('author-input');
  const urlInput = screen.getByTestId('url-input');
  const sendButton = screen.getByTestId('send-button');

  await user.type(titleInput, blog.title);
  await user.type(authorInput, blog.author);
  await user.type(urlInput, blog.url);
  await user.click(sendButton);

  expect(addBlog).toHaveBeenCalledTimes(1);
  expect(addBlog).toHaveBeenCalledWith(blog);
});
