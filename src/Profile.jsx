import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./Portfolio.css";


const VISITOR_KEY = "portfolio_visitors";
const SESSION_KEY = "visitor_session_active";

const projectsData = [
  {
    title: "Tours & Travel Web Application",
    description: "Full-stack travel booking platform with dynamic UI, REST APIs, and secure authentication. Features include package management, booking system, user reviews, and payment integration.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Stripe"],
    progress: 100,
    status: 'Completed',
    projectLink: "https://desivdesi.netlify.app/",
    githubLink: ["https://github.com/vishalsonwane951/my-travel-app-frontEnd", "https://github.com/vishalsonwane951/my-travel-app-Backend"],
    featured: true,
    icon: "bi-airplane"
  },
  {
    title: "E-Commerce API",
    description: "Complete e-commerce solution with user authentication, product management, shopping cart, and order processing. Features role-based access control and payment integration.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "JWT"],
    progress: 100,
    status: 'Backend Completed',
    projectLink: "",
    githubLink: ["https://github.com/vishalsonwane951/E-CommerceAPI"],
    featured: true,
    icon: "bi-cart"
  },
  {
    title: "Book Inventory Management System",
    description: "Comprehensive inventory system with CRUD operations, advanced search, categorization, and reporting features. Includes user authentication and real-time updates.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap"],
    progress: 60,
    status: 'In CI/CD',
    projectLink: "https://book-inventory-management-system-pink.vercel.app/",
    githubLink: ["https://github.com/vishalsonwane951/Book-Inventory-Management-System-Frontend", "https://github.com/vishalsonwane951/Book-Inventory-Management-System-Backend"],
    featured: false,
    icon: "bi-book"
  },

  {
    title: "E-Commerce Mobile Application (Enhanced UI)",
    description: "A modern and fully functional mobile e-commerce application built with React Native and Expo. Features an enhanced user interface, improved layout design, smooth navigation, and complete cart functionality for an optimized user experience.",
    skills: ["React Native", "Expo", "JavaScript", "Context API", "UI/UX Design"],
    progress: 80,
    status: "In CI/CD",
    projectLink: "https://expo.dev/artifacts/eas/obMGe16tsz48N47Pf8DHoJ.apk",
    githubLink: ["https://github.com/vishalsonwane951/E-Commerce-Mobile-Application"],
    featured: false,
    icon: "bi-phone"

  }
];

const infoItems = [
  { icon: "bi-geo-alt-fill", label: "Location", value: "Karve Nagar, Pune" },
  {
    icon: "bi-envelope-arrow-up",
    label: "Email",
    value: "vishalsonwane951@gmail.com",
    link: "mailto:vishalsonwane951@gmail.com",
  },
  {
    icon: "bi-phone-fill",
    label: "Phone",
    value: "+91 7888251550",
    link: "tel:+917888251550",
  },
  { icon: "bi-globe", label: "Languages", value: "English, Marathi, Hindi" },
  { icon: "bi-flag-fill", label: "Nationality", value: "Indian" },
  {
    icon: "bi-briefcase-fill",
    label: "Status",
    value: "Open to Work",
    badge: true,
  },
];

function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [visitorCount, setVisitorCount] = useState(1254);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  // Visitor counter

  useEffect(() => {
    let count = Number(localStorage.getItem(VISITOR_KEY)) || 0;

    // Count visitor only once per session
    if (!sessionStorage.getItem(SESSION_KEY)) {
      count += 1;
      localStorage.setItem(VISITOR_KEY, count);
      sessionStorage.setItem(SESSION_KEY, "true");
    }

    setVisitorCount(count);
  }, []);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section');
      let current = 'home';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Smooth scroll
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          setIsMobileMenuOpen(false);
        }
      });
    });
  }, []);

  const certificates = {
    btech: "/certificates/Convocation26.pdf",
    mern: "/certificates/MERN-Certificate.pdf",
    python: "/certificates/Python-Certificate.pdf",
  };

  const openCertificate = (type) => {
    const url = certificates[type];
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("Certificate not available yet!");
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "success";
    if (progress >= 50) return "warning";
    return "info";
  };

  return (
    <div className="portfolio-wrapper">
      {/* Visitor Counter Badge */}


      {/* Navigation */}
      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <a className="navbar-brand" href="#home">
            <div className="brand-logo">
              <span className="logo-text">VS</span>
            </div>
            <span className="brand-name">Vishal Sonwane</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="navbar-toggler-icon"><i className="bi bi-list"></i></span>
          </button>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              {['home', 'about', 'skills', 'projects', 'education', 'contact'].map((item) => (
                <li className="nav-item" key={item}>
                  <a
                    className={`nav-link ${activeSection === item ? 'active' : ''}`}
                    href={`#${item}`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="visitor-counter-badge">
          <div className="counter-content">
            <i className="bi bi-eye-fill"></i>
            <div className="counter-info">
              <span className="counter-number">{visitorCount.toLocaleString()}</span>
              <span className="counter-label">visitors</span>
            </div>
          </div>
        </div>
      </nav>



      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient dark"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>

        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-7">
              <div className="hero-content">
                <div className="hero-badge">
                  <i className="bi bi-code-slash"></i>
                  <span>Full Stack Developer</span>
                </div>

                <h1 className="hero-title">
                  Hi, I'm <span className="gradient-text">Vishal Sonwane</span>
                </h1>

                <p className="hero-subtitle">
                  MERN & Python Full-Stack Developer building scalable, high-performance web applications. Passionate about transforming ideas into clean, reliable digital solutions.
                </p>

                <div className="hero-buttons">
                  <a href="#projects" className="btn btn-primary btn-lg">
                    <span>View Projects</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                  <a href="#contact" className="btn btn-outline btn-lg">
                    <span>Let's Talk</span>
                    <i className="bi bi-chat-dots"></i>
                  </a>
                </div>

                {/* Stats */}
                <div className="hero-stats">
                  {[
                    { icon: 'bi-briefcase-fill', value: '3', label: 'Projects' },
                    { icon: 'bi-award-fill', value: '2', label: 'Certifications' },
                    { icon: 'bi-clock-history', value: '0.6', label: 'Year Exp' },
                    { icon: 'bi-tools', value: '10+', label: 'Skills' }
                  ].map((stat, idx) => (
                    <div className="stat-item" key={idx}>
                      <i className={`bi ${stat.icon}`}></i>
                      <div className="stat-content">
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-lg-block">
              <div className="hero-card">
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="avatar-wrapper">
                    <div className="avatar-ring"></div>
                    <img src="/photo1.jpg" alt="Avatar" className="avatar-img" height={170} width={170} />

                  </div>

                  <h4>Currently Available</h4>
                  <p>Open for full-time opportunities and freelance projects</p>
                  <div className="tech-badges">
                    <span className="tech-badge success">
                      <i className="bi bi-check-circle-fill"></i>
                      MERN Stack
                    </span>
                    <span className="tech-badge info">
                      <i className="bi bi-check-circle-fill"></i>
                      Python
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          {/* Section Header */}
          <div className="section-header text-center">
            <span className="section-subtitle">Get To Know Me</span>
            <h2 className="section-title">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="title-underline"></div>
          </div>

          <div className="row align-items-center gy-4">
            {/* LEFT SIDE */}
            <div className="col-lg-6">
              <div className="about-card">
                <div className="card-icon">
                  <i className="bi bi-person-badge-fill"></i>
                </div>

                <h3>Full Stack Developer</h3>

                <p className="about-text">
                  Versatile developer with expertise in Python and JavaScript
                  technologies. Skilled in building scalable applications using
                  Django and the MERN stack. Strong foundation in software design,
                  REST API development, and database management. Committed to clean
                  code, performance optimization, and exceptional user experiences.
                </p>

                <div className="row mt-4">
                  <div className="col-md-6">
                    <ul className="feature-list">
                      <li><i className="bi bi-check-circle-fill"></i> Responsive Design</li>
                      <li><i className="bi bi-check-circle-fill"></i> REST APIs</li>
                      <li><i className="bi bi-check-circle-fill"></i> Database Management</li>
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <ul className="feature-list">
                      <li><i className="bi bi-check-circle-fill"></i> Performance Optimization</li>
                      <li><i className="bi bi-check-circle-fill"></i> Clean Code</li>
                      <li><i className="bi bi-check-circle-fill"></i> Agile Development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-6">
              <div className="info-grid">
                {infoItems.map((item, idx) => (
                  <div className="info-card-wrapper" key={idx}>
                    <div className="info-card">
                      <div className="info-icon">
                        <i className={`bi ${item.icon}`}></i>
                      </div>

                      <div className="info-content">
                        <span className="info-label">{item.label}</span>

                        {item.link ? (
                          <a href={item.link} className="info-value">
                            {item.value}
                          </a>
                        ) : item.badge ? (
                          <span className="status-badge">{item.value}</span>
                        ) : (
                          <span className="info-value">{item.value}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section ">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">What I Offer</span>
            <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>
            <div className="title-underline"></div>
          </div>

          <div className="row g-4">
            {[
              {
                title: "Backend Development",
                icon: "bi-server",
                color: "blue",
                skills: ["Node.js", "Express.js", "Python", "Django", "REST APIs", "MVC", "JWT Authentication"]
              },
              {
                title: "Frontend Development",
                icon: "bi-palette-fill",
                color: "purple",
                skills: ["React.js", "React Native", "JavaScript","Expo", "HTML5", "CSS3","Tailwind CSS", "Bootstrap", "EJS"]
              },
              {
                title: "Database & Tools",
                icon: "bi-database-fill",
                color: "green",
                skills: ["MongoDB", "Mongoose", "Git", "GitHub", "Postman", "npm", "React Route","VS Code"]
              },
              {
                title: "Core Concepts",
                icon: "bi-lightbulb-fill",
                color: "orange",
                skills: ["OOP", "Data Structures", "Algorithms", "SDLC", "Agile", "REST"]
              }
            ].map((category, idx) => (
              <div className="col-lg-6 col-md-6 mb-3" key={idx}>
                <div className={`skill-card skill-card-${category.color}`}>
                  <div className="skill-header">
                    <div className="skill-icon">
                      <i className={`bi ${category.icon}`}></i>
                    </div>
                    <h4>{category.title}</h4>
                  </div>
                  <div className="skill-tags">
                    {category.skills.map((skill, skillIdx) => (
                      <span key={skillIdx} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section ">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">My Work</span>
            <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
            <div className="title-underline"></div>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>

            {projectsData.map((project, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-marker">
                  <div className="timeline-icon">
                    <i className={`bi ${project.icon}`}></i>
                  </div>
                  <div className="progress-indicator">
                    <span className="progress-text">{project.progress}%</span>
                  </div>
                </div>

                <div className={`timeline-content ${project.featured ? 'featured' : ''}`}>
                  {project.featured && (
                    <div className="featured-badge">
                      <i className="bi bi-star-fill"></i>
                      <span>Featured</span>
                    </div>
                  )}

                  <div className="project-header">
                    <h4>{project.title}</h4>
                    <span className={`status-badge status-${project.progress === 100 ? 'completed' : 'progress'}`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="project-description">{project.description}</p>

                  {/* Skills */}
                  <div className="project-skills">
                    {project.skills.map((skill, idx) => (
                      <span key={idx} className="project-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="project-links">
                    {project.projectLink && (
                      <a
                        href={project.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn btn-primary"
                      >
                        {project.skills?.includes("React Native") ? (
                          <>
                            <i className="bi bi-android2"></i>
                            <span>Download APK</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-box-arrow-up-right"></i>
                            <span>Live Demo</span>
                          </>
                        )}
                      </a>
                    )}
                    {project.githubLink && project.githubLink.length > 0 && (
                      <div className="dropdown">
                        <button
                          className="project-btn btn-outline dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-github"></i>
                          <span>Code</span>
                        </button>
                        <ul className="dropdown-menu">
                          {project.githubLink?.map((link, idx) => {
                            const isBackend = /backend|server|api/i.test(link);
                            const label = isBackend ? "Backend" : "Frontend";

                            return (
                              <li key={idx}>
                                <a
                                  className="dropdown-item"
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="bi bi-code-slash me-2"></i>
                                  {label} Repo
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education-section ">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">My Journey</span>
            <h2 className="section-title">Education & <span className="gradient-text">Certifications</span></h2>
            <div className="title-underline"></div>
          </div>

          <div className="timeline-container">
            <div className="timeline-line education"></div>

            <div className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-icon degree">
                  <i className="bi bi-mortarboard-fill"></i>
                </div>
              </div>

              <div className="timeline-content">
                <div className="education-year">2020</div>
                <h4>B.Tech (Computer Science)</h4>
                <p className="institution">Dr. Babasaheb Ambedkar Technological University</p>
                <div className="education-meta">
                  <span className="meta-item">
                    <i className="bi bi-graph-up-arrow"></i>
                    CGPA: 7.35
                  </span>
                </div>
                <button
                  className="cert-btn"
                  onClick={() => openCertificate("btech")}
                >
                  <i className="bi bi-file-earmark-pdf-fill"></i>
                  View Certificate
                </button>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-icon mern">
                  <i className="bi bi-code-square"></i>
                </div>
              </div>

              <div className="timeline-content">
                <div className="education-year">2023</div>
                <h4>MERN Stack Development</h4>
                <p className="institution">The Kiran Academy</p>
                <div className="tech-stack">
                  {["React.js", "Node.js", "MongoDB", "Express.js"].map((tech, idx) => (
                    <span key={idx} className="tech-item">{tech}</span>
                  ))}
                </div>
                <button
                  className="cert-btn"
                  onClick={() => openCertificate("mern")}
                >
                  <i className="bi bi-file-earmark-pdf-fill"></i>
                  View Certificate
                </button>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-icon python">
                  <i className="bi bi-filetype-py"></i>
                </div>
              </div>

              <div className="timeline-content">
                <div className="education-year">2023</div>
                <h4>Python Full-Stack</h4>
                <p className="institution">The Kiran Academy</p>
                <div className="tech-stack">
                  {["Python", "Django", "REST", "PostgreSQL"].map((tech, idx) => (
                    <span key={idx} className="tech-item">{tech}</span>
                  ))}
                </div>
                <button
                  className="cert-btn"
                  onClick={() => openCertificate("python")}
                >
                  <i className="bi bi-file-earmark-pdf-fill"></i>
                  View Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section ">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Let's Connect</span>
            <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
            <div className="title-underline"></div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12 ">
              <div className="contact-wrapper">
                <div className="row g-0">
                  <div className="col-lg-5 col-md-12 ">
                    <div className="contact-info ">
                      <h3>Contact Information</h3>
                      <p className="contact-description">
                        Feel free to reach out for collaborations, opportunities, or just a friendly chat!
                      </p>

                      <div className="contact-items">
                        {[
                          { icon: 'bi bi-envelope-arrow-up', text: 'vishalsonwane951@gmail.com', link: 'mailto:vishalsonwane951@gmail.com' },
                          { icon: 'bi-phone-fill', text: '+91 7888251550', link: 'tel:+917888251550' },
                          { icon: 'bi-geo-alt-fill', text: 'Kharadi, Pune, India' },
                        ].map((item, idx) => (
                          <div className="contact-item" key={idx}>
                            <div className="contact-item-icon">
                              <i className={`bi ${item.icon}`}></i>
                            </div>
                            <div className="contact-item-content">
                              {item.link ? (
                                <a href={item.link}>
                                  {item.text}
                                </a>
                              ) : (
                                <span>{item.text}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="social-links">
                        <a href="https://github.com/vishalsonwane951" target="_blank" rel="noopener noreferrer" className="social-link">
                          <i className="bi bi-github"></i>
                        </a>
                        <a href="https://linkedin.com/in/vishal-sonwane-48766b16a" target="_blank" rel="noopener noreferrer" className="social-link">
                          <i className="bi bi-linkedin"></i>
                        </a>
                        <a href="mailto:vishalsonwane951@gmail.com" className="social-link">
                          <i className="bi bi-envelope-arrow-up"></i>
                        </a>
                        <a href="tel:+917888251550" className="social-link">
                          <i className="bi bi-telephone-fill"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-7 align-center">
                    <div className="contact-form">
                      <h3>Send Me a Message</h3>
                      <form>
                        <div className="form-group">
                          <label htmlFor="name">
                            <i className="bi bi-person-fill"></i>
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter your Name"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">
                            <i className="bi bi-envelope-fill"></i>
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your Email"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="message">
                            <i className="bi bi-chat-dots-fill"></i>
                            Your Message
                          </label>
                          <textarea
                            id="message"
                            className="form-control"
                            rows="5"
                            placeholder="Enter your Message"
                            required
                          ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">
                          <span>Send Message</span>
                          <i className="bi bi-send-fill"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-logo">
                <span className="logo-text">VS</span>
              </div>
              <div>
                <h4>Vishal Sonwane</h4>
                <p className="mt-3 mb-3">Full Stack Developer</p>
              </div>
            </div>

            <div className="footer-links">
              <div className="social-links-footer">
                <a href="https://github.com/vishalsonwane951" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-github"></i>
                </a>
                <a href="https://linkedin.com/in/vishal-sonwane-48766b16a" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="mailto:vishalsonwane951@gmail.com">
                  <i className="bi bi-envelope-arrow-up"></i>
                </a>
                <a href="tel:+917888251550">
                  <i className="bi bi-telephone-fill"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Vishal Sonwane. All rights reserved.</p>
            <div className="footer-meta">
              <span className="visitor-count">
                <i className="bi bi-eye-fill"></i>
                {visitorCount.toLocaleString()} visitors
              </span>
              <a href="#home" className="back-to-top">
                <i className="bi bi-arrow-up-circle-fill"></i>
                Back to Top
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;
