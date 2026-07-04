import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Navbar from "../components/Navbar";
import ContentRenderer from "../components/ContentRenderer";
import api from "../api";
import "../styles/Blog.css";

function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    api
      .get(`/api/dev/blog/${slug}/`)
      .then((res) => setPost(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const images = (post?.images || []).map((img) => img.image || img.url || img);

  return (
    <div className="blog-page">
      <Navbar />
      <div className="blog-page-inner blog-detail-inner">
        <Link to="/blog" className="blog-back-link">
          <MdArrowBack /> Barcha bloglar
        </Link>

        {loading && <p className="blog-status">Yuklanmoqda...</p>}

        {!loading && error && (
          <p className="blog-status">Maqola topilmadi.</p>
        )}

        {!loading && !error && post && (
          <article>
            <h1 className="blog-detail-title">{post.title}</h1>
            <p className="blog-detail-date">
              {formatDate(post.published_date)}
            </p>

            <ContentRenderer content={post.content} images={images} />
          </article>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;
