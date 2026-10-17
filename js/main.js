/* Auro Tech — main.js */
'use strict';

/* ===== HEADER SCROLL ===== */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ===== MOBILE NAV ===== */
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ===== CART STATE ===== */
let cart = []; // { id, name, color, qty, price }

function getCartItem(id, color) {
  return cart.find(i => i.id === id && i.color === color);
}

function addToCart(id, name, color, qty, price) {
  const existing = getCartItem(id, color);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, name, color, qty, price });
  }
  updateCartUI();
  openCart();
}

function removeFromCart(id, color) {
  cart = cart.filter(i => !(i.id === id && i.color === color));
  updateCartUI();
}

function changeQty(id, color, delta) {
  const item = getCartItem(id, color);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartBtn = document.getElementById('cart-btn');

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);

  badge.textContent = totalQty;
  cartBtn.setAttribute('aria-label', `Open cart, ${totalQty} item${totalQty !== 1 ? 's' : ''}`);

  // Bump animation
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 300);

  cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}" data-color="${item.color}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-color">${item.color}</div>
        <div class="cart-item-controls">
          <button class="cart-item-qty-btn" aria-label="Decrease quantity" onclick="changeQty('${item.id}', '${item.color}', -1)">−</button>
          <span class="cart-item-qty">${item.qty}</span>
          <button class="cart-item-qty-btn" aria-label="Increase quantity" onclick="changeQty('${item.id}', '${item.color}', 1)">+</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:0.5rem">
        <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
        <button class="cart-item-remove" aria-label="Remove ${item.name} from cart" onclick="removeFromCart('${item.id}', '${item.color}')">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

/* ===== CART OPEN/CLOSE ===== */
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  cartOverlay.removeAttribute('aria-hidden');
  document.getElementById('cart-close').focus();
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  cartOverlay.setAttribute('aria-hidden', 'true');
  document.getElementById('cart-btn').focus();
  document.body.style.overflow = '';
}

document.getElementById('cart-btn').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);
document.getElementById('continue-btn').addEventListener('click', closeCart);

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty. Add a product first!');
    return;
  }
  alert('Checkout integration coming soon! In a real store this would redirect to payment processing.');
});

// Escape key closes cart
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cartDrawer.classList.contains('open')) {
    closeCart();
  }
});

/* ===== COLOR SWATCHES ===== */
const swatches = document.querySelectorAll('.swatch');
const selectedColorEl = document.getElementById('selected-color');

swatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    swatches.forEach(s => {
      s.classList.remove('active');
      s.setAttribute('aria-pressed', 'false');
    });
    swatch.classList.add('active');
    swatch.setAttribute('aria-pressed', 'true');
    selectedColorEl.textContent = swatch.dataset.color;
  });
});

/* ===== THUMBNAIL STRIP ===== */
const thumbBtns = document.querySelectorAll('.thumb-btn');

thumbBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    thumbBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Select matching color swatch
    const color = btn.dataset.color;
    swatches.forEach(s => {
      const matches = s.dataset.color === color;
      s.classList.toggle('active', matches);
      s.setAttribute('aria-pressed', String(matches));
    });
    if (color) selectedColorEl.textContent = color;
  });
});

/* ===== QUANTITY SELECTOR ===== */
const qtyInput = document.getElementById('qty-input');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');

qtyMinus.addEventListener('click', () => {
  const val = parseInt(qtyInput.value, 10);
  if (val > 1) qtyInput.value = val - 1;
});

qtyPlus.addEventListener('click', () => {
  const val = parseInt(qtyInput.value, 10);
  if (val < 10) qtyInput.value = val + 1;
});

/* ===== ADD TO CART — Main Product ===== */
document.getElementById('add-to-cart').addEventListener('click', () => {
  const color = document.querySelector('.swatch.active')?.dataset.color || 'Midnight Black';
  const qty = parseInt(qtyInput.value, 10) || 1;
  addToCart('probud-x1', 'Auro ProBud X1', color, qty, 149);
});

document.getElementById('buy-now').addEventListener('click', () => {
  const color = document.querySelector('.swatch.active')?.dataset.color || 'Midnight Black';
  const qty = parseInt(qtyInput.value, 10) || 1;
  addToCart('probud-x1', 'Auro ProBud X1', color, qty, 149);
  // In production, would redirect to checkout directly
  setTimeout(() => alert('Checkout integration coming soon! Redirecting to payment…'), 100);
});

/* ===== ADD TO CART — Bundles ===== */
document.querySelectorAll('.bundle-atc').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price, 10);
    const color = document.querySelector('.swatch.active')?.dataset.color || 'Midnight Black';
    addToCart(id, name, color, 1, price);
  });
});

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));
    document.querySelectorAll('.faq-answer').forEach(a => { a.hidden = true; });

    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });
});

// Initialize cart UI
updateCartUI();
