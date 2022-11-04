import { useState } from 'react';

function Blog({
  blog, showDeleteButton, handleLikeBlog, handleRemoveBlog,
}) {
  const [viewDetails, setViewDetails] = useState(false);
  const cardStyle = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    marginBottom: '8px',
    padding: '8px',

  };
  const deleteButtonStyle = {
    color: 'white',
    backgroundColor: 'red',
  };

  return !viewDetails
    ? (
      <div style={cardStyle}>
        {blog.title}
        {' '}
        {blog.author}
        <button type="button" onClick={() => setViewDetails(true)}>View</button>
      </div>
    )
    : (
      <div style={cardStyle}>
        <div>
          {blog.title}
          <button type="button" onClick={() => setViewDetails(false)}>Hide</button>
        </div>
        <div>
          Likes
          {' '}
          {blog.likes}
          <button type="button" onClick={() => handleLikeBlog({ id: blog.id, likes: blog.likes + 1 })}>Like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div>
          { showDeleteButton && <button style={deleteButtonStyle} type="button" onClick={() => handleRemoveBlog(blog)}>Delete</button>}
        </div>
      </div>
    );
}

export default Blog;
