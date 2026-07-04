import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api";
import "../styles/Blog.css";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/dev/blog/")
      .then((res) => setPosts(res.data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="blog-page">
      <Navbar />
      <div className="blog-page-inner">
        <h1 className="blog-page-title">Blogs</h1>

        {loading && <p className="blog-status">Yuklanmoqda...</p>}

        {!loading && posts.length === 0 && (
          <p className="blog-status">Hozircha maqolalar yo'q.</p>
        )}

        <div className="blog-list">
          {posts.map((post) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.id}
              className="blog-row"
            >
              <span className="blog-row-title">{post.title}</span>
              <span className="blog-row-date">
                {formatDate(post.published_date)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogList;
