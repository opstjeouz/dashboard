// Project README with description, features, file structure, setup, usage, browser support, and credits.
// Extracted from YouTube tutorial by YouExtractor

# Dashboard Sidebar Menu — Curve Outside

A modern, responsive dashboard sidebar navigation menu with a **curved-outside active indicator**, built with **pure HTML, CSS and vanilla JavaScript**. No frameworks, no build tools — just open `index.html`.

![Screenshot placeholder](assets/screenshot.png)

> Inspired by the YouTube tutorial *"Dashboard Sidebar Menu using Html CSS & Vanilla Javascript | Curve Outside"* (video ID `PuLujpkLRUM`).

## ✨ Features

- 🎯 **Curve-outside active effect** — the active nav item blends into the main content background using pseudo-element curves.
- 🧭 **Sliding active indicator** — smoothly repositions when a new item is selected.
- 📱 **Fully responsive** — off-canvas drawer with overlay on mobile, icon-rail collapse on desktop.
- ♿ **Accessible** — `aria-expanded`, `aria-controls`, `aria-current`, focus-visible outlines, and `Escape` to close.
- 🎨 **Themeable** — all colors, sizes and transitions are CSS custom properties in `:root`.
- ⚡ **Zero dependencies** (except the Boxicons icon font via CDN).

## 📁 File Structure

```
.
├── index.html          # Main HTML document
├── css/
│   └── style.css       # All styles (variables, layout, curve effect, responsive)
├── js/
│   └── script.js       # Sidebar toggle, active state, indicator positioning
├── assets/
│   └── README.md       # Asset documentation (icons via CDN)
├── README.md           # This file
└── .gitignore
```

## 🚀 Setup

No installation or build step required.

### Option 1 — Open directly

Double-click `index.html` (or right-click → *Open with* → your browser).

### Option 2 — Static server (recommended)

```bash
# Python 3
python -m http.server 8000

# or Node.js (npx)
npx serve .
```

Then visit <http://localhost:8000>.

## 🛠️ Usage

### Add a new nav item

Insert a new `<li>` inside `.nav-list` in `index.html`:

```html
<li class="nav-item">
  <a href="#reports">
    <i class="bx bx-file"></i>
    <span class="nav-label">Reports</span>
  </a>
</li>
```

The JavaScript uses event delegation, so no extra wiring is needed — clicking the item will activate it and slide the indicator.

### Change the theme

Edit the CSS custom properties in `css/style.css`:

```css
:root {
  --sidebar-width: 260px;
  --sidebar-width-collapsed: 78px;
  --primary-color: #00bcd4;
  --active-bg: #00bcd4;
  --sidebar-bg: #1e1e2f;
  --bg-color: #f4f6fb;
  --transition: 0.3s ease;
}
```

### Toggle behavior

- **Desktop (> 768px):** the menu button collapses the sidebar to an icon rail (`--sidebar-width-collapsed`).
- **Mobile (≤ 768px):** the sidebar slides in from the left as an off-canvas drawer with a dimmed overlay.
- **Escape key** closes the mobile drawer.

## 🌐 Browser Support

Works in all modern evergreen browsers:

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest, macOS & iOS)
- Opera (latest)

Uses CSS custom properties, flexbox, `clamp`-free layout, and `:focus-visible` — all widely supported.

## 📝 License

This project is provided for educational purposes. The original design and tutorial belong to their respective author on YouTube. You are free to use and adapt the code for personal and commercial projects.

## 🙏 Credits

- **Tutorial:** [Dashboard Sidebar Menu using Html CSS & Vanilla Javascript | Curve Outside](https://www.youtube.com/watch?v=PuLujpkLRUM)
- **Icons:** [Boxicons](https://boxicons.com/)
