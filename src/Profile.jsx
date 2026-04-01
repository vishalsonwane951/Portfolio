import React, { useEffect, useState, useRef } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────

const projectsData = [
  {
    title: "Toy Shop – Online Shopping & Billing System",
    description: "Shakti Toy Shop is an online shopping and billing system for managing toy products and generating customer bills. Users can browse toys, add items to cart, and generate invoices with full admin inventory management.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "JWT"],
    keyFeatures: ["Online toy product browsing","Add to cart functionality","Billing and invoice generation","Product category management","Quantity and price calculation","Admin panel for product management","Responsive design for all devices"],
    progress: 100, status: "Completed",
    projectLink: "https://shakti-toys-frontend-ce3s2be2f-vishal-sonwanes-projects.vercel.app/",
    githubLink: ["https://github.com/vishalsonwane951/Shakti-Toys-Backend","https://github.com/vishalsonwane951/Shakti-Toys-frontend"],
    featured: true, icon: "🛒"
  },
  {
    title: "Seoul Brew Cafe Web Application",
    description: "Full-stack cafe management platform with dynamic UI, menu display, online reservation, and order tracking. Features menu management, cart & checkout, admin panel, and responsive design.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "CSS", "Axios"],
    keyFeatures: ["Attractive landing page with cafe branding","Menu listing with categories","Image gallery for food and ambiance","Contact and location section","Responsive UI design","Smooth scrolling navigation","Reservation/contact form integration"],
    progress: 100, status: "Completed",
    projectLink: "https://seoulbrewcafes.netlify.app",
    githubLink: ["https://github.com/vishalsonwane951/Seoul-Brew-Cafe-Frontend","https://github.com/vishalsonwane951/Seoul-Brew-Cafe-Backend"],
    featured: true, icon: "☕"
  },
  {
    title: "Tours & Travel Web Application",
    description: "Full-stack travel booking platform with dynamic UI, REST APIs, and secure authentication. Includes package management, booking system, user reviews, and payment integration.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Stripe"],
    keyFeatures: ["Dynamic travel destination cards","Category-based filtering","Image carousel for destinations","API-based data fetching","Responsive UI for mobile and desktop","Backend integration with MongoDB"],
    progress: 100, status: "Under CI/CD",
    projectLink: "https://desivdesi.netlify.app/",
    githubLink: ["https://github.com/vishalsonwane951/my-travel-app-frontEnd","https://github.com/vishalsonwane951/my-travel-app-Backend"],
    featured: true, icon: "✈️"
  },
  {
    title: "E-Commerce API",
    description: "Complete e-commerce backend with user authentication, product management, shopping cart, and order processing. Features role-based access control and payment integration.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "JWT"],
    keyFeatures: ["Role-based access control","RESTful API architecture","Shopping cart & order processing","JWT Authentication","Payment gateway integration","Product CRUD operations","MongoDB schema design"],
    progress: 100, status: "Backend Completed",
    projectLink: "",
    githubLink: ["https://github.com/vishalsonwane951/E-CommerceAPI"],
    featured: true, icon: "🏪"
  },
  {
    title: "Book Inventory Management System",
    description: "Comprehensive inventory system with CRUD operations, advanced search, categorization, and reporting. Includes user authentication and real-time updates.",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap"],
    keyFeatures: ["Add, update, delete book records","Advanced search and filtering","Real-time inventory updates","Category-wise book organization","Price and stock tracking","REST API for book operations"],
    progress: 60, status: "In CI/CD",
    projectLink: "https://book-inventory-management-system-pink.vercel.app/",
    githubLink: ["https://github.com/vishalsonwane951/Book-Inventory-Management-System-Frontend","https://github.com/vishalsonwane951/Book-Inventory-Management-System-Backend"],
    featured: false, icon: "📚"
  },
  {
    title: "E-Commerce Mobile Application",
    description: "Modern and fully functional mobile e-commerce app built with React Native and Expo. Features enhanced UI, smooth navigation, and complete cart functionality for an optimized mobile experience.",
    skills: ["React Native", "Expo", "JavaScript", "Context API", "UI/UX Design"],
    keyFeatures: ["Product listing and detail screens","Smooth stack & tab navigation","Full cart functionality with Context API","APK build via Expo EAS","Add to cart functionality","Category-based product browsing","Clean and modern UI design"],
    progress: 80, status: "In CI/CD",
    projectLink: "https://expo.dev/artifacts/eas/obMGe16tsz48N47Pf8DHoJ.apk",
    githubLink: ["https://github.com/vishalsonwane951/E-Commerce-Mobile-Application"],
    featured: false, icon: "📱"
  }
];

const skillCategories = [
  { title: "Backend", icon: "⚙️", skills: ["Node.js", "Express.js", "REST APIs", "MVC Architecture", "JWT Auth"] },
  { title: "Frontend", icon: "🎨", skills: ["React.js", "React Native", "JavaScript", "Expo", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
  { title: "Database & Cloud", icon: "🗄️", skills: ["MongoDB", "Mongoose", "AWS DynamoDB", "AWS S3", "Postman"] },
  { title: "Core Concepts", icon: "💡", skills: ["OOP", "Data Structures", "Algorithms", "SDLC", "REST"] }
];

// ── COMPONENT ────────────────────────────────────────────────────────────────

const VISITOR_KEY = "portfolio_visitors";
const SESSION_KEY = "visitor_session_active";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [visitorCount, setVisitorCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFeature, setOpenFeature] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    let count = Number(localStorage.getItem(VISITOR_KEY)) || 1254;
    if (!sessionStorage.getItem(SESSION_KEY)) {
      count += 1;
      localStorage.setItem(VISITOR_KEY, count);
      sessionStorage.setItem(SESSION_KEY, "true");
    }
    setVisitorCount(count);
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) { window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" }); }
    setMenuOpen(false);
  };

  const openCert = (type) => {
    const map = { btech: "/certificates/Convocation26.pdf", mern: "/certificates/MERN-Certificate.pdf", python: "/certificates/Python-Certificate.pdf" };
    window.open(map[type], "_blank");
  };

  const navItems = ["home","about","skills","projects","education","contact"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0a0a0f;
          --bg2: #0f0f1a;
          --surface: #13131f;
          --surface2: #1a1a2e;
          --border: rgba(255,255,255,0.07);
          --border2: rgba(255,255,255,0.12);
          --p1: #7c6ff7;
          --p2: #a78bfa;
          --p3: #c4b5fd;
          --accent: #06d6a0;
          --accent2: #38d9a9;
          --gold: #fbbf24;
          --text: #f0f0f8;
          --muted: #8888aa;
          --muted2: #5a5a7a;
          --glow: rgba(124,111,247,0.25);
          --glow2: rgba(124,111,247,0.08);
          --radius: 16px;
          --radius-sm: 10px;
          --font: 'Sora', sans-serif;
          --mono: 'JetBrains Mono', monospace;
          --nav-h: 70px;
          --trans: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }

        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); font-family: var(--font); line-height: 1.65; overflow-x: hidden; }

        /* ── SCROLLBAR ── */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--p1); border-radius: 2px; }

        /* ── SELECTION ── */
        ::selection { background: var(--p1); color: #fff; }

        /* ── NAV ── */
        .pf-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: var(--nav-h);
          display: flex; align-items: center;
          padding: 0 2rem;
          background: transparent;
          transition: var(--trans);
        }
        .pf-nav.scrolled {
          background: rgba(10,10,15,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 0 40px rgba(0,0,0,0.4);
        }
        .nav-inner { max-width: 1200px; width: 100%; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .nav-brand { display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none; }
        .brand-orb {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, var(--p1), #5b4fcf);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 14px; color: #fff;
          box-shadow: 0 0 20px var(--glow);
        }
        .brand-name { font-size: 15px; font-weight: 600; color: var(--text); }
        .nav-links { display: flex; align-items: center; gap: 4px; }
        .nav-link {
          padding: 6px 14px; border-radius: 8px; font-size: 13.5px; font-weight: 500;
          color: var(--muted); cursor: pointer; transition: var(--trans); border: none; background: none;
          text-transform: capitalize;
        }
        .nav-link:hover { color: var(--text); background: var(--surface); }
        .nav-link.active { color: var(--p2); background: rgba(124,111,247,0.12); }
        .nav-right { display: flex; align-items: center; gap: 12px; }
        .visitor-pill {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 20px;
          background: var(--surface); border: 1px solid var(--border);
          font-size: 12px; color: var(--muted);
        }
        .visitor-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        .menu-btn { display: none; background: none; border: 1px solid var(--border); border-radius: 8px; padding: 6px 10px; color: var(--muted); cursor: pointer; font-size: 18px; }
        .mobile-menu {
          display: none; position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 999;
          background: rgba(10,10,15,0.97); backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border); padding: 1rem;
          flex-direction: column; gap: 4px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-link { padding: 10px 14px; border-radius: 8px; font-size: 14px; font-weight: 500; color: var(--muted); cursor: pointer; transition: var(--trans); text-transform: capitalize; }
        .mobile-link:hover,.mobile-link.active { color: var(--p2); background: rgba(124,111,247,0.1); }

        /* ── SECTION COMMONS ── */
        .section { padding: 100px 0; }
        .container { max-width: 1180px; margin: 0 auto; padding: 0 1.5rem; }
        .sec-label { font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--p2); font-family: var(--mono); }
        .sec-title { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 700; margin: 0.4rem 0 1.25rem; color: var(--text); line-height: 1.2; }
        .sec-title span { background: linear-gradient(135deg, var(--p1), var(--p3)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .sec-bar { width: 40px; height: 3px; background: linear-gradient(90deg, var(--p1), var(--p3)); border-radius: 2px; }
        .sec-header { text-align: center; margin-bottom: 4rem; }
        .sec-header .sec-bar { margin: 0 auto; }

        /* ── HERO ── */
        .hero {
          min-height: 100vh; display: flex; align-items: center;
          position: relative; overflow: hidden; padding-top: var(--nav-h);
        }
        .hero-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 70% 40%, rgba(124,111,247,0.12) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 20% 80%, rgba(6,214,160,0.06) 0%, transparent 60%),
            var(--bg);
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 60% 30%, black 30%, transparent 70%);
        }
        .hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center; width: 100%; }
        .hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 8px;
          border: 1px solid rgba(124,111,247,0.3);
          background: rgba(124,111,247,0.08);
          font-size: 12px; font-weight: 600; color: var(--p2);
          font-family: var(--mono); margin-bottom: 1.25rem;
          opacity: 0; transform: translateY(20px); transition: all 0.6s ease 0.1s;
        }
        .hero-tag.vis { opacity: 1; transform: translateY(0); }
        .hero-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
        .hero-h1 {
          font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 800; line-height: 1.1;
          margin-bottom: 1.25rem; color: var(--text);
          opacity: 0; transform: translateY(30px); transition: all 0.6s ease 0.2s;
        }
        .hero-h1.vis { opacity: 1; transform: translateY(0); }
        .hero-h1 .grad { background: linear-gradient(135deg, var(--p1) 0%, var(--p3) 50%, var(--accent) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-sub {
          font-size: 16px; color: var(--muted); line-height: 1.8; max-width: 520px;
          margin-bottom: 2rem;
          opacity: 0; transform: translateY(20px); transition: all 0.6s ease 0.3s;
        }
        .hero-sub.vis { opacity: 1; transform: translateY(0); }
        .hero-btns {
          display: flex; gap: 12px; flex-wrap: wrap;
          opacity: 0; transform: translateY(20px); transition: all 0.6s ease 0.4s;
        }
        .hero-btns.vis { opacity: 1; transform: translateY(0); }
        .btn-primary-pf {
          padding: 12px 26px; border-radius: 10px; font-size: 14px; font-weight: 600;
          background: linear-gradient(135deg, var(--p1), #5b4fcf);
          color: #fff; border: none; cursor: pointer; transition: var(--trans);
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          box-shadow: 0 4px 24px var(--glow);
        }
        .btn-primary-pf:hover { transform: translateY(-2px); box-shadow: 0 8px 32px var(--glow); }
        .btn-ghost-pf {
          padding: 12px 26px; border-radius: 10px; font-size: 14px; font-weight: 600;
          background: transparent; color: var(--text);
          border: 1px solid var(--border2); cursor: pointer; transition: var(--trans);
          text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-ghost-pf:hover { background: var(--surface); border-color: var(--p1); }

        /* Hero Stats */
        .hero-stats {
          display: flex; gap: 2rem; margin-top: 2.5rem; flex-wrap: wrap;
          opacity: 0; transform: translateY(20px); transition: all 0.6s ease 0.5s;
        }
        .hero-stats.vis { opacity: 1; transform: translateY(0); }
        .stat { display: flex; flex-direction: column; }
        .stat-val { font-size: 1.8rem; font-weight: 800; color: var(--text); line-height: 1; }
        .stat-val span { font-size: 1.2rem; color: var(--p2); }
        .stat-lab { font-size: 11px; color: var(--muted); font-family: var(--mono); margin-top: 3px; }

        /* Hero Card */
        .hero-card-wrap {
          opacity: 0; transform: translateX(40px); transition: all 0.7s ease 0.4s;
        }
        .hero-card-wrap.vis { opacity: 1; transform: translateX(0); }
        .hero-card {
          width: 300px;
          background: var(--surface);
          border: 1px solid var(--border2);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,111,247,0.1);
        }
        .hc-top {
          background: linear-gradient(135deg, rgba(124,111,247,0.25), rgba(91,79,207,0.15));
          padding: 2rem 1.5rem 1.25rem;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          border-bottom: 1px solid var(--border);
          position: relative;
        }
        .hc-avail {
          position: absolute; top: 12px; right: 12px;
          display: flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 600; color: var(--accent);
          background: rgba(6,214,160,0.1); border: 1px solid rgba(6,214,160,0.25);
          padding: 3px 9px; border-radius: 20px;
        }
        .hc-avail-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
        .hc-avatar {
          width: 90px; height: 90px; border-radius: 50%; overflow: hidden;
          border: 3px solid var(--p1); box-shadow: 0 0 24px var(--glow);
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, var(--p1), var(--p3));
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem; font-weight: 800; color: #fff;
        }
        .hc-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .hc-name { font-size: 15px; font-weight: 700; color: var(--text); }
        .hc-role { font-size: 12px; color: var(--p2); margin-top: 2px; }

        /* LinkedIn-style org section */
        .hc-org {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border);
        }
        .hc-org-row {
          display: flex; align-items: center; gap: 10px;
        }
        .hc-org-logo {
          width: 36px; height: 36px; border-radius: 8px;
          background: linear-gradient(135deg, #0a66c2, #0d7dbf);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 800; color: #fff;
          flex-shrink: 0; letter-spacing: -0.5px;
        }
        .hc-org-info { display: flex; flex-direction: column; }
        .hc-org-company { font-size: 12.5px; font-weight: 600; color: var(--text); }
        .hc-org-title { font-size: 11px; color: var(--muted); }
        .hc-org-since { font-size: 10px; color: var(--muted2); font-family: var(--mono); }
        .hc-current-badge {
          font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 4px;
          background: rgba(6,214,160,0.12); color: var(--accent); border: 1px solid rgba(6,214,160,0.2);
          margin-left: auto; flex-shrink: 0; text-transform: uppercase; letter-spacing: 0.05em;
        }

        .hc-bottom { padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 8px; }
        .hc-badge {
          display: flex; align-items: center; gap: 7px;
          font-size: 11.5px; color: var(--muted);
        }
        .hc-badge-icon { font-size: 14px; }
        .hc-tech { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px; }
        .hc-chip {
          font-size: 10px; padding: 3px 9px; border-radius: 6px;
          background: rgba(124,111,247,0.1); border: 1px solid rgba(124,111,247,0.2);
          color: var(--p2); font-weight: 500;
        }

        /* ── ABOUT ── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
        .about-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 2rem; position: relative; overflow: hidden;
        }
        .about-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--p1), var(--p3));
        }
        .about-h { font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; color: var(--text); }
        .about-p { font-size: 14px; color: var(--muted); line-height: 1.8; }
        .about-features { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 1.25rem; }
        .af-item { display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--muted); }
        .af-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--p1); flex-shrink: 0; }

        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .info-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm);
          padding: 0.85rem 1rem; display: flex; align-items: center; gap: 10px;
          transition: var(--trans);
        }
        .info-card:hover { border-color: var(--p1); transform: translateY(-2px); }
        .info-icon { font-size: 18px; flex-shrink: 0; }
        .info-label { font-size: 10px; color: var(--muted2); font-family: var(--mono); }
        .info-val { font-size: 12.5px; color: var(--text); font-weight: 500; margin-top: 2px; }
        .info-val a { color: var(--p2); text-decoration: none; }
        .status-chip {
          display: inline-block; font-size: 10px; padding: 2px 9px; border-radius: 20px;
          background: rgba(6,214,160,0.12); color: var(--accent); border: 1px solid rgba(6,214,160,0.2);
          font-weight: 600;
        }

        /* Org card in about */
        .org-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 1.25rem 1.5rem; margin-top: 1rem;
          display: flex; align-items: center; gap: 14px;
          transition: var(--trans);
        }
        .org-card:hover { border-color: var(--p1); }
        .org-logo-lg {
          width: 52px; height: 52px; border-radius: 12px;
          background: linear-gradient(135deg, #0a66c2, #0d7dbf);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 800; color: #fff; flex-shrink: 0;
        }
        .org-details { flex: 1; }
        .org-company { font-size: 15px; font-weight: 700; color: var(--text); }
        .org-role { font-size: 13px; color: var(--p2); margin-top: 2px; }
        .org-meta { font-size: 11px; color: var(--muted); margin-top: 4px; font-family: var(--mono); }
        .org-badge {
          font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 6px;
          background: rgba(6,214,160,0.1); color: var(--accent); border: 1px solid rgba(6,214,160,0.2);
          flex-shrink: 0; text-transform: uppercase;
        }

        /* ── SKILLS ── */
        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        .skill-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 1.5rem; transition: var(--trans);
        }
        .skill-card:hover { border-color: var(--border2); }
        .skill-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; }
        .skill-card-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: rgba(124,111,247,0.1); border: 1px solid rgba(124,111,247,0.2);
          display: flex; align-items: center; justify-content: center; font-size: 17px; flex-shrink: 0;
        }
        .skill-card-title { font-size: 13.5px; font-weight: 700; color: var(--text); }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tag {
          padding: 6px 13px; border-radius: 7px; font-size: 12.5px; font-weight: 500;
          background: var(--surface2); border: 1px solid var(--border2);
          color: var(--muted); transition: var(--trans); cursor: default;
        }
        .skill-tag:hover { border-color: var(--p1); color: var(--p2); transform: translateY(-2px); }
        @media (max-width: 640px) { .skills-grid { grid-template-columns: 1fr; } }

        /* ── PROJECTS ── */
        .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .proj-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 1.4rem; display: flex; flex-direction: column; gap: 12px;
          transition: var(--trans); position: relative; overflow: hidden;
        }
        .proj-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.4); border-color: var(--border2); }
        .proj-card.featured { border-color: rgba(124,111,247,0.35); }
        .proj-card.featured::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--p1), var(--p3));
        }
        .proj-featured-badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 5px;
          background: rgba(124,111,247,0.12); color: var(--p2);
          border: 1px solid rgba(124,111,247,0.2); width: fit-content;
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .proj-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
        .proj-icon-wrap { display: flex; align-items: center; gap: 10px; }
        .proj-icon { font-size: 22px; }
        .proj-title { font-size: 13.5px; font-weight: 700; color: var(--text); line-height: 1.35; }
        .proj-status {
          font-size: 10px; padding: 3px 9px; border-radius: 6px; white-space: nowrap; font-weight: 600;
          flex-shrink: 0; font-family: var(--mono);
        }
        .proj-status.done { background: rgba(6,214,160,0.1); color: var(--accent); border: 1px solid rgba(6,214,160,0.2); }
        .proj-status.wip { background: rgba(251,191,36,0.1); color: var(--gold); border: 1px solid rgba(251,191,36,0.2); }
        .proj-progress { height: 3px; background: var(--surface2); border-radius: 2px; }
        .proj-progress-bar { height: 3px; border-radius: 2px; background: linear-gradient(90deg, var(--p1), var(--p3)); transition: width 0.6s ease; }
        .proj-desc { font-size: 12.5px; color: var(--muted); line-height: 1.65; flex-grow: 1; }
        .proj-skills { display: flex; flex-wrap: wrap; gap: 5px; }
        .proj-skill {
          font-size: 10px; padding: 2px 8px; border-radius: 5px;
          background: var(--surface2); color: var(--muted); border: 1px solid var(--border);
        }
        .proj-features-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11.5px; padding: 5px 11px; border-radius: 7px;
          border: 1px solid var(--border); background: transparent;
          color: var(--muted); cursor: pointer; transition: var(--trans);
        }
        .proj-features-btn:hover { border-color: var(--p1); color: var(--p2); }
        .proj-features-list { display: flex; flex-direction: column; gap: 5px; margin-top: 4px; }
        .proj-feature-item { display: flex; align-items: flex-start; gap: 7px; font-size: 11.5px; color: var(--muted); }
        .proj-feature-check { color: var(--accent); flex-shrink: 0; font-size: 13px; margin-top: 1px; }
        .proj-links { display: flex; gap: 8px; flex-wrap: wrap; margin-top: auto; }
        .proj-link-demo {
          padding: 6px 14px; border-radius: 7px; font-size: 11.5px; font-weight: 600;
          background: linear-gradient(135deg, var(--p1), #5b4fcf);
          color: #fff; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;
          transition: var(--trans);
        }
        .proj-link-demo:hover { opacity: 0.88; transform: translateY(-1px); }
        .proj-link-code {
          padding: 6px 14px; border-radius: 7px; font-size: 11.5px; font-weight: 500;
          background: transparent; color: var(--muted);
          border: 1px solid var(--border); cursor: pointer; transition: var(--trans);
          display: inline-flex; align-items: center; gap: 5px; position: relative;
        }
        .proj-link-code:hover { border-color: var(--border2); color: var(--text); }
        .code-dropdown {
          position: absolute; bottom: calc(100% + 6px); left: 0;
          background: var(--surface2); border: 1px solid var(--border2); border-radius: 8px;
          padding: 5px; z-index: 10; min-width: 160px; display: none;
        }
        .proj-link-code:hover .code-dropdown { display: block; }
        .code-dropdown a {
          display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 5px;
          font-size: 11.5px; color: var(--muted); text-decoration: none; transition: var(--trans);
        }
        .code-dropdown a:hover { background: var(--surface); color: var(--text); }

        /* ── EDUCATION / TIMELINE ── */
        .timeline { display: flex; flex-direction: column; position: relative; }

        /* The single continuous vertical track behind all items */
        .tl-track {
          position: absolute;
          left: 24px; /* center of the 48px dot column */
          top: 24px;  /* start from center of first dot */
          bottom: 24px;
          width: 2px;
          background: var(--border2);
          border-radius: 2px;
          overflow: hidden;
        }
        /* Filled progress bar inside the track — top item is "now", fills downward */
        .tl-track-fill {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 28%; /* covers experience → approx mid-way */
          background: linear-gradient(180deg, var(--accent) 0%, var(--p1) 60%, rgba(124,111,247,0.3) 100%);
          border-radius: 2px;
        }

        .tl-item {
          display: flex;
          gap: 1.5rem;
          padding-bottom: 2.75rem;
          position: relative;
          align-items: flex-start;
        }
        .tl-item:last-child { padding-bottom: 0; }

        /* Left column: icon dot */
        .tl-marker {
          flex-shrink: 0;
          width: 48px;
          display: flex;
          justify-content: center;
          padding-top: 0;
          position: relative;
          z-index: 2;
        }
        .tl-dot {
          width: 48px; height: 48px; border-radius: 14px; z-index: 2;
          display: flex; align-items: center; justify-content: center; font-size: 20px;
          border: 2px solid var(--border2); background: var(--surface);
          box-shadow: 0 0 0 4px var(--bg2); /* punches through the track line cleanly */
          flex-shrink: 0;
        }
        .tl-dot.exp {
          border-color: var(--accent); background: rgba(6,214,160,0.1);
          box-shadow: 0 0 0 4px var(--bg2), 0 0 16px rgba(6,214,160,0.2);
        }
        .tl-dot.deg {
          border-color: var(--gold); background: rgba(251,191,36,0.08);
          box-shadow: 0 0 0 4px var(--bg2);
        }
        .tl-dot.cert {
          border-color: var(--p1); background: rgba(124,111,247,0.08);
          box-shadow: 0 0 0 4px var(--bg2);
        }

        /* Right column: content card */
        .tl-body {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          padding: 1.4rem 1.6rem; flex: 1; transition: var(--trans);
          position: relative;
        }
        .tl-body:hover { border-color: var(--border2); transform: translateX(4px); }
        .tl-body.current { border-color: rgba(6,214,160,0.35); }
        /* Arrow connector from card back to the line */
        .tl-body::before {
          content: '';
          position: absolute;
          left: -8px; top: 18px;
          width: 0; height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid var(--border);
        }
        .tl-body.current::before { border-right-color: rgba(6,214,160,0.35); }

        .tl-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 0.5rem; }
        .tl-year {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 10px; color: var(--muted); font-family: var(--mono);
          background: var(--surface2); border: 1px solid var(--border);
          padding: 2px 9px; border-radius: 5px; margin-bottom: 0.5rem;
        }
        .tl-title { font-size: 15px; font-weight: 700; color: var(--text); margin: 0 0 0.2rem; }
        .tl-inst { font-size: 13px; color: var(--p2); }
        .tl-current-pill {
          display: flex; align-items: center; gap: 5px; flex-shrink: 0;
          font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 20px;
          background: rgba(6,214,160,0.1); color: var(--accent); border: 1px solid rgba(6,214,160,0.25);
          text-transform: uppercase;
        }
        .tl-current-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
        .tl-meta { display: flex; gap: 16px; margin-top: 0.6rem; flex-wrap: wrap; }
        .tl-meta-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--muted); }
        .tl-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 0.75rem; }
        .tl-chip {
          font-size: 11px; padding: 3px 10px; border-radius: 6px;
          background: rgba(124,111,247,0.08); border: 1px solid rgba(124,111,247,0.15);
          color: var(--p3);
        }
        .cert-btn-pf {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 1rem; padding: 7px 15px; border-radius: 8px; font-size: 12px; font-weight: 600;
          background: transparent; color: var(--p2);
          border: 1px solid rgba(124,111,247,0.3); cursor: pointer; transition: var(--trans);
        }
        .cert-btn-pf:hover { background: rgba(124,111,247,0.1); }

        /* ── CONTACT ── */
        .contact-wrap {
          background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
          overflow: hidden; display: grid; grid-template-columns: 2fr 3fr;
        }
        .contact-left {
          background: linear-gradient(145deg, rgba(124,111,247,0.15), rgba(91,79,207,0.08));
          border-right: 1px solid var(--border);
          padding: 2.5rem 2rem; display: flex; flex-direction: column; gap: 1.5rem;
        }
        .contact-left-title { font-size: 1.1rem; font-weight: 700; color: var(--text); }
        .contact-left-sub { font-size: 13px; color: var(--muted); line-height: 1.7; }
        .contact-items { display: flex; flex-direction: column; gap: 12px; }
        .ci-item { display: flex; align-items: center; gap: 12px; }
        .ci-icon {
          width: 38px; height: 38px; border-radius: 9px;
          background: rgba(124,111,247,0.1); border: 1px solid rgba(124,111,247,0.2);
          display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0;
        }
        .ci-text { font-size: 13px; color: var(--muted); }
        .ci-text a { color: var(--p2); text-decoration: none; }
        .ci-text a:hover { text-decoration: underline; }
        .social-row { display: flex; gap: 10px; }
        .soc-btn {
          width: 40px; height: 40px; border-radius: 10px;
          background: var(--surface2); border: 1px solid var(--border2);
          display: flex; align-items: center; justify-content: center; font-size: 18px;
          text-decoration: none; transition: var(--trans); color: var(--muted);
        }
        .soc-btn:hover { border-color: var(--p1); color: var(--p2); transform: translateY(-2px); }
        .contact-right { padding: 2.5rem 2rem; }
        .contact-right-title { font-size: 1.1rem; font-weight: 700; color: var(--text); margin-bottom: 1.5rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
        .form-label { font-size: 12px; font-weight: 600; color: var(--muted); font-family: var(--mono); }
        .form-input {
          padding: 10px 14px; border-radius: 9px; font-size: 13.5px;
          background: var(--surface2); border: 1px solid var(--border2);
          color: var(--text); transition: var(--trans); font-family: var(--font); outline: none;
        }
        .form-input:focus { border-color: var(--p1); box-shadow: 0 0 0 3px var(--glow2); }
        .form-input::placeholder { color: var(--muted2); }
        textarea.form-input { resize: vertical; min-height: 110px; }
        .submit-btn {
          width: 100%; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 600;
          background: linear-gradient(135deg, var(--p1), #5b4fcf);
          color: #fff; border: none; cursor: pointer; transition: var(--trans);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 20px var(--glow);
        }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px var(--glow); }

        /* ── FOOTER ── */
        .footer {
          border-top: 1px solid var(--border); padding: 2rem 0;
          background: var(--surface);
        }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: gap; }
        .footer-brand { display: flex; align-items: center; gap: 10px; }
        .footer-name { font-size: 14px; font-weight: 600; color: var(--text); }
        .footer-sub { font-size: 12px; color: var(--muted); }
        .footer-right { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .footer-copy { font-size: 12px; color: var(--muted2); }
        .footer-vis { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--muted); }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
          .hero-inner { grid-template-columns: 1fr; }
          .hero-card-wrap { display: none; }
          .about-grid { grid-template-columns: 1fr; }
          .contact-wrap { grid-template-columns: 1fr; }
          .contact-left { border-right: none; border-bottom: 1px solid var(--border); }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr; }
          .nav-links { display: none; }
          .menu-btn { display: flex; }
          .form-row { grid-template-columns: 1fr; }
          .info-grid { grid-template-columns: 1fr; }
          .hero-stats { gap: 1.25rem; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`pf-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-brand" onClick={() => scrollTo("home")}>
            <div className="brand-orb">VS</div>
            <span className="brand-name">Vishal Sonwane</span>
          </div>
          <div className="nav-links">
            {navItems.map(i => (
              <button key={i} className={`nav-link ${activeSection === i ? "active" : ""}`} onClick={() => scrollTo(i)}>
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </button>
            ))}
          </div>
          <div className="nav-right">
            <div className="visitor-pill">
              <div className="visitor-dot"></div>
              <span>{visitorCount > 0 ? visitorCount.toLocaleString() : "—"}</span>
            </div>
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navItems.map(i => (
          <div key={i} className={`mobile-link ${activeSection === i ? "active" : ""}`} onClick={() => scrollTo(i)}>
            {i.charAt(0).toUpperCase() + i.slice(1)}
          </div>
        ))}
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="container">
          <div className="hero-inner">
            <div>
              <div className={`hero-tag ${heroVisible ? "vis" : ""}`}>
                <span className="hero-tag-dot"></span>
                Full Stack Developer — MERN &amp; Python
              </div>
              <h1 className={`hero-h1 ${heroVisible ? "vis" : ""}`}>
                Hi, I'm <span className="grad">Vishal</span><br />Sonwane
              </h1>
              <p className={`hero-sub ${heroVisible ? "vis" : ""}`}>
                Building scalable, high-performance web applications with the MERN stack and Python. Transforming ideas into clean, reliable digital solutions.
              </p>
              <div className={`hero-btns ${heroVisible ? "vis" : ""}`}>
                <a href="#projects" className="btn-primary-pf" onClick={e => { e.preventDefault(); scrollTo("projects"); }}>
                  View Projects →
                </a>
                <a href="#contact" className="btn-ghost-pf" onClick={e => { e.preventDefault(); scrollTo("contact"); }}>
                  Let's Talk 💬
                </a>
              </div>
              <div className={`hero-stats ${heroVisible ? "vis" : ""}`}>
                {[{val:"6+",sup:"",lab:"Projects"},{val:"2",lab:"Certifications"},{val:"1",sup:"yr",lab:"Experience"},{val:"10",sup:"+",lab:"Skills"}].map((s,i) => (
                  <div className="stat" key={i}>
                    <div className="stat-val">{s.val}{s.sup && <span>{s.sup}</span>}</div>
                    <div className="stat-lab">{s.lab}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* HERO CARD */}
            <div className={`hero-card-wrap ${heroVisible ? "vis" : ""}`}>
              <div className="hero-card">
                <div className="hc-top">
                  <div className="hc-avail"><div className="hc-avail-dot"></div>Available</div>
                  <div className="hc-avatar"><img src="photo1.jpg" alt="" /></div>
                  <div className="hc-name">Vishal Sonwane</div>
                  <div className="hc-role">Full Stack Developer</div>
                </div>

                {/* LinkedIn-style current org */}
                <div className="hc-org">
                  <div className="hc-org-row">
                    <div className="hc-org-logo">
                      <img src="SE.png" alt="Sustainify Energy" style={{ width: "40px", height: "40px", borderRadius: "10px" }} />
                    </div>
                    <div className="hc-org-info">
                      <div className="hc-org-company">Sustainify Energy Pvt Ltd</div>
                      <div className="hc-org-title">Full Stack Developer</div>
                      <div className="hc-org-since">2024 – Present · Pune</div>
                    </div>
                    <div className="hc-current-badge">Current</div>
                  </div>
                </div>

                <div className="hc-bottom">
                  <div className="hc-badge"><span className="hc-badge-icon">📍</span>Karve Nagar, Pune, India</div>
                  <div className="hc-badge"><span className="hc-badge-icon">🎓</span>B.Tech · Computer Science</div>
                  <div className="hc-tech">
                    {["MERN","Python","AWS"].map(t => <span key={t} className="hc-chip">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container">
          <div className="sec-header">
            <div className="sec-label">Get To Know Me</div>
            <h2 className="sec-title">About <span>Me</span></h2>
            <div className="sec-bar"></div>
          </div>
          <div className="about-grid">
            <div>
              <div className="about-card">
                <h3 className="about-h">Full Stack Developer</h3>
                <p className="about-p">Versatile developer with expertise in Python and JavaScript technologies. Skilled in building scalable applications using Django and the MERN stack. Strong foundation in software design, REST API development, and database management. Committed to clean code, performance optimization, and exceptional user experiences.</p>
                <div className="about-features">
                  {["Responsive Design","REST APIs","Database Management","Performance Optimization","Clean Code","Agile Development"].map(f => (
                    <div className="af-item" key={f}><div className="af-dot"></div>{f}</div>
                  ))}
                </div>
              </div>

              {/* LinkedIn-style org card */}
              <div className="org-card">
                <div className="org-logo-lg">SE</div>
                <div className="org-details">
                  <div className="org-company">Sustainify Energy Pvt Ltd</div>
                  <div className="org-role">Full Stack Developer</div>
                  <div className="org-meta">📍 Pune, India &nbsp;·&nbsp; Full-time &nbsp;·&nbsp; 2024 – Present</div>
                  <div style={{marginTop:'8px',display:'flex',gap:'6px',flexWrap:'wrap'}}>
                    {["React.js","React Native","Node.js","AWS DynamoDB","AWS S3"].map(t => (
                      <span key={t} style={{fontSize:'10px',padding:'2px 8px',borderRadius:'5px',background:'rgba(124,111,247,0.08)',border:'1px solid rgba(124,111,247,0.15)',color:'var(--p3)'}}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="org-badge">Current</div>
              </div>
            </div>

            <div>
              <div className="info-grid">
                {[
                  {icon:"📍",label:"Location",val:"Karve Nagar, Pune"},
                  {icon:"✉️",label:"Email",val:"vishalsonwane951@gmail.com",link:"mailto:vishalsonwane951@gmail.com"},
                  {icon:"📱",label:"Phone",val:"+91 7888251550",link:"tel:+917888251550"},
                  {icon:"🌐",label:"Languages",val:"English, Marathi, Hindi"},
                  {icon:"🏳️",label:"Nationality",val:"Indian"},
                  {icon:"💼",label:"Status",val:"badge"},
                ].map((item,i) => (
                  <div className="info-card" key={i}>
                    <div className="info-icon">{item.icon}</div>
                    <div>
                      <div className="info-label">{item.label}</div>
                      {item.val === "badge"
                        ? <div className="info-val"><span className="status-chip">Open to Work</span></div>
                        : item.link
                          ? <div className="info-val"><a href={item.link}>{item.val}</a></div>
                          : <div className="info-val">{item.val}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section" style={{background:'var(--bg2)'}}>
        <div className="container">
          <div className="sec-header">
            <div className="sec-label">What I Offer</div>
            <h2 className="sec-title">Technical <span>Skills</span></h2>
            <div className="sec-bar"></div>
          </div>
          <div className="skills-grid">
            {skillCategories.map((c, i) => (
              <div className="skill-card" key={i}>
                <div className="skill-card-head">
                  <div className="skill-card-icon">{c.icon}</div>
                  <div className="skill-card-title">{c.title}</div>
                </div>
                <div className="skill-tags">
                  {c.skills.map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="container">
          <div className="sec-header">
            <div className="sec-label">My Work</div>
            <h2 className="sec-title">Featured <span>Projects</span></h2>
            <div className="sec-bar"></div>
          </div>
          <div className="projects-grid">
            {projectsData.map((p,i) => {
              const isOpen = openFeature === i;
              return (
                <div key={i} className={`proj-card ${p.featured?"featured":""}`}>
                  {p.featured && <div className="proj-featured-badge">⭐ Featured</div>}
                  <div className="proj-header">
                    <div className="proj-icon-wrap">
                      <span className="proj-icon">{p.icon}</span>
                      <div className="proj-title">{p.title}</div>
                    </div>
                    <span className={`proj-status ${p.progress===100?"done":"wip"}`}>{p.status}</span>
                  </div>
                  <div className="proj-progress">
                    <div className="proj-progress-bar" style={{width:`${p.progress}%`}}></div>
                  </div>
                  <p className="proj-desc">{p.description}</p>
                  <div className="proj-skills">
                    {p.skills.map(s => <span key={s} className="proj-skill">{s}</span>)}
                  </div>
                  {p.keyFeatures?.length > 0 && (
                    <div>
                      <button className="proj-features-btn" onClick={() => setOpenFeature(isOpen ? null : i)}>
                        <span>{isOpen ? "▲" : "☰"}</span>
                        <span>{isOpen ? "Hide Features" : "Key Features"}</span>
                      </button>
                      {isOpen && (
                        <div className="proj-features-list">
                          {p.keyFeatures.map((f,fi) => (
                            <div key={fi} className="proj-feature-item">
                              <span className="proj-feature-check">✓</span>
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="proj-links">
                    {p.projectLink && (
                      <a href={p.projectLink} target="_blank" rel="noopener noreferrer" className="proj-link-demo">
                        {p.skills.includes("React Native") ? "📥 APK" : "🔗 Live Demo"}
                      </a>
                    )}
                    {p.githubLink?.length > 0 && (
                      <div className="proj-link-code" style={{position:'relative'}}>
                        <span>⌨</span> Code
                        <div className="code-dropdown">
                          {p.githubLink.map((link,li) => {
                            const isBack = /backend|server|api/i.test(link);
                            return (
                              <a key={li} href={link} target="_blank" rel="noopener noreferrer">
                                {isBack ? "⚙️ Backend Repo" : "🎨 Frontend Repo"}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section" style={{background:'var(--bg2)'}}>
        <div className="container">
          <div className="sec-header">
            <div className="sec-label">My Journey</div>
            <h2 className="sec-title">Experience & <span>Education</span></h2>
            <div className="sec-bar"></div>
          </div>
          <div className="timeline">
            {/* Vertical track + fill bar */}
            <div className="tl-track">
              <div className="tl-track-fill"></div>
            </div>

            {/* CURRENT JOB */}
            <div className="tl-item">
              <div className="tl-marker"><div className="tl-dot exp">💼</div></div>
              <div className="tl-body current">
                <div className="tl-top">
                  <div>
                    <div className="tl-year">2024 – Present</div>
                    <div className="tl-title">Full Stack Developer</div>
                    <div className="tl-inst">⚡ Sustainify Energy Pvt Ltd</div>
                  </div>
                  <div className="tl-current-pill"><div className="tl-current-dot"></div>Current</div>
                </div>
                <div className="tl-meta">
                  <div className="tl-meta-item">📍 Pune, India</div>
                  <div className="tl-meta-item">🕐 Full-time</div>
                </div>
                <div className="tl-chips">
                  {["React.js","React Native","Node.js","Express.js","MongoDB","AWS DynamoDB","AWS S3","REST APIs"].map(t => (
                    <span key={t} className="tl-chip">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* B.TECH */}
            <div className="tl-item">
              <div className="tl-marker"><div className="tl-dot deg">🎓</div></div>
              <div className="tl-body">
                <div className="tl-top">
                  <div>
                    <div className="tl-year">2016 – 2020</div>
                    <div className="tl-title">B.Tech — Computer Science</div>
                    <div className="tl-inst">Dr. Babasaheb Ambedkar Technological University</div>
                  </div>
                </div>
                <div className="tl-meta">
                  <div className="tl-meta-item">📊 CGPA: 7.35</div>
                </div>
                <button className="cert-btn-pf" onClick={() => openCert("btech")}>📄 View Certificate</button>
              </div>
            </div>

            {/* MERN */}
            <div className="tl-item">
              <div className="tl-marker"><div className="tl-dot cert">⚡</div></div>
              <div className="tl-body">
                <div className="tl-top">
                  <div>
                    <div className="tl-year">2023</div>
                    <div className="tl-title">MERN Stack Development</div>
                    <div className="tl-inst">The Kiran Academy</div>
                  </div>
                </div>
                <div className="tl-chips">
                  {["React.js","Node.js","MongoDB","Express.js"].map(t => <span key={t} className="tl-chip">{t}</span>)}
                </div>
                <button className="cert-btn-pf" onClick={() => openCert("mern")}>📄 View Certificate</button>
              </div>
            </div>

            {/* PYTHON */}
            <div className="tl-item">
              <div className="tl-marker"><div className="tl-dot cert">🐍</div></div>
              <div className="tl-body">
                <div className="tl-top">
                  <div>
                    <div className="tl-year">2023</div>
                    <div className="tl-title">Python Full-Stack</div>
                    <div className="tl-inst">The Kiran Academy</div>
                  </div>
                </div>
                <div className="tl-chips">
                  {["Python","Django","REST","PostgreSQL"].map(t => <span key={t} className="tl-chip">{t}</span>)}
                </div>
                <button className="cert-btn-pf" onClick={() => openCert("python")}>📄 View Certificate</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="container">
          <div className="sec-header">
            <div className="sec-label">Let's Connect</div>
            <h2 className="sec-title">Get In <span>Touch</span></h2>
            <div className="sec-bar"></div>
          </div>
          <div className="contact-wrap">
            <div className="contact-left">
              <div>
                <div className="contact-left-title">Contact Information</div>
                <div className="contact-left-sub" style={{marginTop:'8px'}}>Feel free to reach out for collaborations, opportunities, or just a friendly chat!</div>
              </div>
              <div className="contact-items">
                {[
                  {icon:"✉️",text:"vishalsonwane951@gmail.com",link:"mailto:vishalsonwane951@gmail.com"},
                  {icon:"📱",text:"+91 7888251550",link:"tel:+917888251550"},
                  {icon:"📍",text:"Kharadi, Pune, India"},
                ].map((c,i) => (
                  <div className="ci-item" key={i}>
                    <div className="ci-icon">{c.icon}</div>
                    <div className="ci-text">
                      {c.link ? <a href={c.link}>{c.text}</a> : c.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="social-row">
                <a href="https://github.com/vishalsonwane951" target="_blank" rel="noopener noreferrer" className="soc-btn">🐙</a>
                <a href="https://linkedin.com/in/vishal-sonwane-48766b16a" target="_blank" rel="noopener noreferrer" className="soc-btn">💼</a>
                <a href="mailto:vishalsonwane951@gmail.com" className="soc-btn">✉️</a>
                <a href="tel:+917888251550" className="soc-btn">📱</a>
              </div>
            </div>
            <div className="contact-right">
              <div className="contact-right-title">Send Me a Message</div>
              <form onSubmit={e => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input className="form-input" type="text" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Your Email</label>
                    <input className="form-input" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input" rows={5} placeholder="Your message here..." required></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message ✉️
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner" style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
            <div className="footer-brand">
              <div className="brand-orb" style={{width:32,height:32,fontSize:12,borderRadius:8}}>VS</div>
              <div>
                <div className="footer-name">Vishal Sonwane</div>
                <div className="footer-sub">Full Stack Developer</div>
              </div>
            </div>
            <div className="footer-right">
              <div className="footer-vis">
                <div className="visitor-dot"></div>
                {visitorCount > 0 ? visitorCount.toLocaleString() : "—"} visitors
              </div>
              <div className="footer-copy">© {new Date().getFullYear()} Vishal Sonwane. All rights reserved.</div>
              <button className="btn-ghost-pf" style={{padding:'6px 14px',fontSize:'12px'}} onClick={() => scrollTo("home")}>↑ Top</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}