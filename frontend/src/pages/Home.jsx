import { useState, useEffect } from "react";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md"; // Material Design icons
import { FaAlignJustify, FaCode } from "react-icons/fa";
import api from "../api";
import "../styles/Home.css";
function Home() {
    const [profile, setProfile] = useState(null);
    const [experience, setExperience] = useState([]);
    const [projects, setProjects] = useState([]);
    const [activeSection, setActiveSection] = useState("home");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const sections = ["home", "about", "experience", "skills", "projects", "contact", "blog"];

    const achievementColors = ['#2563eb', '#16a34a', '#f97316'];
    const responsibilityColors = ['#a855f7', '#ef4444', '#eab308'];

    useEffect(() => {
        getProfile();
        getExperience();
        getProject();

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

    const getExperience = async () => {
        const res = await api.get("/api/dev/experience/");
        console.log(res)
        setExperience(res.data);
    };

    const getProject = async () => {
        const res = await api.get("/api/dev/projects/");
        console.log(res)
        setProjects(res.data);
    };

    const createContact = (e) => {
        e.preventDefault();
        api.post("/contact/create", {
            name,
            email,
            message
        })
        .then((res) => {
            if (res.status === 201 || res.status === 200) {
                alert("Message sent successfully!");
               
                // Formani tozalash
                setName("");
                setEmail("");
                setMessage("");
            } else {
                alert("Failed to send message.");
            }
        })
        .catch((err) => {
            console.error(err);
            alert("Error sending message.");
        });
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
                    <div className="box-button">
                        <a
                            href="mailto:contact@example.com"
                            className="btn-primary-custom"
                        >
                            <MdEmail className="btn-icon" />
                            Get In Touch
                        </a>
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="btn-secondary-custom"
                        >
                            <FaCode className="btn-icon" />
                            View Projects
                        </button>
                    </div>
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
                    <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
                    Experience
                    </h2>

                    {experience.length > 0 ? (
                    <div className="experiences-grid">
                        {experience.map((exp) => (
                        <div key={exp.id} className="experience-card">
                            {/* Header */}
                            <div className="experience-header">
                            <div>
                                <h3 className="experience-title">{exp.title}</h3>
                                <p className="experience-company">{exp.company}</p>
                            </div>
                            <p className="experience-location">📍 {exp.location}</p>
                            </div>

                            <div className="experience-meta">
                            <span>
                                ⏳ {exp.start_date} — {exp.is_current ? "Present" : exp.end_date}
                            </span>
                            <span>{exp.employment_type}</span>
                            </div>

                            {/* Details */}
                            <div className="experience-details">
                            <div className="achievements-column">
                                <h4>Key Achievements</h4>
                                {exp.achievements?.split("\n").filter(Boolean).map((item, index) => (
                                <div key={index} className="achievement-item">
                                    <span className="bullet" style={{ color: achievementColors[index % 3] }}>
                                    ●
                                    </span>
                                    <span>{item}</span>
                                </div>
                                ))}
                            </div>

                            <div className="responsibilities-column">
                                <h4>Responsibilities</h4>
                                {exp.responsibilities?.split("\n").filter(Boolean).map((item, index) => (
                                <div key={index} className="responsibility-item">
                                    <span className="bullet" style={{ color: responsibilityColors[index % 3] }}>
                                    ●
                                    </span>
                                    <span>{item}</span>
                                </div>
                                ))}
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <div className="empty-experience">
                        <div className="empty-card">
                        <div className="empty-icon">🚀</div>
                        <h3>Building the future, one line of code at a time</h3>
                        <p>
                            I'm actively working on exciting projects and gaining hands-on experience 
                            in full-stack development. Check back soon — new adventures are being written!
                        </p>
                        <p className="subtitle">
                            Currently crafting scalable solutions with Django, PostgreSQL, React & more...
                        </p>
                        </div>
                    </div>
                    )}
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
                    <h1>Contact Me</h1>
                    <form onSubmit={createContact} className="contact-form">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Your Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <button type="submit">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    </div>
    );
}

export default Home;