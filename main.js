const revealItems = document.querySelectorAll(".reveal");
const topbar = document.getElementById("topbar");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const cursorGlow = document.getElementById("cursorGlow");
const counts = document.querySelectorAll(".count");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));

window.addEventListener("scroll", () => {
  if (window.scrollY > 18) {
    topbar.classList.add("scrolled");
  } else {
    topbar.classList.remove("scrolled");
  }
});

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });
}

window.addEventListener("mousemove", (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.opacity = "1";
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

window.addEventListener("mouseleave", () => {
  if (!cursorGlow) return;
  cursorGlow.style.opacity = "0";
});

function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = String(target).includes(".");
  const suffix = target === 99.9 ? "%" : target === 80 ? "%" : "+";
  const duration = 1600;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;

    if (isDecimal) {
      el.textContent = value.toFixed(1) + suffix;
    } else {
      el.textContent = Math.floor(value).toLocaleString("es-AR") + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      if (isDecimal) el.textContent = target.toFixed(1) + suffix;
      else el.textContent = Math.floor(target).toLocaleString("es-AR") + suffix;
    }
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counts.forEach((count) => counterObserver.observe(count));

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

document.querySelectorAll(".db-nav").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".db-nav").forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");
  });
});