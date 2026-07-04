import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api";
import "../styles/Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact/create/", { name, email, message });
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Xabar yuborishda xatolik yuz berdi. Birozdan keyin qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />
      <div className="contact-page-inner">
        <h1 className="contact-title">Ready to collaborate?</h1>
        <p className="contact-subtitle">
          Savol, taklif yoki hamkorlik bo'yicha xabar qoldiring — tez orada
          javob beraman.
        </p>

        <div className="contact-card">
          <h3 className="contact-card-title">Send a Message</h3>

          {sent && (
            <p className="contact-success">Xabaringiz muvaffaqiyatli yuborildi, rahmat!</p>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <label className="contact-label">Name</label>
            <input
              className="contact-input"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="contact-label">Email</label>
            <input
              className="contact-input"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="contact-label">Message</label>
            <textarea
              className="contact-textarea"
              placeholder="How can I help you today?"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            <button className="contact-submit" type="submit" disabled={loading}>
              {loading ? "Yuborilmoqda..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
