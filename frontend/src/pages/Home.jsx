import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";

function Home() {
    const [profile, setProfile] = useState([]);
    const [activeSection, setActiveSection] = useState("home");

    const sections = ["home", "about", "experience", "skills", "projects", "contact"];

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
        <div>
            {/* NAVBAR */}
            <nav style={{ position: "fixed", top: 0, width: "100%", background: "#fff", padding: "10px", zIndex: 1000 }}>
                {sections.map((section) => (
                    <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        style={{
                            marginRight: "10px",
                            fontWeight: activeSection === section ? "bold" : "normal",
                        }}
                    >
                        {section.toUpperCase()}
                    </button>
                ))}
            </nav>

            <div style={{ marginTop: "80px" }}>
                <section id="home" style={{ height: "100vh" }}>
                    <h1>Home Section</h1>
                </section>

                <section id="about" style={{ minHeight: "100vh", padding: "80px 20px" }}>
                    {profile && (
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "40px" }}>
                            
                            {/* LEFT SIDE */}
                            <div style={{ flex: 1 }}>
                                <h2>About Me</h2>
                                <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
                                    {profile.about}
                                </p>

                                <p>
                                    <strong>Location:</strong> Tashkent, Uzbekistan
                                </p>

                                <p>
                                    <strong>Phone:</strong> {profile.phone}
                                </p>

                                <p>
                                    <strong>Email:</strong> {profile.email}
                                </p>
                            </div>

                            {/* RIGHT SIDE - QUICK FACTS */}
                            <div style={{
                                flex: 1,
                                background: "#1f2937",
                                padding: "30px",
                                borderRadius: "12px",
                                color: "white"
                            }}>
                                <h3>Quick Facts</h3>

                                <p>
                                    <strong>Experience:</strong> {profile.experience}+ Years
                                </p>

                                <p>
                                    <strong>Stack Level:</strong> {profile.stack}
                                </p>

                                <p>
                                    <strong>Specialization:</strong> Full-Stack
                                </p>
                            </div>

                        </div>
                    )}
                </section>

                <section id="experience" style={{ height: "100vh" }}>
                    <h1>Experience Section</h1>
                </section>

                <section id="skills" style={{ height: "100vh" }}>
                    <h1>Skills Section</h1>
                </section>

                <section id="projects" style={{ height: "100vh" }}>
                    <h1>Projects Section</h1>
                </section>

                <section id="contact" style={{ minHeight: "100vh" }}>
                    <h1>Contact Section</h1>
                </section>
            </div>
        </div>
    );
}

export default Home;