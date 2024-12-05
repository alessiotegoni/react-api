import { useEffect, useState } from "react";
import { api, baseURL } from "./config/api";

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  const handleDeletePost = async (postId) => {
    await api.delete(`/posts/${postId}`);
    setPosts(posts.filter((post) => post.id !== postId));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <h1 className="pt-3">Il mio blog</h1>
        </div>
      </header>
      <main>
        <div className="container">
          {posts.length ? (
            <div className="row g-4 my-4">
              {posts.map((post) => (
                <div
                  className="col-12 col-md-6 col-xl-4 d-flex flex-column justify-content-between"
                  key={post.id}
                >
                  <div>
                    <figure>
                      <img
                        src={`${baseURL}/${post.image}`}
                        className="ratio ratio-1x1 rounded-4"
                      />
                      <figcaption className="mt-1 fs-5 fw-semibold">
                        {post.title}
                      </figcaption>
                    </figure>
                    <ul className="d-flex flex-wrap p-0 gap-2">
                      {post.tags.map((tag, i) => (
                        <li
                          key={i}
                          className="list-group-item bg-primary px-2 rounded-2 fw-medium"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <p>{post.content}</p>
                  </div>
                  <button
                    className="btn bg-danger text-bg-danger align-self-start"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Elimina
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Nessun post trovato</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
