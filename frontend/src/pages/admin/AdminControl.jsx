// src/components/admin/AdminControl.jsx
import React from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import ActivitiesAdmin from "./ActivitiesAdmin";
import AboutAdmin from "./AboutAdmin";
import ProjectsAdmin from "./ProjectsAdmin";
import BlogAdmin from "./BlogAdmin";
import "../../styles/AdminControl.css";
import "../../styles/AdminForms.css";
import Logout from "../Logout"

function AdminControl() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Logout(navigate);
  };

  const isActive = (path) => location.pathname === `/admin/${path}`;

  const links = [
    { path: "activities", label: "Activities" },
    { path: "about", label: "About Me" },
    { path: "projects", label: "Projects" },
    { path: "blog", label: "Blog" },
  ];

  return (
    <div className="admin-layout">
      <nav className="admin-navbar">
        <div className="admin-navbar-inner">
          <h1 className="admin-title">Admin Panel</h1>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="admin-body">
        <aside className="admin-sidebar">
          <ul>
            {links.map((l) => (
              <li key={l.path}>
                <Link
                  to={`/admin/${l.path}`}
                  className={`admin-link ${isActive(l.path) ? "active" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <main className="admin-content">
          <Routes>
            <Route index element={
              <div className="admin-welcome">
                <h2>Admin paneliga xush kelibsiz</h2>
                <p>Chap tarafdagi menyudan bo'limni tanlang</p>
              </div>
            }/>
            <Route path="activities" element={<ActivitiesAdmin />} />
            <Route path="about" element={<AboutAdmin />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="blog" element={<BlogAdmin />} />
            <Route path="*" element={<h2>404 - Sahifa topilmadi</h2>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminControl;
