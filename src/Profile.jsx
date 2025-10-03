import React, { useEffect, useState } from "react";

function Portfolio() {
    const [isOpen, setIsOpen] = useState(false)
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
            {/* Navigation */}
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#education">Education</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="hero-content">
                    <h1>VISHAL SONWANE</h1>
                    <p className="subtitle">MERN & PYTHON Stack Developer</p>
                    <p>
                        Motivated Full-Stack Developer experienced in Java and the MERN
                        stack (MongoDB, Express.js, React, Node.js), with practical exposure
                        to AWS core services. Skilled in building responsive web apps,
                        designing RESTful APIs, deploying cloud infrastructure, and
                        automating monitoring and security workflows.
                    </p>
                    <div className="cta-buttons">
                        <a href="#projects" className="btn btn-primary">View My Work</a>
                        <a href="#contact" className="btn btn-secondary">Get In Touch</a>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about">
                <h2 className="section-title">About Me</h2>
                <div className="about-content">
                    <div className="about-text">
                        <h3>Full Stack Web Development Enthusiast</h3>
                        <p align="justify">
                            Versatile and detail-oriented Full-Stack Developer with expertise in both Python and JavaScript-based
                            technologies. Skilled in building scalable web applications using Django and the MERN stack (MongoDB,
                            Express.js, React.js, Node.js). Strong foundation in software design, REST API development, and database
                            management. Experienced in Agile environments with a focus on clean, maintainable code and collaborative
                            team delivery. Committed to continuous learning and innovation in software development.

                        </p>

                    </div>
                    <div className="about-info">
                        <div className="info-item">
                            <span className="info-label">Location</span>
                            <span className="info-value">Viman Nagar, Kharadi, Pune</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email</span>
                            <span className="info-value">vishalsonwane951@gmail.com</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Phone</span>
                            <span className="info-value">+91 7888251550</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Languages</span>
                            <span className="info-value">English, Marathi, Hindi</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Nationality</span>
                            <span className="info-value">Indian</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills">
                <h2 className="section-title">Technical Skills</h2>
                <div className="skills-grid">
                    <div className="skill-category">
                        <h3>🔷 Backend</h3>
                        <div className="skill-list">
                            <span className="skill-tag">Node.js</span>
                            <span className="skill-tag">Express.js</span>
                            <span className="skill-tag">Python</span>
                            <span className="skill-tag">RESTful API</span>
                            <span className="skill-tag">D-Jango</span>
                            <span className="skill-tag">MVC Architecture</span>
                            <span className="skill-tag"> Django REST Framework</span>


                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>🔷 Frontend</h3>
                        <div className="skill-list">
                            <span className="skill-tag">HTML5</span>
                            <span className="skill-tag">CSS3</span>
                            <span className="skill-tag">JavaScript</span>
                            <span className="skill-tag">Bootstrap</span>
                            <span className="skill-tag">React.js</span>
                            <span className="skill-tag">EJS</span>
                            =                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>🔷 Database</h3>
                        <div className="skill-list">
                            <span className="skill-tag">MongoDB</span>
                            {/* <span className="skill-tag">MySQL</span> */}
                            <span className="skill-tag">Mongoose</span>
                            {/* <span className="skill-tag">JDBC</span> */}
                            {/* <span className="skill-tag">Hibernate</span> */}
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>🔷 Tools & Platforms</h3>
                        <div className="skill-list">
                            <span className="skill-tag">Git & GitHub</span>
                            <span className="skill-tag">Postman</span>
                            <span className="skill-tag">VS Code</span>
                            {/* <span className="skill-tag">Eclipse</span> */}
                            <span className="skill-tag">npm</span>
                        </div>
                    </div>
                    {/* <div className="skill-category">
                            <h3>🔷 AWS Services</h3>
                            <div className="skill-list">
                                <span className="skill-tag">EC2</span>
                                <span className="skill-tag">S3</span>
                                <span className="skill-tag">VPC</span>
                                <span className="skill-tag">IAM</span>
                                <span className="skill-tag">Lambda</span>
                                <span className="skill-tag">ELB</span>
                                <span className="skill-tag">CloudWatch</span>
                                <span className="skill-tag">Route 53</span>
                            </div>
                        </div> */}
                    <div className="skill-category">
                        <h3>🔷 Core Concepts</h3>
                        <div className="skill-list">
                            <span className="skill-tag">OOP</span>
                            <span className="skill-tag">Data Structures</span>
                            <span className="skill-tag">Algorithms</span>
                            <span className="skill-tag">SDLC</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects">
                <h2 className="section-title">Featured Projects</h2>
                <div className="projects-grid">
                    <div className="project-card">
                        <div className="project-header">
                            <div>
                                <h3>Simple Calculator</h3>
                                <span className="project-status">Completed</span>
                            </div>
                        </div>
                        <p>
                            A responsive and interactive calculator built using HTML, CSS, and JavaScript.
                            It performs basic arithmetic operations such as addition, subtraction, multiplication,
                            and division, providing a smooth user experience with a clean UI.
                            The project demonstrates my skills in DOM manipulation, event handling, and CSS styling.
                        </p>
                        <p>
                            <strong>Key Features:</strong> Perform basic operations: +, -, ×, ÷
                            Clear (C) and Delete (⌫) functions
                            Handles decimal inputs
                            Keyboard support (optional if you added it)
                            Responsive design for desktop and mobile
                        </p>
                        <div className="tech-stack">
                            <span className="tech-tag">HTML-5</span>
                            <span className="tech-tag">CSS-3</span>
                            <span className="tech-tag">Javascript(ES6)</span>
                        </div>
                        <div className="project-links">
                            <a href="https://github.com/ShreyaGagare2710/Calculator-Project.git" className="project-link"><span>→</span> View Demo</a>
                            <a href="https://github.com/ShreyaGagare2710/Calculator-Project.git" className="project-link"><span>→</span> Source Code</a>
                        </div>
                    </div>
                    <div className="project-card">
                        <div className="project-header">
                            <div>
                                <h3>Tours & Travel Web Application</h3>
                                <span className="project-status m-5 text-success">Completed</span>
                            </div>
                        </div>
                        <p align="justify" className="project-description" style={{ marginLeft: '5px' }}>Currently developing a responsive travel booking web application with a dynamic and
                            intuitive user interface using React.js. <br /> Building RESTful APIs with Node.js and Express.js to handle travel packages, user
                            bookings, authentication, and profiles. <br /> Implementing full CRUD functionality with secure role-based access control and data
                            validation. <br /> Utilizing MongoDB as the NoSQL database to efficiently store and manage travel data. <br />Integrating React features such as hooks and context API for state management and
                            seamless UI updates. <br /> Working on advanced features including search filters, booking history, user reviews,
                            and payment gateway integration.


                        </p>
                        {/* <ul>
                            <li>Developed a robust backend API managing Users, Products, Orders, Cart, and Categories with Node.js and Express.js.</li>
                            <li>Implemented secure user authentication and authorization using JSON Web Tokens(JWT) and role-based access control.</li>
                            <li>Enabled CRUD operations and optimized MongoDB queries for efficient data handling.</li>
                            <li>Built middleware for token verification and error handling to enhance API security and stability.</li>
                            <li>Currently developing a responsive React.js frontend to provide users with seamless browsing, shopping cart, and order tracking experiences.</li>
                            <li>Planning integration of payment gateways and user-friendly UI components for improved engagement.</li>
                            <li>Integrated React with backend APIs using Axios for seamless communication and realtime data rendering across components.</li>
                        </ul> */}
                        {/* <p>
                            A full-stack travel booking platform designed to simplify tour
                            browsing and reservations. Features a responsive React.js frontend
                            with hooks and context API for efficient state management.
                        </p>
                        <p>
                            <strong>Key Features:</strong> CRUD operations, role-based access,
                            booking history, reviews, advanced search, and payment integration.
                        </p> */}
                        <div className="tech-stack">
                            <span className="tech-tag">React.js</span>
                            <span className="tech-tag">Node.js</span>
                            <span className="tech-tag">Express.js</span>
                            <span className="tech-tag">MongoDB</span>
                            <span className="tech-tag">JWT</span>
                        </div>
                        <div className="project-links">
                            <a href="https://desi-vdesi-tours.netlify.app/" className="project-link"><span>→</span> View Demo</a>
                            {/* <a href="#" className="project-link"><span>→</span> Source Code</a> */}
                            <div
                                className="dropdown"
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                            >
                                {/* this text swaps based on hover */}
                                <div className="project-link">
                                    {isOpen ?
                                        <div className="dropdown-text project-link">
                                            <a className="project-link" href="https://github.com/vishalsonwane951/my-travel-app-frontEnd">Front-End</a>
                                            <a className="project-link" href="https://github.com/vishalsonwane951/my-travel-app-Backend">Back-End</a>

                                        </div> : "Source Code"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="project-card">
                        <div className="project-header">
                            <div>
                                <h3>E-Commerce Platform</h3>
                                <span className="project-status ">BACKEND - Completed</span>
                                <span className="project-status ml-2">FRONTEND - In Progress</span>

                            </div>
                        </div>
                        <p>
                            Developed a robust backend API managing Users, Products, Orders, Cart, and
                            Categories with Node.js and Express.js. <br />Implemented secure user authentication and authorization using JSON Web Tokens
                            (JWT) and role-based access control. <br /> Enabled CRUD operations and optimized MongoDB queries for efficient data handling.  <br /> Built middleware for token verification and error handling to enhance API security and
                            stability.  <br /> Currently developing a responsive React.js frontend to provide users with seamless
                            browsing, shopping cart, and order tracking experiences.  <br />Planning integration of payment gateways and user-friendly UI components for
                            improved engagement. <br />Integrated React with backend APIs using Axios for seamless communication and realtime data rendering across components
                        </p>
                        <p>
                            <strong>Key Features:</strong> JWT authentication, product CRUD,
                            role management, shopping cart, responsive UI with React.js.
                        </p>
                        <div className="tech-stack">
                            <span className="tech-tag">Node.js</span>
                            <span className="tech-tag">Express.js</span>
                            <span className="tech-tag">MongoDB</span>
                            <span className="tech-tag">JWT</span>
                            <span className="tech-tag">React.js</span>
                        </div>
                        <div className="project-links">
                            <a href="#" className="project-link"><span>→</span> View Demo</a>
                            <a href="https://github.com/vishalsonwane951/E-CommerceAPI" className="project-link"><span>→</span> Source Code</a>
                        </div>
                    </div>
                </div>


            </section>

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
                        <button className="button button-secondary p-2 rounded bg-dark text-white">Download Certificate</button>
                    </div>

                    {/* MERN */}
                    <div className="education-card">
                        <h3>MERN Stack Development</h3>
                        <p className="institution">The Kiran Academy</p>
                        <div className="details">
                            <p><strong>Technologies:</strong> Node.js, Express.js, React.js, MongoDB</p>
                            <button className="button button-secondary p-2 rounded bg-dark text-white">Download Certificate</button>

                        </div>
                    </div>

                    {/* Python */}
                    <div className="education-card">
                        <h3>PYTHON Full-Stack Development</h3>
                        <p className="institution">The Kiran Academy</p>
                        <div className="details">
                            <p><strong>Technologies:</strong> Core Java, Spring Boot, MySQL, Hibernate</p>
                            <button className="button button-secondary p-2 rounded bg-dark text-white">Download Certificate</button>

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
