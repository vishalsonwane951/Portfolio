import React, { useEffect, useState } from "react";

function Portfolio() {
    const [isOpen, setIsOpen] = useState(false);

    // ✅ Certificate URLs
    const certificates = {
        btech: "https://your-link.com/BTech-Certificate.pdf",
        mern: "https://your-link.com/MERN-Certificate.pdf",
        python: "https://your-link.com/Python-Certificate.pdf",
    };

    // ✅ Function to open certificate
    const openCertificate = (type) => {
        const url = certificates[type];
        if (url) {
            window.open(url, "_blank");
        } else {
            alert("Certificate not available yet!");
        }
    };

    // ✅ Contact form state
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you for getting in touch!");
        setFormData({ name: "", email: "", message: "" });
    };

    useEffect(() => {
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute("href"));
                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            });
        });

        // Section fade-in observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, observerOptions);

        document.querySelectorAll("section").forEach((section) => {
            section.style.opacity = "0";
            section.style.transform = "translateY(30px)";
            section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(section);
        });

        // Active navigation highlighting
        const handleScroll = () => {
            let current = "";
            document.querySelectorAll("section").forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute("id");
                }
            });

            document.querySelectorAll("nav a").forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href").slice(1) === current) {
                    link.classList.add("active");
                }
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            {/* === your entire original code remains unchanged above === */}

            {/* Education Section */}
            <section id="education">
                <h2 className="section-title">Education & Certification</h2>
                <div className="education-grid">
                    <div className="education-card">
                        <h3>Bachelor of Technology</h3>
                        <p className="institution">Dr. Babasaheb Ambedkar Technological University, Lonere, Raigad</p>
                        <div className="details">
                            <p><strong>Status:</strong> Completed</p>
                            <p><strong>CGPA :</strong> 7.35 / 10</p>
                        </div>
                        {/* ✅ Added click logic */}
                        <button
                            className="button button-secondary p-2 rounded bg-dark text-white"
                            onClick={() => openCertificate("btech")}
                        >
                            View Certificate
                        </button>
                    </div>

                    {/* MERN */}
                    <div className="education-card">
                        <h3>MERN Stack Development</h3>
                        <p className="institution">The Kiran Academy</p>
                        <div className="details">
                            <p><strong>Technologies:</strong> Node.js, Express.js, React.js, MongoDB</p>
                            <button
                                className="button button-secondary p-2 rounded bg-dark text-white"
                                onClick={() => openCertificate("mern")}
                            >
                                View Certificate
                            </button>
                        </div>
                    </div>

                    {/* Python */}
                    <div className="education-card">
                        <h3>PYTHON Full-Stack Development</h3>
                        <p className="institution">The Kiran Academy</p>
                        <div className="details">
                            <p><strong>Technologies:</strong> Core Java, Spring Boot, MySQL, Hibernate</p>
                            <button
                                className="button button-secondary p-2 rounded bg-dark text-white"
                                onClick={() => openCertificate("python")}
                            >
                                View Certificate
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact">
                <h2 className="section-title">Get In Touch</h2>
                <div className="contact-content">
                    <p>
                        I'm currently looking for new opportunities and collaborations.
                        Whether you have a question or just want to say hi, feel free to
                        reach out!
                    </p>
                    <div className="contact-links ">
                        <a href="mailto:vishalsonwane951@gmail.com" className="contact-link text-decoration-none">📧 Email</a>
                        <a href="https://github.com/vishalsonwane951" target="_blank" rel="noreferrer" className="contact-link text-decoration-none">💻 GitHub</a>
                        <a href="https://www.linkedin.com/in/vishal-sonwane-48766b16a/" target="_blank" rel="noreferrer" className="contact-link text-decoration-none">💼 LinkedIn</a>
                        <a href="tel:+917888251550" className="contact-link text-decoration-none">📱 Phone</a>
                    </div>

                    {/* ✅ Added Get in Touch Form below links */}
                    <form className="contact-form mt-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type="submit" className="btn btn-primary mt-2">Send Message</button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer>
                <p>© 2025 Vishal Sonwane. Built with passion and lots of coffee ☕</p>
            </footer>
        </div>
    );
}

export default Portfolio;
