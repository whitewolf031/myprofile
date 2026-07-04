import { useState, useEffect } from "react";
import api from "../../api";

function ActivitiesAdmin() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ date: "", count: 1 });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function fetchData() {
    api
      .get("/api/admin-control/activities/")
      .then((res) => setData(res.data || []))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const resetForm = () => {
    setForm({ date: "", count: 1 });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({ date: item.date, count: item.count });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu faoliyat yozuvini o'chirmoqchimisiz?")) return;
    try {
      await api.delete(`/api/admin-control/activities/${id}/`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { date: form.date, count: Number(form.count) };
      if (editingId) {
        await api.put(`/api/admin-control/activities/${editingId}/`, payload);
      } else {
        await api.post("/api/admin-control/activities/", payload);
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Saqlashda xatolik yuz berdi");
    }
  };

  const logToday = async () => {
    try {
      await api.post("/api/admin-control/activities/log/");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Bugungi faoliyatni belgilashda xatolik yuz berdi");
    }
  };

  return (
    <div className="activities-admin">
      <h2>Faoliyat (Activities)</h2>
      <p className="admin-hint">
        Bu yerdagi yozuvlar bosh sahifadagi "Activites" jadvalini to'ldiradi —
        har bir sana qancha "yangilanish" bo'lganini bildiradi.
      </p>

      <button className="quick-log-button" onClick={logToday}>
        + Bugungi faoliyatni belgilash
      </button>
      <button className="create-button" onClick={() => setShowForm(true)}>
        + Sana bo'yicha qo'lda qo'shish
      </button>

      <hr className="divider" />

      {data.length === 0 && <p className="no-data">Hozircha faoliyat yo'q</p>}

      {data.length > 0 && (
        <table className="activity-table">
          <thead>
            <tr>
              <th>Sana</th>
              <th>Soni</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.count}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(item)}>
                    O'zgartirish
                  </button>{" "}
                  <button className="delete-button" onClick={() => handleDelete(item.id)}>
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="activity-form">
          <h3 className="form-title">{editingId ? "Tahrirlash" : "Yangi yozuv"}</h3>

          <input
            type="date"
            className="form-input"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />

          <input
            type="number"
            min="0"
            max="10"
            className="form-input"
            placeholder="Faoliyat soni (0-10)"
            value={form.count}
            onChange={(e) => setForm({ ...form, count: e.target.value })}
            required
          />

          <div className="form-actions">
            <button className="save-button" type="submit">
              Saqlash
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

export default ActivitiesAdmin;
