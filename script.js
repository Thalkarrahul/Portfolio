/* Enable reveal animations only when JS runs; otherwise content stays visible. */
document.documentElement.classList.add("js");

/* ===================== Project Data ===================== */
const projects = [
  {
    name: "Smart Crowding",
    icon: "🏥",
    type: "Healthcare · Multi-tenant",
    desc: "Cloud-based hospital coordination platform for monitoring capacity, patient flow, and operations in real time.",
    features: [
      "Real-time patient flow monitoring",
      "Automated action plan triggering",
      "Interactive dashboards & analytics",
    ],
    tech: ["ASP.NET Core", "Angular", "SQL Server", "EF Core", "Tailwind CSS"],
  },
  {
    name: "Ekkom",
    icon: "🪑",
    type: "Workspace Booking",
    desc: "Workspace booking platform for managing office spaces, desks, meeting rooms, and resource allocation.",
    features: [
      "Daily / weekly / monthly allocation",
      "Real-time availability tracking",
      "Approval & cancellation workflows",
    ],
    tech: ["ASP.NET Core", "Angular", "SQL Server", "EF Core", "Bootstrap"],
  },
  {
    name: "Vendor Portal",
    icon: "📦",
    type: "B2B Platform",
    desc: "Web platform for managing vendor communication, invoices, and business transactions.",
    features: [
      "Invoice upload & validation",
      "Purchase order management",
      "Audit logging & activity tracking",
    ],
    tech: ["ASP.NET Core", "ASP.NET MVC", "SQL Server", "EF Core", "Bootstrap"],
  },
  {
    name: "ANM",
    icon: "🕒",
    type: "Workforce Management",
    desc: "Employee attendance and workforce management platform with approval workflows.",
    features: [
      "Attendance & leave management",
      "Miss Punch management",
      "Approval workflows & notifications",
    ],
    tech: ["ASP.NET Core", "Angular", "SQL Server", "EF Core", "Tailwind CSS"],
  },
  {
    name: "Invoice Management System",
    icon: "🧾",
    type: "Finance",
    desc: "Billing and financial management application for invoice generation and payment tracking.",
    features: [
      "Multi-currency & exchange rates",
      "Payment tracking",
      "Financial reporting & export",
    ],
    tech: ["ASP.NET Core", "Angular", "SQL Server", "EF Core", "Tailwind CSS"],
  },
  {
    name: "Sneh Vivaah",
    icon: "💍",
    type: "Matrimony",
    desc: "Matrimony platform that helps users find suitable life partners with mobile support.",
    features: [
      "Profile management & search",
      "Partner filtering",
      "Authentication & authorization",
    ],
    tech: ["ASP.NET Core", "Angular", "SQL Server"],
  },
  {
    name: "Cousin Middleware",
    icon: "🔄",
    type: "Integration",
    desc: "Middleware solution for synchronizing data between multiple business systems.",
    features: [
      "Order & customer data processing",
      "Azure API integrations",
      "Scheduled background services",
    ],
    tech: ["Azure", "SQL Server", "REST APIs"],
  },
  {
    name: "Email Management Service",
    icon: "✉️",
    type: "Service",
    desc: "Centralized email service powering multiple applications with tracking.",
    features: [
      "Template management",
      "OTP, verification & password reset",
      "Email tracking dashboard",
    ],
    tech: ["ASP.NET Core", "SQL Server", "SMTP"],
  },
  {
    name: "Feedback360",
    icon: "📊",
    type: "HR",
    desc: "Employee feedback and performance evaluation system.",
    features: [
      "Feedback collection & management",
      "Performance assessment",
      "Analytics & reporting",
    ],
    tech: ["ASP.NET Core", "Angular", "SQL Server"],
  },
  {
    name: "PowerPal",
    icon: "⚡",
    type: "Business App",
    desc: "Business application for managing operational and administrative processes.",
    features: [
      "User management",
      "Reporting dashboards",
      "Role-based access control",
    ],
    tech: ["ASP.NET Core", "Angular", "SQL Server"],
  },
  {
    name: "Massive Akkon",
    icon: "🗂️",
    type: "Business App",
    desc: "Business process and data management application with dashboards.",
    features: [
      "Data processing",
      "Reporting & dashboards",
      "User management",
    ],
    tech: ["ASP.NET Core", "Angular", "SQL Server"],
  },
];

/* ===================== Render Projects ===================== */
const grid = document.getElementById("projectsGrid");

function renderProjects(list) {
  grid.innerHTML = list
    .map(
      (p) => `
    <article class="project-card reveal" data-tech="${p.tech.join("|")}">
      <div class="project-top">
        <div class="project-icon">${p.icon}</div>
        <span class="project-purpose-tag">${p.type}</span>
      </div>
      <h3>${p.name}</h3>
      <p class="project-desc">${p.desc}</p>
      <ul class="project-features">
        ${p.features.map((f) => `<li>${f}</li>`).join("")}
      </ul>
      <div class="project-tech">
        ${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
    </article>`
    )
    .join("");
  observeReveals();
}

renderProjects(projects);

/* ===================== Filter ===================== */
const filterBar = document.getElementById("filterBar");
filterBar.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  filterBar.querySelector(".active")?.classList.remove("active");
  btn.classList.add("active");

  const filter = btn.dataset.filter;
  document.querySelectorAll(".project-card").forEach((card) => {
    const techs = card.dataset.tech;
    const show = filter === "all" || techs.includes(filter);
    card.classList.toggle("hide", !show);
  });
});

/* ===================== Reveal on scroll ===================== */
var revealObserver;
function observeReveals() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  }
  document
    .querySelectorAll(".reveal:not(.visible)")
    .forEach((el) => revealObserver.observe(el));
}
observeReveals();

/* ===================== Navbar scroll state + progress ===================== */
const navbar = document.getElementById("navbar");
const progress = document.getElementById("scrollProgress");

function onScroll() {
  const top = window.scrollY;
  navbar.classList.toggle("scrolled", top > 30);

  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (top / height) * 100 + "%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ===================== Mobile nav ===================== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

/* ===================== Animated stat counters ===================== */
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const isFloat = !Number.isInteger(target);
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = target * eased;
        el.textContent = isFloat ? val.toFixed(1) : Math.round(val);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = isFloat ? target.toFixed(1) : target + "+";
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".stat-num").forEach((el) => statObserver.observe(el));

/* ===================== Language rating dots ===================== */
document.querySelectorAll(".lang-dots").forEach((el) => {
  const score = parseInt(el.dataset.score, 10) || 0;
  el.setAttribute("title", score + " / 5");
  for (let i = 1; i <= 5; i++) {
    const dot = document.createElement("span");
    dot.className = i <= score ? "dot on" : "dot";
    el.appendChild(dot);
  }
});

/* ===================== Footer year ===================== */
document.getElementById("year").textContent = new Date().getFullYear();
