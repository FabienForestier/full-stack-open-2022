function BlogForm({
  title, author, setTitle, setAuthor, url, setUrl, addBlog,
}) {
  return (
    <form onSubmit={addBlog}>
      <div>
        Title
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

export default BlogForm;
