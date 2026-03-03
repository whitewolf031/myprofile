import React from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import DevInfoAdmin from "./DevInfoAdmin";
import ExperienceAdmin from "./ExperienceAdmin";
import ProjectAdmin from "./ProjectsAdmin";
import "../../styles/AdminControl.css";
import Logout from "../../pages/Logout"

function AdminControl() {
  const location = useLocation();
  const navigate = useNavigate();
  const base = "/admin";

  const currentPath = location.pathname;

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <h1 className="navbar-title">Sardorbek Ergashev</h1>

        <button className="logout-btn" onClick={<Logout />}>
          Logout
        </button>
      </nav>

      <div className="content-wrapper">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li>
              <Link
                to={`${base}/information`}
                className={`sidebar-button ${currentPath === `${base}/information` ? "active" : ""}`}
              >
                Information
              </Link>
            </li>
            <li>
              <Link
                to={`${base}/experience`}
                className={`sidebar-button ${currentPath === `${base}/experience` ? "active" : ""}`}
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                to={`${base}/projects`}
                className={`sidebar-button ${currentPath === `${base}/projects` ? "active" : ""}`}
              >
                Projects
              </Link>
            </li>
          </ul>
        </aside>

        <main className="main-content">
          <Routes>
            <Route path="/information" element={<DevInfoAdmin />} />
            <Route path="/experience" element={<ExperienceAdmin />} />
            <Route path="/projects" element={<ProjectAdmin />} />
            <Route
              path="/"
              element={
                <div className="welcome-message">
                  <h2>Admin paneliga xush kelibsiz</h2>
                  <p>Chap tarafdagi menyudan bo'limni tanlang</p>
                </div>
              }
            />
            <Route path="*" element={<h2>404 - Sahifa topilmadi</h2>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminControl;