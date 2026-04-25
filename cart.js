/* ===================================================================
   Cart — localStorage-backed, drawer UI
   =================================================================== */

const STORAGE_KEY = 'niyutex_cart_v1';

let cart = loadCart();

function loadCart () {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function saveCart () {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch {}
}

function add (product) {
  const existing = cart.find(c => c.id === product.id);
  if (existing) existing.qty += 1;
  else cart.push({
    id: product.id,
    name: product.name,
    sub: product.sub,
    price: product.price,
    cat: product.cat,
    tone: product.tone,
    qty: 1
  });
  saveCart();
  render();
  openDrawer();
}

function remove (id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  render();
}

function changeQty (id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) cart = cart.filter(c => c.id !== id);
  saveCart();
  render();
}

function subtotal () {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function totalCount () {
  return cart.reduce((s, i) => s + i.qty, 0);
}

/* ---------- DOM ---------- */
function render () {
  const body = document.getElementById('cartBody');
  const subtotalEl = document.getElementById('cartSubtotal');
  const countEl = document.getElementById('cartCount');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (!body) return;

  const count = totalCount();
  countEl.textContent = count;
  countEl.classList.toggle('is-active', count > 0);
  checkoutBtn.disabled = count === 0;

  if (cart.length === 0) {
    body.innerHTML = `
      <p class="cart__empty">
        Your cart is empty.
        <span>Add a piece from the collection above.</span>
      </p>`;
    subtotalEl.textContent = '₹ 0';
    return;
  }

  body.innerHTML = cart.map(i => {
    const visual = window.NiyuProducts && window.NiyuProducts.SVG_GENERATORS[i.cat]
      ? window.NiyuProducts.SVG_GENERATORS[i.cat](i.tone)
      : '';
    return `
      <div class="cart-item">
        <div class="cart-item__visual">${visual}</div>
        <div>
          <div class="cart-item__name">${i.name}</div>
          <div class="cart-item__sub">${i.sub}</div>
          <div class="cart-item__qty">
            <button data-act="dec" data-id="${i.id}" data-cursor="hover" aria-label="Decrease">−</button>
            <span>${i.qty}</span>
            <button data-act="inc" data-id="${i.id}" data-cursor="hover" aria-label="Increase">+</button>
          </div>
        </div>
        <div>
          <div class="cart-item__price">₹ ${(i.price * i.qty).toLocaleString('en-IN')}</div>
          <button class="cart-item__remove" data-act="rm" data-id="${i.id}" data-cursor="hover">Remove</button>
        </div>
      </div>`;
  }).join('');

  subtotalEl.textContent = '₹ ' + subtotal().toLocaleString('en-IN');

  // attach handlers
  body.querySelectorAll('button[data-act]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const act = btn.dataset.act;
      if (act === 'inc') changeQty(id, +1);
      else if (act === 'dec') changeQty(id, -1);
      else if (act === 'rm') remove(id);
    });
  });
}

/* ---------- Drawer ---------- */
function openDrawer () {
  document.getElementById('cartDrawer')?.classList.add('is-open');
  document.getElementById('cartBackdrop')?.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer () {
  document.getElementById('cartDrawer')?.classList.remove('is-open');
  document.getElementById('cartBackdrop')?.classList.remove('is-open');
  document.body.style.overflow = '';
}

/* ---------- Checkout ---------- */
function checkout () {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
  render();
  closeDrawer();
  const modal = document.getElementById('modal');
  modal.classList.add('is-open');
}

function closeModal () {
  document.getElementById('modal')?.classList.remove('is-open');
}

/* ---------- Wire up ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cartBtn')?.addEventListener('click', openDrawer);
  document.getElementById('cartClose')?.addEventListener('click', closeDrawer);
  document.getElementById('cartBackdrop')?.addEventListener('click', closeDrawer);
  document.getElementById('checkoutBtn')?.addEventListener('click', checkout);
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeDrawer(); closeModal(); }
  });
  render();
});

window.NiyuCart = { add, remove, changeQty, subtotal, totalCount };
