# Auro Tech — E-commerce Product Landing Page

A dark-themed, premium product landing page for a fictional tech accessories brand, built with HTML5, CSS3, and vanilla JavaScript — including a fully functional cart interaction.

## Project Overview

**Brand:** Auro Tech  
**Product:** ProBud X1 — Premium Wireless Earbuds  
**Industry:** Consumer Electronics / E-commerce  
**Purpose:** Portfolio demonstration — freelance frontend development

## Features

- **Dark premium design** — near-black background with amber accent system
- **Product hero** with:
  - Thumbnail strip for color variant selection (3 colors)
  - Interactive color swatches with amber ring selection state
  - Quantity +/− selector
  - Add to Cart + Buy Now buttons
  - Trust badges (Free Shipping, Returns, Warranty)
- **Benefits section** — 4 key selling points in a responsive grid
- **Specifications table** — 10 technical specs in a clean dark table
- **Bundle pricing** — 3 purchase options, featured card with highlight
- **FAQ accordion** — 5 questions, one-open-at-a-time
- **Cart drawer** — slides in from right with:
  - Item list with name, color, quantity controls, price
  - Remove item button
  - Live subtotal calculation
  - Checkout button (with demo alert)
  - Keyboard support (Escape to close)
  - Focus trapping when open

## Technologies

- HTML5 (semantic, `role="dialog"`, `aria-modal`, `aria-label` throughout)
- CSS3 (custom properties, CSS Grid, Flexbox, `backdrop-filter`)
- Vanilla JavaScript (ES6+, pure array-based cart state)
- Google Fonts: Manrope

## Running Locally

```bash
open index.html
# or
npx serve .
```

## Cart Architecture

```js
let cart = []; // { id, name, color, qty, price }

addToCart(id, name, color, qty, price)  // Adds or increments item
removeFromCart(id, color)               // Removes item by id + color key
changeQty(id, color, delta)             // +1 or -1
updateCartUI()                          // Renders drawer items, badge, total
```

## File Structure

```
05-ecommerce-landing-page/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```
