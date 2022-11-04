import { useState } from 'react';

function Blog({ blog }) {
  const [viewDetails, setViewDetails] = useState(false);
  const cardStyle = {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    marginBottom: '8px',
    padding: '8px',

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
          {blog.likes}
          <button type="button">Like</button>
        </div>
        <div>
          {blog.author}
        </div>
      </div>
    );
}

export default Blog;
