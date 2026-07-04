import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ContentRenderer from "../components/ContentRenderer";
import api from "../api";
import "../styles/InfoPage.css";

function Projects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get("/api/dev/projects/")
      .then((res) => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const images = (data?.images || []).map((img) => img.image || img.url || img);

  return (
    <div className="info-page">
      <Navbar />
      <div className="info-page-inner">
        <h1 className="info-page-title">Projects</h1>

        {loading && <p className="info-status">Yuklanmoqda...</p>}
        {!loading && error && <p className="info-status">Ma'lumot topilmadi.</p>}

        {!loading && !error && data && (
          <ContentRenderer content={data.content} images={images} />
        )}
      </div>
    </div>
  );
}

export default Projects;
