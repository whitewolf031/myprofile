import { useState, useEffect } from "react";
import ImageGalleryEditor from "../../components/ImageGalleryEditor";
import api from "../../api";

function AboutAdmin() {
  const [data, setData] = useState(null);
  const [content, setContent] = useState("");
  const [newFiles, setNewFiles] = useState([]);
  const [saving, setSaving] = useState(false);

  function fetchData() {
    api
      .get("/api/dev/info/")
      .then((res) => {
        setData(res.data);
        setContent(res.data?.content || "");
      })
      .catch(console.error);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Bu rasmni o'chirmoqchimisiz?")) return;
    try {
      await api.delete(`/api/admin-control/dev/images/${imageId}/`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Rasmni o'chirishda xatolik yuz berdi");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("content", content);
      newFiles.forEach((file) => fd.append("new_images", file));

      await api.patch("/api/admin-control/dev/", fd);
      setNewFiles([]);
      fetchData();
      alert("Saqlandi");
    } catch (err) {
      console.error(err);
      alert("Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="about-admin">
      <h2>About Me</h2>
      <p className="admin-hint">
        Bu yerdagi matn va rasmlar "/about" sahifasida chiqadi. Har bir
        paragrafdan keyin navbatdagi rasm joylashadi (frontend avtomatik
        joylashtiradi), rasmlar soni cheklanmagan.
      </p>

      <form onSubmit={handleSave} className="section-form">
        <textarea
          className="form-textarea"
          placeholder="Matn (har bir paragraf yangi qatordan)"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <ImageGalleryEditor
          existingImages={data?.images || []}
          newFiles={newFiles}
          onDeleteExisting={handleDeleteImage}
          onNewFilesChange={setNewFiles}
        />

        <div className="form-actions">
          <button className="save-button" type="submit" disabled={saving}>
            {saving ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AboutAdmin;
