/* ===================================================================
   Product catalog — pulled from the Ni-Yu Tex profile
   Visuals are inline SVG generators so the site stays self-contained
   (no external image dependency).
   =================================================================== */

const PRODUCTS = [
  // ── DENIM ────────────────────────────────────────────────
  { id:'D01', name:'Indigo Selvedge Slim',  cat:'denim',     sub:'Mid-rise · 12oz Candiani',         price:4290, tone:'#1d2845', tag:'In-house' },
  { id:'D02', name:'Stonewash Tapered',     cat:'denim',     sub:'Slim taper · Jeanologia laser',    price:3690, tone:'#3a4d76', tag:'In-house' },
  { id:'D03', name:'Acid Mid-Blue',         cat:'denim',     sub:'Straight · acid wash',             price:3490, tone:'#5b7aab', tag:'In-house' },
  { id:'D04', name:'Carbon Black Skinny',   cat:'denim',     sub:'Skinny · raw stretch',             price:3990, tone:'#1a1c22', tag:'In-house' },
  { id:'D05', name:'Vintage Grey',          cat:'denim',     sub:'Slim · sulphur-grey wash',          price:3690, tone:'#5a5d65', tag:'In-house' },
  { id:'D06', name:'Distressed Light Wash', cat:'denim',     sub:'Tapered · hand-finish abrasion',   price:4190, tone:'#88a3c5', tag:'In-house' },
  { id:'D07', name:'Raw Selvedge Straight', cat:'denim',     sub:'Regular · 13.5oz raw',             price:5290, tone:'#15203a', tag:'Premium'  },

  // ── TEES ─────────────────────────────────────────────────
  { id:'T01', name:'Striped Block Tee',     cat:'tees',      sub:'200gsm cotton · yarn-dye',         price:1290, tone:'#2c3346', tag:'Outsourced' },
  { id:'T02', name:'Engineered Stripe',     cat:'tees',      sub:'180gsm · combed cotton',           price:1190, tone:'#a83a3a', tag:'Outsourced' },
  { id:'T03', name:'Floral Print Tee',      cat:'tees',      sub:'All-over print · single jersey',   price:1390, tone:'#1f2e4a', tag:'Outsourced' },
  { id:'T04', name:'Crew Solid Tee',        cat:'tees',      sub:'Heavy 220gsm cotton',              price:990,  tone:'#0f1116', tag:'Outsourced' },
  { id:'T05', name:'Block Panel Tee',       cat:'tees',      sub:'Cut-and-sew colourblock',          price:1490, tone:'#7d6651', tag:'Outsourced' },

  // ── POLOS ────────────────────────────────────────────────
  { id:'P01', name:'Pique Striped Polo',    cat:'polos',     sub:'Cotton pique · two-button',        price:1690, tone:'#5a6d8a', tag:'Outsourced' },
  { id:'P02', name:'Mustard Stripe Polo',   cat:'polos',     sub:'Yarn-dyed engineered',             price:1790, tone:'#c79a3b', tag:'Outsourced' },
  { id:'P03', name:'Solid Mustard Polo',    cat:'polos',     sub:'Birdseye · single-tipped collar',  price:1490, tone:'#dba53e', tag:'Outsourced' },
  { id:'P04', name:'FCUK Henley Polo',      cat:'polos',     sub:'Heavyweight · chest print',        price:1990, tone:'#3a2a3a', tag:'Outsourced' },
  { id:'P05', name:'Vertical Stripe Polo',  cat:'polos',     sub:'Engineered placement stripe',      price:1790, tone:'#f0f0eb', tag:'Outsourced' },

  // ── SWEATERS ─────────────────────────────────────────────
  { id:'S01', name:'V-Neck Vest',           cat:'sweaters',  sub:'Lambswool blend',                  price:2490, tone:'#7a2a2e', tag:'Outsourced' },
  { id:'S02', name:'Hooded Knit',           cat:'sweaters',  sub:'Marled cotton · drawstring hood',  price:3290, tone:'#3a4762', tag:'Outsourced' },
  { id:'S03', name:'Argyle Crewneck',       cat:'sweaters',  sub:'Intarsia diamond · jacquard',      price:2990, tone:'#1c2a4d', tag:'Outsourced' },
  { id:'S04', name:'Fair Isle Pullover',    cat:'sweaters',  sub:'Snowflake jacquard · merino',      price:3490, tone:'#cfcabd', tag:'Outsourced' },
  { id:'S05', name:'Star Yoke Sweater',     cat:'sweaters',  sub:'Jacquard yoke · cotton blend',     price:2890, tone:'#2a3556', tag:'Outsourced' },

  // ── OUTERWEAR ────────────────────────────────────────────
  { id:'O01', name:'Denim Trucker Jacket',  cat:'outerwear', sub:'Classic Type III · 11oz',          price:4990, tone:'#2a3960', tag:'In-house' },
  { id:'O02', name:'Stonewash Biker',       cat:'outerwear', sub:'Quilted shoulder · stretch denim', price:5490, tone:'#1a233f', tag:'In-house' },
  { id:'O03', name:'Joggers — Indigo',      cat:'outerwear', sub:'Knit denim look · cuffed hem',     price:2490, tone:'#28324d', tag:'In-house' },
];

/* ---------- SVG generators per category ---------- */
const SVG_GENERATORS = {

  denim: (tone) => `
    <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dg-${tone.slice(1)}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${shade(tone, 1.4)}" />
          <stop offset="50%" stop-color="${tone}" />
          <stop offset="100%" stop-color="${shade(tone, .55)}" />
        </linearGradient>
        <pattern id="weave-${tone.slice(1)}" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M0 0L4 4M4 0L0 4" stroke="${shade(tone,.5)}" stroke-width=".4" opacity=".5"/>
        </pattern>
      </defs>
      <rect width="200" height="250" fill="#11141d"/>
      <g transform="translate(100 130)">
        <path d="M-40 -85 L40 -85 L42 -50 L48 90 L20 90 L4 -10 L-4 -10 L-20 90 L-48 90 L-42 -50 Z"
              fill="url(#dg-${tone.slice(1)})" stroke="${shade(tone,.45)}" stroke-width=".5"/>
        <path d="M-40 -85 L40 -85 L42 -50 L48 90 L20 90 L4 -10 L-4 -10 L-20 90 L-48 90 L-42 -50 Z"
              fill="url(#weave-${tone.slice(1)})"/>
        <!-- waistband -->
        <rect x="-40" y="-85" width="80" height="10" fill="${shade(tone,.55)}" />
        <line x1="-40" y1="-79" x2="40" y2="-79" stroke="${shade(tone,1.5)}" stroke-width=".4" stroke-dasharray="2 1.5" />
        <!-- centre seam -->
        <line x1="0" y1="-75" x2="0" y2="-12" stroke="${shade(tone,1.5)}" stroke-width=".5" stroke-dasharray="2 1" opacity=".7"/>
        <!-- pockets -->
        <path d="M-30 -72 L-12 -72 L-14 -55 L-30 -55 Z" fill="none" stroke="${shade(tone,1.4)}" stroke-width=".35" stroke-dasharray="1.5 1"/>
        <path d="M30 -72 L12 -72 L14 -55 L30 -55 Z" fill="none" stroke="${shade(tone,1.4)}" stroke-width=".35" stroke-dasharray="1.5 1"/>
        <!-- inseam -->
        <line x1="-22" y1="-10" x2="-46" y2="86" stroke="${shade(tone,1.5)}" stroke-width=".3" stroke-dasharray="1.5 1" opacity=".6"/>
        <line x1="22" y1="-10" x2="46" y2="86" stroke="${shade(tone,1.5)}" stroke-width=".3" stroke-dasharray="1.5 1" opacity=".6"/>
        <!-- wash highlight -->
        <ellipse cx="-25" cy="20" rx="14" ry="40" fill="${shade(tone,1.6)}" opacity=".18"/>
        <ellipse cx="25" cy="20" rx="14" ry="40" fill="${shade(tone,1.6)}" opacity=".18"/>
      </g>
    </svg>`,

  tees: (tone) => `
    <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="250" fill="#11141d"/>
      <g transform="translate(100 130)">
        <path d="M-60 -60 L-30 -75 L-18 -65 Q0 -55 18 -65 L30 -75 L60 -60 L48 -32 L36 -38 L36 70 L-36 70 L-36 -38 L-48 -32 Z"
              fill="${tone}" stroke="${shade(tone,.55)}" stroke-width=".5"/>
        <!-- horizontal stripes -->
        ${[-20,-12,-4,4,12].map(y=>`<rect x="-36" y="${y}" width="72" height="2.5" fill="${shade(tone,1.7)}" opacity=".55"/>`).join('')}
        <!-- collar shadow -->
        <path d="M-18 -65 Q0 -55 18 -65 Q0 -50 -18 -65 Z" fill="${shade(tone,.5)}"/>
        <!-- side seams -->
        <line x1="-36" y1="-38" x2="-36" y2="70" stroke="${shade(tone,.5)}" stroke-width=".4"/>
        <line x1="36" y1="-38" x2="36" y2="70" stroke="${shade(tone,.5)}" stroke-width=".4"/>
        <!-- highlight -->
        <ellipse cx="-15" cy="0" rx="10" ry="35" fill="${shade(tone,1.5)}" opacity=".15"/>
      </g>
    </svg>`,

  polos: (tone) => `
    <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="250" fill="#11141d"/>
      <g transform="translate(100 130)">
        <path d="M-60 -60 L-30 -75 L-22 -68 L-12 -55 L-12 -32 L12 -32 L12 -55 L22 -68 L30 -75 L60 -60 L48 -32 L36 -38 L36 70 L-36 70 L-36 -38 L-48 -32 Z"
              fill="${tone}" stroke="${shade(tone,.55)}" stroke-width=".5"/>
        <!-- collar -->
        <path d="M-22 -68 L-12 -55 L0 -45 L12 -55 L22 -68 L18 -55 L0 -38 L-18 -55 Z"
              fill="${shade(tone,.6)}" stroke="${shade(tone,.4)}" stroke-width=".4"/>
        <!-- placket -->
        <line x1="0" y1="-45" x2="0" y2="-18" stroke="${shade(tone,.4)}" stroke-width=".7"/>
        <circle cx="0" cy="-38" r="1" fill="${shade(tone,1.6)}"/>
        <circle cx="0" cy="-28" r="1" fill="${shade(tone,1.6)}"/>
        <!-- chest stripes -->
        ${[-8, -2, 4].map(y=>`<rect x="-36" y="${y}" width="72" height="3" fill="${shade(tone,1.5)}" opacity=".6"/>`).join('')}
        <!-- highlight -->
        <ellipse cx="-15" cy="10" rx="10" ry="30" fill="${shade(tone,1.5)}" opacity=".12"/>
      </g>
    </svg>`,

  sweaters: (tone) => `
    <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="knit-${tone.slice(1)}" patternUnits="userSpaceOnUse" width="6" height="6">
          <path d="M0 3 Q1.5 0 3 3 T6 3" stroke="${shade(tone,1.4)}" stroke-width=".5" fill="none" opacity=".4"/>
          <path d="M0 6 Q1.5 3 3 6" stroke="${shade(tone,.6)}" stroke-width=".4" fill="none" opacity=".4"/>
        </pattern>
      </defs>
      <rect width="200" height="250" fill="#11141d"/>
      <g transform="translate(100 130)">
        <path d="M-66 -60 L-32 -78 L-20 -68 Q0 -58 20 -68 L32 -78 L66 -60 L52 -28 L40 -34 L40 74 L-40 74 L-40 -34 L-52 -28 Z"
              fill="${tone}" stroke="${shade(tone,.45)}" stroke-width=".5"/>
        <path d="M-66 -60 L-32 -78 L-20 -68 Q0 -58 20 -68 L32 -78 L66 -60 L52 -28 L40 -34 L40 74 L-40 74 L-40 -34 L-52 -28 Z"
              fill="url(#knit-${tone.slice(1)})"/>
        <!-- ribbed hem -->
        ${Array.from({length:14},(_,i)=>{const x=-40+i*6; return `<line x1="${x}" y1="64" x2="${x}" y2="74" stroke="${shade(tone,.45)}" stroke-width=".5"/>`}).join('')}
        <!-- ribbed cuffs -->
        ${Array.from({length:6},(_,i)=>`<line x1="${-66+i*2.5}" y1="${-58+i*4}" x2="${-52+i*2.5}" y2="${-28+i*0}" stroke="${shade(tone,.4)}" stroke-width=".3"/>`).join('')}
        <!-- chevron / motif -->
        <path d="M-20 -10 L-10 -20 L0 -10 L10 -20 L20 -10" fill="none" stroke="${shade(tone,1.6)}" stroke-width="1.5" opacity=".55"/>
        <path d="M-20 4 L-10 -6 L0 4 L10 -6 L20 4" fill="none" stroke="${shade(tone,1.6)}" stroke-width="1.5" opacity=".4"/>
        <!-- collar -->
        <path d="M-20 -68 Q0 -58 20 -68 Q0 -55 -20 -68 Z" fill="${shade(tone,.55)}"/>
      </g>
    </svg>`,

  outerwear: (tone) => `
    <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="og-${tone.slice(1)}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${shade(tone, 1.3)}"/>
          <stop offset="100%" stop-color="${shade(tone, .55)}"/>
        </linearGradient>
      </defs>
      <rect width="200" height="250" fill="#11141d"/>
      <g transform="translate(100 130)">
        <!-- jacket body with collar -->
        <path d="M-60 -65 L-28 -78 L-14 -60 L-2 -55 L-2 70 L2 70 L2 -55 L14 -60 L28 -78 L60 -65 L48 -30 L36 -36 L36 76 L-36 76 L-36 -36 L-48 -30 Z"
              fill="url(#og-${tone.slice(1)})" stroke="${shade(tone,.4)}" stroke-width=".5"/>
        <!-- lapels -->
        <path d="M-14 -60 L-2 -55 L-2 -10 L-14 -28 Z" fill="${shade(tone,.55)}" stroke="${shade(tone,.3)}" stroke-width=".3"/>
        <path d="M14 -60 L2 -55 L2 -10 L14 -28 Z" fill="${shade(tone,.55)}" stroke="${shade(tone,.3)}" stroke-width=".3"/>
        <!-- centre placket buttons -->
        <circle cx="-6" cy="-15" r="1.4" fill="${shade(tone,1.7)}"/>
        <circle cx="-6" cy="5" r="1.4" fill="${shade(tone,1.7)}"/>
        <circle cx="-6" cy="25" r="1.4" fill="${shade(tone,1.7)}"/>
        <circle cx="-6" cy="45" r="1.4" fill="${shade(tone,1.7)}"/>
        <!-- pocket flaps -->
        <rect x="-32" y="20" width="22" height="8" fill="${shade(tone,.55)}" stroke="${shade(tone,.3)}" stroke-width=".3"/>
        <rect x="10" y="20" width="22" height="8" fill="${shade(tone,.55)}" stroke="${shade(tone,.3)}" stroke-width=".3"/>
        <!-- top stitch hint -->
        <path d="M-36 -36 L-36 76 M36 -36 L36 76" stroke="${shade(tone,1.6)}" stroke-width=".25" stroke-dasharray="1.5 1.5" opacity=".55"/>
      </g>
    </svg>`,
};

/* darken or lighten a hex colour */
function shade (hex, amt) {
  const c = hex.replace('#','');
  const r = parseInt(c.slice(0,2),16);
  const g = parseInt(c.slice(2,4),16);
  const b = parseInt(c.slice(4,6),16);
  const cl = (n) => Math.max(0, Math.min(255, Math.round(n*amt)));
  return `#${cl(r).toString(16).padStart(2,'0')}${cl(g).toString(16).padStart(2,'0')}${cl(b).toString(16).padStart(2,'0')}`;
}

/* ---------- render product cards ---------- */
function renderProducts (filter='all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const list = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === filter);

  list.forEach((p, i) => {
    const visual = SVG_GENERATORS[p.cat] ? SVG_GENERATORS[p.cat](p.tone) : '';
    const card = document.createElement('article');
    card.className = 'product reveal';
    card.style.transitionDelay = `${(i % 8) * 60}ms`;
    card.innerHTML = `
      <div class="product__visual">
        <span class="product__tag">${p.tag}</span>
        ${visual}
      </div>
      <div class="product__body">
        <h3 class="product__name">${p.name}</h3>
        <p class="product__sub">${p.sub}</p>
        <div class="product__foot">
          <div class="product__price">₹ ${p.price.toLocaleString('en-IN')}<small>INR</small></div>
          <button class="product__add" data-id="${p.id}" data-cursor="hover">
            <span>Add</span>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  // Attach cart events
  grid.querySelectorAll('.product__add').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const product = PRODUCTS.find(p => p.id === id);
      if (product && window.NiyuCart) {
        window.NiyuCart.add(product);
        btn.classList.add('is-added');
        btn.querySelector('span').textContent = 'Added';
        setTimeout(() => {
          btn.classList.remove('is-added');
          btn.querySelector('span').textContent = 'Add';
        }, 1400);
      }
    });
  });

  // Re-observe the new cards for reveal animation
  if (window.NiyuReveal) window.NiyuReveal.refresh();
}

window.NiyuProducts = { renderProducts, PRODUCTS, SVG_GENERATORS };
