# Shree Infotech Mundra — Premium Business Landing Page

A polished, responsive landing page for **Shree Infotech**, a trusted IT sales, repair, and service provider in Mundra, Gujarat. The project is built as a lightweight static website with clean separation between markup, styling, and behavior so it is easy to maintain, deploy, and extend.

## Overview

This website presents Shree Infotech as a professional local technology partner for laptops, desktops, accessories, CCTV, networking, and repair services. The page focuses on a strong first impression, clear service discovery, product inquiries through WhatsApp, and accessible contact information.

## Key Highlights

- **Modern responsive UI** built with Bootstrap 5 and custom brand styling.
- **Clean asset architecture** with HTML, CSS, and JavaScript separated into dedicated files.
- **Hero image slider** with automatic rotation and manual dot navigation.
- **Product and service showcase** with lazy-loaded images for better page performance.
- **Animated counters and scroll effects** using AOS and Intersection Observer.
- **WhatsApp-first inquiry flow** for fast customer communication.
- **Contact form interaction** handled with unobtrusive JavaScript.
- **SEO-ready metadata** for the business name, location, services, and phone number.
- **Mobile-friendly navigation** and layout optimized for local customers on phones.

## Tech Stack

| Layer        | Technology                      |
| ------------ | ------------------------------- |
| Markup       | HTML5                           |
| Styling      | CSS3, Bootstrap 5, Google Fonts |
| Interactions | Vanilla JavaScript              |
| Icons        | Font Awesome                    |
| Animations   | AOS, Swiper                     |
| Deployment   | Static hosting compatible       |

## Project Structure

```text
ShreeInfoMDR/
├── assets/
│   ├── css/
│   │   └── style.css      # Brand theme, layouts, responsive styling, utilities
│   └── js/
│       └── main.js        # Slider, counters, form behavior, scroll interactions
├── images/                # Product, service, hero, and brand images
├── index.html             # Main landing page markup
└── README.md              # Project documentation
```

## Getting Started

Because this is a static website, no build step is required.

### Run locally

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

You can also open `index.html` directly in a browser, but running a local server is recommended so all asset paths behave consistently.

## Development Workflow

### Format files

```bash
npx --yes prettier --write index.html assets/css/style.css assets/js/main.js
```

### Validate local asset references

```bash
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
import re

class Parser(HTMLParser):
    pass

html = Path('index.html').read_text()
Parser().feed(html)

refs = re.findall(r'(?:src|href)="([^"#]+)"', html)
missing = []
for ref in refs:
    if ref.startswith(('http://', 'https://', 'mailto:', 'tel:')):
        continue
    if not Path(ref).exists():
        missing.append(ref)

assert not missing, f'Missing local assets: {missing}'
assert 'style=' not in html
assert 'onclick' not in html and 'onsubmit' not in html
print('HTML and local assets validated successfully.')
PY
```

## Customization Guide

### Update business information

Edit the relevant sections in `index.html`:

- Navigation links
- Hero headline and statistics
- About section copy
- Products and services
- Contact details
- Business hours
- WhatsApp inquiry links

### Update styling

Brand colors, spacing, cards, responsive behavior, and utility classes live in:

```text
assets/css/style.css
```

Primary CSS variables are defined at the top of the stylesheet, making it easy to adjust the brand palette globally.

### Update interactions

Slider behavior, counters, smooth scrolling, form feedback, and active navigation highlighting live in:

```text
assets/js/main.js
```

Keep JavaScript unobtrusive by attaching behavior through selectors and event listeners rather than inline HTML handlers.

### Update images

Add or replace images in the `images/` directory, then update the relevant `src` references in `index.html` or hero background classes in `assets/css/style.css`.

For best results:

- Use optimized `.jpg`/`.webp` files for large photos.
- Keep product images visually consistent in aspect ratio.
- Use descriptive `alt` text for accessibility and SEO.
- Preserve `loading="lazy"` for below-the-fold images.

## Quality Standards

This repository follows a maintainable static-site approach:

- Keep structure semantic and readable.
- Avoid inline styles and inline event handlers.
- Keep reusable design decisions in CSS classes.
- Keep behavior in JavaScript modules/files.
- Use accessible labels, descriptive alt text, and clear CTA wording.
- Validate local references before deployment.
- Format code before committing changes.

## Deployment

The project can be deployed to any static hosting provider, including:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- cPanel or shared hosting public directory

Upload the repository contents while preserving the folder structure so `index.html`, `assets/`, and `images/` remain at the same relative paths.

## Business Contact

**Shree Infotech**  
Plot No 42, Ashutosh Dham 1, Baroi Road, Mundra - 370421  
Phone: [+91 9879713381](tel:+919879713381)  
Email: [shreeinfo.mdr@gmail.com](mailto:shreeinfo.mdr@gmail.com)  
WhatsApp: [Chat Now](https://wa.me/919879713381)

## License

This project is intended for Shree Infotech business use. Reuse, redistribution, or commercial adaptation should be done only with the business owner's permission.
