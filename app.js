/* =====================================================
   CONFIGURATION
   ===================================================== */
const API_URL = 'https://homeopathy-clinic-bhargavi-backend.onrender.com/api';
// Local development: 'http://localhost:5000/api'

/* =====================================================
   TREATMENTS DATA
   ===================================================== */
const treatments = [
  { name: 'Diabetes (Sugar)',         icon: '🩺', desc: 'Natural management of blood sugar levels with personalized homeopathic care.' },
  { name: 'Hypertension',             icon: '❤️', desc: 'Natural treatment for high blood pressure (hypertension) to help maintain heart health and overall well-being.' },
  { name: 'Thyroid Disorders',        icon: '⚕️', desc: 'Effective treatment for thyroid imbalance to restore hormonal health.' },
  { name: 'Gynaecological Problems',  icon: '♀️', desc: 'Natural treatment for PCOD, PCOS, irregular periods, hormonal imbalance, and women\'s health issues.' },
  { name: 'Pediatric Care',           icon: '👶', desc: 'Safe homeopathic treatment for children\'s health issues including ADHD and Autism support.' },
  { name: 'Geriatric Care',           icon: '👴', desc: 'Natural treatment and care for age-related conditions including Parkinson\'s disease, Alzheimer\'s disease, weakness, and elderly health problems.' },
  { name: 'Allergies & Asthma',       icon: '🫁', desc: 'Natural treatment for seasonal allergies, chronic allergies, asthma, and breathing-related problems.' },
  { name: 'Urinary & Kidney Disorders', icon: '💧', desc: 'Natural treatment for urinary disorders and kidney problems including UTI, kidney stones, and improved kidney function.' },
  { name: 'Gastric Problems',         icon: '🍽️', desc: 'Treatment for acidity, bloating, and digestive disorders.' },
  { name: 'Joint & Bone Disorders',   icon: '🦴', desc: 'Natural treatment for arthritis, joint pain, stiffness, bone weakness, calcium deficiency, and inflammation.' },
  { name: 'ENT Disorders',            icon: '👂', desc: 'Natural treatment for sinusitis, tonsillitis, ear pain, throat infections, and nasal allergies.' },
  { name: 'Nerve Disorders',          icon: '🧠', desc: 'Natural treatment for nerve-related disorders including nerve weakness, tingling, numbness, and neurological conditions.' },
  { name: 'Migraine',                 icon: '🧠', desc: 'Long-term relief from migraine and chronic headaches.' },
  { name: 'Skin & Hair Care',         icon: '🌿', desc: 'Treatment for skin rashes, eczema, psoriasis, acne, other skin allergies, dandruff, hair fall, and early graying.' },
  { name: 'Stress & Anxiety',         icon: '😌', desc: 'Natural healing for mental stress, anxiety, and emotional imbalance.' },
  { name: 'Cancer Support Care',      icon: '🛡️', desc: 'Supportive care to improve immunity and quality of life during treatment.' }
];

/* =====================================================
   CAROUSEL STATE
   ===================================================== */
const desktopImages = [
  'assets/newDr0.png',
  'assets/new1.png',
  'assets/new2.png',
  'assets/new3.png',
  'assets/new4.png',
  'assets/newDr0.png'
];

const mobileImages = [
  'assets/newMobile1.png',
  'assets/mobile.png',
  'assets/mobile2.png',
  'assets/mobile4.png',
  'assets/mobile5.png',
  'assets/newMobile1.png'
];

let currentIndex = 0;
let isPaused = false;
let carouselInterval = null;
let isMobile = window.innerWidth <= 768;

function getImages() {
  return isMobile ? mobileImages : desktopImages;
}

/* =====================================================
   BUILD CAROUSEL DOM
   ===================================================== */
function buildCarousel() {
  const container = document.getElementById('heroCarousel');
  if (!container) return;

  const images = getImages();
  container.innerHTML = '';

  // Images
  images.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Clinic slide ${i + 1}`;
    img.className = 'hero-img' + (i === currentIndex ? ' active' : '');
    container.appendChild(img);
  });

  // Left arrow
  const leftBtn = document.createElement('button');
  leftBtn.className = 'arrow left';
  leftBtn.innerHTML = '&#10094;';
  leftBtn.setAttribute('aria-label', 'Previous slide');
  leftBtn.addEventListener('click', prevSlide);
  container.appendChild(leftBtn);

  // Right arrow
  const rightBtn = document.createElement('button');
  rightBtn.className = 'arrow right';
  rightBtn.innerHTML = '&#10095;';
  rightBtn.setAttribute('aria-label', 'Next slide');
  rightBtn.addEventListener('click', nextSlide);
  container.appendChild(rightBtn);

  // Dots row
  const dotsDiv = document.createElement('div');
  dotsDiv.className = 'dots';
  const middleIndex = Math.floor(images.length / 2);

  images.forEach((_, i) => {
    // Insert pause button in the middle
    if (i === middleIndex) {
      const pauseBtn = document.createElement('button');
      pauseBtn.className = 'pause-btn';
      pauseBtn.id = 'pauseBtn';
      pauseBtn.textContent = isPaused ? '▶' : '⏸';
      pauseBtn.setAttribute('aria-label', 'Pause/Play slideshow');
      pauseBtn.addEventListener('click', togglePause);
      dotsDiv.appendChild(pauseBtn);
    }

    const dot = document.createElement('span');
    dot.dataset.index = i;
    if (i === currentIndex) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsDiv.appendChild(dot);
  });

  container.appendChild(dotsDiv);
}

function updateCarouselUI() {
  const imgEls = document.querySelectorAll('#heroCarousel .hero-img');
  const dotEls = document.querySelectorAll('#heroCarousel .dots span');

  imgEls.forEach((img, i) => {
    img.classList.toggle('active', i === currentIndex);
  });

  dotEls.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function nextSlide() {
  const images = getImages();
  currentIndex = (currentIndex + 1) % images.length;
  updateCarouselUI();
}

function prevSlide() {
  const images = getImages();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarouselUI();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarouselUI();
}

function togglePause() {
  isPaused = !isPaused;
  const btn = document.getElementById('pauseBtn');
  if (btn) btn.textContent = isPaused ? '▶' : '⏸';
}

function startCarousel() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(() => {
    if (!isPaused) nextSlide();
  }, 5000);
}

/* =====================================================
   BUILD TREATMENT CARDS
   ===================================================== */
function buildTreatments() {
  const grid = document.getElementById('treatmentGrid');
  if (!grid) return;

  grid.innerHTML = treatments.map(t => `
    <div class="card">
      <div class="icon">${t.icon}</div>
      <h3>${t.name}</h3>
      <p>${t.desc}</p>
    </div>
  `).join('');
}

/* =====================================================
   SCROLL TRACKING & FADE-IN
   ===================================================== */
const sections = ['home', 'about', 'treatments', 'appointment', 'contact'];

function updateActiveNav(current) {
  sections.forEach(id => {
    const link = document.getElementById('nav-' + id);
    if (link) link.classList.toggle('active', id === current);
  });
}

function checkFadeIn() {
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

function onScroll() {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.offsetTop - 120;
      if (window.scrollY >= offsetTop) current = id;
    }
  });
  updateActiveNav(current);
  checkFadeIn();
}

/* =====================================================
   SMOOTH SCROLL HELPER
   ===================================================== */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    // Use polyfill-compatible scroll — works on iOS Safari < 15.4
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Close mobile nav if open — Bootstrap owns the collapse instance
  const navMenu = document.getElementById('navMenu');
  if (navMenu && navMenu.classList.contains('show')) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
    bsCollapse.hide();
  }
}

/* =====================================================
   NAVBAR MOBILE TOGGLE
   ===================================================== */
function initNavbar() {
  // Bootstrap handles the hamburger toggle via data-bs-toggle on the button.
  // Nothing extra needed here.
}

/* =====================================================
   APPOINTMENT FORM
   ===================================================== */
const touched = { name: false, mobile: false, gender: false, date: false, time: false };

function setMinDate() {
  const dateInput = document.getElementById('apptDate');
  if (!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  updateDateDisplay(dateInput);
}

// Format YYYY-MM-DD → "01 Jun 2026" for the iOS display label
function formatDateForDisplay(val) {
  if (!val) return 'Select Date';
  const [year, month, day] = val.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}

// Update the visible date label (iOS) and sync valid/invalid classes
function updateDateDisplay(input) {
  if (!input) return;
  const display = document.getElementById('dateDisplay');
  if (!display) return;

  if (input.value) {
    display.textContent = formatDateForDisplay(input.value);
    display.classList.add('has-value');
  } else {
    display.textContent = 'Select Date';
    display.classList.remove('has-value');
  }
}

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function setFieldState(inputId, isValid) {
  const el = document.getElementById(inputId);
  if (!el) return;
  el.classList.toggle('valid',   isValid);
  el.classList.toggle('invalid', !isValid);

  // Also sync the iOS date display label border
  if (inputId === 'apptDate') {
    const display = document.getElementById('dateDisplay');
    if (display) {
      display.classList.toggle('valid-date',   isValid);
      display.classList.toggle('invalid-date', !isValid);
    }
  }
}

function validateForm() {
  const name   = getVal('apptName');
  const mobile = getVal('apptMobile');
  const gender = getVal('apptGender');
  const date   = getVal('apptDate');
  const time   = getVal('apptTime');

  // Name
  const namePattern = /^[A-Za-z ]+$/;
  const nameLetters = name.replace(/\s/g, '');
  let nameErr = '';
  if (!name)                          nameErr = 'Name is required';
  else if (nameLetters.length < 3)    nameErr = 'Minimum 3 letters required';
  else if (!namePattern.test(name))   nameErr = 'Only letters allowed';

  // Mobile
  let mobileErr = '';
  if (!mobile)                        mobileErr = 'Mobile is required';
  else if (!/^[6-9]\d{9}$/.test(mobile)) mobileErr = 'Enter valid 10-digit mobile';

  // Gender
  let genderErr = gender ? '' : 'Gender is required';

  // Date
  let dateErr = '';
  if (!date) {
    dateErr = 'Date is required';
  } else {
    const selected = new Date(date);
    const today    = new Date(new Date().toDateString());
    if (selected < today)          dateErr = 'Past dates not allowed';
    else if (selected.getDay() === 0) dateErr = 'Sunday is holiday';
  }

  // Time
  let timeErr = time ? '' : 'Select a time';

  // Show errors only for touched fields
  if (touched.name)   { showError('nameError',   nameErr);   setFieldState('apptName',   !nameErr); }
  if (touched.mobile) { showError('mobileError', mobileErr); setFieldState('apptMobile', !mobileErr); }
  if (touched.gender) { showError('genderError', genderErr); setFieldState('apptGender', !genderErr); }
  if (touched.date)   { showError('dateError',   dateErr);   setFieldState('apptDate',   !dateErr); }
  if (touched.time)   { showError('timeError',   timeErr);   setFieldState('apptTime',   !timeErr); }

  const valid = !nameErr && !mobileErr && !genderErr && !dateErr && !timeErr;
  const btn = document.getElementById('apptSubmitBtn');
  if (btn) btn.disabled = !valid;

  return { valid, nameErr, mobileErr, genderErr, dateErr, timeErr };
}

function filterTimeSlots() {
  const dateVal = getVal('apptDate');
  const timeSelect = document.getElementById('apptTime');
  if (!timeSelect) return;

  const allSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const currentVal = timeSelect.value;
  timeSelect.innerHTML = '<option value="">Select Time</option>';

  const selectedDate = dateVal ? new Date(dateVal) : null;
  const today = new Date();
  const isToday = selectedDate && selectedDate.toDateString() === today.toDateString();

  allSlots.forEach(slot => {
    let available = true;

    if (isToday) {
      const [time, modifier] = slot.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      const nowH = today.getHours();
      const nowM = today.getMinutes();
      available = hours > nowH || (hours === nowH && minutes > nowM);
    }

    if (available) {
      const opt = document.createElement('option');
      opt.value = slot;
      opt.textContent = slot;
      if (slot === currentVal) opt.selected = true;
      timeSelect.appendChild(opt);
    }
  });
}

function initAppointmentForm() {
  setMinDate();

  const fields = [
    { id: 'apptName',   touchKey: 'name' },
    { id: 'apptMobile', touchKey: 'mobile' },
    { id: 'apptGender', touchKey: 'gender' },
    { id: 'apptDate',   touchKey: 'date' },
    { id: 'apptTime',   touchKey: 'time' }
  ];

  fields.forEach(({ id, touchKey }) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('input',  () => { touched[touchKey] = true; validateForm(); });
    el.addEventListener('change', () => {
        touched[touchKey] = true;
        validateForm();
        if (id === 'apptDate') {
          filterTimeSlots();
          updateDateDisplay(el); // update iOS date label
        }
      });
    el.addEventListener('blur',   () => { touched[touchKey] = true; validateForm(); });
  });

  // Disable submit initially
  const btn = document.getElementById('apptSubmitBtn');
  if (btn) btn.disabled = true;
}

function submitAppointment() {
  // Mark all fields as touched
  Object.keys(touched).forEach(k => touched[k] = true);
  const { valid } = validateForm();

  if (!valid) {
    alert('Please fill all required fields correctly before submitting.');
    return;
  }

  const data = {
    name:   getVal('apptName'),
    mobile: getVal('apptMobile'),
    gender: getVal('apptGender'),
    date:   getVal('apptDate'),
    time:   getVal('apptTime')
  };

  const btn = document.getElementById('apptSubmitBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Booking...'; }

  fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => {
      if (!res.ok) return res.json().then(e => Promise.reject(e));
      return res.json();
    })
    .then(res => {
      alert(res.message || 'Appointment booked successfully!');
      resetAppointmentForm();
    })
    .catch(err => {
      let msg = 'Something went wrong. Please try again.';
      if (err && err.error)          msg = err.error;
      else if (!navigator.onLine)    msg = 'No internet connection.';
      alert(msg);
    })
    .finally(() => {
      if (btn) { btn.disabled = false; btn.textContent = 'Book an Appointment'; }
    });
}

function resetAppointmentForm() {
  ['apptName', 'apptMobile', 'apptGender', 'apptDate', 'apptTime'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.value = '';
      el.classList.remove('valid', 'invalid');
      el.style.color = '';
    }
  });
  // Reset iOS date display label
  const display = document.getElementById('dateDisplay');
  if (display) {
    display.textContent = 'Select Date';
    display.classList.remove('has-value', 'valid-date', 'invalid-date');
  }
  ['nameError', 'mobileError', 'genderError', 'dateError', 'timeError'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
  Object.keys(touched).forEach(k => touched[k] = false);
  filterTimeSlots();
  const btn = document.getElementById('apptSubmitBtn');
  if (btn) btn.disabled = true;
}

/* =====================================================
   FOOTER YEAR
   ===================================================== */
function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* =====================================================
   RESPONSIVE CAROUSEL REBUILD ON RESIZE
   ===================================================== */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;
    if (wasMobile !== isMobile) {
      currentIndex = 0;
      buildCarousel();
    }
  }, 200);
});

/* =====================================================
   INIT
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Detect iOS Safari reliably via JS and add class to body
  // This drives the date input overlay behaviour in CSS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.userAgent));
  if (isIOS) {
    document.body.classList.add('ios-device');
  }

  setFooterYear();
  buildCarousel();
  startCarousel();
  buildTreatments();
  initNavbar();
  initAppointmentForm();

  // Initial fade-in check
  setTimeout(checkFadeIn, 100);

  // Scroll listener
  window.addEventListener('scroll', onScroll, { passive: true });
});
