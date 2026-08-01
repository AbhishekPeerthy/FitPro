/* IMAGE PATH HANDLING */
const imageBasePath = location.pathname.match(/(^|\/)pages\//)
  ? '../media/images/'
  : 'media/images/';

function getImagePath(fileName) {
  return `${imageBasePath}${fileName}`;
}

/* PRODUCT LIST */
const products = [
  { id: 'elite-trainer', name: 'Elite Trainer Treadmill', category: 'Cardio', price: 1249.99, image: 'elite-trainer.jpg', description: 'A premium treadmill with adaptive incline, workout tracking, and whisper-quiet motor performance.' },
  { id: 'power-rack', name: 'Precision Power Rack', category: 'Strength', price: 899.99, image: 'power-rack.jpg', description: 'Heavy-duty power rack designed for serious lifters, with safety catches and adjustable attachments.' },
  { id: 'smart-bike', name: 'Smart Exercise Bike', category: 'Cardio', price: 999.99, image: 'smart-bike.jpg', description: 'Interactive bike with integrated coaching programs, performance metrics, and ergonomic comfort.' },
  { id: 'recovery-mat', name: 'Recovery Foam Mat', category: 'Recovery', price: 59.99, image: 'recovery-mat.jpg', description: 'Premium foam mat with supportive cushioning for stretching, yoga, and cool-down recovery routines.' },
  { id: 'nutrition-kit', name: 'Nutrition Starter Kit', category: 'Nutrition', price: 74.99, image: 'nutrition-kit.jpg', description: 'A curated set of premium supplements to support energy, recovery, and sustained performance.' },
  { id: 'velocity-weights', name: 'Velocity Dumbbells', category: 'Strength', price: 139.99, image: 'velocity-weights.jpg', description: 'Adjustable dumbbells with precision weight increments for efficient strength training sessions.' },
  { id: 'hydro-bottle', name: 'Hydration Bottle', category: 'Accessories', price: 29.99, image: 'hydro-bottle.jpg', description: 'Insulated sport bottle to keep your water cold during intense workouts and all-day hydration.' },
  { id: 'performance-watch', name: 'Performance Watch', category: 'Wearables', price: 219.99, image: 'performance-watch.jpg', description: 'Track heart rate, training load, and recovery metrics in a sleek wearable built for athletes.' },
  { id: 'trainer-gloves', name: 'Trainer Gloves', category: 'Accessories', price: 34.99, image: 'trainer-gloves.jpg', description: 'Breathable lifting gloves with supportive padding and improved grip for heavy sessions.' },
  { id: 'balance-board', name: 'Balance Board', category: 'Recovery', price: 49.99, image: 'balance-board.jpg', description: 'A dynamic balance board for mobility, joint stability, and active recovery training.' },
  { id: 'nutri-blender', name: 'Nutri Blender', category: 'Nutrition', price: 84.99, image: 'nutri-blender.jpg', description: 'High-speed blender built to create protein shakes, smoothies, and nutrient-packed recovery drinks.' },
  { id: 'elite-yoga', name: 'Elite Yoga Set', category: 'Flexibility', price: 69.99, image: 'elite-yoga.jpg', description: 'Complete yoga set including premium mat, blocks, and straps for flexibility and flow training.' },
  { id: 'kettlebell-pro', name: 'Kettlebell Pro Set', category: 'Strength', price: 159.99, image: 'kettlebell-pro.jpg', description: 'Cast iron kettlebell set with ergonomic handles, ideal for dynamic strength and conditioning workouts.' },
  { id: 'resistance-band-set', name: 'Resistance Band Set', category: 'Strength', price: 44.99, image: 'resistance-band-set.jpg', description: 'Premium resistance bands in multiple resistance levels for versatile home and gym training.' },
  { id: 'foam-roller-pro', name: 'Foam Roller Pro', category: 'Recovery', price: 79.99, image: 'foam-roller-pro.jpg', description: 'High-density foam roller with deep muscle tissue release for effective myofascial recovery.' },
  { id: 'adjustable-bench', name: 'Adjustable Weight Bench', category: 'Strength', price: 249.99, image: 'adjustable-bench.jpg', description: 'Multi-position weight bench with secure adjustment mechanism for targeted chest, back, and leg exercises.' },
  { id: 'jump-rope-elite', name: 'Elite Jump Rope', category: 'Cardio', price: 39.99, image: 'jump-rope-elite.jpg', description: 'Speed jump rope with weighted handles and ball bearings for fast footwork and cardio conditioning.' },
  { id: 'suspension-trainer', name: 'Suspension Trainer System', category: 'Strength', price: 129.99, image: 'suspension-trainer.jpg', description: 'Full-body suspension training system using bodyweight for strength, endurance, and functional fitness.' },
  { id: 'medicine-ball-set', name: 'Medicine Ball Set', category: 'Strength', price: 119.99, image: 'medicine-ball-set.jpg', description: 'Set of weighted medicine balls for explosive power training, core work, and functional movements.' },
  { id: 'ab-wheel-roller', name: 'Ab Wheel Roller', category: 'Strength', price: 24.99, image: 'ab-wheel-roller.jpg', description: 'Compact ab wheel with ergonomic handles for core strengthening and abdominal muscle development.' },
  { id: 'stretching-strap', name: 'Premium Stretching Strap', category: 'Flexibility', price: 19.99, image: 'stretching-strap.jpg', description: 'Yoga stretching strap with loops to safely deepen stretches and improve flexibility over time.' }
];

/* CART STORAGE */
const cartStorageKey = 'fitpromarket-cart-v1';

function getCart() {
  const stored = localStorage.getItem(cartStorageKey);
  try { return stored ? JSON.parse(stored) : []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function findProduct(id) {
  return products.find(p => p.id === id);
}

/* CART COUNT */
function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  const el = document.querySelector('#cart-count');
  if (el) el.textContent = count;
}

/* ADD, REMOVE, UPDATE CART */
function addToCart(id) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);

  if (item) item.quantity++;
  else cart.push({ id, quantity: 1 });

  saveCart(cart);
  updateCartCount();
  showToast(`${findProduct(id).name} added to cart`);
  renderCartPage();
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
  updateCartCount();
  renderCartPage();
}

function updateQuantity(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity = Math.max(1, qty);
  saveCart(cart);
  updateCartCount();
  renderCartPage();
}

function calculateCartTotal() {
  return getCart().reduce((total, item) => {
    const p = findProduct(item.id);
    return total + (p.price * item.quantity);
  }, 0);
}

/* RENDER PRODUCTS */
function renderProducts(list = products) {
  const grid = document.querySelector('#products-grid');
  if (!grid) return;

  grid.innerHTML = '';
  list.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card tilt';

    card.innerHTML = `
      <img src="${getImagePath(product.image)}" alt="${product.name}" loading="lazy">
      <p class="category">${product.category}</p>
      <h3>${product.name}</h3>
      <p class="price">£${product.price.toFixed(2)}</p>

      <div class="card-actions">
        <button class="details" data-product-id="${product.id}">Details</button>
        <button class="add" data-product-id="${product.id}">Add to Cart</button>
      </div>
    `;

    grid.appendChild(card);
  });

  initTiltEffects();
}

/* RENDER FEATURED PRODUCTS (HOME PAGE) */
function renderFeaturedProducts() {
  const section = document.querySelector('#featured-products');
  if (!section) return;

  section.innerHTML = '';
  products.slice(0, 4).forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card tilt';

    card.innerHTML = `
      <img src="${getImagePath(product.image)}" alt="${product.name}" loading="lazy">
      <p class="category">${product.category}</p>
      <h3>${product.name}</h3>
      <p class="price">£${product.price.toFixed(2)}</p>

      <div class="card-actions">
        <button class="details" data-product-id="${product.id}">Details</button>
        <button class="add" data-product-id="${product.id}">Add to Cart</button>
      </div>
    `;

    section.appendChild(card);
  });

  initTiltEffects();
}

/* CART PAGE RENDER */
function renderCartPage() {
  const list = document.querySelector('.cart-items');
  if (!list) return;

  const cart = getCart();
  list.innerHTML = '';

  if (cart.length === 0) {
    list.innerHTML = `<div class="product-card"><h3>Your cart is empty.</h3></div>`;
  }

  cart.forEach(item => {
    const p = findProduct(item.id);
    const card = document.createElement('article');
    card.className = 'cart-card tilt';

    card.innerHTML = `
      <img src="${getImagePath(p.image)}" alt="${p.name}">
      <div class="cart-details">
        <p class="category">${p.category}</p>
        <h3>${p.name}</h3>
        <p class="price">£${(p.price * item.quantity).toFixed(2)}</p>

        <div class="item-controls">
          <button data-action="decrease" data-product-id="${p.id}">-</button>
          <span>${item.quantity}</span>
          <button data-action="increase" data-product-id="${p.id}">+</button>
          <button data-action="remove" data-product-id="${p.id}">Remove</button>
        </div>
      </div>
    `;

    list.appendChild(card);
  });

  const totalEl = document.querySelector('#cart-total');
  const summaryEl = document.querySelector('#cart-summary-text');

  if (totalEl) totalEl.textContent = `£${calculateCartTotal().toFixed(2)}`;
  if (summaryEl) summaryEl.textContent = cart.length
    ? `${cart.length} item(s) in your cart`
    : 'Your cart is currently empty.';
}

/* POP-UP MODAL */
function renderProductDetail(productId) {
  const modal = document.querySelector('.popup-modal');
  if (!modal) return;

  const body = modal.querySelector('.popup-body');
  const product = findProduct(productId);

  body.innerHTML = `
    <img src="${getImagePath(product.image)}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p><strong>Category:</strong> ${product.category}</p>
    <p>${product.description}</p>
    <p><strong>Price:</strong> £${product.price.toFixed(2)}</p>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');

  trackRecentlyViewed(productId);
  renderRecentlyViewed();
}

function closeProductDetail() {
  const modal = document.querySelector('.popup-modal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

/* TOAST NOTIFICATION */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('visible');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 1800);
}

/* CUSTOM REMOVE CONFIRMATION MODAL */
let pendingRemoveId = null;

function openRemoveModal(productName, productId) {
  pendingRemoveId = productId;

  const modal = document.querySelector('.confirm-modal');
  if (!modal) return;

  const msg = modal.querySelector('.confirm-message');
  msg.textContent = `Are you sure you want to remove "${productName}" from your basket?`;

  modal.classList.remove('closing');
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function closeRemoveModal() {
  const modal = document.querySelector('.confirm-modal');
  if (!modal) return;

  modal.classList.add('closing');

  setTimeout(() => {
    modal.classList.remove('active', 'closing');
    modal.setAttribute('aria-hidden', 'true');
    pendingRemoveId = null;
  }, 250);
}

function playRemoveSound() {
  const audio = new Audio(`${imageBasePath.replace('images/', 'sounds/')}remove.mp3`);
  audio.volume = 0.4;
  audio.play().catch(() => {});
}

function confirmRemoveAction() {
  if (!pendingRemoveId) return;

  removeFromCart(pendingRemoveId);
  playRemoveSound();
  showToast("Item removed from basket");

  closeRemoveModal();
}

/* CLICK HANDLER - GLOBAL */
function handleDocumentClicks(e) {
  const addBtn = e.target.closest('button.add[data-product-id]');
  const detailBtn = e.target.closest('button.details[data-product-id]');
  const cartBtn = e.target.closest('button[data-action]');

  if (addBtn) addToCart(addBtn.dataset.productId);

  if (detailBtn) renderProductDetail(detailBtn.dataset.productId);

  if (cartBtn) {
    const id = cartBtn.dataset.productId;
    const action = cartBtn.dataset.action;

    if (action === 'remove') {
      const product = findProduct(id);
      openRemoveModal(product.name, id);
    }
    if (action === 'increase') {
      const item = getCart().find(i => i.id === id);
      if (item) updateQuantity(id, item.quantity + 1);
    }
    if (action === 'decrease') {
      const item = getCart().find(i => i.id === id);
      if (item) updateQuantity(id, Math.max(1, item.quantity - 1));
    }
    if (action === 'close-detail') closeProductDetail();
  }

  if (e.target.classList.contains('popup-modal')) {
    closeProductDetail();
  }
}

/* CONTACT FORM VALIDATION */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const name = form.querySelector('#full-name');
  const email = form.querySelector('#email');
  const msg = form.querySelector('#message');
  const feedback = form.querySelector('.form-feedback');

  form.addEventListener('submit', e => {
    e.preventDefault();
    let errors = [];

    if (!name.value.trim()) errors.push('Please enter your name.');
    if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value))
      errors.push('Please enter a valid email address.');
    if (!msg.value.trim()) errors.push('Please enter a message.');

    if (errors.length) {
      feedback.textContent = errors.join(' ');
      feedback.classList.add('error-message');
      feedback.classList.remove('success-message');
      return;
    }

    feedback.textContent = 'Your message has been sent. We’ll respond shortly.';
    feedback.classList.remove('error-message');
    feedback.classList.add('success-message');
    form.reset();
  });
}

/* RIPPLE CLICK EFFECT */
document.addEventListener('click', e => {
  const btn = e.target.closest('button, .button');
  if (!btn) return;

  btn.classList.remove('ripple-active');
  void btn.offsetWidth;
  btn.classList.add('ripple-active');

  setTimeout(() => btn.classList.remove('ripple-active'), 600);
});

/* 3D TILT EFFECT (throttled) */
function initTiltEffects() {
  const tiltCards = document.querySelectorAll('.product-card, .info-card, .cart-card');

  tiltCards.forEach(card => {
    card.classList.add('tilt');

    let frameId = null;

    const handleMove = e => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const tiltX = ((y / rect.height) - 0.5) * -10;
        const tiltY = ((x / rect.width) - 0.5) * 10;

        card.style.setProperty('--tilt-x', `${tiltX}deg`);
        card.style.setProperty('--tilt-y', `${tiltY}deg`);

        frameId = null;
      });
    };

    card.addEventListener('mousemove', handleMove);

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', `0deg`);
      card.style.setProperty('--tilt-y', `0deg`);
    });
  });
}

/* INTRO VIDEO — SKIP BUTTON */
function initIntroSkip() {
  const btn = document.getElementById('skipIntroBtn');
  const container = document.querySelector('.intro-video-container');
  const video = document.getElementById('introVideo');

  if (!btn || !container || !video) return;

  btn.addEventListener('click', () => {
    container.style.transition = 'opacity 0.6s ease';
    container.style.opacity = '0';

    video.pause();
    video.currentTime = 0;
    video.muted = true;

    setTimeout(() => {
      container.style.display = 'none';
    }, 600);
  });
}

/* INTRO VIDEO — FULL CONTROL */
function initIntroVideo() {
  const video = document.getElementById('introVideo');
  const muteBtn = document.getElementById('muteToggle');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const replayBtn = document.getElementById('replayBtn');
  const skipBtn = document.getElementById('skipIntroBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const timelineBar = document.getElementById('timelineBar');
  const container = document.querySelector('.intro-video-container');

  if (!video || !muteBtn || !playBtn || !pauseBtn || !replayBtn || !skipBtn || !volumeSlider || !timelineBar || !container) return;

  video.muted = true;
  muteBtn.setAttribute('aria-label', 'Mute video');

  const enableSound = () => {
    video.muted = false;
    video.play().catch(() => {});
    muteBtn.setAttribute('aria-label', 'Mute video');
    document.removeEventListener('click', enableSound);
  };

  document.addEventListener('click', enableSound, { once: true });

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
  });

  playBtn.addEventListener('click', () => {
    video.play().catch(() => {});
  });

  pauseBtn.addEventListener('click', () => {
    video.pause();
  });

  replayBtn.addEventListener('click', () => {
    video.currentTime = 0;
    video.play().catch(() => {});
  });

  volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
  });

  video.addEventListener('timeupdate', () => {
    if (video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      timelineBar.value = progress;
    }
  });

  timelineBar.addEventListener('input', () => {
    if (video.duration) {
      const newTime = (timelineBar.value / 100) * video.duration;
      video.currentTime = newTime;
    }
  });

  skipBtn.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0;
    video.muted = true;
  });
}

/* PRODUCT FILTERING + SEARCH + SORT */
function initProductFiltersAndSorting() {
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const sortSelect = document.getElementById('sortProducts');

  if (!searchInput || !filterButtons.length || !sortSelect) return;

  function getActiveFilter() {
    return document.querySelector('.filter-buttons button.active')?.dataset.filter || 'all';
  }

  function applyFiltersAndSort() {
    const term = searchInput.value.toLowerCase();
    const activeFilter = getActiveFilter();
    const sortValue = sortSelect.value;

    let filtered = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(term);
      const matchesCategory = activeFilter === 'all' || p.category === activeFilter;
      return matchesSearch && matchesCategory;
    });

    if (sortValue === 'low') filtered.sort((a, b) => a.price - b.price);
    if (sortValue === 'high') filtered.sort((a, b) => b.price - a.price);

    renderProducts(filtered);
  }

  searchInput.addEventListener('input', applyFiltersAndSort);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFiltersAndSort();
    });
  });

  sortSelect.addEventListener('change', applyFiltersAndSort);
}

/* RECENTLY VIEWED PRODUCTS */
function trackRecentlyViewed(id) {
  let viewed = JSON.parse(localStorage.getItem('recently-viewed') || '[]');
  viewed = viewed.filter(v => v !== id);
  viewed.unshift(id);
  viewed = viewed.slice(0, 6);
  localStorage.setItem('recently-viewed', JSON.stringify(viewed));
}

function renderRecentlyViewed() {
  const container = document.getElementById('recently-viewed');
  if (!container) return;

  const viewed = JSON.parse(localStorage.getItem('recently-viewed') || '[]');
  if (!viewed.length) {
    container.innerHTML = `<p class="text-muted">No recently viewed products yet.</p>`;
    return;
  }

  container.innerHTML = '';
  viewed.forEach(id => {
    const p = findProduct(id);
    if (!p) return;

    const card = document.createElement('article');
    card.className = 'product-card tilt';

    card.innerHTML = `
      <img src="${getImagePath(p.image)}" alt="${p.name}" loading="lazy">
      <p class="category">${p.category}</p>
      <h3>${p.name}</h3>
      <p class="price">£${p.price.toFixed(2)}</p>

      <div class="card-actions">
        <button class="details" data-product-id="${p.id}">Details</button>
        <button class="add" data-product-id="${p.id}">Add to Cart</button>
      </div>
    `;

    container.appendChild(card);
  });

  initTiltEffects();
}

/* CHECKOUT PAGE LOGIC */
function renderCheckoutSummary() {
  const itemsContainer = document.getElementById('checkout-items');
  const totalEl = document.getElementById('checkout-total');
  if (!itemsContainer || !totalEl) return;

  const cart = getCart();
  if (!cart.length) {
    itemsContainer.innerHTML = `<p>Your cart is empty. Please add items before checking out.</p>`;
    totalEl.textContent = '£0.00';
    return;
  }

  itemsContainer.innerHTML = '';
  cart.forEach(item => {
    const p = findProduct(item.id);
    const row = document.createElement('div');
    row.className = 'checkout-item';

    row.innerHTML = `
      <p><strong>${p.name}</strong> × ${item.quantity}</p>
      <p>£${(p.price * item.quantity).toFixed(2)}</p>
    `;

    itemsContainer.appendChild(row);
  });

  totalEl.textContent = `£${calculateCartTotal().toFixed(2)}`;
}

function initCheckoutForm() {
  const form = document.getElementById('checkout-form');
  const feedback = document.getElementById('checkout-feedback');
  const modal = document.querySelector('.confirm-modal');

  if (!form || !feedback || !modal) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('checkout-name');
    const email = document.getElementById('checkout-email');
    const address = document.getElementById('checkout-address');

    let errors = [];
    if (!name.value.trim()) errors.push('Please enter your name.');
    if (!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value))
      errors.push('Please enter a valid email address.');
    if (!address.value.trim()) errors.push('Please enter your delivery address.');

    if (errors.length) {
      feedback.textContent = errors.join(' ');
      feedback.classList.add('error-message');
      feedback.classList.remove('success-message');
      return;
    }

    feedback.textContent = 'Your order has been placed in this demo experience.';
    feedback.classList.remove('error-message');
    feedback.classList.add('success-message');

    saveCart([]);
    updateCartCount();

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  });
}

/* INITIALISE PAGE */
function initPage() {
  updateCartCount();
  renderCartPage();
  renderFeaturedProducts();
  renderProducts();
  renderRecentlyViewed();
  initContactForm();
  initTiltEffects();

  initIntroVideo();
  initIntroSkip();

  initProductFiltersAndSorting();

  document.addEventListener('click', handleDocumentClicks);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeProductDetail();
      closeRemoveModal();
    }
  });

  const confirmModal = document.querySelector('.confirm-modal');
  if (confirmModal && confirmModal.querySelector('.confirm-remove')) {
    const removeBtn = confirmModal.querySelector('.confirm-remove');
    const cancelBtn = confirmModal.querySelector('.confirm-cancel');

    removeBtn.addEventListener('click', confirmRemoveAction);
    cancelBtn.addEventListener('click', closeRemoveModal);

    confirmModal.addEventListener('click', e => {
      if (e.target.classList.contains('confirm-modal')) {
        closeRemoveModal();
      }
    });
  }

  const checkoutButton = document.getElementById('checkoutButton');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      const cart = getCart();
      if (!cart.length) {
        showToast('Your cart is empty.');
        return;
      }
      window.location.href = 'checkout.html';
    });
  }

  if (document.getElementById('checkout-items')) {
    renderCheckoutSummary();
    initCheckoutForm();
  }
}

/* DOM READY */
window.addEventListener('DOMContentLoaded', initPage);
