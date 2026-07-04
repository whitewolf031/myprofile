import { useState, useEffect } from "react";
import ImageGalleryEditor from "../../components/ImageGalleryEditor";
import api from "../../api";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function BlogAdmin() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    published_date: "",
  });
  const [newFiles, setNewFiles] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  function fetchData() {
    api
      .get("/api/admin-control/blog/")
      .then((res) => setData(res.data || []))
      .catch(console.error);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm({ title: "", slug: "", content: "", published_date: "" });
    setNewFiles([]);
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || "",
      slug: item.slug || "",
      content: item.content || "",
      published_date: item.published_date ? item.published_date.split("T")[0] : "",
    });
    setNewFiles([]);
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu maqolani o'chirmoqchimisiz?")) return;
    try {
      await api.delete(`/api/admin-control/blog/${id}/`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!editingItem) return;
    if (!window.confirm("Bu rasmni o'chirmoqchimisiz?")) return;
    try {
      await api.delete(`/api/admin-control/blog/${editingItem.id}/images/${imageId}/`);
      const refreshed = data.map((p) =>
        p.id === editingItem.id
          ? { ...p, images: (p.images || []).filter((i) => i.id !== imageId) }
          : p
      );
      setData(refreshed);
      setEditingItem({
        ...editingItem,
        images: (editingItem.images || []).filter((i) => i.id !== imageId),
      });
    } catch (err) {
      console.error(err);
      alert("Rasmni o'chirishda xatolik yuz berdi");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("slug", form.slug || slugify(form.title));
      fd.append("content", form.content);
      fd.append(
        "published_date",
        form.published_date || new Date().toISOString().slice(0, 10)
      );
      newFiles.forEach((file) => fd.append("new_images", file));

      if (editingItem) {
        await api.patch(`/api/admin-control/blog/${editingItem.id}/`, fd);
      } else {
        await api.post("/api/admin-control/blog/", fd);
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="blog-admin">
      <h2>Blog maqolalari</h2>
      <p className="admin-hint">
        Har bir maqolada matn va cheklanmagan sondagi rasm bo'lishi mumkin —
        rasmlar paragraflar orasiga avtomatik joylashadi.
      </p>

      <button className="create-button" onClick={() => setShowForm(true)}>
        + Yangi maqola qo'shish
      </button>

      <hr className="divider" />

      {data.length === 0 && <p className="no-data">Hozircha maqola yo'q</p>}

      {data.map((item) => (
        <div key={item.id} className="blog-box">
          <h3 className="box-title">{item.title}</h3>
          <p className="box-stack">
            <strong>Sana:</strong> {item.published_date}
          </p>
          {item.images?.length > 0 && (
            <div className="admin-image-row">
              {item.images.map((img) => (
                <img key={img.id} src={img.image} alt="" className="box-image-preview small" />
              ))}
            </div>
          )}

          <div className="box-actions">
            <button className="edit-button" onClick={() => handleEdit(item)}>
              O'zgartirish
            </button>
            <button className="delete-button" onClick={() => handleDelete(item.id)}>
              O'chirish
            </button>
          </div>
        </div>
      ))}

      {showForm && (
        <form onSubmit={handleSubmit} className="blog-form">
          <h3 className="form-title">{editingItem ? "Maqolani tahrirlash" : "Yangi maqola"}</h3>

          <input
            className="form-input"
            placeholder="Sarlavha"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            className="form-input"
            placeholder="Slug (bo'sh qoldirsangiz avtomatik yaratiladi)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />

          <input
            type="date"
            className="form-input"
            value={form.published_date}
            onChange={(e) => setForm({ ...form, published_date: e.target.value })}
          />

          <textarea
            className="form-textarea"
            placeholder="Maqola matni (har bir paragraf yangi qatordan)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={8}
            required
          />

          <ImageGalleryEditor
            existingImages={editingItem?.images || []}
            newFiles={newFiles}
            onDeleteExisting={handleDeleteImage}
            onNewFilesChange={setNewFiles}
          />

          <div className="form-actions">
            <button className="save-button" type="submit" disabled={saving}>
              {saving ? "Saqlanmoqda..." : "Saqlash"}
            </button>
            <button className="cancel-button" type="button" onClick={resetForm}>
              Bekor qilish
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default BlogAdmin;
