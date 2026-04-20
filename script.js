// فتح/إغلاق القائمة الجانبية
const menuToggle = document.getElementById("menu-toggle");
const sideMenu = document.getElementById("side-menu");
const closeMenuBtn = document.getElementById("close-menu");
const menuItems = document.querySelectorAll(".menu-item");

// عند الضغط على زر الهامبرغر
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active"); // يتحول إلى X
  sideMenu.classList.toggle("open");     // يفتح/يغلق القائمة
});

// عند الضغط على زر الإغلاق داخل القائمة
closeMenuBtn.addEventListener("click", () => {
  sideMenu.classList.remove("open");
  menuToggle.classList.remove("active");
});

// عند الضغط على عنصر من القائمة
menuItems.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 200);

    const link = btn.getAttribute("data-link");
    if (link) {
      sideMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      window.location.href = link;
    }
  });
});

// بطاقات النخبة (تمدد عند الضغط)
const eliteCards = document.querySelectorAll(".elite-card");

eliteCards.forEach((card) => {
  card.addEventListener("click", () => {
    const expanded = card.getAttribute("data-expanded") === "true";
    card.setAttribute("data-expanded", expanded ? "false" : "true");
  });
});

// سلايدر الأبطال
const heroesTrack = document.getElementById("heroes-track");
const prevBtn = document.getElementById("slider-prev");
const nextBtn = document.getElementById("slider-next");

if (heroesTrack && prevBtn && nextBtn) {
  const scrollAmount = 220;

  prevBtn.addEventListener("click", () => {
    heroesTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    heroesTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

// شاشة الافتتاح: إخفاؤها بعد الأنيميشن
const introScreen = document.getElementById("intro-screen");

window.addEventListener("load", () => {
  setTimeout(() => {
    introScreen.classList.add("hidden");
  }, 3400);
});

// كانفس الشرار (SVG + Canvas ممكن لاحقاً، الآن Canvas شرار بسيط)
const canvas = document.getElementById("embers-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const embers = [];
const EMBERS_COUNT = 80;

function createEmber() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 100,
    radius: 1 + Math.random() * 2,
    speedY: 0.4 + Math.random() * 0.8,
    alpha: 0.3 + Math.random() * 0.5
  };
}

for (let i = 0; i < EMBERS_COUNT; i++) {
  embers.push(createEmber());
}

function drawEmbers() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  embers.forEach((e) => {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.radius * 3);
    gradient.addColorStop(0, `rgba(255, 120, 80, ${e.alpha})`);
    gradient.addColorStop(1, "rgba(255, 120, 80, 0)");
    ctx.fillStyle = gradient;
    ctx.arc(e.x, e.y, e.radius * 3, 0, Math.PI * 2);
    ctx.fill();

    e.y -= e.speedY;
    e.alpha -= 0.002;

    if (e.y < -50 || e.alpha <= 0) {
      Object.assign(e, createEmber());
    }
  });

  requestAnimationFrame(drawEmbers);
}

// عدادات الإحصائيات
const counters = document.querySelectorAll(".stat-number");

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = target / 60;

    const update = () => {
      count += speed;
      if (count < target) {
        counter.textContent = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  });
}

if (counters.length > 0) {
  setTimeout(animateCounters, 800);
}

// بطاقات الفروع - التمدد عند الضغط
const branchCards = document.querySelectorAll(".branch-card");

branchCards.forEach(card => {
  card.addEventListener("click", (e) => {

    // منع تفعيل التمدد عند الضغط على زر "زيارة"
    if (e.target.classList.contains("visit-btn")) return;

    const expanded = card.getAttribute("data-expanded") === "true";
    card.setAttribute("data-expanded", expanded ? "false" : "true");
  });
});

// زر زيارة
function visitBranch(btn) {
  btn.style.transform = "scale(0.9)";
  btn.style.background = "#ffb4b4";

  setTimeout(() => {
    window.location.href = "https://chat.whatsapp.com/your-group-link";
  }, 250);
}

document.querySelectorAll(".feature-card").forEach(card => {
  card.addEventListener("click", () => {
    const expanded = card.getAttribute("data-expanded") === "true";
    card.setAttribute("data-expanded", expanded ? "false" : "true");
  });
});

// الاحصائيات 
const speed = 40; // كلما قل الرقم زادت السرعة

document.querySelectorAll(".stat-number").forEach(num => {
  const update = () => {
    const target = +num.getAttribute("data-target");
    const current = +num.innerText;

    const increment = Math.ceil(target / speed);

    if (current < target) {
      num.innerText = current + increment;
      setTimeout(update, 20);
    } else {
      num.innerText = target;
    }
  };

  update();
});

// زر واتساب العائم
const dragBtn = document.getElementById("drag-btn");

if (dragBtn) {

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  /* للكمبيوتر */
  dragBtn.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - dragBtn.getBoundingClientRect().left;
    offsetY = e.clientY - dragBtn.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      dragBtn.style.left = `${e.clientX - offsetX}px`;
      dragBtn.style.top = `${e.clientY - offsetY}px`;
      dragBtn.style.bottom = "auto";
      dragBtn.style.right = "auto";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  /* للهواتف */
  dragBtn.addEventListener("touchstart", (e) => {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - dragBtn.getBoundingClientRect().left;
    offsetY = touch.clientY - dragBtn.getBoundingClientRect().top;
  });

  document.addEventListener("touchmove", (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      dragBtn.style.left = `${touch.clientX - offsetX}px`;
      dragBtn.style.top = `${touch.clientY - offsetY}px`;
      dragBtn.style.bottom = "auto";
      dragBtn.style.right = "auto";
    }
  });

  document.addEventListener("touchend", () => {
    isDragging = false;
  });

}

// ازرار النخبة

const viewport = document.getElementById("heroes-viewport");
const track = document.getElementById("heroes-track");
const cards = document.querySelectorAll(".hero-card");

let currentIndex = 0;
let startX = 0;
let isDragging = false;

// ————————————————
// دالة التمركز
// ————————————————
function centerCard(index) {
  const card = cards[index];
  const viewportWidth = viewport.offsetWidth;
  const cardWidth = card.offsetWidth;
  const cardLeft = card.offsetLeft;

  const offset = cardLeft - (viewportWidth / 2) + (cardWidth / 2);

  track.style.transition = "transform 0.35s ease";
  track.style.transform = `translateX(${-offset}px)`;
}

// ————————————————
// أزرار التنقل
// ————————————————
document.getElementById("slider-next").onclick = () => {
  if (currentIndex < cards.length - 1) currentIndex++;
  centerCard(currentIndex);
};

document.getElementById("slider-prev").onclick = () => {
  if (currentIndex > 0) currentIndex--;
  centerCard(currentIndex);
};

// ————————————————
// السحب (ماوس + لمس)
// ————————————————
function startDrag(x) {
  startX = x;
  isDragging = true;
}

function endDrag(x) {
  if (!isDragging) return;
  isDragging = false;

  const diff = x - startX;
  const threshold = 40; // عتبة صغيرة وسريعة

  if (diff > threshold && currentIndex < cards.length - 1) {
  // سحب يسار → بطاقة تالية
  currentIndex++;
} else if (diff < -threshold && currentIndex > 0) {
  // سحب يمين → بطاقة سابقة
  currentIndex--;
}

  centerCard(currentIndex);
}

// ————————————————
// أحداث الماوس
// ————————————————
viewport.addEventListener("mousedown", (e) => startDrag(e.clientX));
viewport.addEventListener("mouseup", (e) => endDrag(e.clientX));
viewport.addEventListener("mouseleave", (e) => endDrag(e.clientX));

// ————————————————
// أحداث اللمس
// ————————————————
viewport.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX));
viewport.addEventListener("touchend", (e) => endDrag(e.changedTouches[0].clientX));

// ————————————————
// تمركز البطاقة الأولى
// ————————————————
centerCard(0);

document.getElementById("continue-btn").addEventListener("click", () => {
  document.getElementById("menu-toggle").click();
});


drawEmbers();