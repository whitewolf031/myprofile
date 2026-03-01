import { useState, useEffect } from "react";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md"; // Material Design icons
import api from "../api";
import "../styles/Home.css";

function Home() {
    const [profile, setProfile] = useState([]);
    const [activeSection, setActiveSection] = useState("home");

    const sections = ["home", "about", "experience", "skills", "projects", "contact", "blog"];

    useEffect(() => {
        getProfile();

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;

                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getProfile = async () => {
        try {
            const res = await api.get("/api/dev/info/");
            console.log(res)
            setProfile(res.data[0]); // array ichidan birinchi object
        } catch (err) {
            console.error(err);
        }
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="portfolio-container">

        {/* ===== NAVBAR ===== */}
        <nav className="navbar">
            <div className="nav-inner">
                <div className="nav-content">

                    {/* Logo */}
                    <div className="logo">
                        Sardorbek Ergashev
                    </div>

                    {/* Desktop Menu */}
                    <div className="nav-menu">
                        {sections.map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`nav-button ${
                                    activeSection === section ? "nav-active" : ""
                                }`}
                            >
                                {section.toUpperCase()}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </nav>

        {/* ===== MAIN CONTENT ===== */}
        <div>

            {/* HOME */}
            <section id="home" className="section hero">

                <div className="hero-content">

                    <h1 className="hero-title" style={{ fontSize: "70px" }}>
                        <b>Sardorbek Ergashev</b>
                    </h1>

                    <h2 className="hero-subtitle">
                        Full-Stack Software Engineer
                    </h2>

                    <p className="hero-description">
                        Passionate developer with expertise in Python, Django, and Laravel. 
                        Building scalable APIs, Telegram bots, and impactful web applications.
                    </p>

                </div>

            </section>

            {/* ABOUT */}
            <section id="about" className="section section-dark">
                {profile && (
                    <div className="section-container grid-2">

                        {/* LEFT SIDE */}
                        <div>
                            <h2>About Me</h2>

                            <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
                                {profile.about}
                            </p>

                            <p className="info-row">
                                <MdLocationOn className="info-icon location" />
                                Tashkent, Uzbekistan
                            </p>

                            <p className="info-row">
                                <MdPhone className="info-icon phone" />
                                {profile.phone}
                            </p>

                            <p className="info-row">
                                <MdEmail className="info-icon email" />
                                {profile.email}
                            </p>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="card">
                            <h3 style={{ textAlign: "center", marginBottom: "24px" }}>
                                Quick Facts
                            </h3>

                            <div style={{ display: "grid", gap: "16px" }}>

                                <div className="flex-between card1">
                                    <span className="card-text">Experience </span>
                                    <span style={{ color: "#3b82f6" }}>
                                        {profile.experience}+ Years
                                    </span>
                                </div>

                                <div className="flex-between card1">
                                    <span className="card-text">Stack Level </span>
                                    <span style={{ color: "#4ade80" }}>
                                        {profile.stack}
                                    </span>
                                </div>

                                <div className="flex-between card1">
                                    <span className="card-text">Specialization </span>
                                    <span style={{ color: "#a855f7" }}>
                                        Full-Stack
                                    </span>
                                </div>

                                <div className="flex-between card1">
                                    <span className="card-text">Projects Completed </span>
                                    <span style={{ color: "#008104" }}>
                                        10+
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                )}
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="section">
                <div className="section-container">
                    <h1>Experience Section</h1>
                </div>
            </section>

            {/* SKILLS */}
            <section id="skills" className="section section-dark">
                <div className="section-container">
                    <h1>Skills Section</h1>
                </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="section">
                <div className="section-container">
                    <h1>Projects Section</h1>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact" className="section section-dark">
                <div className="section-container">
                    <h1>Contact Section</h1>
                </div>
            </section>

        </div>
    </div>
    );
}

export default Home;