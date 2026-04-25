# Ni-Yu Tex International — Interactive 3D Site

A premium, single-page 3D-interactive ecommerce experience for **Ni-Yu Tex International**, a denim and apparel manufacturer based in Bangalore. Built with vanilla HTML/CSS/JS + Three.js — no build step, deploys instantly to GitHub Pages, Netlify, or Vercel.

---

## ✦ Features

- **3D Hero scene** (Three.js): a rotating, parallax-reactive denim sculpture with procedural denim weave texture, twin orbital rings (representing the supply-chain loop), drifting particle field, and pointer + scroll reactivity.
- **Editorial fashion design**: Fraunces display serif paired with Outfit sans, deep ink palette with cream + indigo accents, hand-drawn SVG product illustrations, custom blend-mode cursor, animated marquee, scroll-reveal sequencing, fine-grain noise overlay.
- **Full ecommerce flow**: 25-piece catalog across Denim / Tees / Polos / Sweaters / Outerwear, category filters, slide-in cart drawer with quantity controls, localStorage persistence, demo checkout modal.
- **Content pulled directly from the company profile**: 95% OTIF, 50K in-house / 150K outsourced capacity, 30 certified factories, Crocker Jeans Paris / Candiani / Jeanologia / Garmon supplier callouts, full Indian + overseas client roster, all four Ni-Yu Tex addresses.
- **Mobile-friendly** with responsive grid breakdowns, a burger menu, and the custom cursor disabled on touch.

---

## ✦ Project structure

```
Ni-yu-tex/
├── index.html          ← single-page entry
├── css/
│   └── styles.css      ← all styling (no preprocessor)
├── js/
│   ├── scene.js        ← Three.js hero scene (ESM via importmap)
│   ├── products.js     ← catalog + SVG generators
│   ├── cart.js         ← cart logic + drawer + localStorage
│   └── main.js         ← cursor, loader, reveals, filters, nav
├── README.md
└── .gitignore
```

No `node_modules`, no bundler. Three.js is loaded from `unpkg` via an importmap.

---

## ✦ Run locally

Because the site uses ES modules, you need a local server (file:// won't work). Pick one:

```bash
# Python 3
python3 -m http.server 8080

# Node (one-liner)
npx serve .

# PHP
php -S localhost:8080
```

Then open `http://localhost:8080`.

---

## ✦ Upload to your GitHub repo

The repo `https://github.com/aemo3331/Ni-yu-tex.git` is already set as the destination. From inside this project folder, run:

```bash
git init
git add .
git commit -m "Initial commit — Ni-Yu Tex 3D interactive site"
git branch -M main
git remote add origin https://github.com/aemo3331/Ni-yu-tex.git
git push -u origin main
```

If the repo already has commits and you get a non-fast-forward error:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

Or if you're sure you want to overwrite whatever's there:

```bash
git push -u origin main --force
```

---

## ✦ Deploy to GitHub Pages (free)

1. Push the project as above.
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Pick branch `main`, folder `/ (root)`, and click **Save**.
5. After ~30 seconds, your site is live at `https://aemo3331.github.io/Ni-yu-tex/`.

---

## ✦ Customising

- **Add a product**: append to the `PRODUCTS` array in `js/products.js`. Pick a `cat` from `denim | tees | polos | sweaters | outerwear` and any hex colour for `tone`.
- **Replace SVG with photographs**: in `js/products.js`, replace the `SVG_GENERATORS[cat]` output with `<img src="assets/your-photo.jpg" alt="..."/>` and drop your photos into `/assets`.
- **Change palette**: edit the CSS variables at the top of `css/styles.css` (`--ink`, `--cream`, `--indigo`, etc.).
- **Wire real checkout**: replace the `checkout()` function in `js/cart.js` with a fetch call to Stripe Checkout or Razorpay.

---

## ✦ Credits & content

All copy, statistics, supplier names, factory addresses, client lists and certifications come from the official Ni-Yu Tex International business profile (2016, Bangalore).

Director · Sundhar Mohandoss · `+91 99020 10608` · `director@niyutex.com`

---

Built as a deployable static site — Three.js inline, no build pipeline, no tracking.
# Ni-yu-tex
