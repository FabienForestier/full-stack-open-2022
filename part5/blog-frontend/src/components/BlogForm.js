import { PropTypes } from 'prop-types';
import { forwardRef, useImperativeHandle, useState } from 'react';

const BlogForm = forwardRef(({ addBlog }, refs) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const reset = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  useImperativeHandle(refs, () => ({
    reset,
  }));

  const onSubmit = (event) => {
    event.preventDefault();
    addBlog({ title, author, url });
    reset();
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        Title
        <input
          data-testid="title-input"
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          data-testid="author-input"
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url
        <input
          data-testid="url-input"
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button data-testid="send-button" type="submit">Add</button>
    </form>
  );
});

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
