# Shree Infotech Mundra — Premium Business Landing Page

A polished, responsive landing page for **Shree Infotech**, a trusted IT sales, repair, and service provider in Mundra, Gujarat. The project is built as a lightweight static website with clean separation between markup, styling, and behavior so it is easy to maintain, deploy, and extend.

## Overview

This website presents Shree Infotech as a professional local technology partner for laptops, desktops, accessories, CCTV, networking, and repair services. The page focuses on a strong first impression, clear service discovery, product inquiries through WhatsApp, and accessible contact information.

## Key Highlights

- **Modern responsive UI** built with Bootstrap 5 and custom brand styling.
- **Clean asset architecture** with HTML, CSS, and JavaScript separated into dedicated files.
- **React/Vite-powered hero image slider** with automatic rotation and manual dot navigation.
- **Product and service showcase** with lazy-loaded images for better page performance.
- **Animated counters and scroll effects** using AOS and Intersection Observer.
- **WhatsApp-first inquiry flow** for fast customer communication.
- **Contact form interaction** handled with unobtrusive JavaScript.
- **SEO-ready metadata** for the business name, location, services, and phone number.
- **Mobile-friendly navigation** and layout optimized for local customers on phones.

## Tech Stack

| Layer        | Technology                      |
| ------------ | ------------------------------- |
| Markup       | HTML5, React JSX                |
| Styling      | CSS3, Bootstrap 5, Google Fonts |
| Interactions | React, Vite, Vanilla JavaScript |
| Icons        | Font Awesome                    |
| Animations   | AOS, Swiper                     |
| Deployment   | Static hosting compatible       |

## Project Structure

```text
ShreeInfoMDR/
├── assets/
│   └── css/
│       └── style.css      # Brand theme, layouts, responsive styling, utilities
├── src/
│   ├── components/        # React section components
│   ├── data/              # Section markup/data modules
│   ├── App.jsx            # React application shell
│   ├── enhancements.js    # Browser behavior and integrations
│   └── main.jsx           # React/Vite entry point
├── images/                # Product, service, hero, and brand images
├── index.html             # Vite HTML entry
├── vite.config.js         # Vite config and static image copy plugin
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
npx --yes prettier --write index.html assets/css/style.css src/**/*.jsx src/**/*.js README.md package.json vite.config.js vercel.json
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

React entry files and section modules live in:

```text
src/main.jsx
src/App.jsx
src/components/Navigation.jsx
src/components/Hero.jsx
src/components/About.jsx
src/components/Products.jsx
src/components/Services.jsx
src/components/Contact.jsx
src/enhancements.js
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

## Vercel Deployment

This project is a static site. For Vercel, `npm run build` runs the Vite production build and emits the site into `dist/`. The Vite config also copies the `images/` directory into `dist/images/` so all existing product and service images continue to load.

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

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
