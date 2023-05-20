import { useState } from 'react';

function Blog({ blog, showDeleteButton, handleLikeBlog, handleRemoveBlog }) {
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

  return !viewDetails ? (
    <div data-cy="blog-summary" style={cardStyle}>
      {blog.title} {blog.author}
      <button
        type="button"
        data-cy="view-details-button"
        data-testid="view-details-button"
        onClick={() => setViewDetails(true)}
      >
        View
      </button>
    </div>
  ) : (
    <div data-cy="blog-summary-details" style={cardStyle}>
      <div>
        {blog.title}
        <button
          data-cy="hide-details-button"
          type="button"
          onClick={() => setViewDetails(false)}
        >
          Hide
        </button>
      </div>
      <div data-testid="number-of-likes">
        Likes <span data-cy="blog-number-of-likes">{blog.likes}</span>
        <button
          type="button"
          data-cy="like-button"
          data-testid="like-button"
          onClick={() => handleLikeBlog({ id: blog.id, likes: blog.likes + 1 })}
        >
          Like
        </button>
      </div>
      <div>{blog.author}</div>
      <div>
        {showDeleteButton && (
          <button
            data-cy="delete-button"
            style={deleteButtonStyle}
            type="button"
            onClick={() => handleRemoveBlog(blog)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Blog;
