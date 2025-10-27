// ======================
// VARIABLES CALENDARIO
// ======================
const calendarGrid = document.querySelector(".calendar-grid");
const monthYear = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = null;

// Ejemplo de reservas / disponibilidad
const availability = {
  "2025-10-01": "available",
  "2025-10-02": "half",
  "2025-10-03": "full",
  "2025-10-05": "full",
  "2025-10-06": "half",
  "2025-10-09": "full"
};

const dayNames = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];
const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

// ======================
// FUNCIONES AUXILIARES
// ======================

// Devuelve estado de disponibilidad de una fecha
function getAvailability(dateStr) {
  return availability[dateStr] || "available";
}

// Animación suave al cambiar mes
function animateCalendarChange() {
  calendarGrid.classList.add("fade");
  setTimeout(() => calendarGrid.classList.remove("fade"), 300);
}

// Actualiza la leyenda dinámica
function updateLegend(dateStr, estado) {
  const legend = document.querySelector(".calendar-legend");
  legend.innerHTML = `
    <span><strong>${dateStr}</strong></span>
    <span><div class="legend-box ${estado}"></div> ${estado === "full" ? "Día completo" : estado === "half" ? "Mitad de día" : "Disponible"}</span>
  `;
}

// ======================
// RENDER CALENDARIO
// ======================
function renderCalendar(month, year) {
  calendarGrid.innerHTML = "";
  animateCalendarChange();

  // Nombres de los días
  dayNames.forEach(day => {
    const dayName = document.createElement("div");
    dayName.classList.add("day-name");
    dayName.textContent = day;
    calendarGrid.appendChild(dayName);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay === 0 ? 6 : firstDay - 1; // Ajuste domingo = 6

  // Espacios vacíos al inicio del mes
  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    calendarGrid.appendChild(empty);
  }

  // Crear días del mes
  for (let day = 1; day <= lastDay; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("day");

    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const estado = getAvailability(dateStr);

    dayCell.classList.add(estado);
    dayCell.textContent = day;

    // Selección visual
    dayCell.addEventListener("click", () => {
      document.querySelectorAll(".day.selected").forEach(el => el.classList.remove("selected"));
      dayCell.classList.add("selected");
      selectedDate = dateStr;
      updateLegend(dateStr, estado);
    });

    calendarGrid.appendChild(dayCell);
  }

  monthYear.textContent = `${monthNames[month]} ${year}`;
}

// ======================
// NAVEGACIÓN MESES
// ======================
prevMonthBtn.addEventListener("click", () => {
  const isCurrent = currentYear === today.getFullYear() && currentMonth === today.getMonth();
  if (isCurrent) return; // Bloquea meses pasados

  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// ======================
// INICIALIZAR CALENDARIO
// ======================
renderCalendar(currentMonth, currentYear);

// ======================
// ANIMACIÓN AL CARGAR
// ======================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ======================
// ANIMACIONES SCROLL
// ======================
document.addEventListener("DOMContentLoaded", () => {
  const elementosAnimados = document.querySelectorAll(".animado");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elementosAnimados.forEach(el => observer.observe(el));
});

// 🍔 MENÚ HAMBURGUESA
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const menu = document.getElementById('menu');
  const menuLinks = document.querySelectorAll('.menu a');

  // Toggle menú al hacer clic en el botón
  hamburgerBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    hamburgerBtn.classList.toggle('open');
  });

  // Cierra el menú al hacer clic en cualquier enlace
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      hamburgerBtn.classList.remove('open');
    });
  });
});




// ======================
// JSON-LD PARA SEO
// ======================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SalaKoala",
  "image": "https://tusitio.com/img/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "C. de Suiza 12",
    "addressLocality": "Fuenlabrada",
    "addressRegion": "Madrid",
    "postalCode": "28943",
    "addressCountry": "ES"
  },
  "telephone": "+34643522826",
  "url": "https://www.salakoala.com",
  "openingHours": "Mo-Fr 10:00-21:00, Sa-Su 10:00-21:00"
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(jsonLd);
document.head.appendChild(script);
