import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode, MdMenu, MdClose } from "react-icons/md";
import "../styles/Navbar.css";

// "More" menyusidagi bo'limlar endi qattiq belgilangan (dinamik emas)
const MORE_ITEMS = [
  { label: "About Me", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

function Navbar({ brand = "Dev Portfolio" }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  const moreRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goTo = (path) => {
    setMoreOpen(false);
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <nav className="site-navbar">
      <div className="site-nav-inner">
        <Link to="/" className="site-logo">
          {brand}
        </Link>

        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <MdClose /> : <MdMenu />}
        </button>

        <div className={`site-nav-links ${mobileOpen ? "open" : ""}`}>
          <Link to="/blog" className="site-nav-link" onClick={() => setMobileOpen(false)}>
            Blog
          </Link>

          <div className="site-more" ref={moreRef}>
            <button
              className="site-nav-link more-btn"
              onClick={() => setMoreOpen(!moreOpen)}
            >
              More
            </button>
            {moreOpen && (
              <div className="more-dropdown">
                {MORE_ITEMS.map((item) => (
                  <button
                    key={item.path}
                    className="more-item"
                    onClick={() => goTo(item.path)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
